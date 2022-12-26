---
title: jQuery速查手册
categories:
  - 代码手册
tags:
  - JavaScript
top_img: false
date: 2022-09-08 14:24:01
---

一个经典javascript库
官网文档：https://doc.jquery.com/
第三方中文文档：https://jquery.cuishifeng.cn/

## jQuery基础

**jQuery特性**

```js
// 隐式迭代(自动循环遍历获取的伪数组)
$("li").css("color", "red")
// 链式编程(因为多数jQuery对象返回值仍是原对象)
$("li").css("color", "red").sibling().css("color", ""); 
```

**jQuery 对象和 DOM 对象转换**
```js
// 1.DOM对象转换成jQuery对象，方法只有一种
let box = document.getElementById("box");  // 获取DOM对象
let $jQueryObject = $(box);  // 把DOM对象转换为 jQuery 对象

// 2.jQuery 对象转换为 DOM 对象有两种方法：
//   2.1 jQuery对象[索引值]
let $domObject1 = $("div")[0]

//   2.2 jQuery对象.get(索引值)
let $domObject2 = $("div").get(0)
```

**jQuery遍历**
```js
// each() 主要用于遍历DOM元素
$("li").each(function(i, domEle){
   console.log($(domEle))
})

// $.each() 主要用于处理数据
// 遍历数组
$.each( [0,1,2], function(i, n){
  alert( "Item #" + i + ": " + n )
})
// 遍历对象
$.each( { name: "John", lang: "JS" }, function(i, n){
  alert( "Name: " + i + ", Value: " + n )
})
```

**多库共存(自定义标识符)**
```js
let new = $.noConflict()
```

## APIs

### 基本

#### 元素

**获取元素**
```js
// 获取全部匹配标签，返回伪数组
$("选择器")

// 筛选选择器
$("选择器:first")
$("选择器:last")
$("选择器:eq(1)") /* 获取数组中第二个元素 */

// 统计被选中的元素个数
$("选择器:checked")

// 筛选方法
$("li").first()
$("li").last()
$("li").eq(1) /* 选择数组中第二个元素 */
```
**通过节点关系获取元素**
```js
$("li").parent() /* 最近一级父元素 */
$("li").parents("选择器") /* 祖先元素 */
$("li").children("选择器") /* 子代元素，搭配选择器可进一步选择(无需手动遍历)，下同 */
$("li").siblings("选择器") /* 兄弟元素 */
$("li").find("选择器") /* 后代元素 */
```

**设置/修改元素内容**
```js
$(".box").html() /* 支持标签 */
$(".box").text() /* 只支持文本 */
$(".box").val() /* 修改元素value属性值 */
```

**创建/添加元素**
```js
let li = $("<li>新建的li</li>")
$("li").append(li) /* 添加到内部最后面 */
$("li").prepend(li) /* 添加到内部最前面 */
$("li").after(li) /* 添加到目标元素后面 */
$("li").before(li) /* 添加到目标元素前面 */
```

**删除元素**
```js
$("li").remove() /* 删除元素本事 */
$("li").empty() /* 删除匹配元素集合中所有的子节点 */
$("li").html("") /* 清空匹配元素内容 */
```

#### 样式/属性

**样式**
```js
// 获取样式属性
$(".box").css("样式名")
// 修改样式属性
$(".box").css("样式名","属性值")
$(".box").css({
  color: pink,
  width: 200px
  })

// 修改类名
$(".box").addClass("类名")
$(".box").removeClass("类名")
$(".box").hasClass("类名") /* 判断是否有类名，返回布尔值 */
$(".box").toggleClass("类名")
```
**属性**
```js
// 获取
$(".box").prop("属性名") /* 获取固有属性，如果没有相应的属性，返回值是空字符串 */
$(".box").attr("属性名") /* 获取自定义属性，如果没有相应的属性，返回值是 undefined */
// 设置/修改
$(".box").prop("属性名","属性值")
$(".box").attr("属性名","属性值")
$("box").data("属性名","属性值") /* 在元素上存放或读取数据(缓存),返回jQuery对象 */
// 删除
$(".box").removeAttr("属性名")
```

### 事件

**内置事件**
- `change()`
- `hover([over,]out)`

**绑定与解绑**
```js
// 绑定事件(只有特定事件有这种写法，比如input就不支持)
$("li").事件(function () {})
// 绑定事件/自定义事件(on 可以给未来动态创建的元素绑定事件)
$("li").on("事件名", function () {})
// 可同时绑定多个事件
$("li").on({
  事件名1: function () {},
  事件名2: function () {}
  })
// 多个事件相同功能写法
$("li").on("事件名1 事件名2", function () {})
// 通过on实现事件委托
$("ul").on("click", "li", function() {
    alert(11);
});
// 绑定一次性事件
$("li").one("事件名", function () {})

// 解绑事件(off)
$("li").off("事件名")
$("li").off("click", "li") /* 解绑事件委托 */
$("li").off() /* 解绑所有事件 */
```

**触发事件**
```js
// 1. 直接触发
$("li").事件名()
// 2. trigger触发，支持自定义事件
$("li").trigger("事件名")
$("li").triggerHandler("事件名") /* 与trigger区别是不会执行浏览器默认动作，也不会产生事件冒泡 */
```

### 对象

#### 操作对象

**拷贝/合并**
```js
const o = {
  uname: '李四'
}
const obj = {
  uname: 'pink',
  age: 18,
  family: {
    baby: '小pink'
  }
}
// 浅拷贝(o里面重叠属性会被覆盖)
$.extend(o, obj)
// 深拷贝
$.extend(true, o, obj)
```

### 效果

#### 基本
`show([speed,[easing],[fn]])` 显示
`hide([speed,[easing],[fn]])` 隐藏
`toggle([speed],[easing],[fn])` 切换

#### 滑动
`slideDown([s],[e],[fn])` 下滑
`slideUp([s,[e],[fn]])` 上滑
`slideToggle([s],[e],[fn])` 滑动切换

#### 淡入淡出
`fadeIn([speed],[easing],[fn])`
`fadeOut([speed],[easing],[fn])`
`fadeTo([[speed],opacity,[easing],[fn]])` 逐渐改变透明度

#### 自定义
`animate(params,[speed],[easing],[fn])` 自定义动画
`stop([c],[j])` 停止正在运行的动画，如果写到动画或者效果前面，相当于结束上一次动画

### 元素尺寸
```js
// 1.获取元素内容区域大小
$('.box').width()
$('.box').height()

// 2.获取元素内容区域 + 内边距大小
$('.box').innerWidth()
$('.box').innerHeight()

// 3.获取元素内容区域 + 内边距 + 边框大小
$('.box').outerWidth()
$('.box').outerHeight()

// 4.获取元素内容区域 + 内边距 + 边框 + 外边距大小
$('.box').outerWidth(true)
$('.box').outerHeight(true)
```

### 元素位置
```js
// offset()
$('.box').offset().top /* 上边框距离文档的距离 */
$('.box').offset().left /* 左边框距离文档的距离 */
// 设置距离
$('.box').offset({
  top: 100px,
  left: 50px
})

// position()
// 元素距离自己定位父级元素(没有则以文档左上角为准)的上、左距离
$('.box').position().top
$('.box').position().left
```

```js
// 被页面卷去的头部
$('.box').scrollTop()
// 被页面卷去的左侧
$('.box').scrollLeft()
```

## 插件
相关网站
- http://www.htmleaf.com/jQuery/
- https://www.jq22.com/

### 全屏滚动
- https://github.com/alvarotrigo/fullPage.js