---
title: React入门
date: 2023-04-23 17:29:32
tags: [React,前端]
categories: React
index_img: /img/React.png
excerpt: React16和17入门,包含类组件,函数组件,Hooks的介绍和使用
---

# 前置知识

## babel

babel默认开启的严格模式,严格模式中函数的this不许指向window,会变成undefined



## 类中方法this的指向

- 当方法是由该类的实例对象创建的时候,this指向实例对象

```js
p.study()   //this指向实例对象
```



- 把方法赋值给一个变量接受,这个变量调用方法,this是undefined

```js
const x = p.study()
x() //this是undefined
```



## bind()函数

bind()会创建一个函数，函数体内的this对象的值会被绑定到传入bind()第一个参数的值



## 展开运算符

![image-20230411111116859](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304111111545.png)



展开运算符不能直接遍历一个对象,但是es6语法糖,加上括号可以使用

![image-20230411111223905](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304111113391.png)

复制对象的时候修改某个属性

![image-20230411111743773](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304111117035.png)



![image-20230411111838976](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304111118981.png)

# 简介

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。



# Hello Word

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hello</title>
</head>
<body>
    <div id="test">

    </div>
    <!-- 注意引入顺序-->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <!-- 此处一定要写babel -->
    <script type="text/babel"> 
// 千万不要写引号,这是babel
        const V_DOM =  <h1>hello react</h1>
        // 可以用小括号,小括号内可以换行
        const V_DOM2 =  (
            <h1>
                hello react
            </h1>
        )
        ReactDOM.render(V_DOM,document.getElementById('test'))
    </script>
</body>

</html>
```

# 虚拟dom

## 虚拟dom的两种创建方式

1. 上文使用jsx创建的虚拟dom(和写html一样)
2. 使用原生js创建(一直嵌套创建对象)

```js
    const V_DOM3 = React.createElement('h1',{id:'title'},React.createElement('span',{},'hello react 3'))
    ReactDOM.render(V_DOM3,document.getElementById('test'))
```

## 虚拟dom与真实dom

虚拟dom本质就是一个object对象,从下图可以产出虚拟dom的属性特别少,因为虚拟dom是react内部使用,不需要那么多属性以及api

![image-20230409171957089](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/react-%E8%99%9A%E6%8B%9Fdom.png)

# JSX语法规则

1. 定义虚拟DOM,不要写引号

2. 标签中混入==JS表达式==时要用{}

    1. 什么是==JS表达式==?什么是==JS语句(代码)==

    2. ```
      1.表达式
      a
      a+b
      demo(1)
      arr.map()
      function test(){}
      2.语句(代码)
      if(){}
      for(){}
      .switch(){case:xxx}
      ```

    3. 表达式有返回值,语句没返回值

3. 样式类名用className,不要用class

4. 内联样式用`style={{key:value}}`,key用小驼峰,例如:color,fontSize,backgroundColor

5. 虚拟DOM只能有一个根标签(最外面一个div)

6. 标签必须闭合

```
<input value="text"/>
```

7. 标签首字母
    1. 小写字母开头,转为html标签  `<div></div>`
    2. 大写字母开头,react渲染对应组件,若组件未定义,则报错<MyTitle></MyTitle>



- 给html标签指定id

```js
    const id = "this-id"
    const V_DOM =  (
        <h1 id={id}>
            hello react2
        </h1>
    )
    ReactDOM.render(V_DOM,document.getElementById('app'))
```

![image-20230409175123314](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304091751893.png)

- 给html标签指定class(使用className)

```js
const V_DOM =  (
    <h1 className="myClass">
        hello react2
    </h1>
)
```

![image-20230409175429532](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304091754774.png)

- 给html标签加上内联样式

```js
    const V_DOM =  (
        <div style={{fontSize:'20px'}}>
            hello react
        </div>
    )
