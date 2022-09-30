---
title: redis入门
date: 2022-09-26 18:12:23
tags: [redis]
categories: 中间件
---
redis常用命名,java中使用redis,springboot整合redis,redis工具类
<!-- more -->
# 1. Nosql概述

## 1.1 为什么要用Nosql

大数据时代,一般的数据库无法进行分析处理

> 1、单机Mysql时代

![image-20211026135701807](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026135701807.png)

90年代,一个网站的访问量一般不会太大，单个数据库完全够用。

随着用户增多，网站出现以下问题

1. 数据量增加到一定程度，一个数据库就放不下了
2. 数据的索引（B+ Tree）,一个机器内存也存放不下
3. 访问量变大后（读写混合），一台服务器承受不住

主要出现三种之一,就必须晋级.

> 2、Memcached(缓存) + Mysql + 垂直拆分（读写分离）

网站80%的情况都是在读，每次都要去查询数据库的话就十分的麻烦！所以说我们希望减轻数据库的压力，我们可以使用缓存来保证效率

优化过程经历了以下几个过程：

1. 优化数据库的数据结构和索引(难度大)
2. 文件缓存，通过IO流获取比每次都访问数据库效率略高，但是流量爆炸式增长时候，IO流也承受不了
3. MemCache,当时最热门的技术，通过在数据库和数据库访问层之间加上一层缓存，第一次访问时查询数据库，将结果保存到缓存，后续的查询先检查缓存，若有直接拿去使用，效率显著提升

![image-20211026140305097](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026140305097.png)

> 3、分库分表 + 水平拆分 + Mysql集群

==数据库的本质:读,写==

![image-20211026140727572](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026140727572.png)

> 4、如今最近的年代

如今信息量井喷式增长，各种各样的数据出现（用户定位数据，图片数据等），大数据的背景下关系型数据库（RDBMS）无法满足大量数据要求(数据量很多,变化很快)。Nosql数据库就能轻松解决这些问题。

图形数据库

JSON当数据库

> 目前一个基本的互联网项目

![image-20211026142014646](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026142014646.png)

> 为什么要用NoSQL ？

用户的个人信息，社交网络，地理位置。用户自己产生的数据，用户日志等等爆发式增长！
这时候我们就需要使用NoSQL数据库的，Nosql可以很好的处理以上的情况！

## 1.2 什么是Nosql

NoSQL = Not Only SQL（不仅仅是SQL）

Not Only Structured Query Language

**关系型数据库：**列+行，同一个表下数据的结构是一样的。

**非关系型数据库：**数据存储没有固定的格式，并且可以进行横向扩展。

NoSQL泛指非关系型数据库，随着web2.0互联网的诞生，传统的关系型数据库很难对付web2.0时代！尤其是超大规模的高并发的社区，暴露出来很多难以克服的问题，NoSQL在当今大数据环境下发展的十分迅速，Redis是发展最快的。

很多数据类型用户的个人信息,社交网络,地理位置,不需要存储固定格式,需要横向扩展

## 1.3 Nosql特点

1. 方便扩展（数据之间没有关系，很好扩展！）
2. 大数据量高性能（Redis一秒可以写8万次，读11万次，NoSQL的缓存记录级，是一种细粒度的缓存，性能会比较高！）
3. 数据类型是多样型的！（不需要事先设计数据库，随取随用）

>  传统的 RDBMS 和 NoSQL

**传统的 RDBMS(关系型数据库)**

- 结构化组织
- SQL
- 数据和关系都存在单独的表中 row col
- 操作，数据定义语言
- 严格的一致性
- 基础的事务
- ...

**NoSQL**

- 不仅仅是数据
- 没有固定的查询语言
- 键值对存储，列存储，文档存储，图形数据库（社交关系）
- 最终一致性
- CAP定理和BASE(异地多话)
- 高性能，高可用，高扩展
- ...

> 了解:3v+3高

大数据时代的3V ：主要是**描述问题**的

1. 海量Velume
2. 多样Variety
3. 实时Velocity

大数据时代的3高 ： 主要是**对程序的要求**

1. 高并发
2. 高可扩
3. 高性能

真正在公司中的实践：NoSQL + RDBMS 一起使用才是最强的。

---

## 1.4 NoSQL的四大分类

> **KV键值对**

- 新浪：**Redis**
- 美团：Redis + Tair
- 阿里、百度：Redis + Memcache

> **文档型数据库（bson数据格式）：**

- MongoDB(掌握)
    - 基于分布式文件存储的数据库。C++编写，用于处理大量文档。
    - MongoDB是RDBMS和NoSQL的中间产品。MongoDB是非关系型数据库中功能最丰富的，NoSQL中最像关系型数据库的数据库。
- ConthDB

> **列存储数据库**

- **HBase**(大数据必学)
- 分布式文件系统

> **图关系数据库**

存的不是图形,放的是关系.用于广告推荐，社交网络

- **Neo4j**、InfoGrid

**对比:**

![image-20211026171455333](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026171455333.png)

---

# 2. Redis入门

## 2.1 概述

> Redis是什么?

Redis（Remote Dictionary Server )，即远程字典服务。

是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。

与memcached一样，为了保证效率，数据都是缓存在内存中。区别的是redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了master-slave(主从)同步。


> Redis能该干什么？

1. 内存存储、持久化，内存是断电即失的，所以需要持久化（RDB、AOF）
2. 高效率、用于高速缓冲
3. 发布订阅系统
4. 地图信息分析
5. 计时器、计数器(eg：浏览量)
6. ...

> 特性

1. 多样的数据类型
2. 持久化
3. 集群
4. 事务
5. ....

---

## 2.2 安装

官网：https://redis.io/

推荐使用Linux服务器学习。

==注意:windows版本在GitHub下载(windows的Redis已经停更很久了…)==

### 2.2.1 Windows安装

https://github.com/dmajkic/redis

1. 下载安装包
2. 解压(只有5M)
3. 开启Redis,双击运行服务即可

![image-20211026172923132](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026172923132.png)

4. 使用redis客户端来连接redis

![image-20211026173039422](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026173039422.png)

记住一句话:windows下使用确实简单,但是redis推荐使用linux

---

### 2.2.2 Linux安装

1. 下载安装包
2. 解压,一般放/opt下
3. 基本环境安装

