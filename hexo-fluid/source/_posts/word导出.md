---
title: word导出
date: 2022-09-14 09:23:54
tags: [导出,word]
categories: java导出
---

利用java动态导出word,根据数据行数在word中动态生成表格,并在表格中显示图片
<!--more-->


# 1.前言

作为CRUD的后端程序员,业务中难免会遇到有报表,报告等需求,导出格式多为Excel和Word.

导出Excel有EasyPoi,EasyExcel等优秀的开源工具,使用方式简单.

但是在遇上word导出的需求时,常见的方式有

- 将word转存为xml,利用freemarker模板引擎写入数据(繁琐复杂,需求更改后几乎要重写所有)
- 使用hutool等开源工具,生成简单的word(几乎没啥用)
- 帆软等第三方报表工具(需要单独部署帆软服务,操作类似低代码)

以上方式均有各自的缺点,我们可以利用`XDocReport`、`POI`、`Freemarker`实现我们的需求(自定义word模板,根据数据动态生成表格,表格中可插入图片)

**导出效果如下所示:**

![image-20220913160837573](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220913160837573.png)

# 2. 快速开始

## 2.1 maven依赖

```xml
<dependencys>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
        <version>4.1.1</version>
    </dependency>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>4.1.1</version>
    </dependency>
    <dependency>
        <groupId>org.jxls</groupId>
        <artifactId>jxls</artifactId>
        <version>2.6.0</version>
        <exclusions>
            <exclusion>
                <groupId>ch.qos.logback</groupId>
                <artifactId>logback-core</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.jxls</groupId>
        <artifactId>jxls-poi</artifactId>
        <version>1.2.0</version>
    </dependency>
    <dependency>
        <groupId>fr.opensagres.xdocreport</groupId>
        <artifactId>fr.opensagres.xdocreport.core</artifactId>
        <version>2.0.2</version>
    </dependency>
    <dependency>
        <groupId>fr.opensagres.xdocreport</groupId>
        <artifactId>fr.opensagres.xdocreport.document</artifactId>
        <version>2.0.2</version>
    </dependency>
    <dependency>
        <groupId>fr.opensagres.xdocreport</groupId>
        <artifactId>fr.opensagres.xdocreport.template</artifactId>
        <version>2.0.2</version>
    </dependency>
    <dependency>
        <groupId>fr.opensagres.xdocreport</groupId>
        <artifactId>fr.opensagres.xdocreport.document.docx</artifactId>
        <version>2.0.2</version>
    </dependency>
    <dependency>
        <groupId>fr.opensagres.xdocreport</groupId>
        <artifactId>fr.opensagres.xdocreport.template.freemarker</artifactId>
        <version>2.0.2</version>
    </dependency>
    <dependency>
        <groupId>org.freemarker</groupId>
        <artifactId>freemarker</artifactId>
        <version>2.3.23</version>
    </dependency>
    <dependency>
        <groupId>commons-io</groupId>
        <artifactId>commons-io</artifactId>
        <version>2.5</version>
    </dependency>
</dependencys>
```

## 2.2 制作word模板

**我们需要的样式如下,上面可自定义替换的字段,下面的表格根据数据动态生成对应的行数**

![image-20220913160647575](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220913160647575.png)

如上图所示,我们所要填充的字段都用对应的占位符所表示,导出的时候根据对应的model替换占位符就行了(有点像JSP).模板的具体制作方式如下:

1. 根据自身需要制作好word样式
2. 将需要替换的字段选中,按下ctrl+F9将其设置为"域",可以看见字段被大括号所包裹

![image-20220913161303725](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220913161303725.png)

3. 右键"域",选则编辑域

![image-20220913161346336](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220913161346336.png)

4. 选择邮件合并,MergeField,域名设置${xxx}   (xxx为自定义的名字)

![](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/image-20220913161614714.png)

这样一个简单的模板就好了,但是如果想要动态生成表格,域的名字就需要改一下了,改为${xxx.yy}这种形式.可以理解为,表格的每一行对应Java List数组中的每一个下标对应的对象,一行中的每一列为该对象的各种属性.

## 2.3 导出代码

