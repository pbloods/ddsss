---
title: Markdown 速查手册
categories:
  - 代码手册
tags:
  - markdown
abbrlink: 3342699425
date: 2022-01-18 14:27:01
top_img: false
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/markdown.png
---

## 参考
- [Markdown 官方教程](https://markdown.com.cn/)
- [Markdown 语法对应的 HTML 标签实现](https://wuchenxu.com/2015/12/30/Markdown-html-compare/)

## 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
......

```

## 文本

### 基本类型
```markdown
*斜体文本*
或 _斜体文本_
**粗体文本**
或  __粗体文本__
***粗斜体文本***
或 ___粗斜体文本___
~~删除线~~
<u>带下划线的文本</u>
```

*斜体文本*
或 _斜体文本_
**粗体文本**
或  __粗体文本__
***粗斜体文本***
或 ___粗斜体文本___
~~删除线~~
<u>带下划线的文本</u>

### 引用文本
```
> 引用文本
> >嵌套引用文本
> > >套中套。。。
```

> 引用文本
> >嵌套引用文本
> > >套中套。。。

### 高亮文本

使用一对反引号能使行内部分文字高亮

```markdown
`html` `css` `javascript`
```
`html` `css` `javascript`

### 代码区块

用三个反引号 **```** 包裹一段代码，并指定一种语言（也可以不指定），指定代码语言后会有代码的颜色高亮

本代码区块为示例说明：

```markdown
​```javascript
function test() {
	alert('test')
}
​```
```

效果：

```javascript
function test() {
	alert('test')
}
```

### 角标(HTML)
```markdown
H<sub>2</sub>O  CO<sub>2</sub>
2<sup>10</sup> 10<sup>2</sup>
```
H<sub>2</sub>O  CO<sub>2</sub>
2<sup>10</sup> 10<sup>2</sup>

### 脚注

脚注是对文本的补充说明。

```markdown
需要添加脚注的文本[^脚注]

//用于解释说明脚注，自动添加在页脚
[^脚注]: 注明框内显示的内容
```
需要添加脚注的文本[^脚注]

[^脚注]: 注明框内显示的内容

## 链接

可使用相对路径（前提是有该路径下的文件）

### 基本链接
 + `[链接名称](链接网址)`
 + `[链接名称](链接网址 "文字说明")`
 + `<链接网址>`

文字说明通过鼠标悬浮链接上查看

```
[百度](https://www.baidu.com/)
[百度](https://www.baidu.com/ "百度搜索")
<https://www.baidu.com/>
```

[百度](https://www.baidu.com/)
[百度](https://www.baidu.com/ "百度搜索")
<https://www.baidu.com/>

### 锚点链接

每一个标题都是一个锚点，和HTML的锚点（`#`）类似

```markdown
[Markdown](#Markdown)
```

> 注： Github对含有标点符号的标题进行锚点时会忽略掉标点符号
> 如果这样写则无法跳转：\[链接](#九、链接)
> 正确写法：\[链接](#九链接)

## 图片

和链接的区别是前面多一个感叹号`!`

```markdown
![图片名](图片链接)
```

## 徽章

徽章是一种小巧精美的图标，一般配有相关文字进行辅助说明，可对数据进行监控，链接跳转等，富有表现力。

常见于`github`项目主页，但其不仅出现于 `github` 项目主页，凡是能够表现图片的地方都可以出现徽章。

```markdown
格式:
[![图片文字说明](图片源地址)](超链接地址)  # 即超链接内部嵌套图片

语法：
[![github](https://img.shields.io/badge/github-pbloods-brightgreen)](https://github.com/pbloods)
```
[![github](https://img.shields.io/badge/github-pbloods-brightgreen)](https://github.com/pbloods)

徽章生成网站：<https://shields.io/>

>如想设置图片宽高，可以使用 `<img>` 标签。

```html
<img src="https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/logo.png" width="50px" height="50px">
```

<img src="https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/logo.png" width="50px" height="50px">

## 列表

### 无序列表

`*`、`+`或者`-`加空格

```markdown
- 第一项
- 第二项
- 第三项
```

### 有序列表

`数字.`+`空格`

```markdown
1. 第一项
2. 第二项
3. 第三项
```

### 带复选框列表

```markdown
* [x] 第一项
* [ ] 第二项
* [ ] 第三项
```

- [x] 第一项
- [ ] 第二项
- [ ] 第三项

### 嵌套列表

```markdown
1. 第一项：
	- 第一项嵌套的第一个元素
	- 第一项嵌套的第二个元素
2. 第二项：
	- 第二项嵌套的第一个元素
	   - 第三层嵌套
```

1. 第一项：
	- 第一项嵌套的第一个元素
	- 第一项嵌套的第二个元素
2. 第二项：
	- 第二项嵌套的第一个元素
	   - 第三层嵌套

## 表格

制作表格使用 `|`来分隔不同的单元格，使用`-`来分隔表头和其他行

```markdown
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
```

|  表头  |  表头  |
| :----: | :----: |
| 单元格 | 单元格 |
| 单元格 | 单元格 |

**对齐方式：**

- **-:** 设置内容和标题栏居右对齐
- **:-** 设置内容和标题栏居左对齐
- **:-:** 设置内容和标题栏居中对齐

```markdown
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```

| 左对齐 | 右对齐 | 居中对齐 |
| :----- | -----: | :------: |
| 单元格 | 单元格 |  单元格  |
| 单元格 | 单元格 |  单元格  |

## 段落

	在需要段落缩进的文本前面使用2个Tab，类似代码块效果，里面不支持Markdown语法，不好使

## 换行

直接回车即可

## 分隔线

在Markdown 分隔线需要使用`*` 或`-`或`_`来建立

都需要三个及其以上，可以在中间插入空格，但不能在行内存在其他内容，当前后都有段落时，请空出一行

```shell
* * *
- - - 
_ _ _

***
```

* * *
- - - 
_ _ _

***

## 目录

在需要目录出现的地方（一般在文章一开始）放置一个`[toc]`标记，会自动生成一个嵌套的包含所有标题的列表。

**代码示例：**

```
[toc]

```

## 注释

在Markdown中，注释可以自定义

 + 可以使用html语法注释<!--哈哈我是注释，不会在浏览器中显示。-->
 + 可以使用`*[·-·]:注释内容`格式进行注释，其中[]中的内容可以自定义

这些注释在代码段中无效，代码块中注释是根据所指定语言进行注释

```

<!--注释，不会显示-->
[comment]: <> (注释，不会显示)
[//]: <> (注释，不会显示)
[//]: # (注释，不会显示)
*[^_^]:注释，不会显示
*[@_@]:注释，不会显示

```

## 支持的 HTML 元素

不在 Markdown 语法涵盖范围之内的标签，都可以直接在文档里面用 HTML 撰写。

目前支持的 HTML 元素有：`<kbd> <b> <i> <em> <sup> <sub> <br>`等等 ，如：

```markdown
使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑
```

使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑

<b>我是使用b标签的加粗字体</b>

[一组Markdown中混用HTML案例](https://ucren.com/blog/archives/747)

### 位置(HTML)

```HTML
<div align=left> 左对齐 </div>
<div align=right> 右对齐 </div>
<div align=center> 居中 /<div>
<center> 居中 </center>
```
<div align=left> 左对齐 </div>
<div align=right> 右对齐 </div>
<div align=center> 居中 </div>
<center> 居中 </center>


### 折叠(HTML)

```markdown
<details>
<summary>点我打开关闭折叠</summary>
 折叠内容
 <ul>
	 <li>1</li>
	 <li>2</li>
	 <li>3</li>
 </ul>
</details>
```

> 注意：\<details\> 标签内写markdown代码无效，可写html代码，如ul>li、table等

<details>
<summary>点我打开关闭折叠</summary>
 折叠内容
 <ul>
	 <li>1</li>
	 <li>2</li>
	 <li>3</li>
 </ul>
</details>

<details>
<summary>包含table的折叠</summary>
	<table>
		<thead>
			<tr>
				<th align="center">分类</th>
				<th align="center">例词</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td align="center">人称代词-主格</td>
				<td align="center">I我，you你，he他，she她，they他们， we我们</td>
			</tr>
			<tr>
				<td align="center">人称代词-宾格</td>
				<td align="center">me我， you你， him他， her她， them他们， us我们</td>
			</tr>
			<tr>
				<td align="center">物主代词</td>
				<td align="center">my我的， his他的， your你的（your你们的）， their他们的， hers她的</td>
			</tr>
			<tr>
				<td align="center">指示代词</td>
				<td align="center">this这， that那， these这些， those 那些</td>
			</tr>
			<tr>
				<td align="center">反身代词</td>
				<td align="center">myself我自己， himself他自己， themselves他们自己， yourself你(们)自己，herself她自己</td>
			</tr>
			<tr>
				<td align="center">疑问代词</td>
				<td align="center">who谁， what什么， which哪个</td>
			</tr>
			<tr>
				<td align="center">不定代词</td>
				<td align="center">some一些， many许多， both两个、两个都， any许多</td>
			</tr>
			<tr>
				<td align="center">关系代词</td>
				<td align="center">which……的物， who……的人， that……的人或物， who谁， that引导定语从句</td>
			</tr>
			<tr>
				<td align="center">相互代词</td>
				<td align="center">each other 互相， one another互相</td>
			</tr>
			<tr>
				<td align="center">连接代词</td>
				<td align="center">who,whom,whose,what,which,whatever,whichever,whoever,whomever</td>
			</tr>
			<tr>
				<td align="center">替代词</td>
				<td align="center">one（单数），ones（复数）</td>
			</tr>
		</tbody>
	</table>
</details>

## 转义

Markdown 使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用反斜杠转义字符：

```markdown
**未转义星号显示加粗**
\*\* 转义显示星号 \*\*
```

**未转义星号显示加粗**
\*\* 转义显示星号 \*\*