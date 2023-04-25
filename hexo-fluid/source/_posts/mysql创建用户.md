---
title: MySQL创建用户与授权
date: 2023-04-25 13:54:45
tags: [MySQL,授权,创建用户]
categories: MySQL
index_img: /img/MySQL.png
excerpt: MySQL如何创建新用户,如何对用户单独分配库和表的读写权限
---


# 创建新用户

```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```

- username：你将创建的用户名
- host：指定该用户在哪个主机上可以登陆，如果是本地用户可用localhost，如果想让该用户可以**从任意远程主机登陆**，可以使用通配符`%`
- password：该用户的登陆密码，密码可以为空，如果为空则该用户可以不需要密码登陆服务器

**例如**

```sql
CREATE USER 'root2'@'%' IDENTIFIED BY '123456';
```





# 授权

```sql
GRANT privileges ON databasename.tablename TO 'username'@'host'
```

- privileges：用户的操作权限，如`SELECT`，`INSERT`，`UPDATE`等，如果要授予所的权限则使用`ALL`

- databasename：数据库名,如果要授予该用户对所有数据库的相应操作权限则可用`*`表示，如`*.*`

- tablename：表名，如果要授予该用户对所有表的相应操作权限则可用`*`表示，如`*.*`

**例如**

```sql
GRANT SELECT, INSERT ON test.user TO 'root2'@'%';
GRANT ALL ON *.* TO 'root2'@'%';
```