```java
// word报告数据,从数据库读取,这部分自行定义
        InspectReportView inspectReport = this.getInspectReport(query);
        //获取Word模板，模板存放路径在项目的resources目录下的word文件夹下
        InputStream ins = this.getClass().getResourceAsStream("/word/巡视报告模板.docx");
        //注册xdocreport实例并加载FreeMarker模板引擎
        IXDocReport report = XDocReportRegistry.getRegistry().loadReport(ins,
                TemplateEngineKind.Freemarker);
        //创建xdocreport上下文对象
        IContext context = report.createContext();
        // 单个字段插值
        context.put("subName", inspectReport.getSubName());
        context.put("voltage", inspectReport.getVoltage());
        context.put("inspectDate", inspectReport.getInspectDate());
        context.put("subType", inspectReport.getSubType());
        context.put("taskName", inspectReport.getTaskName());
        context.put("envInfo", inspectReport.getEnvInfo());
        context.put("checkUser", inspectReport.getCheckUser());
        context.put("checkTime", inspectReport.getCheckTime());
        context.put("startTime", inspectReport.getStartTime());
        context.put("endTime", inspectReport.getEndTime());
        context.put("inspectStatistical", inspectReport.getInspectStatistical());
        context.put("inspectConclusion", inspectReport.getInspectConclusion());
        context.put("normalDataList", inspectReport.getNormalDataList());
        context.put("abNormalDataList", inspectReport.getAbnormalDataList());
        context.put("notConfirmDataList", inspectReport.getNotConfirmDataList());
        //创建字段元数据
        FieldsMetadata fm = report.createFieldsMetadata();
        //Word模板中的表格插值
        fm.load("normalDataList", InspectReportNormalDto.class, true);
        fm.load("abNormalDataList", InspectReportAbnormalDto.class, true);
        fm.load("notConfirmDataList", InspectReportNotConfirmDto.class, true);
        //输出到本地目录作为临时文件
        String fileName = "巡视报告-cache-"+IdUtil.fastSimpleUUID()+".docx";
        String path = System.getProperty("user.dir");
        String wordPath = path + "/word-cache/"+fileName;
        // 输出地址为项目工程目录下的cache文件夹下,这时候的表格中还没有存入图片
        FileOutputStream out = new FileOutputStream(wordPath);
		// 写入本地
        report.process(context, out);
        out.close();
        // 把图片插入word中的列表
        this.insertPictureIntoWord(wordPath,inspectReport,response);
```

插入图片

