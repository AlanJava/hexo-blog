---
title: Nexus搭建yum私服
date: 2022-10-28 15:33:44
tags: [内网,linux,yum,nexus]
categories: nexus
---
使用Nexus在Windows搭建yum私服,供内网环境的Centos使用

<!-- more -->

# 1. 问题

在生产环境中,很多Centos服务器都部署在内网环境中,如果需要安装软件只能手动编译源码或者下载rpm包进行安装.

在使用rpm包安装时,经常会出现缺失依赖的情况,这时候我们需要自己下载依赖,不仅繁琐,还经常出现依赖包等级过低,需要升级才能安装的情况.

这时候我们不禁怀念有外网时可以`yum install xxx`的舒服

# 2. 解决思路

## 2.1 搭建yum私服

我们知道,Centos添加阿里云,腾讯云的yum镜像服务.那么自然,也可以添加我们自己的yum镜像私服

如果我们在内网的另一台电脑部署一个yum私服,然后在centos服务器中添加我们的yum私服地址.就可以通过`yum install xxx`从私服安装软件并自动解决依赖问题

## 2.2 上传rpm包至yum私服中

为了能让内网中的centos访问yum私服,我们是在内网搭建的yum私服,那yum私服中所需要的rpm包从哪来呢?

虽然内网电脑无法上网,但是作为程序员肯定是有自己的笔记本的呀,自己的笔记本肯定是能使用外网的.

在自己笔记本的centos虚拟机下载软件所需所有依赖

```shell
repotrack firefox -p /opt/firefox-all-dep-test
# repotrack 可以不止可以下载软件包和软件依赖,还能下载依赖的依赖
# -p 指定下载位置
```

下载后复制到内网电脑中(怎么复制?当然是ftp把虚拟机的文件移到宿主机上,然后u盘复制呀!), 上传至内网安装的yum私服中

上传方式如下

- **windows下使用cmd**

```sh
for %i in (*) do curl -v --user "admin:123" --upload-file %i http://localhost:9797/repository/local-yum/7/os/x86_64/Packages/%i
# 遍历此文件夹下的所有文件,上传至我们的yum私服中
```

- **linux下使用bash**

```shell
for i in `ls`;do curl -v --user 'admin:123' --upload-file $i http://172.16.1.100:9797/repository/local-yum/7/os/x86_64/Packages/$i;done
# 遍历此文件夹下的所有文件,上传至我们的yum私服中
```



---

# 3. 实操

## 3.1 安装 Nexus3

- **下载Nexus**

[Nexus3官方下载地址]https://help.sonatype.com/repomanager3/product-information/download/download-archives---repository-manager-3

这里我下载的windows

![image-20221028135451011](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028135451011.png)

- **解压**

![image-20221028135543204](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028135543204.png)

在nexus-3.42.0-01文件夹中,有一个`etc`文件夹

![image-20221028135633908](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028135633908.png)

`etc`文件夹内有`nexus-default.properties`配置文件

![image-20221028135725361](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028135725361.png)

默认端口是8081,这里改成自己的想设置的端口

- **安装nexus服务**

![image-20221028140831163](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028140831163.png)

管理员模式打开cmd,进入bin目录,输入以下命令安装nexus

```shell
nexus.exe /install nexus
```

- **启动nexus服务**

管理员模式打开cmd,进入bin目录,输入以下命令启动nexus服务

```
nexus.exe /run
```

看见以下文字表示服务启动成功

![image-20221028141105901](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028141105901.png)

- **访问页面**

![nexus登录](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/08f4c17365424e60a9077bd164905a28.png)

右上角Sign in 登录,账号为admin,密码在弹框中有提示

![nexus密码](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/9e4c25926a6140f8a083ecec95e8364e.png)

## 3.2 搭建yum仓库

- **新建blob存储**

![进入页面](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028142109308.png)



![新建blob](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028142144770.png)



![image-20221028142208477](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028142208477.png)





- **创建hosts类型的yum仓库**

![新建yum库](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028142916068.png)





![选择hosts类型的yum](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028142936464.png)





![输入信息](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028143031491.png)



- **创建group类型的yum仓库**



![group类型yum仓库](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028143211399.png)





## 3.3 Centos创建yum源

- **进入如下目录**

```shell
cd /etc/yum.repos.d/
```

- **创建repo文件**

```shell
vim nexus.repo
```

```repo
[nexus]
name=nexus-repo
baseurl=http://172.16.1.100:9797/repository/group-yum/7/os/x86_64
enabled=1
gpgcheck=0
```

- **查看源**

```shell
yum repolist
```

![image-20221028151530415](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028151530415.png)





## 3.4 上传依赖至yum私服

- **在可访问外网的centos虚拟机下 下载软件和依赖**

```shell
repotrack firefox -p /opt/firefox-all-dep-test
# repotrack 可以不止可以下载软件包和软件依赖,还能下载依赖的依赖
# -p 指定下载位置
```

- **使用ftp工具将下载的文件复制的宿主机**

- **在宿主机执行命令上传软件和依赖**

windows下使用cmd

```sh
for %i in (*) do curl -v --user "admin:123" --upload-file %i http://localhost:9797/repository/local-yum/7/os/x86_64/Packages/%i
# 遍历此文件夹下的所有文件,上传至我们的yum私服中
```

linux下使用bash

```shell
for i in `ls`;do curl -v --user 'admin:123' --upload-file $i http://172.16.1.100:9797/repository/local-yum/7/os/x86_64/Packages/$i;done
# 遍历此文件夹下的所有文件,上传至我们的yum私服中
```



可以看到成功上传

![image-20221028152236774](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028152236774.png)



## 3.5 centos使用yum下载软件

- **清空缓存**

```shell
 yum clean all
```

- **缓存包信息**

```shell
yum makecache
```

- **下载**

```shell
yum install firefox --enablerepo=nexus-local
# --enablerepo 使用指定镜像下载
```

忘记镜像名使用如下命令查看镜像源

```shell
yum repolist
```

![image-20221028152630034](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028152630034.png)

