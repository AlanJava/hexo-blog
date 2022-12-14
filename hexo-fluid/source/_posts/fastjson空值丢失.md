---
title: fastjson空值丢失
date: 2022-12-14 11:43:27
tags: [fastjson,java]
categories: java
index_img: /img/fastjson.png
excerpt: fastjson使用JSONObject,toJSONString()序列化时值null的字段丢失
---
# 1. 问题复现

在使用fast-json包中`JSONObject,toJSONString()`方法进行对象序列化时,如果对象有的属性value是null,会导致这个属性在序列化的时候直接丢失

**测试代码:**

```java
@Test
public void testToJSONString(){
    HashMap<String,String> row = new HashMap<>(16);
    row.put("1",null);
    row.put("2",null);
    row.put("3","san");
    System.out.println(JSONObject.toJSONString(row));
}
```

**输出结果**

```json
{"3":"san"}
```

可以看出,值为null的字段全都丢失了

# 2. 解决方式

## 2.1 使用jackson进行序列化

springboot自带jackson,使用`ObjectMapper`实例化对象的`writeValueAsString()`方法即可

## 2.2 传递SerializerFeature... features参数

我们看fastjson的源码可以看出,JSONObject对象继承了JSON对象

```java
public class JSONObject extends JSON implements Map<String, Object>, Cloneable, Serializable, InvocationHandler {
}
```

而`toJSONString()`方法正是JSON类的方法,这个方法有多个重载方法

- 常用的`toJSONString()`

```java
public static String toJSONString(Object object) {
        return toJSONString(object, emptyFilters);
    }
```

- `toJSONString()`的重载方法

```java
    public static String toJSONString(Object object, SerializerFeature... features) {
        return toJSONString(object, DEFAULT_GENERATE_FEATURE, features);
    }
```

在第二个方法中,有一个`SerializerFeature... features`参数,点进源码可以看出这个参数类型是个枚举类

```java
public enum SerializerFeature {
    QuoteFieldNames,
    /**
     * 
     */
    UseSingleQuotes,
    /**
     * 
     */
    WriteMapNullValue,
    /**
     * 用枚举toString()值输出
     */
    WriteEnumUsingToString,
    /**
     * 用枚举name()输出
     */
    WriteEnumUsingName,
    /**
     * 
     */
    UseISO8601DateFormat,
    /**
     * @since 1.1
     */
    WriteNullListAsEmpty,
    /**
     * @since 1.1
     */
    WriteNullStringAsEmpty,
    /**
     * @since 1.1
     */
    WriteNullNumberAsZero,
    /**
     * @since 1.1
     */
    WriteNullBooleanAsFalse,
    /**
     * @since 1.1
     */
    SkipTransientField,
    /**
     * @since 1.1
     */
    SortField,
    /**
     * @since 1.1.1
     */
    @Deprecated
    WriteTabAsSpecial,
    /**
     * @since 1.1.2
     */
    PrettyFormat,
    /**
     * @since 1.1.2
     */
    WriteClassName,

    /**
     * @since 1.1.6
     */
    DisableCircularReferenceDetect, // 32768

    /**
     * @since 1.1.9
     */
    WriteSlashAsSpecial,

    /**
     * @since 1.1.10
     */
    BrowserCompatible,

    /**
     * @since 1.1.14
     */
    WriteDateUseDateFormat,

    /**
     * @since 1.1.15
     */
    NotWriteRootClassName,

    /**
     * @since 1.1.19
     * @deprecated
     */
    DisableCheckSpecialChar,

    /**
     * @since 1.1.35
     */
    BeanToArray,

    /**
     * @since 1.1.37
     */
    WriteNonStringKeyAsString,
    
    /**
     * @since 1.1.42
     */
    NotWriteDefaultValue,
    
    /**
     * @since 1.2.6
     */
    BrowserSecure,
    
    /**
     * @since 1.2.7
     */
    IgnoreNonFieldGetter,
    
    /**
     * @since 1.2.9
     */
    WriteNonStringValueAsString,
    
    /**
     * @since 1.2.11
     */
    IgnoreErrorGetter,

    /**
     * @since 1.2.16
     */
    WriteBigDecimalAsPlain,

    /**
     * @since 1.2.27
     */
    MapSortField;
}
```

我们使用这里的`WriteMapNullValue`即可

**示例代码**

```java
    @Test
    public void testToJSONString(){
        HashMap<String,String> row = new HashMap<>(16);
        row.put("1",null);
        row.put("2",null);
        row.put("3","san");        System.out.println(JSONObject.toJSONString(row,SerializerFeature.WriteMapNullValue));
    }
```

**输出结果**

```java
{"1":null,"2":null,"3":"san"}
```

可以看出即使value为空,也可以被正常序列化了