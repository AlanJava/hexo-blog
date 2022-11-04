---
title: Java使用opencv
date: 2022-11-04 16:01:05
tags:
categories:
---
在Java中使用opencv处理图像

<!-- more -->

# 1. 需求缘由

在写爬虫时,我们有时会使用Selenium自动输入用户名和密码获取登录权限

但是有的网站会有数字字母验证码,这些验证码十分碍事,只能人工操作手动输入,而且要手动操作的话就无法在无头模式下运行浏览器了.

![常见的数字验证码](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/img.png)

已知的解决方案是获取验证码图片,使用OCR文字识别获取验证码文字内容

可以使用的OCR有

- 百度的OCR接口,每日有使用次数
- Paddle-OCR开源库,搭建自己的OCR服务
- 惠普的tesseract-ocr工具
- .....

百度的免费接口有使用次数,且无法在内网环境中使用,所以并不适用

由于我们需要识别的内容的字母和数字,惠普的tesseract-ocr工具就很好用

当我们使用tesseract-ocr工具去识别验证码原图时,由于验证码有很多的干扰线,会导致识别结果有很多错误

所以我们需要对原始的验证码图片进行图像处理,这时候就需要用上opencv了

# 2. 在Java中使用opencv

## 2.1 下载opencv

[下载地址](https://opencv.org/releases/)

下载所需的版本

![版本选择](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221104154504385.png)

我电脑是windows,下载的是一个exe安装文件,运行安装后文件目录如下

![opencv目录](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20221104154753665.png)

build是已经打包好的文件

sources是opencv的源码

我们在build-java中可以看到自己需要的文件,主要是jar包和dll文件

## 2.2 引入jar包

把jar包引入我们的项目中,dll文件也复制到项目目录中

## 2.3 使用opencv处理图像

处理步骤:

1. 读取原图

![img原图](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/img-t.png)

2. 消除色彩,变为黑白图

![img黑白](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/img2.png)

3. 灰度二值化

![img灰度二值化](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/img3.png)

4. 线消噪

![img线消噪](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/img4.png)

5. 灰度反转

![img灰度反转](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/img5.png)

代码如下:

```java
    public static void main(String[] args) {
        String path = Test.class.getClassLoader().getResource("//").getPath();
        System.load(path+"opencv/opencv_java455.dll");
        // 原图
        Mat image = imread("E:\\pic\\img.png");
        System.out.println( "原图 = " + image.dump() );
        // 变黑白照片
        Imgproc.cvtColor(image, image,Imgproc.COLOR_BGR2GRAY);
        Imgcodecs.imwrite("E:\\pic\\img2-黑白.png", image);
        Mat target3 = new Mat();
        //灰度二值化,参数(原图,输出,处理灰度值大于200的,最大灰度,阈值类型)
        Imgproc.threshold(image, target3, 230, 255, Imgproc.THRESH_BINARY );
        System.out.println( "灰度图像二值化 = " + target3.dump() );
        //写入灰度图像
        Imgcodecs.imwrite("E:\\pic\\img3-灰度二值化.png", target3);
        int width = target3.width();
        int height = target3.height();
        // 消除噪点
        for (int i = 1; i < width-1; i++) {
            for (int j = 1; j < height-1; j++) {
                int count = 0;
                double[] doubles = target3.get(j, i);
                int num = (int)doubles[0];
                double[] doubles1 = target3.get(j-1, i);
                int up = (int)doubles1[0];
                double[] doubles2 = target3.get(j+1, i);
                int down = (int)doubles2[0];
                double[] doubles3 = target3.get(j, i-1);
                int left = (int)doubles3[0];
                double[] doubles4 = target3.get(j, i+1);
                int right = (int)doubles4[0];
                // 该像素点的上下左右是不是空白的
                if (up > 250){
                    count += 1;
                }if (down> 250){
                    count += 1;
                }if (left > 250){
                    count += 1;
                }if (right > 250){
                    count += 1;
                }
                if (count > 2){
                    double[] value = {255.0};
                    target3.put(j,i,value);
                }
            }
        }
        Imgcodecs.imwrite("E:\\pic\\img4-线消噪.png", target3);
        // 灰度反转
        for (int i = 1; i < width; i++) {
            for (int j = 1; j < height; j++) {
                double[] doubles = target3.get(j, i);
                int num = (int)doubles[0];
                if(num == 255){
                    double[] value = {0.0};
                    target3.put(j,i,value);
                } else if (num == 0) {
                    double[] value = {255.0};
                    target3.put(j,i,value);
                }
            }
        }
        Imgcodecs.imwrite("E:\\pic\\img5-灰度反转.png", target3);
    }
```



