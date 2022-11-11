---
title: springboot异步
date: 2022-11-10 23:00:54
tags: [springboot,异步,]
categories: springboot
---
在springboot中使用异步方法调用
<!-- more -->
# 1. 什么是异步

要知道什么是异步,首先要知道什么是同步,其实,我们写的大部分的代码,都是同步的

例如下面这段代码:

```java
    public void syncCodeTest(){
        System.out.println("同步代码1");
        System.out.println("同步代码2");
        System.out.println("同步代码3");
    }
```

一共执行了3个语句,3个语句都是按照代码行数顺序执行的.这就是同步方法



而异步就是：不等任务执行完，直接执行下一个任务。

# 2. 异步的作用

那我们正常用同步方法去写代码也没遇到什么问题呀,为什么要使用异步呢?

我们想一下,如果有个功能十分耗时,可能需要10分钟才能执行完任务,然后接口再返回结果.如果用同步的写法话,难道要界面等待10分钟才能继续操作吗?

如果用异步的写法,用户下达任务后立即返回一个收到指令的结果,具体的任务放在异步代码里去慢慢执行.

# 3. 如何在Springboot中使用异步调用

## 3.1 开启异步注解

在启动类上加上注解`@EnableAsync`

## 3.2 在异步方法上加上@Async注解

```java
    @Async
    public void testAsync(){
        for (int i = 0; i < 10; i++) {
            System.out.println(i+":");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
```

然后再其他类的方法中调用次对象的异步方法就可以实现异步了

```java
    @GetMapping("/async")
    public String testAsync(){
        sseTestService.testAsync();
        return "好了";
    }
}
```

这里调用这个接口,并没有等 `sseTestService.testAsync()`方法执行完再返回值,而是开启一个线程异步执行此方法,让这个线程自己慢慢执行,同时返回"好了"

## 3.3 注意点

该异步实现的原理是基于动态代理实现的,实际调用的异步方法并不是真实的`sseTestService`对象,而是该对象的一个代理对象.

异步方法和调用异步方法的方法不能在同一个类中,比如只能A类的a方法调用B类的b方法,而不能A类的a方法调用A类的b方法.因为`@Async`注解是基于Spring AOP （面向切面编程）的，而AOP的实现是基于动态代理模式实现的,Spring容器在初始化的时候Spring容器会将含有AOP注解的类对象“替换”为代理对象.

