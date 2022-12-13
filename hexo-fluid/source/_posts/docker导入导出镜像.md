---
title: docker导入导出镜像
date: 2022-12-13 11:38:30
tags: [docker,导入,导出]
categories: docker
excerpt: 使用docker命令导入和导出image镜像
---
# 1. 镜像导出为tar包

## 1.1 利用镜像id导出

```shell
docker save 镜像id > 导出文件名
```

**示例:**

```shell
docker save 0fdf2b4c26d3 > xxx_server.tar
```

## 1.2 利用镜像名导出

```shell
docker save 镜像名 > 导出文件名
```

**示例:**

```shell
docker save my-server:1.0 > xxx_server.tar
```





# 2. tar导入镜像

```shell
docker load < xxx_server.tar
```



**PS:**如果使用镜像id导出tar时,在导入时镜像名会丢失,变为null