```java
/**
     * 将图片插入word
     * @param filePathName  文件路径
     * @param inspectReport 报告数据
     * @param response
     */
    private void insertPictureIntoWord(String filePathName,InspectReportView inspectReport,
                                       HttpServletResponse response){
        FileInputStream wordInputStream = null;
        XWPFDocument doc = null;
        try {
            // 读取word临时文件
            wordInputStream = new FileInputStream(filePathName);
            // 读取word封装的doc
            doc = new XWPFDocument(wordInputStream);
            // word中所有的表格
            List<XWPFTable> tables = doc.getTables();
            // 正常点位列表
            List<InspectReportNormalDto> normalDataList = inspectReport.getNormalDataList();
            if (normalDataList.size() != 0){
                // word中的第二个表格是正常点位表
                XWPFTable table = tables.get(1);
                for (int i = 0; i < normalDataList.size(); i++) {
                    InspectReportNormalDto normalData = normalDataList.get(i);
                    String imageUrl = normalData.getImageUrl();
                    // 该数据在表中的行数的index,+1是因为表头占了一行
                    int rowIndex = 1+i;
                    // 图片列在表格的第十列
                    int columnIndex = 9;
                    // 根据行列获取单元格
                    XWPFParagraph cell = table.getRow(rowIndex).getCell(columnIndex).addParagraph();
                    // 根据imageUrl获取图片
                    HttpURLConnection connection = (HttpURLConnection) new URL(imageUrl).openConnection();
                    connection.setReadTimeout(2000);
                    connection.setConnectTimeout(2000);
                    connection.setRequestMethod("GET");
                    InputStream imageInputStream;
                    // 请求成功
                    if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                        imageInputStream = connection.getInputStream();
                        // cell的执行对象
                        XWPFRun run = cell.createRun();
                        run.addPicture(imageInputStream, XWPFDocument.PICTURE_TYPE_JPEG,
                                "图片", Units.toEMU(128), Units.toEMU(72));
                    }
                }
            }
            // 异常点位列表
            List<InspectReportAbnormalDto> abnormalDataList = inspectReport.getAbnormalDataList();
            if (abnormalDataList.size() != 0){
                // word中的第三个表格是异常点位表
                XWPFTable table = tables.get(2);
                for (int i = 0; i < abnormalDataList.size(); i++) {
                    InspectReportAbnormalDto abNormalData = abnormalDataList.get(i);
                    String imageUrl = abNormalData.getImageUrl();
                    // 该数据在表中的行数的index,+1是因为表头占了一行
                    int rowIndex = 1+i;
                    // 图片列在表格的第十列
                    int columnIndex = 9;
                    // 根据行列获取单元格
                    XWPFParagraph cell = table.getRow(rowIndex).getCell(columnIndex).addParagraph();
                    // 根据imageUrl获取图片
                    HttpURLConnection connection = (HttpURLConnection) new URL(imageUrl).openConnection();
                    connection.setReadTimeout(2000);
                    connection.setConnectTimeout(2000);
                    connection.setRequestMethod("GET");
                    InputStream imageInputStream;
                    // 请求成功
                    if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                        imageInputStream = connection.getInputStream();
                        // cell的执行对象
                        XWPFRun run = cell.createRun();
                        run.addPicture(imageInputStream, XWPFDocument.PICTURE_TYPE_JPEG,
                                "图片", Units.toEMU(128), Units.toEMU(72));
                    }
                }
            }
            // 待人工确认列表
            List<InspectReportNotConfirmDto> notConfirmDataList = inspectReport.getNotConfirmDataList();
            if (abnormalDataList.size() != 0){
                // word中的第四个表格是带人工确认点位表
                XWPFTable table = tables.get(3);
                for (int i = 0; i < notConfirmDataList.size(); i++) {
                    InspectReportNotConfirmDto notConfirmData = notConfirmDataList.get(i);
                    String imageUrl = notConfirmData.getImageUrl();
                    // 该数据在表中的行数的index,+1是因为表头占了一行
                    int rowIndex = 1+i;
                    // 图片列在表格的第十列
                    int columnIndex = 9;
                    // 根据行列获取单元格
                    XWPFParagraph cell = table.getRow(rowIndex).getCell(columnIndex).addParagraph();
                    // 根据imageUrl获取图片
                    HttpURLConnection connection = (HttpURLConnection) new URL(imageUrl).openConnection();
                    connection.setReadTimeout(2000);
                    connection.setConnectTimeout(2000);
                    connection.setRequestMethod("GET");
                    InputStream imageInputStream;
                    // 请求成功
                    if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                        imageInputStream = connection.getInputStream();
                        // cell的执行对象
                        XWPFRun run = cell.createRun();
                        run.addPicture(imageInputStream, XWPFDocument.PICTURE_TYPE_JPEG,
                                "图片", Units.toEMU(128), Units.toEMU(72));
                    }
                }
            }
        }
        catch (Exception e){

        }
        finally {
            try{
                ServletOutputStream responseOutputStream = response.getOutputStream();
                response.setCharacterEncoding("utf-8");
                response.setContentType("application/msword");
                String fileName = "巡视报告.docx";
                response.setHeader("Content-Disposition", "attachment;filename="
                .concat(String.valueOf(URLEncoder.encode(fileName, "UTF-8"))));
                // word写入response
                doc.write(responseOutputStream);
                // 关闭流
                wordInputStream.close();
                doc.close();
                // 删除cache文件
                File file = new File(filePathName);
                file.delete();
            }
            catch (IOException e){

            }
        }
    }
```

# 3. 原理

先利用`IXDocReport`将动态数据写入word,作为中间结果,再利用`XWPFDocument`手动根据数据行数遍历word中的表格,将图片插入表格中的每一行中