---
title: Glens记录
subtitle: 代码记录
date: 2022-08-22 11:10:00
tags: 记录
categories: 测试
---
这是在glens中的记录文档
<!-- more -->
# 设备故障列表

原本sql

```sql
 select
            p.DEVICE_ID,f.FACTORY_NAME,R.VOlTAGE_NAME,d.LINE_NAME,d.TOWER_NAME,
            IF(STRCMP(p.SOURCE,'1'),'手动','自动') SOURCE,IF(STRCMP(p.TYPE,'1'),'非离线故障','离线故障') TYPE,
            p.NO_OFFLINE_REASON,DATE_FORMAT(p.FIND_DATE,'%Y-%m-%d %H:%i:%s') FIND_DATE,
            u.USER_NAME, p.IS_FIX,p.REMARK
        from device_problem p
        left join t_vision_device d on p.DEVICE_ID = d.DEVICE_ID
        left join t_vision_factory f on d.FACTORY_ID = f.FACTORY_ID
        left join t_sm_user u on p.FIND_USER = u.USER_CODE
        left join t_vision_dic c on d.MONITOR_MAIN_TYPE = c.`CODE`
        left join t_vision_device_line_rel r on d.DEVICE_ID = r.DEVICE_ID
        where d.ORGANIZATION_CODE = #{organizationCode}
        <if test="factory!=null and factory!=''">
            and d.FACTORY_ID = #{factory}
        </if>
        <if test="votage!=null and votage!=''">
            and r.VOLTAGE = #{votage}
        </if>
        <if test="monitorMainType!=null and monitorMainType!=''">
            and c.`CODE` = #{monitorMainType}
        </if>
        <if test="source!=null and source!=''">
            and p.SOURCE =#{source}
        </if>
        <if test="type!=null and type!=''">
            and p.TYPE = #{type}
        </if>
        <if test="noOfflineReason!=null and noOfflineReason!=''">
            and p.NO_OFFLINE_REASON = #{noOfflineReason}
        </if>
        <if test="deptCode!=null and deptCode!=''">
            and d.SD_TEAM = #{deptCode}
        </if>
        <choose>
            <when test="(startTime!=null and startTime!='') and (endTime!=null and endTime!='')">
                and p.FIND_DATE between #{startTime} and #{endTime}
            </when>
            <when test="(startTime=null or startTime='') and (endTime=null or endTime='')">

            </when>
            <when test="(startTime!=null and startTime!='') and (endTime=null or endTime='')">
                and p.FIND_DATE &gt;= #{startTime}
            </when>
            <when test="(startTime=null or startTime='') and (endTime=!null and endTime!='')">
                and p.FIND_DATE &lt;= #{endTime}
            </when>
        </choose>
        <if test="status!=null and status!=''">
            and p.IS_FIX = #{status}
        </if>
        <if test="keyWord!=null and keyWord!=''">
            and (d.LINE_NAME like concat('%',#{keyWord},'%') or d.DEVICE_ID like concat('%',#{keyWord},'%'))
        </if>
        order by p.FIND_DATE desc
```

新的sql

```
select 
						p.DEVICE_ID,f.FACTORY_NAME,R.VOlTAGE_NAME,d.LINE_NAME,d.TOWER_NAME,
            IF(STRCMP(p.SOURCE,'1'),'手动','自动') SOURCE,IF(STRCMP(p.TYPE,'1'),'非离线故障','离线故障') TYPE,
            p.NO_OFFLINE_REASON,DATE_FORMAT(p.FIND_DATE,'%Y-%m-%d %H:%i:%s') FIND_DATE,
            u.USER_NAME, p.IS_FIX,p.REMARK
        from device_problem p
        left join t_vision_device d on p.DEVICE_ID = d.DEVICE_ID
        left join t_vision_factory f on d.FACTORY_ID = f.FACTORY_ID
        left join t_sm_user u on p.FIND_USER = u.USER_CODE
        left join t_vision_dic c on d.MONITOR_MAIN_TYPE = c.`CODE`
        left join t_vision_device_line_rel r on d.DEVICE_ID = r.DEVICE_ID
inner join	
(SELECT max(FIND_DATE) FIND_DATE2 from device_problem GROUP BY DEVICE_ID )as b on p.FIND_DATE = b.FIND_DATE2
```



token

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcInowMDA1XCIiLCJleHAiOjE2NTg4MTY0NjV9.hr3PS6oYl6Hdf7p_fbNmxGRDPYhBw3YROs4Z7hWNZuo


eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcIlVTRVIwNDI0MjA1MDUwNDg5MDAxMVwiIiwiZXhwIjoxNjU5MDc2NTY3fQ.NJqAsBEz_4NlB1fONqxDO3C1NYO7EkTyuRbrkhEirrU