```

![image-20230409175836059](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304091758575.png)









## JSX小练习

## 遍历展示

```jsx
        var data = ['张三','李四','小明']
       const vDom = (
            <div>
                <h1>人员列表</h1>
                <ul>
                {
                    data.map((item,index)=>{
                        return <li key={index}>{item}</li>
                    })
                }
                </ul>
            </div>           
        );
        const TDom = ReactDOM.render(vDom, document.getElementById('root'));
```

# 组件与模块

**模块:** 多个js文件

**组件:** html+css+js 全都在一起是一个组件

# 开发者工具

React Developer Tools

# 面向组件编程

## 	1.函数式组件

组件必须大写字母开头

```jsx
    //1.创建函数式组件 
        function Welcome() {
            return <h1>Hello world</h1>;
        };
    //2. 渲染组件到页面
        ReactDOM.render(<Welcome/>,document.getElementById('test'))
```

## 	2.类式组件

### 		类基本知识复习

```js
// 创建一个Person类
        class Person {
            // 构造器
            constructor(name,age){
                // 属性
                this.name = name
                this.age = age
            }
            // 方法
            speak(){
                console.log(`我叫${this.name},今年${this.age}岁`)
            }
        }
        // 继承
        class Student extends Person {
            // 构造器
            constructor(name,age,hobby){
                // 使用父类构造器
                super(name,age)
                this.hobby = hobby
            }
            // 重写父类方法
            speak(){
                console.log(`我叫${this.name},今年${this.age}岁,我喜欢${this.hobby}`)
            }
            study(){
                console.log(`${this.name}正在学习`)
            }
        }
        var p1 = new Person("tgk",22);
        p1.speak();
        var s1 = new Student("tgk",22,"吃饭");
        s1.speak();
        s1.study();
