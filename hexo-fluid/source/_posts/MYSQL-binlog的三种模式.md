---
title: MySQL中binlog的三种模式
date: 2022-12-21 21:22:17
tags: [MySQL,binlog,主从同步,读写分离]
categories: MySQL
index_img: /img/MySQL.png
excerpt: MySQL中binlog的三种模式,分别为记录sql的Statement模式;记录行操作的行模式;混合模式
---
# 1. 什么是binlog

> 二进制日志,它记录了数据库的所有改变,并以二进制的形式保存到磁盘中。它可以用来查看数据库的变更历史,数据库增量备份,恢复,Mysql主从复制。从5.7.22版本开始，Mysql默认的格式由STATEMENT改为了ROW。

binlog 是 MySQL Server 层的日志，而不是存储引擎自带的日志，它记录了所有的 DDL 和 DML(不包含数据查询语句)语句，而且是以事件形式记录，还包含语句所执行的消耗的时间等，需要注意的是：

- binlog 是一种逻辑日志，他里边所记录的是一条 SQL 语句的原始逻辑，例如给某一个字段 +1，注意这个区别于 redo log 的物理日志(在某个数据页上做了什么修改)。
- binlog 文件写满后，会自动切换到下一个日志文件继续写，而不会覆盖以前的日志，这个也区别于 redo log，redo log 是循环写入的，即后面写入的可能会覆盖前面写入的。
- 一般来说，我们在配置 binlog 的时候，可以指定 binlog 文件的有效期，这样在到期后，日志文件会自动删除，这样避免占用较多存储空间。

根据 MySQL 官方文档的介绍，开启 binlog 之后，大概会有 1% 的性能损耗，不过这还是可以接受的，一般来说，binlog 有两个重要的使用场景：

- MySQL 主从复制时：在主机上开启 binlog，主机将 binlog 同步给从机，从机通过 binlog 来同步数据，进而实现主机和从机的数据同步。
- MySQL 数据恢复，通过使用 mysqlbinlog 工具再结合 binlog 文件，可以将数据恢复到过去的某一时刻。

# 2. binlog的三种模式

binlog 有三种格式：

- 基于SQL语句的复制(Statement)
- 基于行的复制(Row)
- 混合模式复制(Mixed)

## 2.1 Statement

Statement 模式只记录执行的 SQL，不需要记录每一行数据的变化，因此极大的减少了 binlog 的日志量，避免了大量的 IO 操作，提升了系统的性能。

但是，正是由于 Statement 模式只记录 SQL，而如果一些 SQL 中包含了函数，那么可能会出现执行结果不一致的情况。比如说 `uuid()` 函数，每次执行的时候都会生成一个随机字符串，在 master 中记录了 uuid，当同步到 slave 之后，再次执行，就获取到另外一个结果了。

所以使用 Statement 格式会出现一些数据一致性问题。

## 2.2 Row

从 MySQL5.1.5 版本开始，binlog 引入了 Row 格式，Row 格式不记录 SQL 语句上下文相关信息，仅仅只需要记录某一条记录被修改成什么样子了。

Row 格式的日志内容会非常清楚的记录下每一行数据修改的细节，这样就不会出现 Statement 中存在的那种数据无法被正常复制的情况。

不过 Row 格式也有一个很大的问题，那就是日志量太大了，特别是批量 update、整表 delete、alter 表等操作，由于要记录每一行数据的变化，此时会产生大量的日志，大量的日志也会带来 IO 性能问题。

## 2.3 Mixed

从 MySQL5.1.8 版开始，MySQL 又推出了 Mixed 格式，这种格式实际上就是 Statement 与 Row 的结合。

在 Mixed 模式下，系统会自动判断该用 Statement 还是 Row：一般的语句修改使用 Statement 格式保存 binlog;对于一些 Statement 无法准确完成主从复制的操作，则采用 Row 格式保存 binlog。

Mixed 模式中，MySQL 会根据执行的每一条具体的 SQL 语句来区别对待记录的日志格式，也就是在 Statement 和 Row 之间选择一种。

# 3. binlog主要配置

```properties
# 这个参数表示启用 binlog 功能，并指定 binlog 的存储目录
log-bin=javaboy_logbin

# 设置一个 binlog 文件的最大字节
# 设置最大 100MB
max_binlog_size=104857600

# 设置了 binlog 文件的有效期（单位：天）
expire_logs_days = 7

# binlog 日志只记录指定库的更新（配置主从复制的时候会用到）
#binlog-do-db=javaboy_db

# binlog 日志不记录指定库的更新（配置主从复制的时候会用到）
#binlog-ignore-db=javaboy_no_db

# 写缓存多少次，刷一次磁盘，默认 0 表示这个操作由操作系统根据自身负载自行决定多久写一次磁盘
# 1 表示每一条事务提交都会立即写磁盘，n 则表示 n 个事务提交才会写磁盘
sync_binlog=0

# 为当前服务取一个唯一的 id（MySQL5.7 之后需要配置）
server-id=1


#binlog_format="ROW"

binlog_format="MIXED"   #开启MIXED模式

#binlog_format="STATEMENT"
```



## 3.1 三种binlog模式的配置

```properties
binlog_format=ROW

binlog_format=MIXED

binlog_format=STATEMENT
```



参考[51CTO:江南一点雨](https://www.51cto.com/article/703972.html)