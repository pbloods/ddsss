---
title: CSS 速查手册
categories:
  - 代码手册
tags:
  - CSS
top_img: false
abbrlink: 3302139417
date: 2022-01-22 14:27:01
---

**参考：**
* [CSS教程 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)
* [CSS教程 | 菜鸟教程](https://www.runoob.com/css/css-tutorial.html)
* [CSS基础教程 | 简单教程](https://www.twle.cn/l/yufei/css/css-basic-index.html)
- [CSS 参考 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)
- [CSS参考手册 - 简单教程](https://www.twle.cn/l/yufei/cssref/css-ref-reference.html)

**VsCode插件：**
- `EasyLESS` CSS 预处理工具。简化CSS语法，丰富功能，自动生成CSS文件，详见[lesscss.org](https://lesscss.org/)
- `One Dark Pro` 一款VsCode主题

**框架**
- [bootcss](https://www.bootcss.com/) 响应式布局
- [layui](https://layui.github.io/) UI 组件库

## 选择器

**优先级(选择范围越广优先级越低，个数越少优先级越低)：**
继承 < 通配符选择器 < 标签选择器 < 类选择器 < id选择器 < 行内样式 < !important(非继承时优先级最高)

### 基本选择器
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

### 结构伪类选择器
根据元素结构关系选择元素
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

### 属性选择器
```css
/* attr: 属性；val:属性值 */
div[attr] {
    background-color: red;
}
div[attr="val"] {
    background-color: red;
}
```

### 伪元素选择器
通过两个冒号(CSS3)来定义，通过CSS创建元素(行内)，必须有content属性
```css
div::before {
    content: '';
}
div::after {
    content: '';
}
```

### 伪类选择器
通过单个冒号来定义，它定义了元素的状态，如点击按下，点击完成等，通过伪类可以为元素的状态修改样式。
```css
a:link    {color:green;}
a:visited {color:green;}
a:hover   {color:red;}
a:active  {color:yellow;}
input:focus {color:yellow;} /* 鼠标移入输入框时的状态 */
```

## 字体和文本样式

### font
```css
div {
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
```

### text
```css
div {
    /* 内容水平对齐  */
    text-align：left; /* 默认left, 可选 center | right */

    /* 文本首行缩进 */
    text-indent: 40px;
    text-indent: 2em; /* 推荐：1em = 当前标签的font-size大小 */

    /* 下划线 */
    text-decoration: underline;
    /* 去除下划线 */
    text-decoration: none;

    /* 单行文字溢出省略号 */
    text-overflow: ellipsis;
    white-space: nowrap; /* 不换行 */
    overflow:hidden;
    /* 配合flex布局 */
    flex: 1;
    width: 0;

    /* 俩行文字溢出省略号 */
    webkit-line-clamp: 2;
}
```

### line-height
```css
div {
    /* 行高（文本、文本上间距、文本下间距的高度和） */
    line-height: 40px;
    line-height: 1.5; /* 当前标签font-size的倍数 */
    /* 单行文字垂直居中 */
    line-height = 行高
}
```

复合属性写法(size/line-height)
```css
div {
    font: 30px/1.5 Microsoft YaHei,sans-serif;
}
```

## background(背景)

### background-color(背景色)
```css
div {
    background-color: blue;
    background-color: #ffffff;
    background-color: rgb(255, 255, 255);
    background-color: rgba(255, 255, 255, 0.5);
}
```

### 背景图

```css
div {
    background-image: url();

    /* 背景图平铺(图片不足以铺满空间时是否复制多张以铺满) */
    background-repeat: repeat; /* repeat:平铺(默认值); no-repeat:不平铺; repeat-x:水平铺; repeat-y:垂直铺 */

    /* 背景图位置 */
    background-position: 水平 垂直; /* 水平:(?px)、left、center、right; 垂直: (?px)、top、center、bottom */
    
    /* 设置背景图大小 */
    background-size: 宽度 高度; /* 数字+px；百分比；contain:等比缩放到最大；cover:等比缩放到填满盒子 */
}
```

简写形式（复合属性），无先后顺序要求、可任意省略
```css
div {
    /* background: color image repeat position/size; */
    background: blue url() no-repeat left bottom/cover;
}
```

**图像拼合(精灵图)**
```css
div {
    width: 46px;
    height: 44px;
    background-image: url(./images/1.png);
    background-position: -40px -90px; /* 水平: 左负右正；垂直: 上正下负 */
    /* 在1.png (0 -90px)的位置裁剪一个宽46px, 高44px的图 */
}
```

**渐变色**
```css
/* 透明到黑色半透明渐变 */
div {
    background-image: linear-gradient(transparent, rgba(0,0,0, .6));
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

## flex布局(弹性布局)
float的替代 方案，无脱标问题，父元素添加`dispolay: flex;`，其子元素可以自动挤压或者拉伸。

### 基本概念
采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”
[](https://www.runoob.com/wp-content/uploads/2015/07/3791e575c48b3698be6a94ae1dbff79d.png)
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴(侧轴)（cross axis）。
**主轴**的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；
**交叉轴(侧轴)**的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列，宽高自适应，默认无间距。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

### 基本属性
- `flex-direction` 主轴的方向（即项目的排列方向，默认横向）
- `flex-wrap` 定义如果一条轴线排不下，如何换行
- `flex-flow` flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
- `justify-content` 项目在主轴上的对齐方式
- `align-items` 定义项目在交叉轴上如何对齐
- `align-content` 定义了多根轴线的对齐方式

详情见[Flex 布局语法教程 | 菜鸟教程](https://www.runoob.com/w3cnote/flex-grammar.html)

**flex-direction**
```css
div {
    /* 修改主轴为垂直方向(侧轴变为水平方向) */
    flex-direction: column;
}
```

**flex-wrap**
```css
div {
    /* 弹性盒子换行(默认不换行，超出宽度自动减小在一行排布) */
    flex-wrap: wrap;
}
```

**justify-content**
```css
div {
    /* 水平居中 */
    justify-content: center;

    /* 间距在弹性盒子(子级)之间 */
    justify-content: space-between;

    /* 所有地方的间距都相等 */
    justify-content: space-evenly;

    /* 间距加在子级的两侧 */
    /* 视觉效果: 子级之间的距离是父级两头距离的2倍 */
    justify-content: space-around;
}
```

**align-content**
```css
div {
    /* 水平居中 */
    align-content: center;

    /* 间距在弹性盒子(子级)之间 */
    align-content: space-between;

    /* 间距加在子级的两侧 */
    /* 视觉效果: 子级之间的距离是父级两头距离的2倍 */
   align-content: space-around;
}
```

**align-items**
```css
div {
    /* 垂直居中 */
    align-items: center;

    /* 拉伸(元素被拉伸以适应容器),默认值 */
    align-items: stretch;
}
```

**align-self**
控制单个弹性盒子在侧轴的对齐方式，属性同align-items

**flex**
```css
div {
    /* 占用父级剩余尺寸的份数 */
    flex: 3;
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

### cursor(光标)
- `default`：默认值，通常是箭头
- `pointer`：小手，提示可以点击
- `text`：工字型，提示可以输入
- `move`：十字光标，提示可以移动

### border-radius(边框圆角)
左上角开始，顺时针赋值，少值看对角
```css
div {
    border-radius: 10px;
    border-radius: 10px, 40px;
    border-radius: 10px, 40px, 60px;
    border-radius: 10px, 40px, 60px, 80px;
}
```

### border-image(边框图片)
```css
.box {
    border-image-source: url(image.jpg);
    border-image-slice: 7 12 14 5; /* 九宫格分割图片 */
    border-image-width: 5% 2em 10% auto; /* 边框图片宽度，不挤压内容 */
    border-image-repeat: stretch; /* 默认值。定义图片如何填充边框(stretch:拉伸 repeat:平铺 round:铺满) */
}
```

### text-shadow(文字阴影)
- `h-shadow` 必需。水平阴影的位置。允许负值。
- `v-shadow` 必需。垂直阴影的位置。允许负值。
- `blur` 可选。模糊的距离。
- `color` 可选。阴影的颜色
```css
h1 {
    text-shadow: 2px 2px #ff0000;
}
```

### box-shadow(盒子阴影)
- `h-shadow` 必需的。水平阴影的位置。允许负值
- `v-shadow` 必需的。垂直阴影的位置。允许负值
- `blur` 可选。模糊度
- `spread` 可选。阴影的大小
- `color` 可选。阴影的颜色。在CSS颜色值寻找颜色值的完整列表
- `inset` 可选。将外侧阴影改为内侧阴影
```css
div {
    box-shadow: 10px 10px 5px #888888 inset;
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


### overflow(内容溢出部分显示效果)
- `visible`：默认值，溢出部分可见
- `hidden`：溢出部分隐藏
- `scroll`：无论是否溢出都显示滚动条
- `auto`：根据是否溢出，自动显示或隐藏滚动条

### opacity(元素透明)
```css
div {
    opacity: 0.5; /* 0-1 */
}
```

### transition(过渡效果)
配合hover使用, 谁变化谁加过渡属性
```css
.box {
    width: 200px;
    height: 200px;
    background-color: pink;
    /* 宽度200, 悬停的时候宽度600, 花费1秒钟 */
    /* transition: width 1s, background-color 2s; */

    /* 如果变化的属性多, 直接写all,表示所有 */
    transition: all 1s;
}

.box:hover {
    width: 600px;
    background-color: red;
}
```

### transform

**transform(鼠标掠过时的动作效果，谁变化加谁身上)**
```css
div {
    /* 移动 */
    transform: translate(x, y); /* 平面移动 */
    transform: translate3d(x, y, z); /* 空间移动 */
    transform: translate(移动距离); /* 单值表示只在x轴移动 */
    transform: translateX(移动距离); /* 在x轴移动 */
    transform: translateY(移动距离); /* 在y轴移动 */
    transform: translateZ(移动距离); /* 在z轴移动 */

    /* 旋转 */
    transform: rotate(180deg); /* 取值0~360deg */
    transform: rotateX(180deg);
    transform: rotateY(180deg);
    transform: rotateZ(180deg); /* 效果同rotate */
    transform: rotate3d(x, y, z, 180deg); /* 自定义旋转轴，即原点到(x,y,z)的连线，x, y, z 取值0~1 */

    /* 缩放 */
    transform: scale(x轴缩放倍数, y轴缩放倍数);
    transform: scale(缩放倍数);
    transform: scaleX(缩放倍数);
    transform: scaleY(缩放倍数);
    transform: scaleZ(缩放倍数);
    transform: scale3d(x轴缩放倍数, y轴缩放倍数, z轴缩放倍数);

    /* 车轮效果(复合属性中rotate会改变网页元素坐标轴向，所以要写在后面) */
    transform: translate() rotate();
}
```

**transform-**
```css
div {
    transform-origin: x y; /* 改变转换原点 */
    transform-style: preserve-3d; /* 立体空间效果，添加给父级 */
}
```

**perspective(透视)**
配合空间转换使用，添加给父级，实现近大远小，近实远虚效果
```css
div {
    perspective: 900px; /* 人眼到屏幕距离，一般取值800~1000 */
}
```

### animation(动画)

**定义动画：**
```css
/* 两个状态 */
@keyframes 动画名称 {
    from {} /* 动画初始状态和盒子初始状态相同时可省略，下同 */
    to {}
}

/* 多个状态 */
@keyframe 动画名称 {
    0% {}
    10% {}
    15% {}
    100% {}
}
```

**调用动画**
```css
div {
    animation: 
        动画名称 动画时长 速度曲线 延迟时间 重复次数 动画方向 执行完毕状态，
        动画2名称 动画2时长 ...;
    /* 不分先后，动画名称、动画时长为必须值,其他可省略 */
    /* 重复次数: infinite(无限循环) */
    /* 动画方向：alternate(往返执行一次) */
    /* 执行完毕状态：backwards(初始状态，默认值); forwards(结束状态) */

    /* 拆分属性 */
    animation-name: 动画名称;
    animation-duration: 动画时长;
    animation-timing-function: 速度曲线; /* steps(数字) 表示逐帧动画 */
    animation-iteration-count: infinite;
    animation-play-state: paused; /* 暂停动画 */
}
```

## 移动适配

### rem
1rem = 1html字号长度(px)

**基本原理**
```css
/* 1. 不同的视口, HTML标签字号不同, 字号是视口宽度的1/10 */
@media (width:320px) {
    html {
        font-size: 32px;
    }
}

@media (width:375px) {
    html {
        font-size: 37.5px;
    }
}


/* 2. 书写盒子尺寸, 单位rem */
.box {
    width: 5rem; /* 若视口宽为320px，5rem = 160 / 32，此时宽度为160px */
    height: 3rem;
    background-color: pink;
}
```

**flexible.js**
利用js自动设置不同视口的rem，来自淘宝开源
```js
(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
```

### vm/vh
rem升级版，视口宽高检测代码已集成到浏览器

1vw=1/100视口宽度
1vh=1/100视口高度

## 响应式布局

### 媒体查询
```css
/* 视口宽度小于等于768px， 网页背景色是粉色 */
@media (max-width: 768px) {
    body {
        background-color: pink;
    }
}

/* 视口宽度大于等于1200px， 网页背景色是skyblue */
@media (min-width: 1200px) {
    body {
        background-color: skyblue;
    }
}
```
**注意：**由于CSS的层叠性，max-width要从大到小写，min-width要从小到大写。

link引入CSS写法
```html
<!-- 视口宽度 >= 992px，one.css生效 -->
<!-- 视口宽度 >= 1200px，two.css生效 -->
<link rel="stylesheet" href="./one.css" media="(min-width: 992px)">
<link rel="stylesheet" href="./two.css" media="(min-width: 1200px)">
```

## 常用
```css
/* 去掉列表符号 */
ul {
    list-style: none;
}

/* 隐藏元素 */
div {
    display: none;
}

/* 文本域 */
textarea {
    resize:none; /* 禁止拖动 */
}
```

**vertical-align(垂直对齐)**
适用于行内、行内块、图片之间的对齐
- `baseline`：基线对齐(默认) 
- `top`：顶部对齐
- `middle`：中部对齐
- `bottom`：底部对齐

## 其他

### CSS书写顺序(效率更高)
1. 定位 / 浮动 / display
2. 盒子模型
3. 文字属性

### 元素层级关系
- 不同布局方式：标准流 < 浮动 < 定位
- 不同定位：层级相同，写在HTML下面的元素会覆盖上面的元素，可通过`z-lndex`属性(整数，取值越大越靠上)改变顺序