```shell
yum install gcc-c++
# 然后进入redis目录下执行
make
# 然后执行
make install
```

4. redis默认安装路径`/usr/local/bin`

5. 在redis安装同级目录下创建目录`/usr/local/bin/tgkRedisConfig`,将redis配置文件复制进去
6. redis默认不是后台启动,修改配置文件

![image-20211026174049969](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026174049969.png)

7. 通过定制的配置文件启动redis服务(tgkRedisConfig/redis.conf)

![image-20211026174136141](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026174136141.png)

8. 使用redis-cli连接指定的端口号测试，Redis的默认端口6379

![image-20211026174256669](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026174256669.png)

9. 查看redis进程是否开启

![image-20211026174345715](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026174345715.png)

10. 关闭redis服务`shutdown`

![image-20211026174413068](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026174413068.png)

---

## 2.3 测试性能

**redis-benchmark：**Redis官方提供的性能测试工具，参数选项如下：

![image-20211026174538269](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026174538269.png)

**简单测试**

```shell
# 测试：100个并发连接 100000请求
redis-benchmark -h localhost -p 6379 -c 100 -n 100000
12
```

![image-20211026174833284](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20211026174833284.png)

---

# 3. Redis基础知识

> redis默认有16个数据库

![image-20220312152622326](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220312152622326.png)

默认使用的是第0个,

**可以使用select进行切换数据库**

```basic
127.0.0.1:6379> select 3 // 切换数据库
OK
127.0.0.1:6379[3]> dbsize // 查看当前数据库大小
(integer) 0
```

**清空数据库**

```shell
127.0.0.1:6379[3]> flushall
OK
```

**情况全部数据库内容**

```shell
127.0.0.1:6379[3]> flushdb
OK
```

**redis是单线程的**

redis很快,基于内存,cpu不是redis的性能瓶颈,redis的瓶颈是内存和网络带宽

**redis是c语言写的**,官方提供的数据为100000+QPS,比同样是key-value的memecache差

**为什么单线程那么快**

==误区==:

1. 高性能的服务器不一定是多线程
2. 多线程(CPU上下文切换)不一定比单线程效率高

redis将所有数据放入内存,肯定是单线程最快



**查看所有key**

```bash
keys *
```



```shell
127.0.0.1:6379> keys *
 1) "sys_dict:sys_job_group"
 2) "sys_config:sys.index.skinName"
 3) "sys_dict:sys_common_status"
 4) "sys_dict:sys_normal_disable"
 5) "sys_config:sys.index.sideTheme"
 6) "sys_dict:sys_job_status"
 7) "sys_config:sys.user.initPassword"
 8) "mylist"
 9) "counter:__rand_int__"
10) "sys_config:sys.account.captchaOnOff"
11) "sys_config:sys.account.registerUser"
12) "sys_dict:sys_oper_type"
13) "myhash"
14) "sys_dict:sys_notice_status"
15) "name"
16) "sys_dict:sys_notice_type"
17) "sys_dict:sys_yes_no"
18) "key:__rand_int__"
19) "sys_dict:sys_show_hide"
20) "sys_dict:sys_user_sex"
```

# 4. redis五个数据类型

## 4.1 Redis-Key

```shell
127.0.0.1:6379> keys * # 查看所有的key
(empty list or set)
127.0.0.1:6379> set name kuangshen # set key
OK
127.0.0.1:6379> keys *
1) "name"
127.0.0.1:6379> set age 1
OK
127.0.0.1:6379> keys *
1) "age"
2) "name"
127.0.0.1:6379> EXISTS name # 判断当前的key是否存在
(integer) 1
127.0.0.1:6379> EXISTS name1
(integer) 0
127.0.0.1:6379> move name 1 # 移除当前数据库的key 1代表数据库
(integer) 1
127.0.0.1:6379> keys *
1) "age"
127.0.0.1:6379> set name qinjiang
OK
127.0.0.1:6379> keys *
1) "age"
2) "name"
127.0.0.1:6379> clear
127.0.0.1:6379> keys *
1) "age"
2) "name"
127.0.0.1:6379> get name
"qinjiang"
127.0.0.1:6379> EXPIRE name 10 # 设置key的过期时间，单位是秒
(integer) 1
127.0.0.1:6379> ttl name # 查看当前key的剩余时间
(integer) 4
127.0.0.1:6379> ttl name
(integer) 3
127.0.0.1:6379> ttl name
(integer) 2
127.0.0.1:6379> ttl name
(integer) 1
127.0.0.1:6379> ttl name
(integer) -2
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> type name # 查看当前key的一个类型！
string
127.0.0.1:6379> type age
string
```

## 4.2 String（字符串）

**90% 的 java程序员使用 redis 只会使用一个String类型！**

