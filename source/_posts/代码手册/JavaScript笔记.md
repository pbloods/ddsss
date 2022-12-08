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


## JS基础

### 模板字符串
```js
// 普通字符串拼接
doument.write('大家好，我叫' + name + '，今年' + age + '岁')
// 模板字符串拼接（注意括号内为反引号，反引号内还支持HTML语法）
doument.write(`大家好，我叫${name}，今年${age}岁`)
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
```js
// 将一个或多个元素添加到数组末尾，返回值为新数组长度
arr.push(元素1, 元素2, ...)
// 将一个或多个元素添加到数组开头，返回值为新数组长度
arr.unshift(元素1, 元素2, ...)

// 从数组中删除最后一个元素，返回值为该元素
arr.pop()
// 从数组中删除第一个元素，返回值为该元素
arr.shift()
// 从数组中删除连续几个元素，返回值为删除的元素数组
arr.splice(起始位置, 删除几个元素)
arr.splice(0, 3)