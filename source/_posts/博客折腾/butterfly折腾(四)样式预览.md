---
title: butterfly折腾(四)样式预览
categories:
  - 博客折腾
tags:
  - hexo
keywords: 'hexo,butterfly,blog,主题,doc,教程,文档'
cover: 'https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/hexo.png'
top_img: false
abbrlink: 2199701271
date: 2022-04-13 08:36:02
---

>大部分样式是主题独有的功能，还有些是通过安装插件、修改源码实现的，基本只适用于此博客，如需要将文章发布在其它平台，不建议大量使用。

## 外挂标签

### tabs

{% tabs test2 %}

<!-- tab 语法 -->
**tab名字为第一个Tab**
<!-- endtab -->

<!-- tab @fab fa-apple-pay -->
**只有图标 没有Tab名字**
<!-- endtab -->

<!-- tab 炸弹@fas fa-bomb -->
**名字+icon**
<!-- endtab -->
{% endtabs %}

**示例源码：**
```plaintext
{% tabs test2 %}
<!-- tab 第一个Tab -->
**tab名字为第一个Tab**
<!-- endtab -->

<!-- tab @fab fa-apple-pay -->
**只有图标 没有Tab名字**
<!-- endtab -->

<!-- tab 炸弹@fas fa-bomb -->
**名字+icon**
<!-- endtab -->
{% endtabs %}
```

### timeline

{% timeline 2022 %}
<!-- timeline 04-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}
{% timeline 2022,blue %}
<!-- timeline 03-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}
{% timeline 2021,pink %}
<!-- timeline 07-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}

{% tabs test2 %}

<!-- tab 语法 -->

```
{% timeline title,color %}
<!-- timeline title -->
xxxxx
<!-- endtimeline -->
<!-- timeline title -->
xxxxx
<!-- endtimeline -->
{% endtimeline %}
```

<!-- endtab -->

<!-- tab 参数 -->
1. 标题：title
2. 颜色：default(留空) / blue / pink / red / purple / orange / green
<!-- endtab -->

<!-- tab 示例源码 -->

```md
{% timeline 2022 %}
<!-- timeline 04-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}

{% timeline 2022,blue %}
<!-- timeline 03-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}

{% timeline 2021,pink %}
<!-- timeline 07-02 -->
这是测试页面
<!-- endtimeline -->
{% endtimeline %}
```

<!-- endtab -->

{% endtabs %}

### btn

<div class="btn-center">
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,blue larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,pink larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,red larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,purple larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,orange larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,green larger %}
</div>

{% tabs test1 %}
<!-- tab 语法 -->
```
{% btn [url],[text],[icon],[color] [style] [layout] [position] [size] %}
```
<!-- endtab -->

<!-- tab 参数 -->
`url`：链接
`text`：按钮文字
`icon`：[可选]图标
`color`：[可选] 按钮背景顔色 默认style，按钮字体和边框顔色(outline时) default/blue/pink/red/purple/orange/green
`style`：[可选] 按钮样式 默认实心（outline/留空）
`layout`：[可选] 按钮佈局 默认为line（block/留空） 
`position`：[可选] 按钮位置 前提是设置了layout为block 默认为左边（center/right/留空） 
`size`：[可选] 按钮大小 (larger/留空)
<!-- endtab -->

<!-- tab 示例源码 -->
```
<div class="btn-center">
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,blue larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,pink larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,red larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,purple larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,orange larger %}
{% btn 'https://butterfly.js.org',Butterfly,far fa-hand-point-right,green larger %}
</div>
```
<!-- endtab -->
{% endtabs %}

### note

{% tabs test1 %}
<!-- tab flat 样式 -->
{% note flat %}
默认 提示块标籤
{% endnote %}

{% note default flat %}
default 提示块标籤
{% endnote %}

{% note primary flat %}
primary 提示块标籤
{% endnote %}

{% note success flat %}
success 提示块标籤
{% endnote %}

{% note info flat %}
info 提示块标籤
{% endnote %}

{% note warning flat %}
warning 提示块标籤
{% endnote %}

{% note danger flat %}
danger 提示块标籤
{% endnote %}

**flat样式示例源码**
```
{% note flat %}
默认 提示块标籤
{% endnote %}

{% note default flat %}
default 提示块标籤
{% endnote %}

{% note primary flat %}
primary 提示块标籤
{% endnote %}

{% note success flat %}
success 提示块标籤
{% endnote %}

{% note info flat %}
info 提示块标籤
{% endnote %}

{% note warning flat %}
warning 提示块标籤
{% endnote %}

{% note danger flat %}
danger 提示块标籤
{% endnote %}
```
<!-- endtab -->

