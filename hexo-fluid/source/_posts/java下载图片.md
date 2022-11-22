---
title: java下载图片
date: 2022-11-22 13:39:08
tags: [java,下载,图片链接]
categories: java
index_img: /img/HttpURLConnection.png
---
在java中通过图片url下载图片至本地
<!-- more -->

# 1. 利用hutool下载

利用hutool工具包下的`HttpUtil.downloadFile()`可以简单下载图片

```java
@Test
public void downloadDa(){
	File imgFile = new File(IdUtil.fastSimpleUUID() + ".jpg");
    HttpUtil.downloadFile("https://www.xxxxxx.com",imgFile);
}
```

进入源码我们可以看出,这个实际是利用`HttpRequest.get()`方法访问url获取response实现图片下载的

```java
	public static long downloadFile(String url, File destFile, int timeout, StreamProgress streamProgress) {
		if (StrUtil.isBlank(url)) {
			throw new NullPointerException("[url] is null!");
		}
		if (null == destFile) {
			throw new NullPointerException("[destFile] is null!");
		}
		final HttpResponse response = HttpRequest.get(url).timeout(timeout).executeAsync();
		if (false == response.isOk()) {
			throw new HttpException("Server response error with status code: [{}]", response.getStatus());
		}
		return response.writeBody(destFile, streamProgress);
	}
```

但是这种方法会有问题,如果图片链接的访问需要进行验证,这种方法无法自定义http请求,会被远程服务器拦截返回响应码403,如果浏览器直接打开可以访问的话,一般是请求头缺少User-Agent,那么我们可以自定义Http请求,添加需要的请求头获取图片

# 2. 使用HttpURLConnection

```java
URL url = new URL("www.xxxx.com");
HttpURLConnection conn = (HttpURLConnection )url.openConnection();
conn.setRequestMethod("GET");
conn.setRequestProperty("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537" +
        ".36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36");
InputStream inputStream = conn.getInputStream();
ByteArrayOutputStream outStream = new ByteArrayOutputStream();
//创建一个Buffer字符串
byte[] buffer = new byte[1024];
//每次读取的字符串长度，如果为-1，代表全部读取完毕
int len = 0;
//使用一个输入流从buffer里把数据读取出来
while( (len=inputStream.read(buffer)) != -1 ) {
    //用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
    outStream.write(buffer, 0, len);
}
inputStream.close();
//得到图片的二进制数据，以二进制封装得到数据，具有通用性
byte[] data = outStream.toByteArray();
//创建输出流
FileOutputStream fileOutStream = new FileOutputStream(imgFile);
//写入数据
fileOutStream.write(data);
fileOutStream.close();
```