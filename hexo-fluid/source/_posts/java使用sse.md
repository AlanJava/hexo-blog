---
title: Java使用SSE
sticky: 1
date: 2022-11-08 17:20:29
tags: [java,SSE,异步,服务端推送,半双工]
categories: java
index_img: /img/Server-Send-Event.png
excerpt: SSE(Server-Sent-Events)比WebSocket更轻量化的服务器主动推送信息的方法
---
# 1. 简介

## 1.1 什么是SSE

SSE(`Server-Sent-Event`)，服务器发送事件，顾名思义，也就是客户端可以获取到服务器发送的事件.

HTTP 协议无法做到服务端主动推送信息给客户端。但是，有一种变通方法，就是服务器向客户端声明，接下来要发送的是流信息(类似于hls)。

也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。这时，客户端不会关闭连接(使用长连接)，会一直等着服务器发过来的新的数据流，视频播放(HLS)就是这样的例子。本质上，这种通信就是以流信息的方式，完成一次用时很长的下载。

SSE 就是利用这种机制，使用流信息向浏览器推送信息。它基于 HTTP 协议，目前除了 IE/Edge，其他浏览器都支持。

## 1.2 SSE与WebSocket

SSE 与 WebSocket 作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。

总体来说，WebSocket 更强大和灵活。因为它是全双工通道，可以双向通信；SSE 是单向通道，只能服务器向浏览器发送，因为流信息本质上就是下载。如果浏览器向服务器发送信息，就变成了另一次 HTTP 请求。

- SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
- SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
- SSE 默认支持断线重连，WebSocket 需要自己实现。
- SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
- SSE 支持自定义发送的消息类型。

- **sse 是单通道，只能服务端向客户端发消息；而 webscoket 是双通道**

## 1.3 应用场景

SSE常用于会实时刷新的数据的需求中,比如

- 实时显示网站在线人数
- 汇率实时显示
- 弹窗消息实时通知
- ......



# 2. 实战使用

**客户端代码:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <script>
    var source = new EventSource("http://127.0.0.1:9313/sse/subscribe?id=3");
    source.onopen = function (event) {
      console.log(event);
    };
    source.onmessage = function (event) {
      var data = event.data;
      var origin = event.origin;
      var lastEventId = event.lastEventId;
      // handle message
      console.log(data)
    };
  </script>
  <body>
    <h1>sse-test</h1>
  </body>
</html>

```



**服务端代码:**

```java
@Service
public class SseTestService {
    /**
     * SSE连接池,<br/>
     * SpringBean的作用域默认为单例模式,整个web容器中只会存在一个SseTestService的实例对象,
     * 所以可以用该实例对象的属性当做一个SSE连接池,存放不同的SSE连接
     */
    private static ConcurrentHashMap<String, SseEmitter> sseCache = new ConcurrentHashMap<>();

    /**
     * 建立长连接
     * @param id
     * @return
     */
    public SseEmitter subscribe(String id) {
        // 超时时间设置为10min(每过10min连接关闭)
        SseEmitter sseEmitter = new SseEmitter(1000L * 60 * 10);
        // 存入连接池
        sseCache.put(id, sseEmitter);
        sseEmitter.onTimeout(() -> sseCache.remove(id));
        // 异步请求因任何原因（包括超时和网络错误）完成时的回调
        sseEmitter.onCompletion(() -> sseCache.remove(id));
        return sseEmitter;
    }

    /**
     * 推送数据
     * @param id
     * @param content
     * @return
     * @throws IOException
     */
    public void push(String id, String content) throws IOException {
        SseEmitter sseEmitter = sseCache.get(id);
        if (sseEmitter != null) {
            sseEmitter.send(content);
        }
    }

    /**
     * 主动关闭连接
     * @param id
     * @return
     */
    public void over(String id) {
        SseEmitter sseEmitter = sseCache.get(id);
        if (sseEmitter != null) {
            sseEmitter.complete();
            sseCache.remove(id);
        }
    }
}
```

**参考资料:**

https://cloud.tencent.com/developer/article/1620176

https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html