<!-- tab disabled 样式 -->
{% note disabled %}
默认 提示块标籤
{% endnote %}

{% note default disabled %}
default 提示块标籤
{% endnote %}

{% note primary disabled %}
primary 提示块标籤
{% endnote %}

{% note success disabled %}
success 提示块标籤
{% endnote %}

{% note info disabled %}
info 提示块标籤
{% endnote %}

{% note warning disabled %}
warning 提示块标籤
{% endnote %}

{% note danger disabled %}
danger 提示块标籤
{% endnote %}

**disabled样式示例源码**
```
{% note disabled %}
默认 提示块标籤
{% endnote %}

{% note default disabled %}
default 提示块标籤
{% endnote %}

{% note primary disabled %}
primary 提示块标籤
{% endnote %}

{% note success disabled %}
success 提示块标籤
{% endnote %}

{% note info disabled %}
info 提示块标籤
{% endnote %}

{% note warning disabled %}
warning 提示块标籤
{% endnote %}

{% note danger disabled %}
danger 提示块标籤
{% endnote %}
```

<!-- endtab -->

<!-- tab modern 样式 -->
{% note 'fab fa-cc-visa' modern %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' modern %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' modern %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' modern%}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' modern %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' modern %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' modern %}
前端最讨厌的浏览器
{% endnote %}

**modern样式示例源码**
```
{% note 'fab fa-cc-visa' modern %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' modern %}
2021年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' modern %}
小心开车 安全至上
{% endnote %}
{% note red 'fas fa-fan' modern%}
这是三片呢？还是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' modern %}
你是刷 Visa 还是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' modern %}
剪刀石头布
{% endnote %}
{% note green 'fab fa-internet-explorer' modern %}
前端最讨厌的浏览器
{% endnote %}
```
<!-- endtab -->
{% endtabs %}

### hide
{% tabs test1 %}
<!-- tab hideToggle -->
{% hideToggle 点击展开 %}
内容
{% endhideToggle %}

示例源码
```
{% hideToggle 点击展开 %}
内容
{% endhideToggle %}
```
<!-- endtab -->

