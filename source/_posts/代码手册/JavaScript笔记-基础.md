---
title: JavaScript笔记-基础
categories:
  - 代码手册
tags:
  - JavaScript
top_img: false
date: 2022-08-28 14:27:01
---

**参考：**
* [JavaScript教程 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript)
* [JavaScript教程 | 菜鸟教程](https://www.runoob.com/js/js-tutorial.html) 教程版本较低
- [JavaScript 参考 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)
- [JavaScript 标准内置对象 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)

**VsCode插件**
- `Error Lens` 代码错误提示

## JS基础

### JS执行机制
JS是一门单线程语言，通过异步和同步可以实现类似多线程操作。
**同步任务**都在主线程上执行，形成一个**执行栈**；异步通过回调函数实现，**异步任务**会添加到任务队列(消息队列)，等待同步任务都执行完毕后任务队列中的任务按照**异步API**规定的顺序进入执行栈执行，首个异步任务执行完后会回到任务队列查询剩余异步任务，如存在则再次进入执行栈执行，循环往复(**事件循环**)，直到任务全部执行完毕

### 模板字符串
```js
// 普通字符串拼接
document.write('大家好，我叫' + name + '，今年' + age + '岁')
// 模板字符串拼接（注意括号内为反引号）
document.write(`大家好，我叫${name}，今年${age}岁`)
```

### 数据类型转换

**隐式转换(数字相加 字符相连):**
- 如果`+`号左右只有一个值，解析的结果是正号，可用于隐式转换；如果两边都是数值(Number)类型 则是`+`号运算符；`+`号的左右如果有一个数据是字符串数据类型的话  那么这个`+`号会被解析成连接符
- 除了`+`以外的算术运算符 比如 `-` `*` `/` `++` `--` 等都会把数据转成数字类型

**显式转换:**
- `Number(数据)` **转成数字类型**
- `parseInt(数据)` 只保留整数
- `parseFloat(数据)` 可以保留小数，可过提取以数字开头的非数字结尾的数字
* `String(数据)` **转换为字符型**
* `变量.toString(进制)` 转换为字符型(可进制转换)

### 三元运算符(表达式)
if条件语句双分支简化写法，一般用来取值，返回值为满足条件内的值
```js
条件 ? 满足条件执行的代码 : 不满足条件执行的代码
```

### 字符串属性和方法

**length**
获取字符串长度

**split()**
转化为数组
```js
const str = 'one,two'
// 以,为分隔符
console.log(str.split(','))
```

**substring()**
字符串截取
```js
const str = 'one,two'
console.log(str.substring(4)) // two
console.log(str.substring(0, 1)) // o
```

**startsWith()**
判断是否以某字符串开头的
```js
const str = 'one,two'
console.log(str.startsWith('one')) // true
console.log(str.startsWith('two', 4)) // true
```

**includes()**
判断是否包含某字符串
```js
const str = 'one,two'
console.log(str.includes('two')) // true
console.log(str.includes('two', 6)) // false
```

### number
**toFixed()**
让数字指定保留的小数位数
```js
const num = 10.923
console.log(num.toFixed()) // 11
console.log(num.toFixed(2)) // 10.92
```

**String()**
将数字转化为字符串
```js
String(num)
```

### 函数

#### 基础概念
**函数提升**
JS会把所有函数声明提升(不提升赋值，所以函数表达式不会被提升)到当前作用域前面，所以可以先调用后声明

**动态参数**
不设置函数形参，输入的实参全部放入arguments伪数组，遍历获取
```js
function getSum() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
}
getSum(1, 2, 3)
```

**剩余参数**
`...`作为形式参数使用，多余的实参通过`...`以数组的形式传入`arr`
```js
// 在数组结构中的用法
const [a, b, ...arr] = [1, 2, 3, 4]
// 在函数中的用法
function fun(a, b, ...arr) {
  console.log(arr) // [3, 4]
}
fun(1, 2, 3, 4)
```

**展开运算符**
`...`后面接数组，可以展开数组(去除`[]`)
```js
let arr = [1, 2, 3]
console.log(Math.max(...arr)) // 3
```

**匿名函数**
```js
let fn = function() {}
fn()
```

**箭头函数**
多用于简化匿名函数表达式，无动态参数，有剩余参数，没有自己的this，沿用上层作用域的this
```js
// 普通匿名函数
const fn = function () {
  console.log(123)
}
// 箭头函数写法
const fn = () => {
  console.log(123)
}

// 只有一个形参时可省略 ()
const fn = (x) => {
  console.log(x)
}
const fn = x => {
  console.log(x)
}

// 只有一行代码时可省略 {}、return
const fn = (x) => {
  return x + x
}
const fn = x => x + x
// 注意省略{}后如果返回的是对象时需要用()包裹起来，防止混淆
const fn = uname => ({uname: uname})
```

**立即执行函数**
防止变量污染，不需要调用，直接执行，多个立即执行函数必须要用`;`分开
```js
// 方式一
(function () { console.log('立即执行函数') })();
// 方式二
(function () { console.log('立即执行函数') }());
```

**回调函数**
被当参数的函数

**递归函数**
自己调用自己的函数

**闭包**
内层函数调用外层函数变量形成闭包，可以实现数据私有，从外部访问函数内部变量，但可能会造成内存泄漏
```js
// 闭包形式 统计函数调用的次数
function count() {
  let i = 0
  function fn() {
    i++
    console.log(`函数被调用了${i}次`)
  }
  return fn
}
const fun = count()
```



### 数组

#### 操作数组

**增**
```js
// 将一个或多个元素添加到数组末尾，返回值为新数组长度
arr.push(元素1, 元素2, ...)
// 将一个或多个元素添加到数组开头，返回值为新数组长度
arr.unshift(元素1, 元素2, ...)
```

**删**
```js
// 从数组中删除最后一个元素，返回值为该元素
arr.pop()
// 从数组中删除第一个元素，返回值为该元素
arr.shift()
// 从数组中删除连续几个元素，返回值为删除的元素数组
arr.splice(起始位置, 删除几个元素)
arr.splice(0, 3)
```

**遍历**
`forEach()` 无返回值
```js
arr.forEach(function(item, index) { /* … */ })
```

**迭代**
`map()` 返回新数组，常用于处理数据
```js
arr.map(function(item, index) { return item + 20 })
```

**筛选**
`filter` 返回满足条件的数组
```js
arr.filter(function(item, index) { return item >= 20 })
```

**查找**
`find()` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
```js
const arr = [
  {
    name: '小米',
    price: 1999
  },
  {
    name: '华为',
    price: 3999
  },
]
arr.find(function(item) { return item.name === '小米'})
```

**累加器**
`reduce()`
```js
arr.reduce(function(累计值, 当前元素){}, [起始值])
arr.reduce(function (prev, item) {
  return prev + item
}, 0)

const re = arr.reduce((prev, item) => prev + item, 0)
```

**拼接**
`join()` 将数组转化成字符串拼接起来
```js
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join()); // expected output: "Fire,Air,Water"

console.log(elements.join('')); // expected output: "FireAirWater"

console.log(elements.join('-')); // expected output: "Fire-Air-Water"
```

**伪数组转为真数组**
t通过内置结构函数 Array 的 `from()`
```js
Array.from(arr)
```

#### 数组解构
将数组的单元值快速批量赋值给一系列变量
```js
// 一维数组解构
const [a, b, c, d] = [1, 2, 3, 4]
// 二维数组解构
const [a, b, [c, d]] = [1, 2, [3, 4]]

// 交换变量的值
let a = 1
let b = 2; // 此处需要用;隔开，否则JS会将以数组开头的代码提到这一行，导致报错
[a, b] = [b, a]

// 防止 undefined 传递
const [a = 0, b = 0] = [1, 2]
// 单元值少时用剩余函数接收多余值
const [a, b, ...arr] = [1, 2, 3, 4]
// 忽略某些参数
const [a, , c, d] = [1, 2, 3, 4]
```

### 对象

#### 创建对象
```js
// 1. 通过字面量创建
const obj = {
  name: '佩奇'
}

// 2. 利用 new Object 创建
let obj = new Object()
obj.name = '佩奇'
// 等价于
let obj = new Object({ name: '佩奇' })

// 3. 通过构造函数(函数名约定大写字母开头)批量创建类似对象
function Pig(name, age) {
    this.name = name
    this.age = age
}
// 通过 new 调用构造函数的方法称为实例化，返回值为实例对象
const peiqi = new Pig('佩奇', 8) 
const qiaozhi = new Pig('乔治', 7)
// 实例对象的属性和方法叫实例成员，构造函数的属性和方法叫静态成员
Pig.weight = 200
Pig.eat = function() {
  console.log('吃一大盆')
}
```

#### 操作对象
**查**
```js
console.log(obj.属性)
console.log(obj['属性'])
console.log(obj.方法())
```

**增**
```js
// 同改，name不存在时会新增一个
obj.name = 新值

// 通过构造函数 Object 追加，可批量追加
Object.assign(obj, { name = 新值 })
```

**删**
```js
delete obj.name
```

**遍历对象()**
```js
// 1. for/in
for (let k in obj) {
  console.log(k) /* 属性名(字符串) */
  console.log(obj[k]) /* 属性值 */
}

// 2. 通过构造函数 Object
const o = { uname: 'pink', age: 18 }
// 获得所有的属性名
console.log(Object.keys(o))  //返回数组['uname', 'age']
// 获得所有的属性值
console.log(Object.values(o))  //  ['pink', 18]
```

#### 对象解构
将对象的属性和方法快速批量赋值给一系列变量，形参必须等于属性或者方法名
```js
const {uname, age} = {uname: '张三', age: 18}
// 变量冲突时重新定义变量名
const {uname: username, age} = {uname: '张三', age: 18}
```

**数组对象解构**
```js
const [{uname, age}] = [{uname: '张三', age: 18}]
```

**多级对象解构**
```js
const person = [
  {
    name: '佩奇',
    family: {
      mother: '猪妈妈',
      father: '猪爸爸',
      sister: '乔治'
    },
    age: 6
  }
]
const [{ name, family: { mother, father, sister } }] = person
```
#### 内置对象

##### Math对象
```js
// 生成 min - max 之间的一个随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
```

##### 时间对象
**获取时间**
```js
// 获取 2022/06/14 19:50:36 格式时间数据
new Date().toLocaleString()
// 获取 2022/06/14 格式时间数据
new Date().toLocaleDateString()
// 获取 19:54:00 格式时间数据
new Date().toLocaleTimeString()
```

**时间戳**
`1970-1-1 00:00:00`起到现在的毫秒数
```js
// 1.通过getTime()方法获取
let date = new Date()
console.log(date.getTime())
// 2.通过+号获取
console.log(+new Date())
// 3.通过now()方法直接获取当前时间戳(仅当前时间戳)
Date.now()
```

**倒计时案例**
```js
// 1. 得到现在的时间戳
let now = +new Date()
// 2. 得到指定时间的时间戳
let last = +new Date('2021-8-29 18:30:00')
// 3. （计算剩余的毫秒数） / 1000 === 剩余的秒数
let count = (last - now) / 1000
// console.log(count)
// 4. 转换为时分秒
// h = parseInt(总秒数 / 60 / 60 % 24)   //   计算小时
let h = parseInt(count / 60 / 60 % 24)
h = h < 10 ? '0' + h : h
// m = parseInt(总秒数 / 60 % 60);     //   计算分数
let m = parseInt(count / 60 % 60)
m = m < 10 ? '0' + m : m
// s = parseInt(总秒数 % 60); //   计算当前秒数
let s = parseInt(count % 60);
s = s < 10 ? '0' + s : s
```

## Web APIs

### DOM(文档对象模型)

#### 获取DOM元素、修改属性

**获取DOM对象**
```js
// 通过CSS选择器获取第一个匹配的元素
document.querySelector('CSS选择器')
// 通过CSS选择器获取所有匹配的元素(返回伪数组)
document.querySelectorAll('CSS选择器')
```

**设置/修改DOM元素内容**
```js
// 将文本内容(支持标签)追加到</body>前
document.write('')

// 将文本内容(只支持文本)添加/更新到任意标签位置
元素.innerText = 
// 将文本内容(支持标签、变量)添加/更新到任意标签位置
元素.innerHTML = 

// 禁用元素
元素.disabled = true
```

**设置/修改DOM元素属性**
`对象.属性 = 值`

**修改样式属性**
```js
// 修改(添加)样式属性(通过style，只能获取和设置行内样式)
元素.style.样式属性 = 值
// 注意: 修改带有'-'的样式属性需要用小驼峰命名法转换，如 background-color
box.style.backgroundColor = 'red'

// 修改样式属性(通过className修改类名)
元素.className = '类名1 类名2'

// 修改样式属性(通过classList操作类名)
元素.classList.add('类名') /* 追加 */
元素.classList.remove('类名') /* 删除 */
元素.classList.toggle('类名') /* 切换(有则删，无则加) */
元素.classList.contains('类名') /* 判断元素是否有类(返回布尔值) */
```

**修改表单属性**
```js
元素.value = '用户名'
元素.type = 'password'
```

**自定义属性**
```js
// 设置自定义属性(属性名标准格式：data-xxx)
元素.setAttribute('属性名', 属性值)
// 获取自定义属性（自定义属性无法直接在DOM中获取）
元素.getAttribute('属性名')
元素.dataset.xxx /* 通过dataset获取(推荐) */
// 删除自定义属性
元素.removeAttribute('属性名')
```

#### DOM事件

##### 事件监听
```js
// 添加事件
事件源.addEventListener('事件类型', 事件处理函数(e), 是否捕获) /* DOM L2，e为该事件的事件对象，不用可省略 */
事件源.on事件类型 = 事件处理函数 /* DOM L0, 重复监听新事件会覆盖旧事件 */

// 移除事件
事件源.removeEventListener('事件类型', 事件处理函数(e), 是否捕获) /* 匿名函数无法解绑 */
事件源.on事件类型 = null
```

##### 事件类型与事件对象
参考：
- [事件参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E4%BA%8B%E4%BB%B6%E5%88%97%E8%A1%A8)
- [事件对象 | 菜鸟教程](https://www.runoob.com/jsref/dom-obj-event.html) 旧版本

**常用事件类型及属性：**
- `click`
- `input`
- `blur`
- `change`
- `keyup`/`keydown`
- `mousemove`、`mouseenter`/`mouseleave`
- `scroll`
- `resize`
- `load` 所有资源加载完执行；`DOMContentLoaded` 给document加，DOM加载完执行，无需等待样式表、图像等完全加载

**事件对象常用属性：**
- `type` 获取当前事件类型
- `clientX`/`clientY` 获取光标相对于浏览器可见窗口左上角的位置
- `pageX`/`pageY`  获取光标相对于整个网页左上角的位置
- `offsetX`/`offsetY` 获取光标相对于当前DOM元素左上角的位置
- `key` 用户按下按键的值

##### 事件流
- 捕获
- 冒泡

##### 事件委托
利用事件冒泡，给父元素添加事件，子元素可以触发，通过`事件对象.target`可以获得需要触发的子元素
- `事件对象.target.id` 子元素id
- `事件对象.target.tagName` 子元素标签名

#### DOM节点
- **元素节点**
- 属性节点
- 文字节点

**查找节点**
```js
// 获取最近一级父节点，没有则返回null
元素.parentNode

// 查找所有子节点(仅元素节点，伪数组)
元素.children
// 查找所有子节点(元素节点、文本节点、注释节点等，伪数组)
元素.childNodes

// 下一个兄弟节点
元素.nextElementSibiling
// 上一个兄弟节点
元素.previousElementSibiling
```

**增加节点**
```js
// 1.创建一个新的标签节点
document.createElement('标签名')

// 2.插入节点
// 追加节点
父元素.appendChild(子元素)
// 插入节点
父元素.insertBefore(子元素, 插入位置下方的兄弟元素)
```

**克隆节点**
```js
// true:克隆时包含后代节点, false:只克隆元素本身。默认false
元素.cloneNode(布尔值)
```

**删除节点**
```js
父元素.removeChild(要删除的元素)
```

#### 网页特效

**scroll**
- `scrollWidth`/`scrollHeight` 内容宽高，包括不可见部分
- `scrollTop`/`scrollLeft` 被页面卷去的头部与左侧长度(number，可修改)

**offset**
- `offsetWidth`/`offsetHeight` 元素盒子总宽高
- `offsetTop`/`offsetLeft` 元素距离自己定位父级元素(没有则以文档左上角为准)的上、左距离(number，不可修改)

**client**
- `clientWidth`/`clientHeight` 元素可见宽高，不包括边框、滚动条等
- `clientTop`/`clientLeft` 上边框和左边框宽度度(number，不可修改)

### BOM(浏览器对象模型)

#### 定时器

**定时器-间歇函数**
```js
// 开启定时器，每隔一段时间(ms)执行依次指定函数
setInterval(函数, 间隔时间)
// 关闭定时器
let 变量名 = setInterval(函数, 间隔时间)
clearInterval(变量名)
```

**定时器-延时函数**
```js
// 开启定时器, 等待毫秒数后执行一次
setTimeout(回调函数, 等待毫秒数)
// 关闭定时器
let 变量名 = setTimeout(回调函数, 等待毫秒数)
clearTimerout(变量名)
```

#### location对象
**常用属性和方法**
- `href` 返回（当前页面的）整个 URL，赋值可实现网页跳转功能
- `search` 获取URL`?`及后的参数
- `hash` 获取URL`#`后的哈希值
* `reload()` 刷新页面

#### navigator对象
访问浏览器的信息

### Swiper插件
各种轮播图，[中文官网](https://www.swiper.com.cn/index.html)

### 本地存储

#### localStorage
永久，以键值对形式存储
```js
// 存储数据
localStorage.setItem(key,value)
// 读取数据
localStorage.getItem(key)
```

**例**
```js
// 简单数据类型
localStorage.setItem('name', '张三') /* 存储 */
localStorage.getItem('name') /* 读取 */

// 复杂数据类型
let obj = { name: '张三', age: 18 }
localStorage.setItem('obj', JSON.stringify(obj))  /* 存储(转化为JSON字符串) */
JSON.parse(localStorage.getItem('obj'))  /* 读取(将JSON字符串转化为对象) */
```

#### sessionStorage
临时，关闭浏览器失效，用法同localStorage

## 正则表达式
**正则表达式在JavaScript中的使用**
```js
let reg = /前端/ /* reg是个对象 */
let str = '我们大家都在学前端'

// test() 检测str里是否有'前端'，返回布尔值
reg.test(str)

// exec() 检测str里是否有'前端'，有则返回数组，无则返回null
reg.exec(str)

// replace() 替换匹配的所有(g)字符串
str.replace(/正则/g, '替换文本')
```

- [Road 2 Coding](https://www.r2coding.com/#/README?id=%e6%ad%a3%e5%88%99%e8%a1%a8%e8%be%be%e5%bc%8f)
- [正则表达式 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
- [开源中国在线正则测试工具](https://tool.oschina.net/regex)
- [正则表达式在线测试 | 菜鸟工具](https://c.runoob.com/front-end/854/)