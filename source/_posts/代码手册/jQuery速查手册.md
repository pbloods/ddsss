---
title: jQuery速查手册
categories:
  - 代码手册
tags:
  - JavaScript
top_img: false
abbrlink: 3844990215
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
- `submit` 表单提交事件

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

## jQuery中的Ajax

### $.get
`$.get(url, [data], [callback])`
**示例**
```js
// 发起不带参数的GET请求
$(function () {
    $('#btnGET').on('click', function () {
    $.get('http://www.liulongbin.top:3006/api/getbooks', function (res) {
        console.log(res)
    })
    })
})
// 发起单参数的GET请求
$(function () {
    $('#btnGETINFO').on('click', function () {
    $.get('http://www.liulongbin.top:3006/api/getbooks', { id: 1 }, function (res) {
        console.log(res)
    })
    })
})
```
**JSONP**
```js
$(function () {
  // 发起JSONP的请求
  $.ajax({
    url: 'http://ajax.frontend.itheima.net:3006/api/jsonp?name=zs&age=20',
    // 代表我们要发起JSONP的数据请求
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'abc', /* 回调函数名称 */
    success: function (res) {
      console.log(res)
    }
  })
})
```

### $.post()
`$.post(url, [data], [callback])`
**示例**
```js
$(function () {
    $('#btnPOST').on('click', function () {
    $.post('http://www.liulongbin.top:3006/api/addbook', { bookname: '水浒传', author: '施耐庵', publisher: '天津图书出版社' }, function (res) {
        console.log(res)
    })
    })
})
```

### $.ajax()
```js
$.ajax({
   type: '', // 请求的方式，例如 GET 或 POST
   url: '',  // 请求的 URL 地址
   data: { },// 这次请求要携带的数据
   success: function(res) { } // 请求成功之后的回调函数
})
```
**示例**
```js
// 发起GET请求
$(function () {
    $('#btnGET').on('click', function () {
    $.ajax({
        type: 'GET',
        url: 'http://www.liulongbin.top:3006/api/getbooks',
        data: {
        id: 1
        },
        success: function (res) {
        console.log(res)
        }
    })
    })
})
// 发起POST请求
$(function () {
    $('#btnPOST').on('click', function () {
    $.ajax({
        type: 'POST',
        url: 'http://www.liulongbin.top:3006/api/addbook',
        data: {
        bookname: '史记',
        author: '司马迁',
        publisher: '上海图书出版社'
        },
        success: function (res) {
        console.log(res)
        }
    })
    })
})
```

### 提交表单
```js
<form action="/login" id="f1">
  <input type="text" name="user_name" />
  <input type="password" name="password" />
  <button type="submit">提交</button>
</form>

// 1.阻止表单默认提交和跳转行为，仅采集数据
$(function () {
  $('#f1').on('submit', function (e) {  
    alert('监听到了表单的提交事件2')
    e.preventDefault()
    // 通过serialize()快速获取带有name属性的表单数据
    let data = $('#f1').serialize()
    console.log(data)
  })
})
```

### 上传文件
```js
$(function () {
  // 监听到Ajax请求被发起了
  $(document).ajaxStart(function () {
    $('#loading').show()
  })

  // 监听到 Ajax 完成的事件
  $(document).ajaxStop(function () {
    $('#loading').hide()
  })

  $('#btnUpload').on('click', function () {
    var files = $('#file1')[0].files
    if (files.length <= 0) {
      return alert('请选择文件后再上传！')
    }

    var fd = new FormData()
    fd.append('avatar', files[0])

    // 发起 jQuery 的 Ajax 请求，上传文件
    $.ajax({
      method: 'POST',
      url: 'http://www.liulongbin.top:3006/api/upload/avatar',
      data: fd,
      processData: false,
      contentType: false,
      success: function (res) {
        console.log(res)
      }
    })
  })
})
```

#### 通过模板引擎渲染数据
art-template
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <!-- 1. 导入模板引擎 -->
  <!-- 在 window 全局，多一个函数，叫做 template('模板的Id', 需要渲染的数据对象) -->
  <script src="./lib/template-web.js"></script>
  <script src="./lib/jquery.js"></script>
</head>

<body>

  <div id="container"></div>

  <!-- 3. 定义模板 -->
  <!-- 3.1 模板的 HTML 结构，必须定义到 script 中 -->
  <script type="text/html" id="tpl-user">
    <h1>{{name}}    ------    {{age}}</h1>
    {{@ test}}

    <div>
      {{if flag === 0}}
      flag的值是0
      {{else if flag === 1}}
      flag的值是1
      {{/if}}
    </div>

    <ul>
      {{each hobby}}
      <li>索引是:{{$index}}，循环项是:{{$value}}</li>
      {{/each}}
    </ul>

    <h3>{{regTime | dateFormat}}</h3>
  </script>

  <script>
    // 定义处理时间的过滤器
    template.defaults.imports.dateFormat = function (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      var d = date.getDate()

      return y + '-' + m + '-' + d
    }


    // 2. 定义需要渲染的数据
    var data = { name: 'zs', age: 20, test: '<h3>测试原文输出</h3>', flag: 1, hobby: ['吃饭', '睡觉', '写代码'], regTime: new Date() }

    // 4. 调用 template 函数
    var htmlStr = template('tpl-user', data)
    console.log(htmlStr)
    // 5. 渲染HTML结构
    $('#container').html(htmlStr)
  </script>
</body>

</html>
```

##### art-template标准语法
```js
// 标准输出
{{value}}
{{obj.key}}
{{obj['key']}}
{{a ? b : c}}
{{a || b}}
{{a + b}}

// 原文输出
{{@ value }}

// 条件输出
{{if value}} 按需输出的内容 {{/if}}
{{if v1}} 按需输出的内容 {{else if v2}} 按需输出的内容 {{/if}}

// 循环输出
{{each arr}}
    {{$index}} {{$value}}
{{/each}}

// 过滤器
template.defaults.imports.filterName = function(value){/*return处理的结果*/}
{{value | filterName}}
```

## 插件
相关网站
- http://www.htmleaf.com/jQuery/
- https://www.jq22.com/

### 全屏滚动
- https://github.com/alvarotrigo/fullPage.js