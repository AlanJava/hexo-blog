---
title: java包装类之间比较
date: 2023-02-02 16:21:51
tags: [java,包装类,基本类型]
categories: java
index_img: /img/java-wrap.png
excerpt: java包装类之间使用==和.equals()比较的区别
---
Java中的`基本类型`及其`包装类的比较（==）`一直是一个比较头疼的问题，不仅有`自动装箱和拆箱`操作，部分的包装类还有对象`缓存池`，这就导致了这部分知识容易混淆。

对于`==`操作符来说，如果比较的数据是`基本类型`，则比较它们的`值`，如果比较的是`对象`，则会比较`对象的内存地址`。另外，如果一个是基本类型、一个是包装类型，在比较前会先把包装类型`拆箱`成基本类型，然后进行比较。

以int为例，这里我们把参与比较的类型分为三种：`int`、直接`new出来的Integer对象`和`自动装箱出来的Integer对象`。

这里先不考虑`Integer的缓存池`，我们对三种类型之间的`两两比较`进行下排列组合，3 * 3一共有`9`种可能。由于`==`运算符是`不区分左右的先后顺序`的，也就是说`a == b`跟`b == a`等价，所以可以去除3种重复比较，这样就只有6种情况了。具体如下图：

| 类型/类型          | int  | new Integer | Integer AutoBoxing |
| ------------------ | ---- | ----------- | ------------------ |
| int                | ①    | ②           | ③                  |
| new Integer        | ②    | ④           | ⑤                  |
| Integer AutoBoxing | ③    | ⑤           | ⑥                  |

接下来我们依次看下这六种情况，下面上代码：

情况①：

```csharp
// ①int 与 int 类型比较
int i1 = 128;
int i2 = 128;
System.out.println("int == int, result:" + (i1 == i2));// true
System.out.println("----------------------------------------------------");
复制代码
```

基本类型使用`==`比较的是`值`，所以这个毫无疑问就是`true`。

情况②：

```sql
// ②int类型 和 new出来的Integer对象 比较
int i3 = 128;
Integer i4 = new Integer(128);
// 在进行运算前，i4会自动拆箱，实质是两个int类型比较
System.out.println("int == new Integer, result:" + (i3 == i4));// true
System.out.println("----------------------------------------------------");
复制代码
```

`基本类型`跟`包装类型`比较，包装类会先`自动拆箱`，然后再比较，实质上还是两个`int`在比较，所以这里结果还是true。

情况③：

```csharp
// ③int类型 和 自动装箱的Integer对象 比较
int i5 = 128;
Integer i6 = 128;
// 在进行运算前，i6会自动拆箱，实质是两个int类型比较
System.out.println("int == Integer autoBoxing, result:" + (i5 == i6));// true
System.out.println("----------------------------------------------------");
复制代码
```

这里的i6在赋值的时候，会自动把128装箱成Integer类型，接着使用`==`比较的时候，i6又会自动拆箱成int，所以实质上还是两个`int`在比较，跟情况②原理一样。

情况④：

```sql
// ④两个new出来的Integer对象的内存地址比较
Integer i7 = new Integer(128);
Integer i8 = new Integer(128);
System.out.println("new Integer == new Integer, result:" + (i7 == i8));// false
System.out.println("----------------------------------------------------");
复制代码
```

这里是两个`new出来的包装类对象`进行比较，这里比较的是他们各自`对象的内存地址`，由于是两个不同的对象，所以地址值必然不同，结果是false。

情况⑤：

```sql
// ⑤自动装箱的Integer类型 和 new出来的Integer对象 比较
Integer i9 = 128;
Integer i10 = new Integer(128);
System.out.println("Integer autoBoxing == new Integer, result:" + (i9 == i10));// false
System.out.println("----------------------------------------------------");
复制代码
```

这里的i9在赋值时会将128`自动装箱成Integer类型`，所以最终是两个`不同对象的内存地址比较`，结果必然为false。

情况⑥：

```ini
// ⑥自动装箱的Integer对象 和 自动装箱的Integer对象 比较，区间[-128, 127]之外
Integer i11 = 128;
Integer i12 = 128;
System.out.println("Integer autoBoxing == Integer autoBoxing, 区间[-128, 127]之外，result:" + (i11 == i12));// false
System.out.println("----------------------------------------------------");
复制代码
```

这里的i10和i11在赋值时都会先将128`自动装箱成Integer类型`，然后再进行比较，原理跟情况⑤一样，所以最终结果为false。

细心的同学可能已经发现，我这里举例用的数字是`128`，选择这个数字的意义在于在比较时不涉及`Integer的缓存池`。

#### Integer的缓存池

关于Integer的缓存池，我们还是举例说明：

```java
// 自动装箱会从缓存池中取对象，缓存池的区间为[-128, 127]
// 自动装箱的Integer对象 和 自动装箱的Integer对象 比较，区间[-128, 127]中
Integer i13 = 127;// 缓存池
Integer i14 = 127;// 缓存池
System.out.println("Integer autoBoxing == Integer autoBoxing, 区间[-128, 127]中，result:" + (i13 == i14));// true
```

这个例子跟上面的`情况⑥`一模一样，唯一不同是这里使用的是`127`，`情况⑥`使用的是`128`，但是`情况⑥`的结果是`false`，这里的比较结果却是`true`，这就很让人疑惑。

