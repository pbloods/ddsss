---
title: CSS 速查手册
categories:
  - 代码手册
tags:
  - css
top_img: false
abbrlink: 4102532533
date: 2022-01-28 14:27:01
---

**参考：**

* [CSS教程 | 菜鸟教程](https://www.runoob.com/css/css-tutorial.html)
* [CSS基础教程 | 简单教程](https://www.twle.cn/l/yufei/css/css-basic-index.html)
* [CSS教程 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)

## 选择器

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

/* 后代选择器(p是div的后代选择器) */
div p {
    color: red;
}
/* 子代选择器(p是div的子选择器) */
div>p {
    color: red;
}

/* 并集选择器 */
div, p {
    color: red;
}
/* 交集选择器 */
div.ClassName {
    color: red;
}

/* hover伪类选择器(鼠标悬停效果) */
div:hover {
    color: red;
}
```

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
    text-align: 40px;
    text-align: 2em; /* 推荐：1em = 当前标签的font-size大小 */

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

## 
```css
div {
    /* 标签(div、p、h)水平居中 */
    margin: 0 auto;
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

## 元素显示模式
元素显示模式分为块级元素(div、p、h、ul、li、dl、dt、dd、form、header、nav、footer...)、行内元素(a、span、strong、ins...)、行内块元素(input、textarea、button、select...)，彼此之间可以转换。
```css
div {
    display: block; /* 转换成块级元素 */
    display: inline-block; /* 转换成行内块元素 */
    display: inline; /* 转换成行内元素 */
}
```