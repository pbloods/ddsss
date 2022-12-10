---
title: JavaScript笔记
categories:
  - 代码手册
tags:
  - JavaScript
top_img: false
date: 2022-08-28 14:27:01
---

**参考：**
* [JavaScript教程 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript)
* [JavaScript教程 | 菜鸟教程](https://www.runoob.com/js/js-tutorial.html)
- [JavaScript 参考 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)

**VsCode插件**
- `Error Lens` 代码错误提示

## JS基础

### 模板字符串
```js
// 普通字符串拼接
document.write('大家好，我叫' + name + '，今年' + age + '岁')
// 模板字符串拼接（注意括号内为反引号）
document.write(`大家好，我叫${name}，今年${age}岁`)
```

### 数据类型转换

**隐式转换(数字相加 字符相连):**
- 如果+号左右只有一个值  解析的结果是正号 可用于隐式转换；如果两边都是数值(Number)类型 则是`+`号运算符；`+`号的左右如果有一个数据是字符串数据类型的话  那么这个`+`号会被解析成连接符
- 除了`+`以外的算术运算符 比如 `-` `*` `/` 等都会把数据转成数字类型

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

### 操作数组
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

### 函数

**匿名函数**
```js
let fn = function() {}
fn()
```

**立即执行函数**
防止变量污染，不需要调用，直接执行，多个立即执行函数必须要用`;`分开
```js
// 方式一
(function () { console.log('立即执行函数') })();
// 方式二
(function () { console.log('立即执行函数') }());
```

**间歇函数(定时器)**
```js
// 开启定时器，每隔一段时间(ms)执行依次指定函数
setInterval(函数, 间隔时间)
// 关闭定时器
let 变量名 = setInterval(函数, 间隔时间)
clearInterval(变量名)
```

### 操作对象
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
```
**删**
```js
delete obj.name
```

**遍历对象(for/in)**
```js
for (let k in obj) {
  console.log(k) /* 属性名(字符串) */
  console.log(obj[k]) /* 属性值 */
}
```

### 内置对象

Math对象的应用
```js
// 生成 min - max 之间的一个随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
```

## Web APIs

### DOM(文档对象模型)

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
元素.innerText
// 将文本内容(支持标签)添加/更新到任意标签位置
元素.innerHTML
```

**设置/修改DOM元素属性**
`对象.属性 = 值`

**修改样式属性**
```js
// 修改样式属性(通过style，只能获取和设置行内样式)
对象.style.样式属性 = 值
// 注意: 修改带有'-'的样式属性需要用小驼峰命名法转换，如 background-color
box.style.backgroundColor = 'red'

// 修改样式属性(通过className修改类名)
对象.className = '类名1 类名2'

// 修改样式属性(通过classList操作类名)
对象.classList.add('类名') /* 追加 */
对象.classList.remove('类名') /* 删除 */
对象.classList.toggle('类名') /* 切换(有则删，无则加) */
```

**修改表单属性**
```js
表单.value = '用户名'
表单.type = 'password'
```

### BOM