我们分析下这个过程，`i13`和`i14`的赋值过程中，均会触发`自动装箱`，给127生成对应的`Integer对象`；接下来使用`==`比较这两个`Integer对象的地址`，最后的输出结果为`true`。

我们知道，Java中如果两个对象的内存地址一样，那么他们就是同一个对象，分配的就是同一块内存。我们这里的`i13`和`i14`都是`自动装箱`产生的，是不是在产生过程中返回了同一个对象？

对自动装箱和拆箱有疑问的同学可以看[一文带你理解Java中自动装箱和拆箱](https://link.juejin.cn?target=https%3A%2F%2Fblog.csdn.net%2Fqq_26287435%2Farticle%2Fdetails%2F107803661)。

Integer对应的自动装箱的方法是`Integer#valueOf()`，我们看下它的实现:

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}

```

可以看到如果i的值在某个范围内的话，就会从`IntegerCache.cache`这个数组中取出一个`Integer对象`返回；如果超出了这个范围的话就直接`new`一个`Integer对象`返回。

我们看下`IntegerCache`的代码：

```java
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high value may be configured by property
        int h = 127;
        ...
        high = h;

        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert IntegerCache.high >= 127;
    }

    private IntegerCache() {}
}
```

按照惯例，省略掉了无关代码。

这里的`下限low`的值默认为`-128`，`上限high`的值默认为`127`，`cache`是一个`Integer类型的数组`。

`static`代码块里面主要做了两件事： ①初始化`cache`这个Integer数组，数组容量为256。 ②给`cache`的所有元素赋值。在for循环里面，依次给cache的各个元素进行赋值，Integer的值从-128开始，一直到127，对应的是闭区间[-128, 127]，刚好256个元素。

所以我们常说的`Integer的缓存池`其实就是这里的`IntegerCache.cache`，它在Integer进行`类加载`的时候初始化。

在基本类型int需要`自动装箱`的时候，就会调用`Integer#valueOf`方法，在`Integer#valueOf`方法的实现中，如果int的值在`IntegerCache.cache`缓存的范围内(`闭区间[-128, 127]`)，就返回已经构建好的Integer对象，具体是根据`角标`从`IntegerCache.cache`这个数组中去取。

经过上面的讲解可以知道，我们这里的`127`经过`自动装箱`后，是从缓存池中拿的Integer对象，所以`i13`和`i14`拿到的是同一个Integer对象（因为它们的值相同，在`IntegerCache.cache`数组中对应的index相同，所以获取到的是同一个缓存对象）。

#### Byte、Short、Integer、Long、Character、Boolean对应的缓存池。

既然Integer有缓存池，那其他的包装类是否也有同样的情况呢？

我们看下测试代码：

```java
// 自动装箱的Byte对象 和 自动装箱的Byte对象 比较，区间[-128, 127]中
Byte b1 = 127;// 缓存池
Byte b2 = 127;// 缓存池
System.out.println("Byte autoBoxing == Byte autoBoxing, 区间[-128, 127]中，result:" + (b1 == b2));// true
System.out.println("----------------------------------------------------");

// 自动装箱的Short对象 和 自动装箱的Short对象 比较，区间[-128, 127]中
Short s1 = 127;// 缓存池
Short s2 = 127;// 缓存池
System.out.println("Short autoBoxing == Short autoBoxing, 区间[-128, 127]中，result:" + (s1 == s2));// true
System.out.println("----------------------------------------------------");

// 自动装箱的Long对象 和 自动装箱的Long对象 比较，区间[-128, 127]中
Long l1 = 127L;// 缓存池
Long l2 = 127L;// 缓存池
System.out.println("Long autoBoxing == Long autoBoxing, 区间[-128, 127]中，result:" + (l1 == l2));// true
System.out.println("----------------------------------------------------");

// 自动装箱的Character对象 和 自动装箱的Character对象 比较，区间[-128, 127]中
Character c1 = 127;// 缓存池
Character c2 = 127;// 缓存池
System.out.println("Character autoBoxing == Character autoBoxing, 区间[-128, 127]中，result:" + (c1 == c2));// true
System.out.println("----------------------------------------------------");

// 自动装箱的Boolean对象 和 自动装箱的Boolean对象 比较，区间[-128, 127]中
Boolean bool1 = true;// 缓存池
Boolean bool2 = true;// 缓存池
System.out.println("Boolean autoBoxing == Boolean autoBoxing, 区间[true, false]中，result:" + (bool1 == bool2));// true
System.out.println("----------------------------------------------------");

```

基本类型对应的包装类中，`Byte`、`Short`、`Integer`、`Long`和`Character`的缓存池都是`[-128, 127]`，`Boolean`的缓存池比较特殊，只有true和false两个Boolean对象。

总结如下：

| 基本类型 | 包装类    | 缓存池        |
| -------- | --------- | ------------- |
| byte     | Byte      | [-128, 127]   |
| short    | Short     | [-128, 127]   |
| int      | Integer   | [-128, 127]   |
| long     | Long      | [-128, 127]   |
| char     | Character | [-128, 127]   |
| boolean  | Boolean   | [true, false] |
| float    | Float     | 无            |
| double   | Double    | 无            |

作者：tinyvampirepudge
链接：<https://juejin.cn/post/6857894663177961486>
来源：稀土掘金