```shell
##########################################################################
127.0.0.1:6379> set key1 v1 # 设置值
OK
127.0.0.1:6379> get key1 # 获得值
"v1"
127.0.0.1:6379> keys * # 获得所有的key
1) "key1"
127.0.0.1:6379> EXISTS key1 # 判断某一个key是否存在
(integer) 1
127.0.0.1:6379> APPEND key1 "hello" # 追加字符串，如果当前key不存在，就相当于setkey
(integer) 7
127.0.0.1:6379> get key1
"v1hello"
127.0.0.1:6379> STRLEN key1 # 获取字符串的长度！
(integer) 7
127.0.0.1:6379> APPEND key1 ",kaungshen"
(integer) 17
127.0.0.1:6379> STRLEN key1
(integer) 17
127.0.0.1:6379> get key1
"v1hello,kaungshen"
##########################################################################
# i++
# 步长 i+=
127.0.0.1:6379> set views 0 # 初始浏览量为0
OK
127.0.0.1:6379> get views
"0"
127.0.0.1:6379> incr views # 自增1 浏览量变为1
(integer) 1
127.0.0.1:6379> incr views
(integer) 2
127.0.0.1:6379> get views
"2"
127.0.0.1:6379> decr views # 自减1 浏览量-1
(integer) 1
127.0.0.1:6379> decr views
(integer) 0
127.0.0.1:6379> decr views
(integer) -1
127.0.0.1:6379> get views
"-1"
127.0.0.1:6379> INCRBY views 10 # 可以设置步长，指定增量！
(integer) 9
127.0.0.1:6379> INCRBY views 10
(integer) 19
127.0.0.1:6379> DECRBY views 5
(integer) 14
##########################################################################
# 字符串范围 range
127.0.0.1:6379> set key1 "hello,kuangshen" # 设置 key1 的值
OK
127.0.0.1:6379> get key1
"hello,kuangshen"
127.0.0.1:6379> GETRANGE key1 0 3 # 截取字符串 [0,3]
"hell"
127.0.0.1:6379> GETRANGE key1 0 -1 # 获取全部的字符串 和 get key是一样的
"hello,kuangshen"
# 替换！
127.0.0.1:6379> set key2 abcdefg
OK
127.0.0.1:6379> get key2
"abcdefg"
127.0.0.1:6379> SETRANGE key2 1 xx # 替换指定位置开始的字符串！
(integer) 7
127.0.0.1:6379> get key2
"axxdefg"
##########################################################################
# setex (set with expire) # 设置过期时间
# setnx (set if not exist) # 不存在,再设置 （在分布式锁中会常常使用！）
127.0.0.1:6379> setex key3 30 "hello" # 设置key3 的值为 hello,30秒后过期
OK
127.0.0.1:6379> ttl key3
(integer) 26
127.0.0.1:6379> get key3
"hello"
127.0.0.1:6379> setnx mykey "redis" # 如果mykey 不存在，创建mykey
(integer) 1
127.0.0.1:6379> keys *
1) "key2"
2) "mykey"
3) "key1"
127.0.0.1:6379> ttl key3
(integer) -2
127.0.0.1:6379> setnx mykey "MongoDB" # 如果mykey存在，创建失败！
(integer) 0
127.0.0.1:6379> get mykey
"redis"
##########################################################################
mset
mget
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3 # 同时设置多个值
OK
127.0.0.1:6379> keys *
1) "k1"
2) "k2"
3) "k3"
127.0.0.1:6379> mget k1 k2 k3 # 同时获取多个值
1) "v1"
2) "v2"
3) "v3"
127.0.0.1:6379> msetnx k1 v1 k4 v4 # msetnx 是一个原子性的操作，要么一起成功，要么一起
失败！
(integer) 0
127.0.0.1:6379> get k4
(nil)
# 对象
set user:1 {name:zhangsan,age:3} # 设置一个user:1 对象 值为 json字符来保存一个对象！
# 这里的key是一个巧妙的设计： user:{id}:{filed} , 如此设计在Redis中是完全OK了！
# 但是完全可以用hash做,hash专门存键值对的
127.0.0.1:6379> mset user:1:name zhangsan user:1:age 2
OK
127.0.0.1:6379> mget user:1:name user:1:age
1) "zhangsan"
2) "2"
##########################################################################
getset # 先get然后在set
127.0.0.1:6379> getset db redis # 如果不存在值，则返回 nil
(nil)
127.0.0.1:6379> get db
"redis
127.0.0.1:6379> getset db mongodb # 如果存在值，获取原来的值，并设置新的值
"redis"
127.0.0.1:6379> get db
"mongodb"

```

数据结构是相同的！ String类似的使用场景：value除了是我们的字符串还可以是我们的数字！

- 计数器
- 统计多单位的数量
- 粉丝数
- 对象缓存存储！

## 4.3 list 列表

基本的数据类型,列表

在redis里面,可以把list完成栈,队列,阻塞队列

所有的list命令都死用l开头的

```shell
127.0.0.1:6379[2]> lpush list one  # 从列表头部插入
(integer) 1
127.0.0.1:6379[2]> lpush list two
(integer) 2
127.0.0.1:6379[2]> lpush list three
(integer) 3
127.0.0.1:6379[2]> lrange list 0 -1
1) "three"
2) "two"
3) "one"
127.0.0.1:6379[2]> rpush list four  # 从尾部插入
(integer) 4
127.0.0.1:6379[2]> lrange list 0 -1
1) "three"
2) "two"
3) "one"
##########################################################################
# 移除 lpop rpop
127.0.0.1:6379[2]> lpop list  # 移除头部第一个
"three"
127.0.0.1:6379[2]> rpop list # 移除尾部的第一个
"four"
127.0.0.1:6379[2]> lrange list 0 -1
1) "two"
2) "one"
##########################################################################
# 下表 lidenx
127.0.0.1:6379[2]> lindex list 0 # 通过下标获取
"two"
##########################################################################
127.0.0.1:6379[2]> llen list # 查看长度
(integer) 2
##########################################################################
# 移除指定的值 lrem
127.0.0.1:6379[2]> lrem list 1 one # 移除list值为one的值,只移除1个
(integer) 1
127.0.0.1:6379[2]> lrange list 0 -1
1) "two"

127.0.0.1:6379[2]> lpush list two
(integer) 2
127.0.0.1:6379[2]> lrange list 0 -1
1) "two"
2) "two"

127.0.0.1:6379[2]> lrem list 2 two  # 移除list值为two的值,只移除2个
(integer) 2
127.0.0.1:6379[2]> lrange list 0 -1
(empty array)
##########################################################################
# trim 通过下标截取指定的长度

127.0.0.1:6379[2]> lrange list 0 -1
1) "hello"
2) "hello2"
3) "hello3"
127.0.0.1:6379[2]> ltrim list 1 2 # 截取下标
OK
127.0.0.1:6379[2]> lrange list 0 -1
1) "hello2"
2) "hello3"
##########################################################################
rpoplpush 移除列表的最后一个元素,并添加到另一个列表中
##########################################################################
lset 通过下标修改值  # 如果下标不存在会报错
127.0.0.1:6379[2]> lrange list 0 -1
1) "hello2"
2) "hello3"
127.0.0.1:6379[2]> lset list 0 tgk # 修改下标为0的,改为tgk
OK
127.0.0.1:6379[2]> lrange list 0 -1
1) "tgk"
2) "hello3"
127.0.0.1:6379[2]>
##########################################################################
linsert 往某一个值前面或者后面添加值
127.0.0.1:6379[2]> lrange list 0 -1
1) "tgk"
2) "hello3"
127.0.0.1:6379[2]> linsert list before tgk zxy # 往list中 tgk的前面插入zxy
(integer) 3
127.0.0.1:6379[2]> lrange list 0 -1
1) "zxy"
2) "tgk"
3) "hello3"
127.0.0.1:6379[2]> linsert list after tgk zxy2 # 往list中 tgk的后面插入zxy
(integer) 4
127.0.0.1:6379[2]> lrange list 0 -1
1) "zxy"
2) "tgk"
3) "zxy2"
4) "hello3"
```

