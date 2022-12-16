---
title: sharding-jdbc读写分离
date: 2022-12-16 17:21:57
tags: [mysql,sharding-jdbc,读写分离]
categories: mysql
index_img: /img/sharding-jdbc.png
excerpt: 在SpringBoot中使用sharding-jdbc实现mysql的读写分离,并配置mysql基于binlog的主从同步
---
# 1. 简介

[Sharding-JDBC官网](https://shardingsphere.apache.org/document/4.1.0/cn/manual/sharding-jdbc/)

Sharding-JDBC是ShardingSphere的第一个产品，也是ShardingSphere的前身。 它定位为轻量级Java框架，在Java的JDBC层提供的额外服务。它使用客户端直连数据库，以jar包形式提供服务，无需额外部署和依赖，可理解为增强版的JDBC驱动，完全兼容JDBC和各种ORM框架。

- 适用于任何基于JDBC的ORM框架，如：JPA, Hibernate, Mybatis, Spring JDBC Template或直接使用JDBC。
- 支持任何第三方的数据库连接池，如：DBCP, C3P0, BoneCP, Druid, HikariCP等。
- 支持任意实现JDBC规范的数据库。目前支持MySQL，Oracle，SQLServer，PostgreSQL以及任何遵循SQL92标准的数据库。

## 1.1 与ShardingSphere其它产品对比

|            | *Sharding-JDBC* | *Sharding-Proxy* | *Sharding-Sidecar* |
| :--------- | :-------------- | :--------------- | :----------------- |
| 数据库     | `任意`          | MySQL/PostgreSQL | MySQL/PostgreSQL   |
| 连接消耗数 | `高`            | 低               | 高                 |
| 异构语言   | `仅Java`        | 任意             | 任意               |
| 性能       | `损耗低`        | 损耗略高         | 损耗低             |
| 无中心化   | `是`            | 否               | 是                 |
| 静态入口   | `无`            | 有               | 无                 |

Sharding-JDBC的优势在于对Java应用的友好度。

# 2. SpringBoot中使用Sharding-JDBC

## 2.1 引入jar包

```xml
<dependency>
	<groupId>org.apache.shardingsphere</groupId>
	<artifactId>sharding-jdbc-spring-boot-starter</artifactId>
	<version>4.1.1</version>
</dependency>
```

## 2.2 yml文件配置主从数据源

```yml
spring:
  shardingsphere:
    props:
      # 打印sql语句，调试时可开启
      sql:
        show: true
    datasource:
      # 配置数据源，主库master，从库slave
      names: master,slave
      master:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3307/test?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8&useSSL=false
        username: 
        password: 
      slave:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3308/test?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8&useSSL=false
        username: 
        password: 
    masterslave:
      # 主从配置的名称，随意，但是要保证唯一
      name: oneMasterOneSlave
      # 从库负载均衡算法，内置两个值：RANDOM、ROUND_ROBIN
      load-balance-algorithm-type: round_robin
      # 主库,写操作用的库
      master-data-source-name: master
      # 从库,读操作用的库(可以把master也加入从库,这样主库也可以参与轮巡进行读操作)
      slave-data-source-names: 
        - slave
```

这时候在已经可以实现读写分离了

所有的select 都是走从库,所有的update,insert,delete都走主库



# 3. mysql配置主从同步

编辑`/etc/mysql/my.cnf`

- **主数据库**

```conf
[mysqld]
# binlog文件名
log-bin=mysql-bin
# id,数字
servier-id=01
# binlog记录的库
binlog-do-db=test
```

- **从数据库**

```cnf
[mysqld]
server-id=11
# 需要复制的库
replicate-do-db=test
```

改完配置文件需要重启mysql

## 3.1 查看主库状态

```sql
show master status
```

![image-20221216170305165](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221216170305165.png)

## 3.2 配置从库同步

- master_host  主库ip
- master_port 主库端口
- master_user 用户名
- master_password 密码
- master_log_file 主库查询的File值
- master_log_pos 主库查询的 Position值

```sql
change master to master_host='172.17.0.2' , master_port=3306, 
                 master_user='root',master_password='123456',
                 master_log_file = 'mysql-bin.000003',master_log_pos=154;
```

开启从库复制

```sql
start slave
```

查看从库状态

```sql
show slave status 
```

确保红框里的两个都是Yes

![image-20221216170631433](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221216170631433.png)





**PS:**

如果是docker内部署的mysql,会出现Salve_IO_Running一直是Conneting,原因是容器与容器访问不到,需要使用`docker network inspect bridge`命令,查看docker 容器内部之间的ip,

在从库执行`change master to xxx `时使用docker容器之见的ip,并且使用默认的3306端口

```shell
docker network inspect bridge
```

![image-20221216171751873](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221216171751873.png)