---
title: quartz
date: 2022-11-23 16:38:25
tags: [java,quartz,定时任务,动态定时任务]
categories: java
index_img: /img/quartz.png
excerpt: 在springboot中使用quartz实现定时任务的动态创建
hide: true
---

> 参考文章:[Introduction to Quartz](https://www.baeldung.com/quartz)

# 1. 简介

> Quartz 是一个开源的作业调度框架，完全用 Java 编写，设计用于 J2SE 和 J2EE 应用程序。它在不牺牲简单性的情况下提供了极大的灵活性.
>
> 您可以创建复杂的计划来执行任何作业。例子是例如每天运行的任务，每隔一个星期五晚上 7:30。或者仅在每个月的最后一天。

在springboot中,我们经常使用`@Scheduled`注解创建定时任务







```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-quartz</artifactId>
        </dependency>
```

