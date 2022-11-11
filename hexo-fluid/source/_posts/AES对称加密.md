---
title: AES对称加密
date: 2022-11-10 21:49:16
tags: [java,AES,对称加密]
categories: 加密
---
java中使用对称加密算法
<!-- more -->
# 1. 什么是对称加密

> **对称密钥算法**（英语：**Symmetric-key algorithm**）又称为**对称加密**、**私钥加密**、**共享密钥加密**，是[密码学](https://zh.wikipedia.org/wiki/密碼學)中的一类加密算法。这类算法在加密和解密时使用相同的密钥，或是使用两个可以简单地相互推算的密钥。事实上，这组密钥成为在两个或多个成员间的共同秘密，以便维持专属的通信联系[[1\]](https://zh.wikipedia.org/zh-my/對稱密鑰加密#cite_note-1)。与[公开密钥加密](https://zh.wikipedia.org/wiki/公开密钥加密)相比，要求双方获取相同的密钥是对称密钥加密的主要缺点之一[[2\]](https://zh.wikipedia.org/zh-my/對稱密鑰加密#cite_note-2)。
>
> 常见的对称加密算法有[AES](https://zh.wikipedia.org/wiki/高级加密标准)、[ChaCha20](https://zh.wikipedia.org/wiki/Salsa20)、[3DES](https://zh.wikipedia.org/wiki/3DES)、[Salsa20](https://zh.wikipedia.org/wiki/Salsa20)、[DES](https://zh.wikipedia.org/wiki/資料加密標準)、[Blowfish](https://zh.wikipedia.org/wiki/Blowfish)、[IDEA](https://zh.wikipedia.org/wiki/國際資料加密演算法)、[RC5](https://zh.wikipedia.org/wiki/RC5)、[RC6](https://zh.wikipedia.org/wiki/RC6)、[Camellia](https://zh.wikipedia.org/wiki/Camellia)。

**简单来说:**加密和解密都用一个私钥,就是对称加密

**那这种加密方式和我们常用的MD5有什么区别呢?**

MD5实际上并不是加密算法,而是哈希算法，无论什么值，经过哈希计算后都会生成长度为16的字符串，而哈希是无法反向计算的。

# 2. AES对称加密

> **高级加密标准**（英语：**A**dvanced **E**ncryption **S**tandard，[缩写](https://zh.wikipedia.org/wiki/缩写)：AES），又称**Rijndael加密法**（荷兰语发音： [[ˈrɛindaːl\]](https://zh.wikipedia.org/wiki/Help:荷蘭語國際音標)，音似英文的“Rhine doll”），是[美国联邦政府](https://zh.wikipedia.org/wiki/美国联邦政府)采用的一种[区块加密](https://zh.wikipedia.org/wiki/區塊加密)标准。这个标准用来替代原先的[DES](https://zh.wikipedia.org/wiki/DES)，已经被多方分析且广为全世界所使用。经过五年的甄选流程，高级加密标准由[美国国家标准与技术研究院](https://zh.wikipedia.org/wiki/美国国家标准与技术研究院)（NIST）于2001年11月26日发布于FIPS PUB 197，并在2002年5月26日成为有效的标准。现在，高级加密标准已然成为[对称密钥加密](https://zh.wikipedia.org/wiki/对称密钥加密)中最流行的[算法](https://zh.wikipedia.org/wiki/演算法)之一。
>
> 该算法为[比利时](https://zh.wikipedia.org/wiki/比利时)密码学家Joan Daemen和Vincent Rijmen所设计，结合两位作者的名字，以Rijndael为名投稿高级加密标准的甄选流程。

# 3. java中使用AES加密

## 3.1 依赖

使用hutool工具包

```xml
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>4.5.18</version>
        </dependency>
```



## 3.2 使用

- 代码:

```java
    public void testEncode() {
        // 明文
        String content = "明文";
        // 使用md5哈希运算出16位的密钥,AES要求秘钥为128/192/256个比特位
        String md5key = SecureUtil.md5("alanIsHandsome");
        // 生成密钥
        byte[] key = md5key.getBytes();
        // 构建
        AES aes = SecureUtil.aes(key);
        // 加密值
        String encodeValue = aes.encryptHex(content);
        // 解密值
        String decodeValue = aes.decryptStr(encodeValue);
        System.out.println("明文为:"+content);
        System.out.println("加密结果:"+encodeValue);
        System.out.println("对加密值解密结果:"+decodeValue);
    }
```

- 输出结果:

```shell
明文为:明文
加密结果:224a679b5fdc3dfdc258c8d2e407198c
对加密值解密结果:明文
```