**总结:**

- list本质是个链表

## 4.4 set 集合

set中的值不可重复

- **添加** sadd

```shell
127.0.0.1:6379[2]> sadd myset tgk
(integer) 1
```

- **查看**指定set的所有值  smembers

```shell
127.0.0.1:6379[2]> smembers myset
1) "tgk"
```

- **判断一个值在不在set集合中 ** sismember

```shell
127.0.0.1:6379[2]> sismember myset tgk
(integer) 1
```

- **个数** 获取集合中元素个数  scard

```shell
127.0.0.1:6379[2]> scard myset
(integer) 2
```

- **移除**指定元素 srem

```shell
127.0.0.1:6379[2]> srem myset tgk
(integer) 1
```

**set是无序不重复集合**

- **随机抽选一个元素**  SRANDMEMBER

```shell
127.0.0.1:6379[2]> SRANDMEMBER myset
"zxy"
127.0.0.1:6379[2]> SRANDMEMBER myset
"tgk"
```

- **随机抽选出指定个数元素**

```shell
127.0.0.1:6379[2]> SRANDMEMBER myset 2
1) "tgk"
2) "zxy"
```

- **随机删除一个元素**   spop

```
127.0.0.1:6379[2]> spop myset
"tgk"
```

**将一个指定的值,移动到另外一个set中**   smove

```shell
127.0.0.1:6379[2]> sadd myset2 1
(integer) 1
127.0.0.1:6379[2]> sadd myset2 2
(integer) 1
127.0.0.1:6379[2]> sadd myset2 3
(integer) 1
127.0.0.1:6379[2]> smove myset myset2 zxy  #把myset的zxy移动到myset2
(integer) 1
127.0.0.1:6379[2]> SMEMBERS myset2
1) "3"
2) "zxy"   # 多了个zxy
3) "2"
4) "1"
127.0.0.1:6379[2]> SMEMBERS myset 
(empty array)  #移走了
```

- **差集**  sdiff

```shell
127.0.0.1:6379[2]> SMEMBERS myset
1) "1"
2) "2"
127.0.0.1:6379[2]> SMEMBERS myset2
1) "3"
2) "zxy"
3) "2"
4) "1"

127.0.0.1:6379[2]> sdiff myset2 myset # myset2-myset的元素
1) "3"
2) "zxy"
```

- **交集**   sinter    共同好友可以这么实现

```shell
127.0.0.1:6379[2]> sinter myset myset2
1) "1"
2) "2"
```

- **并集**  sunion

```shell
127.0.0.1:6379[2]> sunion myset myset2
1) "zxy"
2) "2"
3) "1"
4) "3"
```

## 4.5 hash 哈希

**就是key-value的string类型,string的方法都能用**

**hash更适合存对象,string更适合存字符串**

map集合,key-map,存的值是个map集合(存键值对,等于string套娃)

- **存值** hset
- **取值**  hget
- **设置多个值** hmset
- **取出多个值** hmget
- **取出所有key-value** hgetall
- **删除hash中指定的key** hdel
- **查看key的数量** hlen
- **判断某个key是否存在** hexists
- **获得所有的key** hkeys
- **获取所有的vlaue** hvals
- **自增** hincrby

## 4.6 zset 有序集合

**在set的基础上增加了一个排序**

- **增加 zadd**

```
127.0.0.1:6379> zadd myzset 1 one
(integer) 1
127.0.0.1:6379> zadd myzset 2 two 3 three
(integer) 2
```

- **查看所有值** zrange xxx 0 -1   和list很像

```shell
127.0.0.1:6379> zrange myzset 0 -1
1) "one"
2) "two"
3) "three"
```

- **正序筛选 ** ZRANGEBYSCORE

```shell
127.0.0.1:6379> zrange myzset 0 -1  #现在里面的值
1) "one"
2) "two"
3) "three"
4) "four"
5) "five"
127.0.0.1:6379> ZRANGEBYSCORE myzset -inf +inf   #筛选,从小到大,-inf是负无穷,+inf是正无穷,闭区间
1) "one"
2) "two"
3) "three"
4) "four"
5) "five"
127.0.0.1:6379> ZRANGEBYSCORE myzset 2 +inf  #筛选,从小到大,-inf是负无穷,+inf是正无穷
1) "two"
2) "three"
3) "four"
4) "five"
```

- **倒序筛选**   ZREVRANGEBYSCORE

```shell
127.0.0.1:6379> ZREVRANGEBYSCORE myzset +inf -inf
1) "five"
2) "four"
3) "three"
4) "two"
5) "one"
```

- **移除元素** zrem

```shell
127.0.0.1:6379> zrem myzset three
(integer) 1
127.0.0.1:6379> zrange myzset 0 -1
1) "one"
2) "two"
3) "four"
4) "five"
```

- **获取个数**   zcard

```shell
127.0.0.1:6379> zcard myzset
(integer) 4
```

- **获取指定区间的数量**   ZCOUNT

```shell
127.0.0.1:6379> ZCOUNT myzset 1 3
(integer) 2
```



# 5. 三种特殊类型

## 5.1 geospatial

可以用来距离计算

- **添加地理位置** geoadd

- **获取指定的城市的精度和维度**  geopos

- **获取两个位置之间的距离** geodist

- **以给定的经纬度为中心,找出某一半径内的元素**  deoradius

- **找元素半径xxx内的其他元素** georadiusbymember

---

ps: geo底层原理是zset 我们完全可以用zset操作geo

## 5.2 hyperloglog

后续更新

## 5.3 bitmap

后续更新

# 6. 事务

**redis的事务很像批处理**

redis单条命令是可以保证原子性的

但是redis的**事务不保证原子性,同时没有没有隔离级别概念**

事务的本质就是一组命令一块执行

**redis事务:**

- 开启事务 multi
- 命令入队  redis命令
- 执行事务  exec

