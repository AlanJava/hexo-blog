---
title: Maven依赖导出
date: 2022-10-28 10:44:28
tags: [maven,mvn,内网]
categories: maven
index_img: /img/maven.png
---
使用mvn命令导出maven工程依赖的所有jar包

<!-- more -->

# 1. 前言

在没有网络的时候,我们无法使用maven管理项目依赖.这是如果需要搭建springboot项目的话,就只能引入jar包

但是springboot依赖的jar包这么多,怎么知道要引入哪些呢

# 2. 导出jar包

可以先在有网络环境下搭建maven项目,pom配置好依赖后,使用以下命令将依赖的jar包导出本地的lib文件夹下

```shell
mvn dependency:copy-dependencies -DoutputDirectory=lib 
# lib文件夹可更改为其它文件夹
```

![image-20221028103307859](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028103307859.png)

# 3. 导入jar包

- idea新建个普通的Java项目

- 点击Project Structure

![image-20221028103457001](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028103457001.png)



- 选择jar包

![image-20221028103716902](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028103716902.png)

- 引入lib

![image-20221028103814383](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028103814383.png)

- 最后根据springboot的文件目录创建java和resources目录,分别右键java和resources目录`Mark Directoty As`

![image-20221028104204052](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221028104204052.png)