<!-- tab hideInline -->
点击显示:{% hideInline 内容,显示,#FF7242,#fff %}

参数
```
{% hideInline content,display,bg,color %}

  content: 文本内容
  display: 按钮显示的文字 (可选)
  bg: 按钮的背景颜色 (可选)
  color: 按钮文字的颜色 (可选)
```

示例源码
```
点击显示:{% hideInline 内容,显示,#FF7242,#fff %}
```
<!-- endtab -->

<!-- tab hideBlock -->
{% hideBlock 点击显示 %}
内容
{% endhideBlock %}

示例源码
```
{% hideBlock 点击显示 %}
内容
{% endhideBlock %}
```
<!-- endtab -->
{% endtabs %}

### label

臣亮言：{% label 先帝 %}創業未半，而{% label 中道崩殂 blue %}。今天下三分，{% label 益州疲敝 pink %}，此誠{% label 危急存亡之秋 red %}也！然侍衞之臣，不懈於內；{% label 忠志之士 purple %}，忘身於外者，蓋追先帝之殊遇，欲報之於陛下也。誠宜開張聖聽，以光先帝遺德，恢弘志士之氣；不宜妄自菲薄，引喻失義，以塞忠諫之路也。
宮中、府中，俱為一體；陟罰臧否，不宜異同。若有{% label 作奸 orange %}、{% label 犯科 green %}，及為忠善者，宜付有司，論其刑賞，以昭陛下平明之治；不宜偏私，使內外異法也。

{% tabs test1 %}
<!-- tab 语法 -->
```
{% label text color %}
```
<!-- endtab -->

<!-- tab 参数 -->
`text`：文字
`color`：[可选]背景颜色，`default`/`blue`/`pink`/`red`/`purple`/`orange`/`green`
<!-- endtab -->

<!-- tab 示例源码 -->
```
臣亮言：{% label 先帝 %}創業未半，而{% label 中道崩殂 blue %}。今天下三分，{% label 益州疲敝 pink %}，此誠{% label 危急存亡之秋 red %}也！然侍衞之臣，不懈於內；{% label 忠志之士 purple %}，忘身於外者，蓋追先帝之殊遇，欲報之於陛下也。誠宜開張聖聽，以光先帝遺德，恢弘志士之氣；不宜妄自菲薄，引喻失義，以塞忠諫之路也。
宮中、府中，俱為一體；陟罰臧否，不宜異同。若有{% label 作奸 orange %}、{% label 犯科 green %}，及為忠善者，宜付有司，論其刑賞，以昭陛下平明之治；不宜偏私，使內外異法也。
```
<!-- endtab -->
{% endtabs %}

>以下标签移植于 volantis(v5)

### span

各种颜色的标签，包括：{% span red::红色 %}、{% span yellow::黄色 %}、{% span green::绿色 %}、{% span cyan::青色 %}、{% span blue::蓝色 %}、{% span gray::灰色 %}。

超大号文字：

{% span center logo large::Volantis %} {% span center small::A Wonderful Theme for Hexo %}

{% tabs test1 %}
<!-- tab 语法 -->
```md
{% span 样式参数::文本内容 %}
```
<!-- endtab -->
<!-- tab 参数 -->
颜色：`red`, `yellow`, `green`, `cyan`, `blue`, `gray`

大小：`small`, `h4`, `h3`, `h2`, `h1`, `large`, `huge`,`ultra`

对齐方向：`left`, `center`, `right`
<!-- endtab -->
<!-- tab 示例源码 -->
```md
各种颜色的标签，包括：{% span red::红色 %}、{% span yellow::黄色 %}、{% span green::绿色 %}、{% span cyan::青色 %}、{% span blue::蓝色 %}、{% span gray::灰色 %}。

超大号文字：

{% span center logo large::Volantis %} {% span center small::A Wonderful Theme for Hexo %}
```
<!-- endtab -->
{% endtabs %}

### checkbox

{% checkbox 纯文本测试 %}
{% checkbox checked::支持简单的 [markdown](https://guides.github.com/features/mastering-markdown/) 语法 %}
{% checkbox red::支持自定义颜色 %}
{% checkbox green checked::绿色 + 默认选中 %}
{% checkbox yellow checked::黄色 + 默认选中 %}
{% checkbox cyan checked::青色 + 默认选中 %}
{% checkbox blue checked::蓝色 + 默认选中 %}
{% checkbox plus green checked::增加 %}
{% checkbox minus yellow checked::减少 %}
{% checkbox times red checked::叉 %}

{% tabs test1 %}
<!-- tab 语法 -->
```md
{% checkbox 样式参数（可选）::文本（支持简单md） %}
```
<!-- endtab -->
<!-- tab 参数 -->
颜色：`red`, `yellow`, `green`, `cyan`, `blue`

选中状态：`checked`
<!-- endtab -->
<!-- tab 示例源码 -->
```md
{% checkbox 纯文本测试 %}
{% checkbox checked::支持简单的 [markdown](https://guides.github.com/features/mastering-markdown/) 语法 %}
{% checkbox red::支持自定义颜色 %}
{% checkbox green checked::绿色 + 默认选中 %}
{% checkbox yellow checked::黄色 + 默认选中 %}
{% checkbox cyan checked::青色 + 默认选中 %}
{% checkbox blue checked::蓝色 + 默认选中 %}
{% checkbox plus green checked::增加 %}
{% checkbox minus yellow checked::减少 %}
{% checkbox times red checked::叉 %}
```
<!-- endtab -->
{% endtabs %}

**radio**
同属于checkbox标签，使用方法同上

{% radio 纯文本测试 %}
{% radio checked::支持简单的 [markdown](https://guides.github.com/features/mastering-markdown/) 语法 %}
{% radio red::支持自定义颜色 %}
{% radio green::绿色 %}
{% radio yellow::黄色 %}
{% radio cyan::青色 %}
{% radio blue::蓝色 %}

### link

{% link 如何参与项目::https://volantis.js.org/contributors/::https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/logo.png %}

{% tabs test1 %}
<!-- tab 语法 -->
```md
{% link 标题::链接::图片链接（可选） %}
```
<!-- endtab -->
<!-- tab 示例源码 -->
```md
{% link 如何参与项目::https://volantis.js.org/contributors/::https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/logo.png %}
```
<!-- endtab -->
{% endtabs %}

### ghcard

**用户信息卡片**
| {% ghcard xaoxuu %} | {% ghcard xaoxuu::theme=vue %} |
| -- | -- |
| {% ghcard xaoxuu::theme=buefy %} | {% ghcard xaoxuu::theme=solarized-light %} |
| {% ghcard xaoxuu::theme=onedark %} | {% ghcard xaoxuu::theme=solarized-dark %} |
| {% ghcard xaoxuu::theme=algolia %} | {% ghcard xaoxuu::theme=calm %} |

**仓库信息卡片**
| {% ghcard volantis-x/hexo-theme-volantis %} | {% ghcard volantis-x/hexo-theme-volantis::theme=vue %} |
| -- | -- |
| {% ghcard volantis-x/hexo-theme-volantis::theme=buefy %} | {% ghcard volantis-x/hexo-theme-volantis::theme=solarized-light %} |
| {% ghcard volantis-x/hexo-theme-volantis::theme=onedark %} | {% ghcard volantis-x/hexo-theme-volantis::theme=solarized-dark %} |
| {% ghcard volantis-x/hexo-theme-volantis::theme=algolia %} | {% ghcard volantis-x/hexo-theme-volantis::theme=calm %} |

{% tabs test1 %}
<!-- tab 语法 -->
```md
{% ghcard 用户名::其它参数（可选） %}
{% ghcard 用户名/仓库::其它参数（可选） %}
```
<!-- endtab -->
<!-- tab 用户信息卡片源码 -->
```md
| {% ghcard xaoxuu %} | {% ghcard xaoxuu::theme=vue %} |
| -- | -- |
| {% ghcard xaoxuu::theme=buefy %} | {% ghcard xaoxuu::theme=solarized-light %} |
| {% ghcard xaoxuu::theme=onedark %} | {% ghcard xaoxuu::theme=solarized-dark %} |
| {% ghcard xaoxuu::theme=algolia %} | {% ghcard xaoxuu::theme=calm %} |
```
<!-- endtab -->
<!-- tab 仓库信息卡片源码 -->
```md
| {% ghcard volantis-x/hexo-theme-volantis %} | {% ghcard volantis-x/hexo-theme-volantis::theme=vue %} |
| -- | -- |
| {% ghcard volantis-x/hexo-theme-volantis::theme=buefy %} | {% ghcard volantis-x/hexo-theme-volantis::theme=solarized-light %} |
| {% ghcard volantis-x/hexo-theme-volantis::theme=onedark %} | {% ghcard volantis-x/hexo-theme-volantis::theme=solarized-dark %} |
| {% ghcard volantis-x/hexo-theme-volantis::theme=algolia %} | {% ghcard volantis-x/hexo-theme-volantis::theme=calm %} |
```
<!-- endtab -->
{% endtabs %}

## HTML 语法
>兼容 HTML 语法，可以直接使用

### 插入音乐
以[网易云](https://music.163.com/)为例
```
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="https://music.163.com/outchain/player?type=2&id=1455706958&auto=1&height=66"></iframe>
```

### 嵌入视频
```html
<video src="https://test.com/test.mp4" width="800px" height="600px" controls="controls"></video>
```

#### 嵌入自适应B站视频

B站官方已经提供了iframe标签，不用找接口爬链接了，在网页打开b站视频页，通过分享按钮就可以复制，直接引用的效果如下

<iframe src="//player.bilibili.com/player.html?aid=206890880&bvid=BV1Ah411z7Po&cid=378344365&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

这样肯定是不行的，我们需要添加一些参数使其适应我们的网站
```html
<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="//player.bilibili.com/player.html?aid=206890880&bvid=BV1Ah411z7Po&cid=378344365&page=1&as_wide=0&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
</div>
```

最终效果
<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="//player.bilibili.com/player.html?aid=206890880&bvid=BV1Ah411z7Po&cid=378344365&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
</div>

通过以上只能获取低清视频，而且获取不了番剧、影视等视频链接，获取高清视频可以参考 [晓晴博客](https://www.toubiec.cn/660.html)，[B站视频直链解析源码(PHP源码 包含前端解析源码)](https://github.com/Suxiaoqinx/Bilibili_video)

## DOM运动
>可使任意DOM运动起来

<i class="fas fa-home faa-wrench animated"></i> | <span class="fas fa-home faa-wrench animated">首页</span> | <span><i class="fas fa-home faa-wrench animated"></i>首页</span>

<i class="fa-solid fa-fan faa-spin animated"></i>

{% note success faa-float animated %}
默认 提示块标籤
{% endnote %}

{% tabs test2 %}

<!-- tab 语法 -->
```
[DOM类] [DOM元素] [参数]
```
<!-- endtab -->
<!-- tab 参数 -->
**运动逻辑(必需)**
`animated`：DOM加载完毕自动运动
`animated-hover`：鼠标悬停在图标上才运动

**运动模式(必需)**
`faa-wrench`：抖动
`faa-bounce`：上下滑动
`faa-spin`：顺时针旋转

更多参数及效果预览请 [点击这里](https://l-lin.github.io/font-awesome-animation/#animation-list)

**运动速度(可选)**
`faa-fast`：快速抖动
`faa-slow`：慢速抖动(默认)
<!-- endtab -->
<!-- tab 示例源码 -->
```
<i class="fas fa-home faa-wrench animated"></i> | <span class="fas fa-home faa-wrench animated">首页</span> | <span><i class="fas fa-home faa-wrench animated"></i>首页</span>

<i class="fa-solid fa-fan faa-spin animated"></i>

{% note success faa-float animated %}
默认 提示块标籤
{% endnote %}
```
<!-- endtab -->

{% endtabs %}