```

### 		简单类式组件



```jsx
 		//1.创建类式组件 
        class Welcome extends React.Component{
            // render在哪?WelCome组件的原型对象上,供实例使用
            // render里的this指向Welcome组件的实例对象
            render(){
                console.log(this)
                return <h1>我是欢迎组件</h1>
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Welcome/>,document.getElementById('test'))
        
```

![image-20230411100249317](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304111002924.png)

# 复杂组件和简单组件

- **复杂组件:**有状态(state)的组件
- **简单组件:**没有状态的组件

# 组件实例的三大属性

三大属性只属于类组件,但是在react17之后,函数式组件也能使用,而且react17之后几乎都使用函数式组件

![image-20230411101342285](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304111013997.png)

## js结构赋值小技巧

每次都写this.state或者this.props很麻烦

可以用

```jsx
 class Person extends React.Component{
            
            render(){
                // 解构赋值
                const {name,sex,age} = this.props
                return (
                    <ul>
                        <li>姓名:{name}</li>
                        <li>性别:{sex}</li>
                        <li>年龄:{age}</li>
                    </ul>
                )
            }
        }
```



## 1.state

```jsx
 class Weather extends React.Component{
            constructor(props) {
                super(props)
                // 初始化状态
                this.state = {
                    hot: true
                }
            }
            render(){
                return <h1>今天天气很{this.state.hot === true ? '炎热':'寒冷'}</h1>
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Weather/>,document.getElementById('test'))
```

### 绑定事件

onClick = {函数名}

原生的绑定点击事情是onclick,注意区分

```jsx
class Weather extends React.Component{
            constructor(props) {
                super(props)
                this.state = {
                    hot: true
                }
            }
            render(){
                // 绑定事件
                return <h1 onClick = {demo}>今天天气很{this.state.hot === true ? '炎热':'寒冷'}</h1>
            }
        }

        function demo(){
            console.log("我被点击了")
        }

        //2. 渲染组件到页面
        ReactDOM.render(<Weather/>,document.getElementById('test'))
```

### 点击更改内容

上面的函数是定义在react组件之外的,函数拿不到react组件的this,所以不能通过this更改组件的值.

可以在组件外定义一个变量,在组件内部赋值,或者用以下方式,在组件内部定义函数操作组件的值.

状态不可直接更改,直接更改后react不会重新渲染,要用react的api `setState()`



`setState()`:这个函数是一种合并动作,不是替换动作(只该传入对象属性的值,不会动其他属性的值)

```jsx
class Weather extends React.Component{
            constructor(props) {
                super(props)
                this.state = {
                    hot: true
                }
                // 将原型链上的方法赋值给自己的实例对象
                this.changeWeather = this.changeWeather.bind(this)
            }
            render(){
                return <h1 onClick = {this.changeWeather}>今天天气很{this.state.hot ? '炎热':'寒冷'}</h1>
            }
            changeWeather(){
                console.log("更改天气")
                // 状态不可直接更改,直接更改后react不会重新渲染,要用react的api
                this.setState({hot: !this.state.hot})
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Weather/>,document.getElementById('test'))
```

### state的简写方式

- 在类中不定义函数,而是给一个变量赋值一个函数(不在构造器定义的内容会绑定在类的实例对象上)

- 将自定义方法改为箭头函数赋值,箭头函数没有this,会往上找this

```jsx
        class Weather extends React.Component{
            // 状态
			state = {
                    hot: true
                }
            render(){
                return <h1 onClick = {this.changeWeather}>今天天气很{this.state.hot ? '炎热':'寒冷'}</h1>
            }
            // 将自定义方法改为箭头函数赋值
            // 赋值语句+箭头函数
            changeWeather = ()=>{
                console.log("更改天气")
                this.setState({hot: !this.state.hot})
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Weather/>,document.getElementById('test'))
```

### 总结

![image-20230411110159147](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304111102263.png)





## 2.props

**作用:给组件传值**

==ps:props属性是只读的==

### props传值

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hello</title>
</head>
<body>
    <div id="test"></div>
    <div id="test1"></div>
    <div id="test2"></div>
    <!-- 注意引入顺序-->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <!-- 此处一定要写babel -->
    <script type="text/babel">
        class Person extends React.Component{
            render(){
                return (
                    <ul>
                        <li>姓名:{this.props.name}</li>
                        <li>性别:{this.props.sex}</li>
                        <li>年龄:{this.props.age}</li>
                    </ul>
                )
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Person name = '张一' age='18' sex='男'/>,document.getElementById('test'))
        ReactDOM.render(<Person name = '张二' age='19' sex='男'/>,document.getElementById('test1'))
        ReactDOM.render(<Person name = '张三' age='20' sex='女'/>,document.getElementById('test2'))
        
    </script>
    
</body>

</html>
```

### 批量传递props

**使用展开运算符**

展开运算符不能使用在对象上,原生es6语法糖可以加上括号展开对象并复制给一个变量

react+babel 在使用{}时可以展开对象

```jsx
const param = {name:'tgk',sex:'男',age:'24'}
        ReactDOM.render(<Person {...param}/>,document.getElementById('test2'))
```

**复习展开运算符**

```jsx
let arr1 = [1,3,5,7]
        let arr2 = [2,4,6,8]
        console.log(...arr1) // 1.展开一个数组 1 3 5 7
        let arr3 = [...arr1,...arr2] // 2.连接数组 
        console.log(...arr3) // 1 3 5 7 2 4 6 8
        console.log(sum(1,2,3,4,5))
        // 3.形参不定参数
        function sum(...numbers){
            return numbers.reduce((preValue,currentValue)=>{
                return preValue+currentValue
            })
        }
        // 4.复制对象
        let p1 = {name:'李四'}
        let p2 = {...p1}
        p2.name = '张三'
```

**props传递number,而不传递字符串**

我们在props里面age传递的是字符串

```jsx
 ReactDOM.render(<Person name = '张一' age='18' sex='男'/>,document.getElementById('test'))
```

但是age实际是number类型

但是不加引号的话,语法会报错

可以用花括号{}

```jsx
        ReactDOM.render(<Person name = '张二' age={19} sex='男'/>,document.getElementById('test1'))

```

### 限制props传递类型

cdn引入prop-types.js

在类组件外面对类进行限制

```jsx
// 限制类型
  Person.propTypes = {
      // 字符串,必传
      name: PropTypes.string.isRequired,
      // 字符串
      sex:PropTypes.string,
      // 数字
      age:PropTypes.number,
      // 函数
      speak: PropTypes.func
  }
// 默认值
Person.defaultProps={
    sex:'男',
    age:20
}
```

### 限制props传递类型--简写

在组件类里面写限制

```jsx
// 限制类型
static propTypes={
	name:PropTypes.string.isRequired,
	sex:PropTypes.string,
	age:PropTypes.string.number
}
// 默认值
static defaultProps={
    sex:'男',
    age:20
}
```

### 函数式组件使用props

```jsx
function Student(props){
            return (
                    <ul>
                        <li>姓名:{props.name}</li>
                        <li>性别:{props.sex}</li>
                        <li>年龄:{props.age}</li>
                    </ul>
                )
        }
```

## 3.refs

refs相当于原生dom的id,存取的是键值对,key是ref的名字,value是节点类型

### 3.1 字符串形式的ref--已经不推荐使用

**写法:**ref="xxx"

```jsx
 //1.创建类式组件 
        class Welcome extends React.Component{
            showData = ()=>{
                alert(this.refs.input1.value)
            }
            render(){
                console.log(this)
                return (
                    <div>
                        <input ref="input1"type="text" placeholder="输入"/>
                        <button onClick={this.showData}>点我</button>
                    </div>
                )
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Welcome/>,document.getElementById('test'))
```

### 3.2回调形式的ref

**写法:**ref={(a)=>{this.xxx = a}}    直接把当前节点绑定到组件的实例对象上

```jsx
 //1.创建类式组件 
        class Welcome extends React.Component{
            showData = ()=>{
                // 从组件上找这个节点
                alert(this.input1.value)
            }
            render(){
                console.log(this)
                return (
                    <div>
                        // 使用回调,将当前节点的值绑定到组件上
                        <input ref={(currentNode)=>{this.input1 = currentNode}} type="text" placeholder="输入"/>
                        <button onClick={this.showData}>点我</button>
                        <input type='text' placeholder="离开弹出"/>
                    </div>
                )
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Welcome/>,document.getElementById('test'))
```

**回调函数的执行次数:**

==内联函数==中更新的时候调用2次

第一次传入null---为了清空

第二次传入节点

在class中定义函数,跟其绑定的时候,只调用一次

### 3.3 createRef--最推荐

```jsx
 //1.创建类式组件 
        class Welcome extends React.Component{
            // 返回一个容器,存储被ref标识的节点,一个容器存一个节点
            inputRef = React.createRef()
            showData = ()=>{
                alert(this.inputRef.current.value)
            }
            render(){
                console.log(this)
                return (
                    <div>
                        <input ref={this.inputRef} type="text" placeholder="输入"/>
                        <button onClick={this.showData}>点我</button>
                        <input type='text' placeholder="离开弹出"/>
                    </div>
                )
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Welcome/>,document.getElementById('test'))
```

**不要过多的使用ref,可以用event获取事件,用event.target获取节点**

# 事件处理

![image-20230411144549810](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304111445694.png)

# 收集表单数据

## 非受控组件

表单中所有输入类的dom都是现用现取

```jsx
//1.创建类式组件 
        class Welcome extends React.Component{
            // 返回一个容器,存储被ref标识的节点,一个容器存一个节点
            nameRef = React.createRef()
            passwordRef = React.createRef()
            subForm = (event)=>{
                event.preventDefault() //阻止表单提交
                this;
                debugger;
                alert(this.nameRef.current.value,this.passwordRef.current.value)
            }
            render(){
                return (
                        <form actions="" onSubmit={this.subForm}>
                            用户名:<input ref={this.nameRef} type="text" placeholder="用户名" name="name"/><br/>
                            密码:<input  ref={this.passwordRef} type="password" placeholder="密码" name="password"/><br/>
                            <button>提交</button>
                        </form>
                )
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Welcome/>,document.getElementById('test'))
```

## 受控组件-推荐,不用ref

**通过onChange实现vue中的双向绑定的效果**

```jsx
//1.创建类式组件 
        class Welcome extends React.Component{
         	// 初始化状态
            state = {
                name: '',
                password: ''
            }
            nameRef = React.createRef()
            passwordRef = React.createRef()
            subForm = (event)=>{
                event.preventDefault() //阻止表单提交
                alert(this.state.name+"he "+this.state.password)
            }
            changeName = (event)=>{
                this.setState({name:event.target.value})
            }
            changePassword = (event)=>{
                this.setState({password:event.target.value})
            }
            render(){
                return (
                        <form actions="" onSubmit={this.subForm}>
                            用户名:<input onChange={this.changeName} type="text" placeholder="用户名" name="name"/><br/>
                            密码:<input onChange={this.changePassword} type="password" placeholder="密码" name="password"/><br/>
                            <button>提交</button>
                        </form>
                )
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Welcome/>,document.getElementById('test'))
```

# 高阶函数

![image-20220205232635642](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304111455143.png)

## 函数柯里化

比如刚刚收集表单数据,一个input要写一个对应的方法,实际开发中要是有10个input得写10个差不多的方法将值存到state中

但是可以通过函数的柯里化,将10多个类似的函数结合成一个高阶函数

```jsx
changeForm = (currentNode) =>{
                return (event) => {
                    // currentNode用方括号的原因是为了读取currentNode的值
                    // 要不要就是往state里加一个名字是currentNode的属性了
                    // js对象复习:正常的属性key应该用""字符串,只是语法糖可以不加上""
                    this.setState({[currentNode]:event.target.value})
                }
            }
            render(){
                return (
                        <form actions="" onSubmit={this.subForm}>
                            <!--为什么这里onChange绑定的函数需要加小括号呢?-->
                            <!--onChange绑定的一定要是函数,{}是js表达式,一定要有返回值,正常加括号等于调用了这个函数,把函数值给onChange了,如果不加()才等于把这个函数返回给onChang,这里可以加括号是因为我们套了一层函数,执行函数返回子函数-->
                            用户名:<input onChange={this.changeForm('name')} type="text" placeholder="用户名" name="name"/><br/>
                            密码:<input onChange={this.changeForm('password')} type="password" placeholder="密码" name="password"/><br/>
                            <button>提交</button>
                        </form>
                )
            }
```

## **不用柯里化实现:**

关注changeForm2和onChange的写法

```jsx
        //1.创建类式组件 
        class Welcome extends React.Component{
            // 返回一个容器,存储被ref标识的节点,一个容器存一个节点
            state = {
                name: '',
                password: ''
            }
            nameRef = React.createRef()
            passwordRef = React.createRef()
            subForm = (event)=>{
                event.preventDefault() //阻止表单提交
                alert(this.state.name+"he "+this.state.password)
            }
            changeName = (event)=>{
                this.setState({name:event.target.value})
            }
            changePassword = (event)=>{
                this.setState({password:event.target.value})
            }
            changeForm = (currentNode) =>{
                return (event) => {
                    this.setState({[currentNode]:event.target.value})
                }
            }
            changeForm2 = (currentNode,event)=>{
                this.setState({[currentNode]:event.target.value})
            }
            // {}中只能接收js表达式,有返回值的才是js表达式
            // {this.subForm}这种写法是react自动识别组件方法
            render(){
                return (
                        <form actions="" onSubmit={this.subForm}>            
                            用户名:<input onChange={(event)=>{this.changeForm2('name',event)}} type="text" placeholder="用户名" name="name"/><br/>
                            密码:<input onChange={(event)=>{this.changeForm2('password',event)}} type="password" placeholder="密码" name="password"/><br/>
                            <button>提交</button>
                        </form>
                )
            }
        }
        //2. 渲染组件到页面
        ReactDOM.render(<Welcome/>,document.getElementById('test'))
```

## 什么是高阶函数

![image-20230412165712610](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304121657278.png)

常见的高阶函数有哪些?

- Promise(),接受函数
- SetTimeout() 接受函数
- 数组身上很多的方法,比如arr.map(),返回一个函数

## 什么是函数的柯里化

![image-20230412165904121](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304121659410.png)





# 组件的生命周期(旧)



## 引出生命周期

```js
//组件挂载完毕
componentDidMount(){
    
}


//组件将要卸载(卸载之前)
componentWillUnMount(){
    
}
```





## 组件挂载流程

![image-20230412173953902](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304121739651.png)

## 组件更新流程-setState()

调用setState()后会自动更新

先shouldComponentUpdate(),问钩子可不可以更新,该钩子有返回值,true 和false





## 组件更新流程-forceUpdate()

强制更新,手动更新react组件

```js
this.forceUpdate()
```





## 父组件render流程

```js
//父组件重新render后子组件将要收到props,这个钩子是子组件的(注意:第一次传props并不会调用此钩子)
componentWillReceiveProps(props){
    
}
```





## 旧生命周期总结

![image-20230412175120421](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304121751101.png)





# 组件的生命周期(新)

新的生命周期对比:

- 废弃了三个will
- 加了2个get

![image-20230413110655101](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131106858.png)





## getDerivedStateFromProps

`getDerivedStateFromProps`        几乎用不到

从props得到派生状态

```js
// 静态方法,而且要返回值,返回null或者组件的state对象
static getDerivedStateFromProps(props,state){
    return null
}
```





## getSnapshotBeforeUpdate

在更新前获取快照



对比componentDidUpdate(oldProps,oldState)

```js
// 必须有返回值,null或者任意类型的快照值
getSnapshotBeforeUpdate(oldProps,oldState){
    return null
}
```

### 使用场景

用js代码让新闻5开头(js代码操作滚动条)

![image-20230413112657692](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131127231.png)



![image-20230413112800679](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131128015.png)





![image-20230413113040201](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131130765.png)





## 新的生命周期总结

![image-20230413113134606](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131131115.png)





# dom的diffing算法

![image-20230413114337601](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131143326.png)

![image-20230413114504995](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131145622.png)







# react脚手架

## 简单使用

- 安装脚手架

```shell
sudo npm i -g create-react-app
```

- 使用脚手架创建

```shell
sudo create-react-app react_staging
```

```shell
Success! Created react_staging at /Users/alan/dev-work/react-work/react_staging
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd react_staging
  npm start
```

## 目录介绍

### public

静态资源

- **index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- 网页图片   %PUBLIC_URL%代表public文件夹路径-->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<!--    移动端网页适配-->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
<!--    安卓手机浏览器网页页签的颜色(地址栏位置)-->
    <meta name="theme-color" content="#000000" />
<!--    描述网站信息,搜索引擎用-->
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
<!--    iphone将网页添加到手机主屏幕的图标-->
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
<!--    应用加壳,把h5加上安卓壳,ios壳-->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
<!--  不支持js浏览器的提示-->
    <noscript>You need to enable JavaScript to run this app.</noscript>

    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

### src

代码目录

```
├── App.css  
├── App.js     核心组件
├── App.test.js
├── index.css
├── index.js   主入口
├── logo.svg
├── reportWebVitals.js   页面性能监视
└── setupTests.js   //测试
```



# webstorm快速创建组件

https://juejin.cn/post/6982362318822703112

输入scc创建类组件

rsf创建函数组件

# 简单的hello组件



Hello.js函数式组件

```js
function HelloWorld(){
    return (
        <div>
            <h1>hello world</h1>
        </div>
    )
}

export default HelloWorld

```

HelloClass.js类式组件

```js
import React from "react";
class HelloClass extends React.Component{
    render() {
        return (
            <div>
                <h1>Hello class</h1>
            </div>
            )
    }
}


export default HelloClass

```

index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// 引入组件
import HelloWorld from "./component/Hello";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    /*使用组件*/
    <HelloWorld/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// 页面性能监测
reportWebVitals();

```



# 样式的模块化

父组件引入两个子组件,两个子组件引入的css里都有.hello,那么第一个引入的css子组件用到.hello样式的就会被后引入的覆盖掉



须知,webpack可以引入css,所以可以用之前的js里可以用import 引入css

1. css文件改名为index.module.css
2. 引入的使用使用`import xxx from './index.module.css'`
3. 标签使用css`className = {xxx.类名}`





# 组件化编码流程

![image-20230413142831233](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131428971.png)

# todolist

![image-20230413155119915](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131551995.png)







# react ajax

![image-20230413155448326](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304131554975.png)

## 配置代理

### 方式1:package.json配置代理

```js
"proxy": "http://localhost:5000" //本地所有的ajax请求,如果本地public下没有该资源,就会转发给5000
```

### 方式2:setupProxy.js

src目录下新建setupProxy.js

```js
const proxy = require("http-proxy-middleware")

module.exports = function (app){
    app.use(
        proxy('/api',{
            target:"http:localhost:5000",
            changeOrigin:true,
            pathRewrite:{'^api':''}
        })
    )
}
```

# 兄弟组件之间的直接通信

使用npm的工具库,pupsub-js





# Hooks

Hook是React16.8新增的特性,可以让函数式组件使用State和React其他功能

函数式组件没有this,之前都用不了state和生命周期

三个常用的Hook

- State Hook        React.useState()
- Effect Hook       React.useEffect()
- Ref Hook           React.useRef()

## useState()

![image-20230414091738899](https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304140917478.png)





```js
// 引入useState
import {React,useState} from 'react';

export default function Hello(props) {
  // 使用useState(xxx)创建一个state,初始化值是xxx返回一个数组,结构赋值
  // arr[0]返回state属性值,arr[1]返回该属性的set方法
  const [name,setName] = useState("alan")
  const [sex,setSex] = useState("男")
  const changeName = () =>{
    if('alan' === name){
      setName("小明")
    }
    else {
      setName("alan")
    }
  }
  const changeSex = () =>{
    if('男' === sex){
      setSex("女")
    }
    else {
      setSex("男")
    }
  }
  return (
    <div>
      <h1>我的名字:{name}</h1>
      <h1>我的性别:{sex}</h1>
      <button onClick={changeName}>改名</button>
      <button onClick={changeSex}>改性别</button>
    </div>
  );
}


```





## useEffect()



<img src="https://image-1306887402.cos.ap-nanjing.myqcloud.com/markDown/202304140951376.png" alt="image-20230414095119802" style="zoom:80%;" />

可以在函数式组件中使用生命周期

可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

`useEffect(fn, array)`

**useEffect在初次完成渲染之后都会执行一次**, 配合第二个参数可以模拟类的一些生命周期。

- 挂载后

**如果第二个参数为空数组(哪个state都不监视)，useEffect相当于类组件里面componentDidMount。**

- 更新后

**如果不传第二个参数(所有state都监视)，useEffect 会在初次渲染和每次更新时，都会执行。**

- 卸载前

**effect 返回一个函数，React 将会在执行清除操作时调用它。**

```js
useEffect(() => {
    console.log("订阅一些事件");
    // 会在卸载前调用return的函数
    return () => {
      console.log("执行清除操作")
    }
  },[]);
```

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 类似 componentDidMount | componentDidUpdate 
  useEffect(() => {
    // 更新DOM
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

通过使用这个 Hook，React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。 将 `useEffect` 放在组件内部可以在 effect 中直接访问 state 变量。



## useRef

和类组件里的createRef很像,创建一个容器

```js
import React from 'react';

export default function RefDemo(props) {
  const inputRef = React.useRef();
  const showInputContent = () =>{
    window.alert(inputRef.current.value)
  }
  return (
    <div>
      <input ref={inputRef}/>
      <button onClick={showInputContent}>点我看input</button>
    </div>
  );
}


```