```shell
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> set name tgk
QUEUED
127.0.0.1:6379(TX)> get name
QUEUED
127.0.0.1:6379(TX)> set key1 value1
QUEUED
127.0.0.1:6379(TX)> get key1
QUEUED
127.0.0.1:6379(TX)> exec
1) OK
2) "tgk"
3) OK
```

- 放弃事务 discard    事务中的命令全取消

redis可以实现乐观锁

## 6.1 事务异常情况

- 编译时异常

命令写错了,get写错git,事务全不能执行

- 运行时错误

比如让string类型的tgk加1,那只有错的命令不执行,其他的命令还是正常执行

---

# 7. 监控

- **悲观锁**

认为什么时候都会出问题,所有操作都加锁

- **乐观锁**

认为什么时候都不会出问题,所以不会上锁,更新数据的时候判断一下是否有人改动数据,version

获取version

更新的时候比较version是否变化

> 监测

watch 一个key

正常操作

```shell
127.0.0.1:6379> set money 100
OK
127.0.0.1:6379> set out 0
OK
127.0.0.1:6379> watch money
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> decrby money 20
QUEUED
127.0.0.1:6379(TX)> incrby out 20
QUEUED
127.0.0.1:6379(TX)> exec
1) (integer) 80
2) (integer) 20
```

异常操作,再开一个客户端同时修改这个值

```shell
# 事务
127.0.0.1:6379> watch money
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> incrby money 20
QUEUED
127.0.0.1:6379(TX)> exec #报错
(nil)
```

```shell
#在还没有exec的时候开另一个客户端修改
127.0.0.1:6379> decrby money 30
(integer) 320
```

**解锁 **unwatch  如果事务执行失败了就先解锁,然后再加锁执行事务 这个watch就是乐观锁的获取version

---

# 8. Jedis

使用java操作redis

Jedis是redis官方的java连接开发工具,等于数据库的jdbc

- 导依赖包

```xml
<dependency>
  <groupId>redis.clients</groupId>
  <artifactId>jedis</artifactId>
  <version>4.2.0-m1</version>
</dependency>
```

- 测试

```java
import redis.clients.jedis.Jedis;

/**
 * @author tengguokun
 * @date 2022/3/14 23:35
 */
public class JedisLearn {
    public static void main(String[] args) {
        // 获取连接
        Jedis jedis = new Jedis("110.110.110.128",6379);
        // 验证密码
        jedis.auth("tgk123");
        // ping一下
        String ping = jedis.ping();
        System.out.println(ping);
        jedis.close();
    }
}

// 返回
PONG

Process finished with exit code 0
```

可以看出,redis的命令在jedis就是方法,遵循小驼峰原则

## 8.1 jedis使用事务

最好加上try catch

```java
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Response;
import redis.clients.jedis.Transaction;

/**
 * @author tengguokun
 * @date 2022/3/14 23:35
 */
public class JedisLearn {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("110.110.110.128",6379);
        jedis.auth("tgk123");
        Transaction multi = jedis.multi();
        try{
            multi.set("name","tgk");
            Response<String> name = multi.get("name");
            System.out.println(multi.exec());
        }
        catch (Exception e){
            // 放弃事务
            multi.discard();
        }
        finally {
            jedis.close();
        }
    }
}

```

# 9. springboot整合

## 9.1 简单使用

在springboot 2.x后 jedis被替换成了lettuce

- jsdis:直连,多线程操作不安全,一般使用jedis连接池,但是问题很多,

- lettuce底层采用netty,实例可以在多个线程内共享,不存在线程不安全

**使用:**

- 导入依赖

```properties
    spring.redis.host
    spring.redis.port
```

- 测试

```java
@AutoWired
private RedisTemplate redisTemplate
```

## 9.2 存储对象

```java
package com.tgk.redis02springboot.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author tengguokun
 * @date 2022/3/19 17:52
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPojo {
    String name;
    Integer age;
}

```



```java
    @Autowired
    RedisTemplate redisTemplate;

    @Test
    void contextLoads() {
    }

    @Test
    void myTest(){
        UserPojo userPojo = new UserPojo("滕国坤",23);
        redisTemplate.opsForValue().set("user1",userPojo);
        System.out.println(redisTemplate.opsForValue().get("user1"));
    }
```

会报错

