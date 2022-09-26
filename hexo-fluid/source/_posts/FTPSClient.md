---
title: FTPSClient 522 SSL connection failed错误
date: 2022-08-26 20:52:20
tags: [FTPS,FTPSClient,常见报错]
categories: 报错解决
---
使用FTPSClient上传文件时出现 
522 SSL connection failed; session reuse required: see require_ssl_reuse option in vsftpd.conf man page
的解决办法

<!--more-->

# 1.FTPSClient正常用法

```java
package com.alan;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPSClient;
import java.io.*;
import java.net.MalformedURLException;

/**
 * 正常的FTPSClient写法
 * @author tengguokun
 * @date 2022-08-26 10:56:18
 * @description
 */
public class TestFTPSClient {

    public void upload() {
        FTPSClient ftpClient = new FTPSClient();
        try {
            // 设置编码
            ftpClient.setControlEncoding("UTF-8");
            // 连接ftp服务器 ip和端口
            ftpClient.connect("192.168.1.100", 21);
            // 登录ftp服务器 用户名和用户密码
            ftpClient.login("root", "123456");
            // 被动模式
            ftpClient.enterLocalPassiveMode();
            // 文件类型
            ftpClient.setFileType(FTP.STREAM_TRANSFER_MODE);
            // 私密连接
            ftpClient.execPROT("P");
            // PBSZ命令必须在PROT命令之后
            ftpClient.execPBSZ(0);
            // 设置工作目录
            ftpClient.changeWorkingDirectory("/opt/data");
            File file = new File("E:/xxx.png");
            FileInputStream inputStream = new FileInputStream(file);
            // 上传文件
            ftpClient.storeFile(file.getName(), inputStream);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

当我们按照这种方式上传文件的时候,控制台却报错了

```
522 SSL connection failed; session reuse required: see require_ssl_reuse option in vsftpd.conf man page
```

同时可以看见FTPS服务器有上传的文件,但是文件大小为0kb

# 2. 错误原因

从报错内容可以发现服务器使用的是vsftpd,

通过搜索得知vsftpd（和大多数其他 FTPS 服务器）需要在控制和数据连接之间重用SSL session作为安全措施.

这可确保最初进行身份验证的一方与发送或检索数据的一方相同，从而防止有人在经典的中间人攻击中通过身份验证后劫持数据连接

[vsftpd官网内容](https://scarybeastsecurity.blogspot.com/2009/02/vsftpd-210-released.html)

但是我们使用Apache的`commons-net`依赖下的`FTPSClient`类却不支持SSL session 重用

Java Secure Socket Extension  (JSSE) 代码足够智能，可以为同一主机和端口重用 SSL 会话，但由于数据端口与控制端口不同，因此在生成新的 SSL 会话之前,需要人为地将控制会话存储到检查的 JSSE 缓存中

# 3. 解决方法

- 我创建了`MyFTPSClient`,继承`FTPSClient`并重写`_prepareDataSocket_`方法

```java
package com.glens.biz.common.utils.client;

import com.google.common.base.Throwables;
import org.apache.commons.net.ftp.FTPSClient;

import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSessionContext;
import javax.net.ssl.SSLSocket;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.Socket;
import java.util.Locale;

/**
 * @author tengguokun
 * @date 2022-08-26 14:58:24
 * @description
 * FTPSClient客户端<br/>
 * 这里重写了FTPSClient的_prepareDataSocket_方法<br/>
 */
public class MyFtpsClient extends FTPSClient {
    @Override
    protected void _prepareDataSocket_(final Socket socket) throws IOException {
        if(socket instanceof SSLSocket) {
            final SSLSession session = ((SSLSocket) _socket_).getSession();
            final SSLSessionContext context = session.getSessionContext();
            try {
                final Field sessionHostPortCache = context.getClass().getDeclaredField("sessionHostPortCache");
                sessionHostPortCache.setAccessible(true);
                final Object cache = sessionHostPortCache.get(context);
                final Method putMethod = cache.getClass().getDeclaredMethod("put", Object.class, Object.class);
                putMethod.setAccessible(true);
                final Method getHostMethod = socket.getClass().getDeclaredMethod("getHost");
                getHostMethod.setAccessible(true);
                Object host = getHostMethod.invoke(socket);
                final String key = String.format("%s:%s", host, String.valueOf(socket.getPort())).toLowerCase(Locale.ROOT);
                putMethod.invoke(cache, key, session);
            } catch(Exception e) {
                throw Throwables.propagate(e);
            }
        }
    }
}

```

- 接着使用我们自己的`MyFtpsClient`类实现功能

```java
package com.glens;

import com.glens.biz.common.utils.client.MyFtpsClient;
import org.apache.commons.net.ftp.FTP;
import java.io.*;
import java.net.MalformedURLException;

/**
 * 正常的FTPSClient写法
 * @author tengguokun
 * @date 2022-08-26 10:56:18
 * @description
 */
public class TestFTPSClient {

    public void upload() {
        MyFtpsClient ftpClient = new MyFtpsClient();
        try {
            // 设置jdk属性
            System.setProperty("jdk.tls.useExtendedMasterSecret", "false");
            // 设置编码
            ftpClient.setControlEncoding("UTF-8");
            // 连接ftp服务器 ip和端口
            ftpClient.connect("192.168.1.100", 21);
            // 登录ftp服务器 用户名和用户密码
            ftpClient.login("root", "123456");
            // 被动模式
            ftpClient.enterLocalPassiveMode();
            // 文件类型
            ftpClient.setFileType(FTP.STREAM_TRANSFER_MODE);
            // 私密连接
            ftpClient.execPROT("P");
            // PBSZ命令必须在PROT命令之后
            ftpClient.execPBSZ(0);
            // 设置工作目录
            ftpClient.changeWorkingDirectory("/opt/data");
            File file = new File("E:/xxx.png");
            FileInputStream inputStream = new FileInputStream(file);
            // 上传文件
            ftpClient.storeFile(file.getName(), inputStream);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

至此,该问题完美解决了

---
参考原文:[Connecting to an FTPS Server with SSL Session Reuse in Java 7 and 8](https://eng.wealthfront.com/2016/06/10/connecting-to-an-ftps-server-with-ssl-session-reuse-in-java-7-and-8/)