```

参数

```
{
  "page": {
    "pageNum": 1,
    "pageSize": 8
  },
  "params": {
    "deviceId": "",
    "findDate": "",
    "findUser": "",
    "fixDate": "",
    "isFix": "",
    "noOfflineReason": "",
    "problem": "",
    "remark": "",
    "rowId":"",
    "source": "",
    "type": ""
  }
}
```

要求

```
筛选：设备厂家、电压等级、通道类型、故障来源、故障类型、故障原因、故障时间段、状态、搜索框（线路、设备等）
列表：序号、设备厂家、电压等级、线路名称、杆号、故障来源、故障类型、故障原因、故障时间、发现人、状态、操作（查看、处理：根据状态判断处理按钮、删除）
```

我的识别码:198525036
使用向日葵即可对我发起远程协助
向日葵下载地址:http://url.oray.com/tGJdas/

ol6z5b





厂家code    ok

电压 数值    ok

通道类型 code

故障来源 code

状态 code ok

故障类型



```
if("非离线故障".equals(params.getNoOfflineReason())){
            params.setNoOfflineReason("2");
        }
        else if("离线故障".equals(params.getNoOfflineReason())){
            params.setNoOfflineReason("1");
        }
```





查询故障原因:

```
{ 
  "pcode":"FR_NO",
  "ptypeCode": "NO_OFFLINE_REASON"
}
```

# 大华

## 录像地址

```
rtsp://115.236.17.59:9038/dss/playback/param?cameraid=1003209%24=1003209$1$0$0&substream=1&type=3&recordType=1&begintime=1658888608&endtime=1659061408
```

```java
    private String spliceRecordUrl(PlayBackByTimeQuery query) throws ParseException {
        String spliceUrl = "rtsp://%s:9038/dss/playback/param?cameraid=%s$%s&substream=1&type=3&recordType=1" +
                "&begintime=%s&endtime=%s";
        DeviceChannelDto channel = deviceMapper.queryDeviceCodeByChannelCode(query.getChannelId());
        String formatUrl = String.format(spliceUrl, WisdomConstant.IP, channel.getDeviceCode(), channel.getChannelSeq(),
                query.getStartTime(), query.getEndTime());
        return formatUrl;
    }
```

```xml
    <select id="queryDeviceCodeByChannelCode" parameterType="string" resultType="com.glens.biz.device.dto.DeviceChannelDto">
        select deviceCode,
               channelSeq
        from t_wisdom_device_chanel
        where channelCode = #{channelCode}
    </select>
```



## 7.21任务

左边设备树接口

点击设备树的设备拉实时流

语音对讲

历史视频

```
-淮安公司
	--盱眙公司
		---设备列表
		---设备1
		---设备2
	--金湖公司
		---设备列表
		---设备1
		---设备2
	--洪泽公司
		---设备列表
		---设备1
		---设备2
```



## 账号密码地址

https://10.0.0.170/api/index.html

client_id：lws_wisdom_service
client_secret：2cd9bdd7-44bf-4493-b0de-9d00f6651242

## 自己写的工具类

```java
package com.glens.biz.common.utils;

import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSONObject;
import com.glens.biz.common.constans.WisdomConstant;
import com.glens.biz.common.vo.TokenVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 大华工具类
 * @author tengguokun
 * @date 2022-07-19 09:54:20
 * @description
 */
@Component
public class DaHuaUtils {
    @Autowired
    private RedisTemplate redisTemplate;
    private static final String CONFIG = "GLENS:DAHUATOKEN";

    /**
     * 获取token
     * @return
     */
    public TokenVo getToken(){
        // 先从redis获取
        Object token = redisTemplate.opsForValue().get(CONFIG);
        // redis中没有
        if(ObjectUtils.isEmpty(token)){
            Map<String, Object> form = new HashMap<>();
            form.put("grant_type", "client_credentials");
            form.put("client_id", WisdomConstant.CLIENT_ID);
            form.put("client_secret", WisdomConstant.CLIENT_SECRET);
            // 重新获取token信息
            token = HttpRequest.post(WisdomConstant.TOKEN_URL).form(form).timeout(10000).execute().body();
            // 存入redis
            redisTemplate.opsForValue().set(CONFIG,token,7200, TimeUnit.SECONDS);
        }
        TokenVo tokenVo = JSONObject.parseObject((String) token, TokenVo.class);
        return tokenVo;
    }
}

```

## 实体类转换map工具类

```java
package com.glens.biz.common.utils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
 * 实体类工具类
 * @author tengguokun
 * @date 2022-07-19 11:41:34
 * @description
 */
public class EntityUtils {