```
org.springframework.data.redis.serializer.SerializationException: Cannot serialize; nested exception is org.springframework.core.serializer.support.SerializationFailedException: Failed to serialize object using DefaultSerializer; nested exception is java.lang.IllegalArgumentException: DefaultSerializer requires a Serializable payload but received an object of type [com.tgk.redis02springboot.pojo.UserPojo]

	at org.springframework.data.redis.serializer.JdkSerializationRedisSerializer.serialize(JdkSerializationRedisSerializer.java:96)
	at org.springframework.data.redis.core.AbstractOperations.rawValue(AbstractOperations.java:128)
	at org.springframework.data.redis.core.DefaultValueOperations.set(DefaultValueOperations.java:304)
	at com.tgk.redis02springboot.Redis02SpringbootApplicationTests.myTest(Redis02SpringbootApplicationTests.java:21)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:497)
	at org.junit.platform.commons.util.ReflectionUtils.invokeMethod(ReflectionUtils.java:725)
	at org.junit.jupiter.engine.execution.MethodInvocation.proceed(MethodInvocation.java:60)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain$ValidatingInvocation.proceed(InvocationInterceptorChain.java:131)
	at org.junit.jupiter.engine.extension.TimeoutExtension.intercept(TimeoutExtension.java:149)
	at org.junit.jupiter.engine.extension.TimeoutExtension.interceptTestableMethod(TimeoutExtension.java:140)
	at org.junit.jupiter.engine.extension.TimeoutExtension.interceptTestMethod(TimeoutExtension.java:84)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor$$Lambda$122/1310540333.apply(Unknown Source)
	at org.junit.jupiter.engine.execution.ExecutableInvoker$ReflectiveInterceptorCall.lambda$ofVoidMethod$0(ExecutableInvoker.java:115)
	at org.junit.jupiter.engine.execution.ExecutableInvoker$ReflectiveInterceptorCall$$Lambda$123/1589683045.apply(Unknown Source)
	at org.junit.jupiter.engine.execution.ExecutableInvoker.lambda$invoke$0(ExecutableInvoker.java:105)
	at org.junit.jupiter.engine.execution.ExecutableInvoker$$Lambda$368/2077742806.apply(Unknown Source)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain$InterceptedInvocation.proceed(InvocationInterceptorChain.java:106)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain.proceed(InvocationInterceptorChain.java:64)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain.chainAndInvoke(InvocationInterceptorChain.java:45)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain.invoke(InvocationInterceptorChain.java:37)
	at org.junit.jupiter.engine.execution.ExecutableInvoker.invoke(ExecutableInvoker.java:104)
	at org.junit.jupiter.engine.execution.ExecutableInvoker.invoke(ExecutableInvoker.java:98)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.lambda$invokeTestMethod$7(TestMethodTestDescriptor.java:214)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor$$Lambda$1004/1613729684.execute(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.invokeTestMethod(TestMethodTestDescriptor.java:210)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.execute(TestMethodTestDescriptor.java:135)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.execute(TestMethodTestDescriptor.java:66)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$6(NodeTestTask.java:151)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask$$Lambda$224/1414147750.execute(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:141)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask$$Lambda$223/1920387277.invoke(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:137)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$9(NodeTestTask.java:139)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask$$Lambda$222/2015781843.execute(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:138)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:95)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService$$Lambda$228/1884122755.accept(Unknown Source)
	at java.util.ArrayList.forEach(ArrayList.java:1249)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService.invokeAll(SameThreadHierarchicalTestExecutorService.java:41)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$6(NodeTestTask.java:155)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask$$Lambda$224/1414147750.execute(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:141)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask$$Lambda$223/1920387277.invoke(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:137)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$9(NodeTestTask.java:139)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask$$Lambda$222/2015781843.execute(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:138)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:95)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService$$Lambda$228/1884122755.accept(Unknown Source)
	at java.util.ArrayList.forEach(ArrayList.java:1249)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService.invokeAll(SameThreadHierarchicalTestExecutorService.java:41)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$6(NodeTestTask.java:155)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask$$Lambda$224/1414147750.execute(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:141)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask$$Lambda$223/1920387277.invoke(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:137)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$9(NodeTestTask.java:139)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask$$Lambda$222/2015781843.execute(Unknown Source)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:138)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:95)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService.submit(SameThreadHierarchicalTestExecutorService.java:35)
	at org.junit.platform.engine.support.hierarchical.HierarchicalTestExecutor.execute(HierarchicalTestExecutor.java:57)
	at org.junit.platform.engine.support.hierarchical.HierarchicalTestEngine.execute(HierarchicalTestEngine.java:54)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.execute(EngineExecutionOrchestrator.java:107)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.execute(EngineExecutionOrchestrator.java:88)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.lambda$execute$0(EngineExecutionOrchestrator.java:54)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator$$Lambda$166/1568059495.accept(Unknown Source)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.withInterceptedStreams(EngineExecutionOrchestrator.java:67)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.execute(EngineExecutionOrchestrator.java:52)
	at org.junit.platform.launcher.core.DefaultLauncher.execute(DefaultLauncher.java:114)
	at org.junit.platform.launcher.core.DefaultLauncher.execute(DefaultLauncher.java:86)
	at org.junit.platform.launcher.core.DefaultLauncherSession$DelegatingLauncher.execute(DefaultLauncherSession.java:86)
	at org.junit.platform.launcher.core.SessionPerRequestLauncher.execute(SessionPerRequestLauncher.java:53)
	at com.intellij.junit5.JUnit5IdeaTestRunner.startRunnerWithArgs(JUnit5IdeaTestRunner.java:71)
	at com.intellij.rt.junit.IdeaTestRunner$Repeater$1.execute(IdeaTestRunner.java:38)
	at com.intellij.rt.execution.junit.TestsRepeater.repeat(TestsRepeater.java:11)
	at com.intellij.rt.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:35)
	at com.intellij.rt.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:235)
	at com.intellij.rt.junit.JUnitStarter.main(JUnitStarter.java:54)
Caused by: org.springframework.core.serializer.support.SerializationFailedException: Failed to serialize object using DefaultSerializer; nested exception is java.lang.IllegalArgumentException: DefaultSerializer requires a Serializable payload but received an object of type [com.tgk.redis02springboot.pojo.UserPojo]
	at org.springframework.core.serializer.support.SerializingConverter.convert(SerializingConverter.java:64)
	at org.springframework.core.serializer.support.SerializingConverter.convert(SerializingConverter.java:33)
	at org.springframework.data.redis.serializer.JdkSerializationRedisSerializer.serialize(JdkSerializationRedisSerializer.java:94)
	... 88 more
Caused by: java.lang.IllegalArgumentException: DefaultSerializer requires a Serializable payload but received an object of type [com.tgk.redis02springboot.pojo.UserPojo]
	at org.springframework.core.serializer.DefaultSerializer.serialize(DefaultSerializer.java:43)
	at org.springframework.core.serializer.Serializer.serializeToByteArray(Serializer.java:56)
	at org.springframework.core.serializer.support.SerializingConverter.convert(SerializingConverter.java:60)
	... 90 more
```

报错原因是不能==序列化==

**解决方法:存入的对象类实现序列化**

```java
public class UserPojo implements Serializable {
    String name;
    Integer age;
}

```

java读出来了

```java
2022-03-19 19:47:33.133  INFO 14404 --- [           main] c.t.r.Redis02SpringbootApplicationTests  : Starting Redis02SpringbootApplicationTests using Java 1.8.0_40 on Alan-laptop with PID 14404 (started by TGK in D:\IDEA_work\redis-lern\redis-02-springboot)
2022-03-19 19:47:33.135  INFO 14404 --- [           main] c.t.r.Redis02SpringbootApplicationTests  : No active profile set, falling back to 1 default profile: "default"
2022-03-19 19:47:34.084  INFO 14404 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Multiple Spring Data modules found, entering strict repository configuration mode!
2022-03-19 19:47:34.089  INFO 14404 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data Redis repositories in DEFAULT mode.
2022-03-19 19:47:34.120  INFO 14404 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 9 ms. Found 0 Redis repository interfaces.
2022-03-19 19:47:36.020  INFO 14404 --- [           main] c.t.r.Redis02SpringbootApplicationTests  : Started Redis02SpringbootApplicationTests in 3.383 seconds (JVM running for 5.508)
UserPojo(name=滕国坤, age=23) // 这里读出来了
```

