---
title: jQuery速查手册
categories:
  - 代码手册
tags:
  - JavaScript
top_img: false
date: 2022-09-08 14:24:01
---

​	jQuery的官网地址： https://jquery.com/，官网即可下载最新版本。

>  各个版本的下载：https://code.jquery.com/

## jQuery特性

- 链式编程

```javascript
// 多数jQuery对象返回值仍是原对象
$('li').css('color', 'red').sibling().css('color', ''); 
```

## DOM
**jQuery 对象和 DOM 对象转换**
```js
// 1.DOM对象转换成jQuery对象，方法只有一种
let box = document.getElementById('box');  // 获取DOM对象
let $jQueryObject = $(box);  // 把DOM对象转换为 jQuery 对象

// 2.jQuery 对象转换为 DOM 对象有两种方法：
//   2.1 jQuery对象[索引值]
let $domObject1 = $('div')[0]

//   2.2 jQuery对象.get(索引值)
let $domObject2 = $('div').get(0)
```

### 获取DOM元素、修改属性
**获取元素**
```js
// 获取全部li标签，返回数组
$('li')

// 对CSS伪类选择器包装后的简洁写法
$('li').first()
$('li').last()
$('li').eq(1) /* 获取数组中第二个元素 */
```
**通过节点关系获取元素**
```js
$('li').parent()
$('li').children('选择器') /* 子代元素，搭配选择器可进一步选择(无需手动遍历)，下同 */
$('li').siblings('选择器') /* 兄弟元素 */
$('li').find('选择器') /* 后代元素 */
```
**设置/修改元素内容**
```js
$('.box').html() /* 支持标签 */
$('.box').text() /* 只支持文本 */
$('.box').val() /* 修改元素value属性值 */
```
**样式**
```js
// 获取样式属性
$('.box').css('样式名')
// 修改样式属性
$('.box').css('样式名','属性值')
$('.box').css({
  color: pink,
  width: 200px
  })

// 修改类名
$('.box').addClass('类名')
$('.box').removeClass('类名')
$('.box').hasClass('类名') /* 判断是否有类名，返回布尔值 */
$('.box').toggleClass('类名')
```
**属性**
```js
// 获取
$('.box').attr('属性名')
// 设置/修改
$('.box').attr('属性名','属性值')
// 删除
$('.box').removeAttr('属性名')
```



## 事件

### 事件操作
```js
// 绑定事件(只有特定事件有这种写法，比如input就不支持)
$('li').事件(function () {})
// 绑定事件(on)
$('li').on('事件名', function () {})
// 关闭事件(off)
$('li').off('事件名', function () {})
$('li').off() /* 关闭所有事件 */
// 一次性事件
$('li').one('事件名', function () {})
```