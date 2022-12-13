---
title: docker从容器中保存镜像
date: 2022-12-13 11:24:10
tags: [docker,镜像]
categories: docker
excerpt: 使用docker命令将容器保存为image镜像
---
# 1. 命令

```shell
docker commit -a "作者名" -m "镜像描述" 容器id 镜像名
```

**示例如下:**

```shell
docker commit -a "glens" -m "centos with firefox and webdriver" 29b0923c5d82 centos-firefox:1.0
```