但是我们发现,使用redis-cli访问,是乱码

```shell
127.0.0.1:6379[3]> keys *
1) "\xac\xed\x00\x05t\x00\x05user1"
127.0.0.1:6379[3]> get "\xac\xed\x00\x05t\x00\x05user1"
"\xac\xed\x00\x05sr\x00'com.tgk.redis02springboot.pojo.UserPojoqv+\xb07\x8c\xa4\xa4\x02\x00\x02L\x00\x03aget\x00\x13Ljava/lang/Integer;L\x00\x04namet\x00\x12Ljava/lang/String;xpsr\x00\x11java.lang.Integer\x12\xe2\xa0\xa4\xf7\x81\x878\x02\x00\x01I\x00\x05valuexr\x00\x10java.lang.Number\x86\xac\x95\x1d\x0b\x94\xe0\x8b\x02\x00\x00xp\x00\x00\x00\x17t\x00\t\xe6\xbb\x95\xe5\x9b\xbd\xe5\x9d\xa4"
```



## 9.3 实用的RedisUtil工具类

```java
package com.kuang.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

// 在我们真实的分发中，或者你们在公司，一般都可以看到一个公司自己封装RedisUtil
@Component
public final class RedisUtil {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    // =============================common============================
    /**
     * 指定缓存失效时间
     * @param key  键
     * @param time 时间(秒)
     */
    public boolean expire(String key, long time) {
        try {
            if (time > 0) {
                redisTemplate.expire(key, time, TimeUnit.SECONDS);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 根据key 获取过期时间
     * @param key 键 不能为null
     * @return 时间(秒) 返回0代表为永久有效
     */
    public long getExpire(String key) {
        return redisTemplate.getExpire(key, TimeUnit.SECONDS);
    }


    /**
     * 判断key是否存在
     * @param key 键
     * @return true 存在 false不存在
     */
    public boolean hasKey(String key) {
        try {
            return redisTemplate.hasKey(key);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 删除缓存
     * @param key 可以传一个值 或多个
     */
    @SuppressWarnings("unchecked")
    public void del(String... key) {
        if (key != null && key.length > 0) {
            if (key.length == 1) {
                redisTemplate.delete(key[0]);
            } else {
                redisTemplate.delete(CollectionUtils.arrayToList(key));
            }
        }
    }


    // ============================String=============================

    /**
     * 普通缓存获取
     * @param key 键
     * @return 值
     */
    public Object get(String key) {
        return key == null ? null : redisTemplate.opsForValue().get(key);
    }
    
    /**
     * 普通缓存放入
     * @param key   键
     * @param value 值
     * @return true成功 false失败
     */

    public boolean set(String key, Object value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 普通缓存放入并设置时间
     * @param key   键
     * @param value 值
     * @param time  时间(秒) time要大于0 如果time小于等于0 将设置无限期
     * @return true成功 false 失败
     */

    public boolean set(String key, Object value, long time) {
        try {
            if (time > 0) {
                redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
            } else {
                set(key, value);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 递增
     * @param key   键
     * @param delta 要增加几(大于0)
     */
    public long incr(String key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("递增因子必须大于0");
        }
        return redisTemplate.opsForValue().increment(key, delta);
    }


    /**
     * 递减
     * @param key   键
     * @param delta 要减少几(小于0)
     */
    public long decr(String key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("递减因子必须大于0");
        }
        return redisTemplate.opsForValue().increment(key, -delta);
    }


    // ================================Map=================================

    /**
     * HashGet
     * @param key  键 不能为null
     * @param item 项 不能为null
     */
    public Object hget(String key, String item) {
        return redisTemplate.opsForHash().get(key, item);
    }
    
    /**
     * 获取hashKey对应的所有键值
     * @param key 键
     * @return 对应的多个键值
     */
    public Map<Object, Object> hmget(String key) {
        return redisTemplate.opsForHash().entries(key);
    }
    
    /**
     * HashSet
     * @param key 键
     * @param map 对应多个键值
     */
    public boolean hmset(String key, Map<String, Object> map) {
        try {
            redisTemplate.opsForHash().putAll(key, map);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * HashSet 并设置时间
     * @param key  键
     * @param map  对应多个键值
     * @param time 时间(秒)
     * @return true成功 false失败
     */
    public boolean hmset(String key, Map<String, Object> map, long time) {
        try {
            redisTemplate.opsForHash().putAll(key, map);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 向一张hash表中放入数据,如果不存在将创建
     *
     * @param key   键
     * @param item  项
     * @param value 值
     * @return true 成功 false失败
     */
    public boolean hset(String key, String item, Object value) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 向一张hash表中放入数据,如果不存在将创建
     *
     * @param key   键
     * @param item  项
     * @param value 值
     * @param time  时间(秒) 注意:如果已存在的hash表有时间,这里将会替换原有的时间
     * @return true 成功 false失败
     */
    public boolean hset(String key, String item, Object value, long time) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 删除hash表中的值
     *
     * @param key  键 不能为null
     * @param item 项 可以使多个 不能为null
     */
    public void hdel(String key, Object... item) {
        redisTemplate.opsForHash().delete(key, item);
    }


    /**
     * 判断hash表中是否有该项的值
     *
     * @param key  键 不能为null
     * @param item 项 不能为null
     * @return true 存在 false不存在
     */
    public boolean hHasKey(String key, String item) {
        return redisTemplate.opsForHash().hasKey(key, item);
    }


    /**
     * hash递增 如果不存在,就会创建一个 并把新增后的值返回
     *
     * @param key  键
     * @param item 项
     * @param by   要增加几(大于0)
     */
    public double hincr(String key, String item, double by) {
        return redisTemplate.opsForHash().increment(key, item, by);
    }


    /**
     * hash递减
     *
     * @param key  键
     * @param item 项
     * @param by   要减少记(小于0)
     */
    public double hdecr(String key, String item, double by) {
        return redisTemplate.opsForHash().increment(key, item, -by);
    }


    // ============================set=============================

    /**
     * 根据key获取Set中的所有值
     * @param key 键
     */
    public Set<Object> sGet(String key) {
        try {
            return redisTemplate.opsForSet().members(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 根据value从一个set中查询,是否存在
     *
     * @param key   键
     * @param value 值
     * @return true 存在 false不存在
     */
    public boolean sHasKey(String key, Object value) {
        try {
            return redisTemplate.opsForSet().isMember(key, value);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 将数据放入set缓存
     *
     * @param key    键
     * @param values 值 可以是多个
     * @return 成功个数
     */
    public long sSet(String key, Object... values) {
        try {
            return redisTemplate.opsForSet().add(key, values);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


    /**
     * 将set数据放入缓存
     *
     * @param key    键
     * @param time   时间(秒)
     * @param values 值 可以是多个
     * @return 成功个数
     */
    public long sSetAndTime(String key, long time, Object... values) {
        try {
            Long count = redisTemplate.opsForSet().add(key, values);
            if (time > 0)
                expire(key, time);
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


    /**
     * 获取set缓存的长度
     *
     * @param key 键
     */
    public long sGetSetSize(String key) {
        try {
            return redisTemplate.opsForSet().size(key);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


    /**
     * 移除值为value的
     *
     * @param key    键
     * @param values 值 可以是多个
     * @return 移除的个数
     */

    public long setRemove(String key, Object... values) {
        try {
            Long count = redisTemplate.opsForSet().remove(key, values);
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    // ===============================list=================================
    
    /**
     * 获取list缓存的内容
     *
     * @param key   键
     * @param start 开始
     * @param end   结束 0 到 -1代表所有值
     */
    public List<Object> lGet(String key, long start, long end) {
        try {
            return redisTemplate.opsForList().range(key, start, end);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 获取list缓存的长度
     *
     * @param key 键
     */
    public long lGetListSize(String key) {
        try {
            return redisTemplate.opsForList().size(key);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


    /**
     * 通过索引 获取list中的值
     *
     * @param key   键
     * @param index 索引 index>=0时， 0 表头，1 第二个元素，依次类推；index<0时，-1，表尾，-2倒数第二个元素，依次类推
     */
    public Object lGetIndex(String key, long index) {
        try {
            return redisTemplate.opsForList().index(key, index);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 将list放入缓存
     *
     * @param key   键
     * @param value 值
     */
    public boolean lSet(String key, Object value) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 将list放入缓存
     * @param key   键
     * @param value 值
     * @param time  时间(秒)
     */
    public boolean lSet(String key, Object value, long time) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            if (time > 0)
                expire(key, time);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }


    /**
     * 将list放入缓存
     *
     * @param key   键
     * @param value 值
     * @return
     */
    public boolean lSet(String key, List<Object> value) {
        try {
            redisTemplate.opsForList().rightPushAll(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }


    /**
     * 将list放入缓存
     *
     * @param key   键
     * @param value 值
     * @param time  时间(秒)
     * @return
     */
    public boolean lSet(String key, List<Object> value, long time) {
        try {
            redisTemplate.opsForList().rightPushAll(key, value);
            if (time > 0)
                expire(key, time);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 根据索引修改list中的某条数据
     *
     * @param key   键
     * @param index 索引
     * @param value 值
     * @return
     */

    public boolean lUpdateIndex(String key, long index, Object value) {
        try {
            redisTemplate.opsForList().set(key, index, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 移除N个值为value
     *
     * @param key   键
     * @param count 移除多少个
     * @param value 值
     * @return 移除的个数
     */

    public long lRemove(String key, long count, Object value) {
        try {
            Long remove = redisTemplate.opsForList().remove(key, count, value);
            return remove;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

    }

}

```



