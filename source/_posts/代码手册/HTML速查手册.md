---
title: HTML 速查手册
categories:
  - 代码手册
tags:
  - html
top_img: false
abbrlink: 4102532533
date: 2022-01-18 14:27:01
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/html.png
---

## 参考
- [HTML教程(HTML5 标准) | 菜鸟教程](https://www.runoob.com/html/html-tutorial.html)
- [HTML5 参考手册](https://www.twle.cn/l/yufei/htmlref/html-ref-reference.html)
- [HTML 全部标签](https://www.twle.cn/l/yufei/htmltag/html-tag-comment.html)

## HTML 基本结构
```html
<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>文档标题</title>
</head>
<body>
可见文本...
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
<strong>重要的文本（加粗）</strong>
<code>计算机代码</code>
<em>强调文本</em>
<i>斜体文本</i>
<kbd>键盘输入</kbd>
<pre>预格式化文本</pre>
<small>更小的文本</small>


<abbr> （缩写）
<address> （联系信息）
<bdo> （文字方向）
<blockquote> （从另一个源引用的部分）
<cite> （工作的名称）
<del> （删除的文本）
<ins> （插入的文本）
<sub> （下标文本）
<sup> （上标文本）
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
<!-- 谷歌浏览器视频自动播放必须是静音状态muted -->
```

## 样式
```html
<<style>
h1{color:red;}p{color:blue;}</style>
```

## 区块
```html
<div>文档中的块级元素</div>
<span>文档中的内联元素</span>
```

## 无序列表
```html
<ul>
    <li>项目</li>
    <li>项目</li>
</ul>
```

## 有序列表
```html
<ol>
    <li>第一项</li>
    <li>第二项</li>
</ol>
```

## 定义列表
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
      <!-- <thead>、<tbody> 和 <tfoot> 元素默认不会影响表格的布局，一般用于为这些元素定义CSS样式，改变表格的局部外观。 -->
```

## 框架
```html
<iframe src="demo_iframe.htm"></iframe>
```

## 表单
```html
<form action="demo_form.php" method="post/get">
  <input type="text" name="email" size="40" maxlength="50" placeholder="请输入文本内容">
  <input type="password">
  <input type="checkbox" checked="checked">
  <input type="radio" checked="checked">

  <!-- lable标签可将标签包裹的文本和输入input动作绑定 -->
  <label>
    <input type="radio" name="sex" checked>男
  </label>
  <label>
    <input type="radio" name="sex">女
  </label>

  <input type="submit" value="发送">
  <input type="reset">
  <input type="hidden">

  <!-- 下拉框 -->
  <select>
    <option>苹果</option>
    <option selected="selected">香蕉</option>
    <option>樱桃</option>
  </select>
  
  <!-- 文本区域（多行文本） -->
  <textarea name="comment" rows="60" cols="20"></textarea>
</form>
```

## HTML 实体
```html
&nbsp; 等同于`空格`
&lt; 等同于 <
&gt; 等同于 >
&#169; 等同于 ©
```