---
title: CSS 速查手册
categories:
  - 代码手册
tags:
  - CSS
top_img: false
date: 2022-01-28 14:27:01
---

**参考：**

* [CSS教程 | 菜鸟教程](https://www.runoob.com/css/css-tutorial.html)
* [CSS基础教程 | 简单教程](https://www.twle.cn/l/yufei/css/css-basic-index.html)
* [CSS教程 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)

## 选择器

**基本选择器**
```css
/* 标签选择器 */
p {
    color: red;
}

/* 类选择器 */
.ClassName {
    color: red;
}

/* id选择器 */
#id {
    color: red;
}

/* 通配符选择器（一般用于清除margin和padding） */
* {
    margin: 0;
    padding: 0;
}

/* 后代选择器(选择p标签，p是div的后代选择器) */
div p {
    color: red;
}
/* 子代选择器(选择p标签，p是div的子选择器) */
div>p {
    color: red;
}

/* 并集选择器(选择多个标签) */
div, p {
    color: red;
}
/* 交集选择器(选择同时具有div和p的标签) */
div.p {
    color: red;
}
```

**结构伪类选择器(根据元素结构关系选择元素)**
```css
/* 第1个li */
li:first-child {
    color: red;
}
/* 第n个li */
li:nth-child(n) {
    color: red;
}
/* 倒数第n个li(偶数:2n; 奇数:2n-1; i(3、4、5...)的倍数:in; 前五个:-n+5; 从第五个往后:n+5) */
li:nth-last-child(n) {
    color: red;
}
/* 最后一个li */
li:last-child {
    color: red;
}
```

属性选择器
```css
/* attr: 属性；val:属性值 */
div[attr] {
    background-color: red;
}
div[attr="val"] {
    background-color: red;
}
```

**伪元素选择器(通过CSS创建元素(行内)，必须有content属性)**
```css
div:before {
    content: '';
}
div:after {
    content: '';
}
```

激活的、已访问的、未访问的或者当有鼠标悬停在其上的链接
```css
a:link    {color:green;}
a:visited {color:green;}
a:hover   {color:red;}
a:active  {color:yellow;}
```

焦点伪类选择器(鼠标进入输入框时的状态)
```css
input:focus {
    background-color: red;
}
```

**优先级(选择范围越广优先级越低，个数越少优先级越低)：**
继承 < 通配符选择器 < 标签选择器 < 类选择器 < id选择器 < 行内样式 < !important(非继承时优先级最高)

## 字体和文本样式

```css
font {
    /* 一般浏览器默认字号为16px，px是逻辑像素单位 */
    font-size: 30px;

    /* 加粗 */
    font-weight: 700;
    /* 变细 */
    font-weight: 300;

    /* 倾斜 */
    font-style: italic;
    /* 正常（不倾斜） */
    font-style: normal;

    /* 字体 */
    /* 三种不同系列字体 Sans-serif：无修饰字体，如微软雅黑；Serif：有修饰字体，如宋体；Monospace：等宽字体 */
    /* 依次从Helvetica Neue到Microsoft YaHei选择字体，若都未找到，则从系统中的sans-serif系列字体选择一个显示 */
    font-family: Helvetica Neue,Microsoft YaHei,sans-serif;

    /* 简写形式（复合属性），只能省略前两个 */
    /* font: style weight size family */
    font: italic 700 30px Microsoft YaHei,sans-serif;
}


text {
    /* 内容水平对齐  */
    text-align：left; /* 默认left, 可选 center | right */

    /* 文本首行缩进 */
    text-indent: 40px;
    text-indent: 2em; /* 推荐：1em = 当前标签的font-size大小 */

    /* 下划线 */
    text-decoration: underline;
    /* 去除下划线 */
    text-decoration: none;
}

line {
    /* 行高（文本、文本上间距、文本下间距的高度和） */
    line-height: 40px;
    line-height: 1.5; /* 当前标签font-size的倍数 */
    /* 复合属性写法（size/line-height） */
    font: 30px/1.5 Microsoft YaHei,sans-serif;
    /* 单行文字垂直居中 */
    line-height = 行高
}
```

## 背景
```css
div {
    /* 背景色 */
    background-color: blue;
    background-color: #ffffff;
    background-color: rgb(255, 255, 255);
    background-color: rgba(255, 255, 255, 0.5);
    /* 背景图 */
    background-image: url();
    /* 背景图平铺(图片不足以铺满空间时是否复制多张以铺满) */
    background-repeat: repeat; /* repeat:平铺(默认值); no-repeat:不平铺; repeat-x:水平铺; repeat-y:垂直铺 */
    /* 背景图位置 */
    background-position: 水平位置(?px) 垂直位置(?px); /* 水平:left、center、right; 垂直: top、center、bottom */

    /* 简写形式（复合属性），无先后顺序要求、可任意省略 */
    background: background-color background-image background-repeat background-position;
    background: blue url() no-repeat left bottom;
}
```

## 标准流(文档流、元素显示模式)

元素显示模式分为：
**块级元素(可设置宽高，独占一行)**
div、p、h、ul、li、dl、dt、dd、form、header、nav、footer...
**行内元素(不可设置宽高，行内显示)**
a、span、strong、ins...
**行内块元素(可设置宽高，行内显示)**
input、textarea、button、select...

彼此之间可以转换
```css
div {
    display: block; /* 转换成块级元素 */
    display: inline; /* 转换成行内元素 */
    display: inline-block; /* 转换成行内块元素 */
}
```

## 盒子模型

[](https://www.runoob.com/images/box-model.gif)

不同部分的说明：

- **Margin(外边距)** - 清除边框外的区域，外边距是透明的。
- **Border(边框)** - 围绕在内边距和内容外的边框。
- **Padding(内边距)** - 清除内容周围的区域，内边距是透明的。
- **Content(内容)** - 盒子的内容，显示文本和图像，width、height作用对象。

```css
div {
    /* 边框-简写属性(不分先后，可任意省略) */
    /* border: border-width border-style border-color; */
    border:5px solid red;
    border-left:5px solid red;
    border-right:5px solid red;
    border-top:5px solid red;
    border-bottom:5px solid red;

    /* 内边距-简写属性(顶部开始，顺时针填写原则) */
    padding:25px 50px 75px 100px; /* 上、右、下、左 */
    padding:25px 50px 75px; /* 上、左右、下 */
    padding:25px 50px; /* 上下、左右 */
    padding:25px; /* 上下左右 */
    /* 注意：1.行内标签的padding-top和padding-bottom不生效 */

    /* 外边距-简写属性(顶部开始，顺时针填写原则) */
    margin:25px 50px 75px 100px; /* 上、右、下、左 */
    margin:25px 50px 75px; /* 上、左右、下 */
    margin:25px 50px; /* 上下、左右 */
    margin:25px; /* 上下左右 */
    margin:0 auto; /* 版心居中 */
    /* 注意：1.垂直布局的两个盒子的margin会合并，只显示最大值；
            2.互相嵌套的块级元素，子元素的margin-top会作用在父元素上(外边距塌陷)，给父元素添加`overflow: hidden;`即可解决；
            3.行内标签的margin-top和margin-bottom不生效 */

    /* 将padding和border计算进width和height，无需手动计算新宽高（CSS3） */
    box-sizing: border-box;
}

/* 清除所有默认内外边距 */
* {
    margin: 0;
    padding: 0;
}
```

## Float(浮动)

**作用：**
- 图文环绕
- 消除相邻块级元素水平放置时由于换行产生的间隙
- 丰富布局多样性

**特点：**
- 设置了浮动的元素会脱离标准流，而且可覆盖标准流中的元素(但不包括元素内容);
- 一行可显示多个，可设置宽高(相当于**行内块**);
- 几个浮动的元素放到一起，如果有空间的话，它们将彼此相邻;
* 浮动元素不能通过`text-align: center;`或者`margin: 0 auto;`居中;

**设置浮动**
```css
div {
    float: left; /* left、center、right */
}
```

**清除浮动**(父子级标签，子级浮动，父级没有高度，后面的标准流盒子会受到影响)
```css
/* 清除左右两侧浮动的影响(直接给父元素加overflow: hidden即可) */

/* 清除左右两侧浮动的影响(额外标签) */
.clearfix {
    clear: both;
}

/* 清除左右两侧浮动的影响(单伪元素) */
.clearfix::after {
    content: '';
    display: block;
    clear: both;
    /* 隐藏伪元素(兼容性) */
    height: 0;
    visibility: hidden;
}

/* 清除左右两侧浮动的影响和外边距塌陷的问题(双伪元素) */
.clearfix::before, .clearfix::after {
    content: '';
    display: table;
  }
  .clearfix::after {
    clear: both;
  }
```

## Position(定位)

**应用：**
- 层叠显示
- 固定元素位置

**静态定位**
默认值，遵循正常的文档流对象, 静态定位的元素不会受到 top, bottom, left, right影响 
```css
div {
    position: static;
}
```

**相对定位**
偏移后仍占有原来位置, 相对自身正常位置偏移
```css
div {
    position: relative;
    left: 20px; /* 以元素左边界为准向右偏移20px, 与right同时出现会覆盖right */
    right: 20px; /* 以元素右边界为准向左偏移20px, 与left同时出现不生效 */
    top: 20px; /* 以元素上边界为准向下偏移20px, 与bottom同时出现会覆盖bottom */
    bottom: 20px; /* 以元素下边界为准向上偏移20px, 与top同时出现不生效 */
}
```

**绝对定位**
脱标，偏移后不占原有位置, 具备行内块特性，若有已定位的长辈级元素就根据其定位，没有则根据浏览器窗口定位
```css
div {
    position: absolute;
    left: 20px;
    right: 20px;
    top: 20px;
    bottom: 20px;
    /* 绝对定位盒子不能使用`margin: 0 auto;`居中，替代方案如下： */
    position: absolute;
    left: 50%;
    margin-left: -150px;
    top: 50%;
    margin-top: -150px;
    width: 300px;
    height: 300px;
    /* 或者 */
    transform: translate(-50%, -50%);
}
```

**固定定位**
脱标，具备行内块特性，仅相对于浏览器定位
```css
div {
    position: fixed;
}
```

## 装饰

**vertical-align(垂直对齐)**
适用于行内、行内块、图片之间的对齐
- `baseline`：基线对齐(默认) 
- `top`：顶部对齐
- `middle`：中部对齐
- `bottom`：底部对齐

**cursor(光标)**
- `default`：默认值，通常是箭头
- `pointer`：小手，提示可以点击
- `text`：工字型，提示可以输入
- `move`：十字光标，提示可以移动

**border-radius(边框圆角)**
左上角开始，顺时针赋值，少值看对角
```css
div {
    border-radius: 10px;
    border-radius: 10px, 40px;
    border-radius: 10px, 40px, 60px;
    border-radius: 10px, 40px, 60px, 80px;
}
```

画圆
```css
div {
    width: 300px;
    height: 300px;
    background-color: pink;
    border-radius: 50%; /* 盒子尺寸一半 */
}
```

胶囊
```css
div {
    width: 300px;
    height: 100px;
    background-color: pink;
    border-radius: 50px; /* 盒子高度的一半 */
}
```

三角形
```css
div {
/* width: 100px;
height: 100px; */
width: 0;
height: 0;
/* background-color: pink; */
/* transparent: 透明 */
border-top: 10px solid transparent;
border-right: 10px solid transparent;
border-bottom: 10px solid transparent;
border-left: 10px solid orange;
}
```


**overflow(内容溢出部分显示效果)**
- `visible`：默认值，溢出部分可见
- `hidden`：溢出部分隐藏
- `scroll`：无论是否溢出都显示滚动条
- `auto`：根据是否溢出，自动显示或隐藏滚动条

**opacity(元素透明)**
```css
div {
    opacity: 0.5; /* 0-1 */
}
```

## 杂项

**CSS书写顺序(效率更高)：**
1. 定位 / 浮动 / display
2. 盒子模型
3. 文字属性

**元素层级关系：**
- 不同布局方式：标准流 < 浮动 < 定位
- 不同定位：层级相同，写在HTML下面的元素会覆盖上面的元素，可通过z-lndex属性(整数，取值越大越靠上)改变顺序


**常用**
```css
/* 去掉列表符号 */
ul {
    list-style: none;
}

/* 隐藏元素 */
div {
    display: none;
}
```