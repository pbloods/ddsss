---
title: HTML 速查手册
categories:
  - 代码手册
tags:
  - HTML
top_img: false
abbrlink: 4102532533
date: 2022-01-18 14:27:01
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/html.png
---

**参考：**
* [HTML教程(HTML5 标准) | 菜鸟教程](https://www.runoob.com/html/html-tutorial.html)
- [HTML5 参考手册 | 简单教程](https://www.twle.cn/l/yufei/htmlref/html-ref-reference.html)
- [HTML 全部标签 | 简单教程](https://www.twle.cn/l/yufei/htmltag/html-tag-comment.html)
* [HTML 元素参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
* [HTML 属性参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes)

## HTML 基本结构
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- 移动端视口标签，使视口宽度等于设备宽度（默认值980px） -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>标题</title>
</head>
<body>
  主体
</body>
</html>
```

## 基本的标签
```html
<h1>最大的标题</h1>
<h2> . . . </h2>
<h3> . . . </h3>
<h4> . . . </h4>
<h5> . . . </h5>
<h6>最小的标题</h6>

<p>这是一个段落</p>
<br> （换行）
<hr> （水平线）
<!-- 这是注释 -->
```

## 文本格式化标签
```html
<!-- 常用 -->
<strong>粗体文本(强调)</strong>
<em>倾斜文本(强调)</em>
<del>删除文本(强调)</del>
<ins>带下划线的文本(强调)</ins>

<small>小文本</small>
<mark>高亮文本</mark>
<sub>下标文本</sub>
<sup>上标文本</sup>

<!-- 不常用 -->
<dfn>定义项目</dfn>
<code>一段电脑代码 print("Hello World")</code>
<samp>计算机样本</samp>
<kbd>键盘输入</kbd>
<var>变量</var>

<!-- 废弃 -->
<b>粗体文本</b>
<i>斜体文本</i>
<s>删除文本</s>
<u>带下划线的文本</u>
```

## 链接
```html
普通的链接：<a href="http://www.example.com/">链接文本</a>
带描述的链接：<a href="http://www.example.com/" title="描述文本">链接文本</a>
邮件链接：  <a href="mailto:webmaster@example.com">发送e-mail</a>

在新的窗口打开链接
<a href="https://pblood.com/" target="_blank">在新窗口访问Pblood'Blog!</a>
在当前窗口打开链接
<a href="https://pblood.com/" target="_self">在当前窗口访问Pblood'Blog!</a>

锚文本：
<a id="tips">提示部分</a>
<a href="#tips">跳到提示部分</a>

<!-- 当开发网站初期, 我们还不知道跳转地址的时候, href的值写#(空链接) -->
<a href="#">空链接</a>
```

## 图片
```html
<img src="URL" alt="替换文本" height="42" width="42">
```

## 音频/视频
```html
<audio src="./music.mp3" controls loop></audio>

<video src="./video.mp4" controls autoplay muted loop></video>
<!-- 
1、controls属性：显示控制组件
2、loop属性：循环播放
3、muted属性：静音播放
4、preload属性：页面加载在播放
5、width/heigth属性：视频的宽高
6、autoplay属性：自动播放 -->
<video width="100px" height="100px" onerror="fn()" controls >
        <source src="movie.mp4" type="video/mp4">
        <source src="#" type="">
        Your brower does not support.
    </video>
```

## 区块
```html
<!-- 无语义，独占一行 -->
<div>文档中的块级元素</div>
<!-- 无语义，一行显示 -->
<span>文档中的内联元素</span>
```

## 样式
```html
<style>
.div {
    margin-top: 20px;
    color: blue;
}
</style>
```

## 列表

无序列表
```html
<ul>
    <li>项目</li>
    <li>项目</li>
</ul>
```

有序列表
```html
<ol>
    <li>第一项</li>
    <li>第二项</li>
</ol>
```

定义列表
```html
<dl>
  <dt>项目 1</dt>
    <dd>描述项目 1</dd>
  <dt>项目 2</dt>
    <dd>描述项目 2</dd>
</dl>
```

## 表格
```html
    <table border="1" width="400" height="400">
        <!-- 表格整体的大标题 -->
        <caption><h3>优秀学生信息表格</h3></caption>
        <!-- 表格的头部 -->
        <thead>
          <tr>
            <th>年级</th>
            <th>姓名</th>
            <th>学号</th>
            <th>班级</th>
          </tr>
        </thead>
        <!-- 表格的主体 -->
        <tbody>
          <tr>
            <!-- 保留 -->
            <td rowspan="2">高三</td>
            <td>张三</td>
            <td>110</td>
            <td>三年二班</td>
          </tr>
          <tr>
            <!-- 删除 -->
            <!-- <td>高三</td> -->
            <td>赵四</td>
            <td>120</td>
            <td>三年三班</td>
          </tr>
        </tbody>
        <!-- 表格的底部 -->
        <tfoot>
          <tr>
            <td>评语</td>
            <!-- 保留 -->
            <td colspan="3">你们都很优秀</td>
            <!-- 统统删除掉 -->
            <!-- <td>你们都很优秀</td> -->
            <!-- <td>你们都很优秀</td> -->
          </tr>
        </tfoot>
      </table>
      <!-- <thead>、<tbody> 和 <tfoot> 元素默认不会影响表格的布局，一般用于定义CSS样式，改变表格的局部外观。 -->
```

**通过CSS实现细线边框效果**
```css
table {
  border: 1px soild #000;
  border-collapse: collapse;
}
th, td {
  border: 1px soild #000;
}
```

## 框架
```html
<iframe src="demo_iframe.htm"></iframe>
```

## 表单
```html
<form action="demo_form.php" method="post/get">

  <!-- 输入框 -->
  <input type="text" name="email" size="40" maxlength="50" placeholder="请输入文本内容">
  <input type="password" placeholder="请输入密码">
  <!-- 单选（checked默认选中） -->
  <input type="checkbox" checked>
  <input type="radio" checked>
    <!-- lable标签可将标签包裹的文本和input绑定，扩大选择范围，name值相同实现单选 -->
    <label>
      <input type="radio" name="sex">男
    </label>
    <label>
      <input type="radio" name="sex">女
    </label>
  <!-- 提交、重置、input自定义按钮与button实现方法 -->
  <input type="submit" value="提交"> || <button type="submit">提交</button>
  <input type="reset" value="重置"> || <button type="reset">重置</button>
  <input type="button" value="自定义按钮"> || <button>自定义按钮</button>
  <!-- 上传文件（multiple多文件上传） -->
  <input type="file" multiple>

  <!-- 下拉框 -->
  <select>
    <option>苹果</option>
    <option selected>香蕉</option>
    <option>樱桃</option>
  </select>

  <!-- 文本域（输入多行文本，cols:宽度；rows:可见行数） -->
  <textarea name="comment" cols="20" rows="60"></textarea>

</form>
```

## HTML 实体
```html
&nbsp; 等同于`空格`
&lt; 等同于 <
&gt; 等同于 >
&#169; 等同于 ©
```