# 10. redis.conf配置

- 单位

![image-20220315222745781](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220315222745781.png)

- 包含

![image-20220315222800612](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220315222800612.png)

- 网络

![image-20220315222829767](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220315222829767.png)

![image-20220315222901088](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220315222901088.png)

```
bind ip
protected-mode yes/no
port 
```

- 通用

![image-20220315222934380](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220315222934380.png)

```shell
daemonize        #默认守护进程,后台运行
pidfile /var/run/redis_6379.pid  # 如果以后台方式运行,需要制定一个pid文件

# 日志级别
# Specify the server verbosity level.
# This can be one of:
# debug (a lot of information, useful for development/testing)
# verbose (many rarely useful info, but not a mess like the debug level)
# notice (moderately verbose, what you want in production probably)
# warning (only very important / critical messages are logged)
loglevel notice

logfile ""   # 日志文件名, ""的时候就是标准化输出

databases 16  # 数据库数量
```

- 持久化

```shell
#
# save 3600 1   6000s内,有一个key修改了,就持久化
# save 300 100  300s内,有100个key修改,就持久化
# save 60 10000

stop-writes-on-bgsave-error yes  #  持久化出错,是否继续工作
rdbcompression yes  # 是否压缩rdb文件,需要消耗cpu资源
rdbchecksum yes #保存rdb文件时候,进行错误校验
dir ./   #rdb文件保存目录
```

- 安全

```shell
 requirepass tgk123 # 设置密码
```

- 客户端

```shell
maxclients 10000   #最多10000个客户端
maxmemory <bytes>  # 使用最大内存
maxmemory-policy noeviction  # 内存达到上限后的处理策略,网上有
```

- APPEND ONLY模式   aof模式

```SHELL
appendonly no #  默认不开启aof模式,因为默认rbd模式
appendfilename "appendonly.aof"  # 持久化文件名
appendfsync everysec   # 每秒执行一次
appendfsync always  #每次修改同步
appendfsync no  # 不同步,操作系统自己同步,速度最快
```

# 11. 持久化

## 11.1 RDB  redis database

![image-20220315225729241](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220315225729241.png)



---

![image-20220315225745985](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220315225745985.png)

![image-20220315225845478](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220315225845478.png)

> 触发机制

- 满足save规则
- 执行flushall
- shutdown

**如何恢复rbd?**

- rdb放到redis启动目录下就行,redis启动会自己执行

- 查看redis启动目录

```shell
127.0.0.1:6379> config get dir
1) "dir"
2) "/opt/redis-6.2.6"  # 如果目录下有.rdb文件,就自动恢复
```

## 11.2 AOF  append only file

将所有的命令记录下来,恢复的时候再把文件执行一遍