    /**
     * 实体类转map
     * @param object
     * @return
     */
    public static Map<String, Object> entityToMap(Object object) {
        Map<String, Object> map = new HashMap<>();
        for (Field field : object.getClass().getDeclaredFields()) {
            try {
                boolean flag = field.isAccessible();
                field.setAccessible(true);
                Object o = field.get(object);
                map.put(field.getName(), o);
                field.setAccessible(flag);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return map;
    }
}

```

## 设备树思路

token

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcInowMDI2XCIiLCJleHAiOjE2NTk2NzA3NjF9.rdBuYPUoEW4xP5CPoUE16IYTWlj2G5L8DHWcqvfkQaY


滕国坤
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcInQwMDAxXCIiLCJleHAiOjE2NTk2ODI0NDJ9.kfMNUBgMqn2YYvqTiQIpYZDndtDqLtRGyjv1_dgM4H4
```



# 实时流

```


    
##### 简要描述

- 大华设备拉实时流

##### 请求URL
- ` http://localhost:5000/device/getRealTime `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|channelId |是  |string |视频通道编码   |
|streamType |是  |string | 码流类型：1=主码流, 2=辅码流   |
|type     |是  |string | hls,flv,rtmp    |

##### 返回示例 

​``` 
{
  "channelId": "1003488$1$0$0",
  "streamType": "1",
  "type": "hls"
}
​```

##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|url |string   |流地址  |
​```
{
	"success": true,
	"code": 200,
	"message": "操作成功",
	"data": {
		"code": 2016,
		"desc": "The device does not exist.",
		"data": {
			"url": "http://172.7.2.110:7086/live/cameraid/1000000%240/substream/1.m3u8"
		}
	}
}
​```

##### 备注 

- 请求头携带token




```



# 淮安下面设备

```
 if(!ObjectUtils.isEmpty(dto.getChildren())){
                List<DeviceTreeInfo> children = dto.getChildren();
                JSONArray objects = JSONArray.parseArray(JSONObject.toJSONString(children));
                objects.add(organizationDtos);
                jsonObject.put("children",objects);
            }
            else{
                jsonObject.put("children",organizationDtos);
            }
            jsonList.add(jsonObject);
```







# 首页装置统计左侧

![image-20220715113534650](https://raw.githubusercontent.com/TGKXMS/image/main/imgimage-20220715113534650.png)

## 参数

电压等级

隐患类型

状态

组织编号(token获取)

班组

```java
 @ApiModelProperty("电压")
    private String voltage;
    @ApiModelProperty("线路名称")
    private String lineName;
    @ApiModelProperty("安装位置")
    private String towerDesc;
    @ApiModelProperty("设备厂家")
    private String factory;
    @ApiModelProperty("设备号")
    private String deviceId;
    @ApiModelProperty("监控大类")
    private String monitorMainType;
    @ApiModelProperty("监控小类")
    private String monitorType;
    @ApiModelProperty("安装时间")
    private String  installTime;
    @ApiModelProperty("班组")
    private String sdTeamName;
    @ApiModelProperty("设备主人")
    private String deviceMaster;
    @ApiModelProperty("班长")
    private String teamLeader;
    @ApiModelProperty("拆除状态")
    private String demolitionStatus;
    @ApiModelProperty("运行状态")
    private String runStatus;
    @ApiModelProperty("备注")
    private String remark;
```





陆子强是班组帐号，武永泉是工区，李非是地市帐号，武哲是省级帐号

```
省级 武哲 eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcIlUyMDIxMTEwMjA4OVwiIiwiZXhwIjoxNjU5MTYyMzY0fQ.kMGsymXy-rF1HgMaqPstGz6mSifOBqcFYppYhbx5e3M

地市 李非
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcIlUyMDIxMTEwMjA4OFwiIiwiZXhwIjoxNjU5MTYyMzg4fQ.c-ufkbZEQdaOpK7UUf-LRLj7Z79V_nialAH49S8nDkE
工区 武永泉
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcInowMDI2XCIiLCJleHAiOjE2NTkxNjI0MDV9.QGXFNR-65gA1xWOI06fuVP2tYPYkoVBPuguGYwuCf6Y

班组 陆子强
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcInowMDA1XCIiLCJleHAiOjE2NTkxNjI0MjJ9.nMVfODjyr6kjLaxkeZd9Td_k2IiZR_6Ck0WPzJ2v7uc
```

```yml
server:
  port: 8091
spring:

  servlet:
    multipart:
      max-file-size: 50MB # 限制文件上传的大小
      max-request-size: 100MB
  application:
    name: ksh4
  jackson:
    time-zone: GMT+8
    date-format: yyyy-MM-dd HH:mm:ss
  cache:
    type: redis
    redis:
      time-to-live: 20000 #缓存超时时间ms
      cache-null-values: false #是否缓存空值
  redis:
    host: 10.0.0.21
    port: 6379
    timeout: 6000
    database: 2
    jedis:
      pool:
        max-active: 200
        max-idle: 100
        max-wait: 1000
        min-idle: 50
    password: glens2022
  job:
    admin:
      addresses: http://10.0.0.143:19000/job-admin
    accessToken:
    executor:
      appname: ${spring.application.name}
      address:
      ip:
      port: 29001
      logpath: /data/applogs/jobs/jobhandler
      logretentiondays: 30
  rabbitmq:
    host: 10.0.0.92
    port: 5672
    username: glens
    password: 123456
    virtual-host: overview
    publisher-returns: true
    publisher-confirms: true
#  es:
#    host: 10.0.0.83
#    port: 9200
#    user:
#    password:
#      #日志配置
#    # serviceId: klg-test-dev
  datasource:
    url: jdbc:mysql://10.0.0.21:3308/ksh4.0?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8&useSSL=false
    username: root
    password: glensmysql_0117@2022
    driver-class-name: com.mysql.jdbc.Driver
    type: com.zaxxer.hikari.HikariDataSource
    hikari:
      # 是否自动提交
      auto-commit: true
      # 如果在没有连接可用的情况下超过此时间，则将抛出SQLException
      connection-timeout: 30000
      # 控制允许连接在池中空闲的最长时间
      idle-timeout: 600000
      # 控制池中连接的最长生命周期。使用中的连接永远不会退役，只有当它关闭时才会被删除
      max-lifetime: 1800000
      # 如果您的驱动程序支持JDBC4，强烈建议不要设置此属性
      # connection-test-query: SELECT 1
      # 控制HikariCP尝试在池中维护的最小空闲连接数。建议不要设置此值，而是允许HikariCP充当固定大小的连接池。 默认值：与maximumPoolSize相同
      minimum-idle: 5
      # 此属性控制允许池到达的最大大小，包括空闲和正在使用的连接。
      maximum-pool-size: 10
mybatis:
  config-location: classpath:mybatis/mybatis-config.xml    # mybatis配置文件所在路径
  mapper-locations: classpath*:com/glens/biz/**/mapper/sql/*.xml       # 所有的mapper映射文件

imageToVideo:
  url: http://10.0.0.110:18081/image-to-video

logging:
  config: classpath:logback-spring.xml

mock: true

fdfs:
  pool:
    max-total: 153 # 从池中借出的对象的最大数目
    max-wait-millis: 102 # 获取连接时的最大等待毫秒数100
  thumbImage: # 缩略图生成参数，可选
    width: 150
    height: 150
  #fastdfs服务器的ip地址，用来访问图片、文件等
  web-server-url: http://10.0.0.28
  #web-server-url: http://10.0.0.37:8888
  connect-timeout: 6000
  so-timeout: 5000
  tracker-list: # tracker地址
    - 10.0.0.28:22122

```

yyprod

```
server:
  port: 8089
spring:

  servlet:
    multipart:
      max-file-size: 50MB # 限制文件上传的大小
      max-request-size: 100MB
  application:
    name: ksh4
  jackson:
    time-zone: GMT+8
    date-format: yyyy-MM-dd HH:mm:ss
  cache:
    type: redis
    redis:
      time-to-live: 20000 #缓存超时时间ms
      cache-null-values: false #是否缓存空值
  redis:
    host: 10.0.0.21
    port: 6379
    timeout: 6000
    database: 2
    jedis:
      pool:
        max-active: 200
        max-idle: 100
        max-wait: 1000
        min-idle: 50
    password: glens2022
  job:
    admin:
      addresses: http://10.0.0.143:19000/job-admin
    accessToken:
    executor:
      appname: ${spring.application.name}
      address:
      ip:
      port: 29001
      logpath: /data/applogs/jobs/jobhandler
      logretentiondays: 30
  rabbitmq:
    host: 10.0.0.92
    port: 5672
    username: glens
    password: 123456
    virtual-host: overview
    publisher-returns: true
    publisher-confirms: true
  #  es:
  #    host: 10.0.0.83
  #    port: 9200
  #    user:
  #    password:
  #      #日志配置
  #    # serviceId: klg-test-dev
  datasource:
    url: jdbc:mysql://10.0.0.21:3308/ksh4.0?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8&useSSL=false
    username: root
    password: glensmysql_0117@2022
    driver-class-name: com.mysql.jdbc.Driver
    type: com.zaxxer.hikari.HikariDataSource
    hikari:
      # 是否自动提交
      auto-commit: true
      # 如果在没有连接可用的情况下超过此时间，则将抛出SQLException
      connection-timeout: 30000
      # 控制允许连接在池中空闲的最长时间
      idle-timeout: 600000
      # 控制池中连接的最长生命周期。使用中的连接永远不会退役，只有当它关闭时才会被删除
      max-lifetime: 1800000
      # 如果您的驱动程序支持JDBC4，强烈建议不要设置此属性
      # connection-test-query: SELECT 1
      # 控制HikariCP尝试在池中维护的最小空闲连接数。建议不要设置此值，而是允许HikariCP充当固定大小的连接池。 默认值：与maximumPoolSize相同
      minimum-idle: 5
      # 此属性控制允许池到达的最大大小，包括空闲和正在使用的连接。
      maximum-pool-size: 10
mybatis:
  config-location: classpath:mybatis/mybatis-config.xml    # mybatis配置文件所在路径
  mapper-locations: classpath*:com/glens/biz/**/mapper/sql/*.xml       # 所有的mapper映射文件

imageToVideo:
  url: http://10.0.0.110:18081/image-to-video

logging:
  config: classpath:logback-spring.xml

mock: true

fdfs:
  pool:
    max-total: 153 # 从池中借出的对象的最大数目
    max-wait-millis: 102 # 获取连接时的最大等待毫秒数100
  thumbImage: # 缩略图生成参数，可选
    width: 150
    height: 150
  #fastdfs服务器的ip地址，用来访问图片、文件等
  web-server-url: http://10.0.0.28
  #web-server-url: http://10.0.0.37:8888
  connect-timeout: 6000
  so-timeout: 5000
  tracker-list: # tracker地址
    - 10.0.0.28:22122

```

# 淮安

## token

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcInowMDI2XCIiLCJleHAiOjE2NjAyNjYzOTd9.4AlqJhvXGEcp18XaXkQ8BANjRwEK6OWilUJgqeH1giQ
```



## 设备

# 盐

```
47ced36e42924d6c98d7c342ce38134d
```

```
web {"method":"video.playback","info":{"hwnd":1,"snum":0,"path":"rtsp://115.236.17.59:9320/playback/pu/101?token=101&trackID=701","records":[{"streamId":"90","recordType":"6","ssId":"1001","streamType":"1","recordName":"openicc_media_90/2022/07/28/220156_223156_6_0_1.dav","forgotten":"0","startTime":"1658989800","planId":"0","diskId":"1658989800-1658989916","endTime":"1658989916","channelId":"1001338$1$0$0","fileLength":"924651","recordSource":"3"},{"streamId":"90","recordType":"6","ssId":"1001","streamType":"1","recordName":"openicc_media_90/2022/07/28/223156_230156_6_0_1.dav","forgotten":"0","startTime":"1658989916","planId":"0","diskId":"1658989916-1658991600","endTime":"1658991600","channelId":"1001338$1$0$0","fileLength":"924489","recordSource":"3"}],"startTime":1658989800000,"endTime":1658991600000,"playStartTime":1658989800000,"playEndTime":1658991600000,"browserType":1,"redirect":false},"id":65,"session":0}
videoPlay
```

```
 <select id="queryChildDeptByorganizationCode" resultType="string" parameterType="string">
        select DEPT_CODE
            from t_sm_dept
        where ORGANIZATION_CODE = #{organizationCode}
    </select>
```

# 考勤同步-8月3版本,全人员同步

```java
package com.glens.biz.job;

import com.alibaba.fastjson.JSONObject;
import com.glens.biz.attendance.entity.AttendancePlan;
import com.glens.biz.attendance.entity.AttendanceRecord;
import com.glens.biz.attendance.mapper.AttendanceMapper;
import com.glens.biz.attendance.mapper.AttendancePlanMapper;
import com.glens.biz.common.utils.DaHuaUtil;
import com.glens.biz.common.vo.CardRecordVo;
import com.glens.biz.common.vo.data.CardRecordPageData;
import com.glens.biz.sm.entity.SmUser;
import com.glens.biz.sm.mapper.SmUserMapper;
import com.glens.biz.system.mapper.UserMapper;
import com.glens.job.core.biz.model.ReturnT;
import com.glens.job.core.handler.annotation.XxlJob;
import com.glens.job.core.log.XxlJobLogger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 考勤同步任务
 * @author tengguokun
 * @date 2022-07-26 17:22:02
 * @description
 */
@Component
@Slf4j
public class AttendanceJob {
    @Autowired
    AttendanceMapper attendanceMapper;
    @Autowired
    AttendancePlanMapper attendancePlanMapper;
    @Autowired
    SmUserMapper smUserMapper;
    @Autowired
    DaHuaUtil daHuaUtil;


    final SimpleDateFormat FORMAT  = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @XxlJob("syncAttendance")
    public ReturnT<String> syncAttendance(String param) throws Exception{
        XxlJobLogger.log("addAttendance, 开始同步考勤记录.");
        try {
            SimpleDateFormat formatDate  = new SimpleDateFormat("yyyy-MM-dd");
            String today = formatDate.format(new Date());
            String startTime = today + " 00:00:00";
            String endTime = today + " 23:59:59";
            this.startSync(startTime,endTime);
        } catch (Exception e) {
            XxlJobLogger.log(e);
            return ReturnT.FAIL;
        }
        XxlJobLogger.log("addAttendance, 考勤记录同步完毕.");
        return ReturnT.SUCCESS;
    }

    /**
     * 开始同步
     * @param startTime 
     * @param endTime 
     * @throws Exception
     */
    private void startSync(String startTime,String endTime) throws Exception{
        JSONObject queryParam = new JSONObject();
        queryParam.put("pageNum",1);
        queryParam.put("pageSize",100000);
        queryParam.put("startSwingTime",startTime);
        queryParam.put("endSwingTime",endTime);
        // 开门成功
        queryParam.put("openResult",1);
        CardRecordVo cardRecordVo = daHuaUtil.cardRecordPage(queryParam);
        List<CardRecordPageData> pageDataList = cardRecordVo.getData().getPageData();
        List<CardRecordPageData> dataWithOutNullPerson = new ArrayList<>(200);
        for (CardRecordPageData data: pageDataList) {
            // 只保留有人员的数据
            if (!ObjectUtils.isEmpty(data.getPersonCode())){
                dataWithOutNullPerson.add(data);
            }
        }
        if(dataWithOutNullPerson.size() > 0){
            // 将记录转换成可插入数据库的字段类型
            List<AttendanceRecord> attendanceRecordList = this.switchInsertParam(dataWithOutNullPerson);
            attendanceMapper.insertList(attendanceRecordList);
        }
    }

    /**
     * 将记录转换成要插入的list
     * @param PageDataList
     * @return
     */
    private List<AttendanceRecord> switchInsertParam(List<CardRecordPageData> PageDataList) throws Exception {
        List<AttendanceRecord> attendanceRecordList = new ArrayList<>();
        // 按照进门或者出门分类
        Map<String, List<CardRecordPageData>> dataGroupByOpenType =
                PageDataList.stream().collect(Collectors.groupingBy(cardRecordPageData -> cardRecordPageData.getEnterOrExit()));
        // 进门记录
        List<CardRecordPageData> inDataList = dataGroupByOpenType.get("1");
        // 出门记录
        List<CardRecordPageData> outDataList = dataGroupByOpenType.get("2");
        // 进门按照人员分类
        Map<String, List<CardRecordPageData>> inByPerson =
                inDataList.stream().collect(Collectors.groupingBy(data -> data.getPersonCode()));
        // 出门按照人员分类
        Map<String, List<CardRecordPageData>> outByPerson = null;
        if (!ObjectUtils.isEmpty(outDataList)){
            outByPerson = outDataList.stream().collect(Collectors.groupingBy(data -> data.getPersonCode()));
        }
        // 所有进门的personCode
        Set<String> personCodes = inByPerson.keySet();
        // 根据进门的人员key来遍历
        for (String personCode : personCodes) {
            AttendanceRecord attendanceRecord = new AttendanceRecord();
            // 该人员的进门数据
            List<CardRecordPageData> inData = inByPerson.get(personCode);
            // 取进门数据中时间最早的对象
            CardRecordPageData cardRecordPageDataIn =
                    inData.stream().min(Comparator.comparing(CardRecordPageData::getSwingTime)).get();
            // 签到时间
            attendanceRecord.setCheckInTime(cardRecordPageDataIn.getSwingTime());
            // 没有出门数据
            if (ObjectUtils.isEmpty(outDataList)){
                attendanceRecord.setCheckOutTime(null);
            }
            else{
                // 该人员的出门数据
                List<CardRecordPageData> outData = outByPerson.get(personCode);
                // 该人员有出门数据
                if (!ObjectUtils.isEmpty(outData)){
                    // 取出门数据中时间最晚的对象
                    CardRecordPageData cardRecordPageDataOut =
                            outData.stream().max(Comparator.comparing(CardRecordPageData::getSwingTime)).get();
                    // 签退时间
                    attendanceRecord.setCheckOutTime(cardRecordPageDataOut.getSwingTime());
                }
            }
            // 分割时间,取日期
            String split[]=cardRecordPageDataIn.getSwingTime().split(" {1,}");
            // 打卡日期
            attendanceRecord.setCheckDate(split[0]);
            // 默认迟到,早退,加班时间都是0
            attendanceRecord.setFlag("1");
            attendanceRecord.setIsLate("0");
            attendanceRecord.setIsLeaveEarly("0");
            attendanceRecord.setOvertimeHours(0d);
            // 用户编号
            String userCode = cardRecordPageDataIn.getPersonCode();
            attendanceRecord.setUserCode(userCode);
            // 根据用户编号查询deptCode和organizationCode
            Example example = new Example(SmUser.class);
            Criteria criteria = example.createCriteria();
            criteria.andEqualTo("userCode",userCode);
            SmUser smUser = smUserMapper.selectOneByExample(example);
            // 设置deptCode和organizationCode
            attendanceRecord.setDeptCode(smUser.getDeptCode());
            attendanceRecord.setOrganizationCode(smUser.getOrganizationCode());
            // 该人员有签退时间
            if(!ObjectUtils.isEmpty(attendanceRecord.getCheckOutTime())){
                // 计算计算是否早退,是否迟到,加班时长
                attendanceRecord = this.calculate(attendanceRecord);
            }
            // 加入列表
            attendanceRecordList.add(attendanceRecord);
        }
        return attendanceRecordList;
    }

    /**
     * 计算是否早退,是否迟到,加班时长
     * @param attendanceRecord
     * @return
     */
    private AttendanceRecord calculate(AttendanceRecord attendanceRecord) throws Exception{
        String isLate = "0";
        String isEarlyLeave = "0";
        Double overTimeHours = 0d;
        String checkInTime = attendanceRecord.getCheckInTime();
        String checkOutTime = attendanceRecord.getCheckOutTime();
        String deptCode = attendanceRecord.getDeptCode();
        Example example = new Example(AttendancePlan.class);
        Criteria criteria = example.createCriteria();
        criteria.andEqualTo("deptCode",deptCode);
        AttendancePlan attendancePlan = attendancePlanMapper.selectOneByExample(example);
        Long inTimeStamp = FORMAT.parse(checkInTime).getTime();
        Long outTimeStamp = FORMAT.parse(checkOutTime).getTime();
        // 分割时间,取日期
        String split[]=checkInTime.split(" {1,}");
        String today = split[0];
        Long onTimeStamp = FORMAT.parse(today+" "+attendancePlan.getOnTime()).getTime();
        Long offTimeStamp = FORMAT.parse(today+" "+attendancePlan.getOffTime()).getTime();
        // 签到时间晚于上班时间-迟到
        if (inTimeStamp > onTimeStamp){
            isLate = "1";
        }
        // 签退时间早于下班时间=早退
        if(outTimeStamp < offTimeStamp){
            isEarlyLeave = "1";
        }
        // 签退时间晚于下班时间=加班
        else if(outTimeStamp > offTimeStamp) {
            overTimeHours = (outTimeStamp-offTimeStamp)/1000/60/60d;
        }
        attendanceRecord.setIsLate(isLate);
        attendanceRecord.setIsLeaveEarly(isEarlyLeave);
        attendanceRecord.setOvertimeHours(overTimeHours);
        return attendanceRecord;
    }
}

```

# 经纬度

```
118.873105,32.090949
118.874839,32.088956
```

# 远程变电

## token

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcInowMDI2XCIiLCJleHAiOjE2NjIxOTIxOTN9.jUx2ZVev9--Xn5lzfgzoGk75ufiVhivfYTj07x28muE
```

        "channelNo": "string",
        "deviceId": "string",
        "keywords": "string",
        "presetCode": "ATEST01",
        "subCode": "string"

```
{
	"description": ",描述",
	"deviceId": "B0001",
	"deviceModel": "型号",
	"deviceName": "新增测试摄像头",
	"factory": "JSKS",
	"useType": "10",
	"videoType": "1",
	"workDate": "2022-08-16",
	"channelList": [
	  {
		"channelName": "新增通道",
		"channelNo": "1", 
		"presetList": [
		  {
				"presetName": "新增挂点",
				"presetCode": "xxx"
			},
			{
				"presetName": "新增挂点2",
				"presetCode": "yyy"
			}
		]
	}
	]
}
```

分页查询

```
[TOC]

    
##### 简要描述

- 分页查询

##### 请求URL
- ` 172.16.1.100:5010/remoteSubstation/device/pageQuery `
  
##### 请求方式
- POST 

##### body参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|pageNum |是  |int |当前页   |
|pageSize |是  |int | 每页行数    |
|keywords     |否  |string | 关键字(设备名)    |
|deviceId     |否  |string | 设备id    |
|channelNo     |否  |string | 通道编号   |
|presetNo     |否  |string | 装置编号    |
##### 参数示例
​```
{
	"page": {
		"pageNum": 1,
		"pageSize": 5
	},
	"params": {
		"keywords": "仁江",
		"deviceId": "10000",
		"channelNo": "1",
		"presetNo": "2"

	}
}
​```

##### 返回示例 

​``` 
{
	"success": true,
	"code": 200,
	"message": "操作成功",
	"data": {
		"total": 1,
		"totalPage": 1,
		"items": [{
			"deviceCode": "10M51111116530303",
			"substationName": "江岛变",
			"voltage": "交流110kV",
			"intervalCode": "",
			"intervalName": "仁江#2线134断路器",
			"deviceVoltage": "交流10kV",
			"deviceName": "仁江#2线134流变C相",
			"deviceType": "电流互感器",
			"deviceState": "在运",
			"deviceClass": "",
			"deptName": ""
		}]
	}
}
​```

##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|total |int   |总行数  |
|totalPage |int   |总页数  |
|deviceCode |string   | 设备编号 |
|substationName |string   | 变电站名 |
|voltage |string   | 变电站电压等级 |
|intervalCode |string   | 间隔编号 |
|intervalName |string   | 间隔名 |
|deviceVoltage |string   | 设备电压 |
|deviceName |string   | 设备名 |
|deviceType |string   | 设备类型 |
|deviceState |string   | 设备运行状态 |
|deviceClass |string   | 设备重要等级 |
|deptName |string   | 班组名 |

##### 备注 

- 请求头携带glens_token





```

## 重复的devicecode

```
select DISTINCT DEVICE_CODE from t_device where DEVICE_CODE in(select DEVICE_CODE from t_device group by DEVICE_CODE having count(DEVICE_CODE)>1) 
```

## 装置编辑

```java
    /**
     * 修改
     * @param entity
     * @return
     */
    @Transactional(rollbackFor = Exception.class)
    public ResultMessage update(DeviceInfoChannelPresetInsertForm entity) throws Exception{
        // 统一返回格式
        ResultMessage<Object> resultMessage;
        resultMessage = ResultMessage.ok();
        // 表中已存在的装置
        List<String> existPresetCodeList = deviceChannelPresetMapper.selectPresetCodeByDeviceId(entity.getDeviceId());
        // 传来的所有装置code
        List<String> formPresetCodeList = new ArrayList<>();
        try {
            List<ChannelForm> channelList = entity.getChannelList();
            if (ObjectUtils.isEmpty(channelList)){
                resultMessage = ResultMessage.fail("请添加通道");
                return resultMessage;
            }
            List<PresetForm> insertList = new ArrayList<>();
            for (ChannelForm channelForm : channelList) {
                List<PresetForm> presetList = channelForm.getPresetList();
                if (ObjectUtils.isEmpty(presetList)){
                    resultMessage = ResultMessage.fail("请添加挂点");
                    return resultMessage;
                }
                for (PresetForm presetForm : presetList) {
                    formPresetCodeList.add(presetForm.getPresetCode());
                    String presetCode = presetForm.getPresetCode();
                    presetForm.setChannelNo(channelForm.getChannelNo());
                    presetForm.setChannelName(channelForm.getChannelName());
                    presetForm.setDeviceId(entity.getDeviceId());
                    presetForm.setPresetCode(presetCode);
                    // 逐个更新
                    Integer rows = deviceChannelPresetMapper.update(presetForm);
                    // 如果没有更新,则新加这条数据
                    if (rows < 1){
                        insertList.add(presetForm);
                    }
                }
            }
            if(insertList.size() > 0){
                deviceChannelPresetMapper.addList(insertList);
            }
            List<String> deleteList = new ArrayList<>();
            for (String existPresetCode : existPresetCodeList) {
                // 数据库的装置不在表单传来的装置列表中
                if(!formPresetCodeList.contains(existPresetCode)){
                    deleteList.add(existPresetCode);
                }
            }
            // 删除不存在的装置
            if (deleteList.size() > 0){
                deviceChannelPresetMapper.deleteByPresetCodeList(deleteList);
            }
        }
        catch (DuplicateKeyException e){
            throw new RuntimeException("挂点编号重复");
        }
        try {
            deviceInfoMapper.updateDeviceInfo(entity);
            resultMessage.setMessage("修改成功");
            resultMessage.setSuccess(true);
        }
        catch (DuplicateKeyException e){
            throw new RuntimeException("视频设备编号重复");
        }

        return resultMessage;
    }
```

## 新增装置的参数

```json
{
	"description": ",描述",
	"deviceId": "B0001",
	"deviceModel": "型号",
	"deviceName": "新增测试摄像头",
	"factory": "JSKS",
	"useType": "10",
	"videoType": "1",
	"workDate": "2022-08-16",
	"channelList": [
	  {
		"channelName": "新增通道",
		"channelNo": "1", 
		"presetList": [
		  {
				"presetName": "新增挂点",
				"presetCode": "xxx"
			},
			{
				"presetName": "新增挂点2",
				"presetCode": "yyy"
			}
		]
	}
	]
}
```

## 缺陷分页

```json5
{
  "defectClass": "一般", //缺陷等级(一般,严重,危急)
  "deviceVoltage": "交流110kV", //电压等级-传文字
  "endDate": "2021-01-01", // 截止日期
  "keywords": "五桥", //关键字(设备名)
  "resource": "运行", //来源
  "startDate": "2018-04-02", //开始日期
  "state": 0 //状态(默认0)
}
```


```
  "page": {
    "pageNum": 1,
    "pageSize": 2
  },
  "params": {
"resource": "运行"
  }
}
```

## 临时

```sql
 alarm_type.`NAME` alarmType,
        alarm_reason.`NAME` alarmReason
        
        
left join (select `NAME`,`CODE` from t_p_dic where P_TYPE_CODE = 'ALARM_TYPE') alarm_type on alarm_type.`CODE` = dim.ALARM_TYPE
        left join (select `NAME`,`CODE` from t_p_dic where P_TYPE_CODE = 'ALARM_TYPE') alarm_reason on alarm_reason.`CODE` = dim.ALARM_REASON
```

## 装置新增参数

```json
{
	"description": ",描述",
	"deviceId": "B0001",
	"deviceModel": "型号",
	"deviceName": "新增测试摄像头",
	"factory": "JSKS",
	"useType": "10",
	"videoType": "1",
	"workDate": "2022-08-16",
	"channelList": [{
		"channelName": "新增通道",
		"channelNo": "1",
		"presetList": [{
				"presetName": "新增挂点",
				"presetNo": "xxx"
			},
			{
				"presetName": "新增挂点2",
				"presetNo": "xxx1"
			}
		]
	}]
}
```

