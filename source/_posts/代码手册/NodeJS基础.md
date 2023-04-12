---
title: NodeJS基础
categories:
  - 代码手册
tags:
  - nodejs
top_img: false
abbrlink: 2485834034
date: 2022-09-14 08:00:00
---

## 基础

### 模块化
CommonJS规范
```js
// 1. 共享成员
// 在一个自定义模块中，默认情况下， module.exports = {}
const age = 20
// 向 module.exports 对象上挂载 username 属性
module.exports.username = 'zs'
// 向 module.exports 对象上挂载 sayHello 方法
module.exports.sayHello = function() {
  console.log('Hello!')
}

// 2. 导入模块
const fs = require('fs') /* 内置模块 */
const fs = require('./xx.js') /* 自定义模块，后缀名可省略 */
const fs = require('moment') /* 第三方模块 */
```
ES6模块化规范
```js
// 1. 共享成员
let n1 = 10
let n2 = 20
function show() {}
// 默认导出
export default {
  n1,
  show
}
// 按需导出
export let s1 = 'aaa'
export let s2 = 'ccc'
export function say() {}

// 2. 导入模块
import m1 from './01.默认导出.js' /* 默认导入 */
import './01.默认导出.js' /* 直接导入代码 */
import { s1, s2, say } from './01.默认导出.js' /* 按需导入 */
import m1, { s1, s2, say } from './01.默认导出.js'
import { s1, s2 as str2, say } from './01.默认导出.js' /* as关键字重命名 */
```

## 内置模块

### fs文件系统模块
```js
// 导入
const fs = require('fs')

// 读取文件
fs.readFile(path[, option], callback)
//    参数1：读取文件的存放路径
//    参数2：读取文件时候采用的编码格式，一般默认指定 utf8
//    参数3：回调函数，拿到读取失败和成功的结果  err  dataStr
fs.readFile(__dirname + './files/11.txt', 'utf8', function(err, dataStr) {
  // __dirname 表示当前文件所处的目录，防止路径拼接问题
  if (err) {
    return console.log('读取文件失败！' + err.message)
  }
  console.log('读取文件成功！' + dataStr)
})

// 写入文件
fs.writeFile(path, data[, option], callback)
fs.writeFile(__dirname + './files/3.txt', 'ok123', function(err) {
  // 2.1 如果文件写入成功，则 err 的值等于 null
  // 2.2 如果文件写入失败，则 err 的值等于一个 错误对象
  // console.log(err)
  if (err) {
    return console.log('文件写入失败！' + err.message)
  }
  console.log('文件写入成功！')
})
```

### path路径模块
```js
const path = require('path')
const fs = require('fs')

// path.join() 路径拼接
const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
// 注意：  ../ 会抵消前面的路径
console.log(pathStr)  // \a\b\d\e
fs.readFile(__dirname + '/files/1.txt')

// path.basename() 获取文件名
// 定义文件的存放路径
const fpath = '/a/b/c/index.html'
// const fullName = path.basename(fpath)
// console.log(fullName)
const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt)

// path.extname(path) 获取文件扩展名
```

### http模块
基本
```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Type', 'text/html; charset=utf-8'); /* 解决中文乱码 */
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

不同请求响应不同内容
```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // 1. 获取请求的 url 地址
    const url = req.url
    // 2. 设置默认的响应内容为 404 Not found
    let content = '<h1>404 Not found!</h1>'
    // 3. 判断用户请求的是否为 / 或 /index.html 首页
    // 4. 判断用户请求的是否为 /about.html 关于页面
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    } else if (url === '/about.html') {
        content = '<h1>关于页面</h1>'
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // 使用 res.end() 把内容响应给客户端
    res.end(content)
});

server.listen(port, hostname, () => {
    console.log(`服务器 running at http://${hostname}:${port}/`);
});
```