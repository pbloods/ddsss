---
title: butterfly折腾(二)基本设置
categories:
  - 博客折腾
tags:
  - hexo
keywords: 'hexo,butterfly,blog,主题,doc,教程,文档'
cover: 'https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/hexo.png'
abbrlink: 761922737
top_img: false
date: 2022-04-11 07:36:02
---

>官方主题基础功能设置与插件安装，不涉及主题源码修改

## 设置说明

为了减少升级主题后带来的不便，建议把主题目录的`themes/butterfly/_config.yml`文件复制一份,重命名为`_config.butterfly.yml`放到博客根目录，这样只需修改`_config.butterfly.yml`里的配置即可修改主题配置，无需改动主题源码。

**主题版本：**`Hexo_6.2.0` + `Buttrtfly_4.3.1`

**相关概念：**

站点配置文件：`_config.yml`
站点配置文件内部链接相对路径：`source`

主题配置文件：`themes/butterfly/_config.yml`
主题配置文件内部链接相对路径：`themes/butterfly/source`

## 主题设置

### 布局设置

#### 导航栏
修改`主题配置文件`
格式：`页面名字: /路径/ || 图标`
默认图标库：[Fontawesome 图标库](http://www.fontawesome.com.cn/faicons/)
```yml
menu:
  主页: / || fas fa-home
  索引||fas fa-book||hide:
    归档: /archives/ || fas fa-archive
    分类: /categories/ || fas fa-folder-open
    标签: /tags/ || fas fa-tags
  工具||fas fa-tools||hide:
    导航: https://nav.pblood.com/ || fa-solid fa-location-arrow
    Music: /music/ || fas fa-music
    Movie: /movies/ || fas fa-video
  友链: /link/ || fas fa-link
  关于: /about/ || fas fa-heart
```
{% note info flat %}
移动端导航栏子目录默认是展开的，如果你想要隐藏，在子目录里添加`hide`
{% endnote %}

#### 侧边栏
```yml
aside:
  enable: true  # 侧边栏总开关
  hide: false
  button: true  # 右下角小工具侧边栏按钮
  mobile: true  # 移动端侧边栏开关
  position: right # 侧边栏位置设置 left or right

  card_author:  # 社交卡片
    enable: true
    description:  # 社交卡片下面的描述，优先级高于站点配置文件中的 Site 字段
    button:
      enable: true
      icon: fas fa-book-open
      text: Pbloodの阅览室
      link: https://blog.pblood.com/

  card_announcement: # 公告栏卡片
    enable: false
    content: This is my Blog

  card_recent_post:  # 最新文章卡片
    enable: false
    limit: 5 # 展示数量设置，设0会展示所有，下同
    sort: date # 以date or updated排序
    sort_order: # 卡片排序，如果不配置，则默认为 0。数字越小，排序越靠前，下同

  card_categories:  # 分类卡片
    enable: true
    limit: 0
    expand: false # none/true/false
    sort_order:

  card_tags:  # 标签卡片
    enable: true
    limit: 40
    color: true # 是否开启彩色标签
    sort_order:

  card_archives:  # 归档卡片
    enable: false
    type: monthly # yearly or monthly
    format: MMMM YYYY # eg: YYYY年MM月
    order: -1 # Sort of order. 1, asc for ascending; -1, desc for descending
    limit: 8
    sort_order:

  card_webinfo:
    enable: true
    post_count: true
    last_push_date: true
    sort_order:
```

### 功能设置

#### 站点信息
修改`站点配置文件`，`Ctrl+F`搜索`title:`
```yml
# Site
title: Pbloodの小岛
subtitle: ''
description: '' # 社交卡片昵称下面的描述
keywords:
author: Pblood  # 社交卡片昵称
language: zh-CN # zh-CN（简体中文），en（英文），zh-TW（繁体中文）
timezone: ''
```

#### 社交图标
社交卡片底部图标
修改`主题配置文件`，格式：`icon: link || the description`
```yml
social:
  fab fa-github: https://github.com/pbloods || Github
  fas fa-envelope: mailto:pblood@qq.com || Email
```

#### 文章锚点
>打开文章锚点后，当你滚动文章页面时，文章链接会根据标题ID进行替换，用于文章的快速定位。

修改`主题配置文件`
```yml
anchor: true
```

#### 评论系统
>此处使用的是waline，[waline搭建教程](https://waline.js.org/)。

waline搭建完毕后修改`主题配置文件`
```yml
comments:
  # Up to two comments system, the first will be shown as default
  # Choose: Disqus/Disqusjs/Livere/Gitalk/Valine/Waline/Utterances/Facebook Comments/Twikoo/Giscus
  use: Waline # Valine,Disqus
  text: true # Display the comment name next to the button
  # lazyload: The comment system will be load when comment element enters the browser's viewport.
  # If you set it to true, the comment count will be invalid
  lazyload: false # 是否为评论开启 lazyload，开启后，只有滚动到评论位置时才会加载评论所需要的资源（开启 lazyload 后，评论数将不显示）
  count: false # 是否在文章顶部显示评论数
  card_post_count: false # 是否在首页文章卡片显示评论数

waline:
  serverURL: https://waline-fawn-xi.vercel.app/ # 改成自己的 waline 地址
  bg: https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/comment_bg.png # waline 背景
  pageview: true
  option:
```

waline 官方的 CDN 地址，可用于加速
```yml
CDN:
  option:
    waline_js: https://unpkg.com/@waline/client@v2/dist/waline.js
    waline_css: https://unpkg.com/@waline/client@v2/dist/waline.css
```

#### 页脚设置

修改`主题配置文件`
```yml
footer:
  owner:
    enable: true
    since: 2021
  custom_text: 结束即是开始
  copyright: false # Copyright of theme and framework
```

#### 运行时间
修改`主题配置文件`
```yml
runtimeshow:
  enable: true
  publish_date: 5/20/2022 13:14:00
```

#### 广告设置
{% tabs test2 %}
<!-- tab 谷歌广告 -->
主题集成谷歌广告（自动广告）
修改`主题配置文件`
```yml
google_adsense:
  enable: true
  auto_ads: true
  js: https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js
  client: # 填入个人识别码
  enable_page_level_ads: true
```
<!-- endtab -->

<!-- tab 自定义广告 -->
主题预留了三个位置可供插入广告，分别为主页文章(每三篇文章出现广告)/aside公告之后/文章页打赏之后。把html代码填写到对应的位置

修改`主题配置文件`
```yml
ad:
  index:
  aside:
  post:
```
例如:
```yml
index: <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="xxxxxxxxxxxx" data-ad-client="ca-pub-xxxxxxxxxx" data-ad-slot="xxxxxxxxxx"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script>
```
[](https://gcore.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-ad-post.png)
[](https://gcore.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-ad-index.png)
<!-- endtab -->
{% endtabs %}

### 美化/特效

#### 主题色
修改`主题配置文件`
```yml
theme_color:
  enable: true
  main: "#343a40"
#   paginator: "#00c4b6"
#   button_hover: "#FF7242" 按钮悬停颜色
#   text_selection: "#00c4b6" # 文本选中颜色
#   link_color: "#99a9bf" # 链接颜色
#   meta_color: "#858585"
#   hr_color: "#A4D8FA"
#   code_foreground: "#F47466"
#   code_background: "rgba(27, 31, 35, .05)"
#   toc_color: "#00c4b6" # 目录颜色
  blockquote_padding_color: "#49b175" # 默认引用块颜色
#   blockquote_background_color: "#49b1f5" # 默认引用块背景颜色，不设置则继承引用块颜色
#   scrollbar_color: "#49b1f5" # 滚动条颜色
#   meta_theme_color_light: "#ffffff"
#   meta_theme_color_dark: "#0d0d0d"
```

#### 代码容器
修改`主题配置文件`
```yml
highlight_theme: mac #  darker / pale night / light / ocean / mac / mac light / false
highlight_copy: true # copy button
highlight_lang: true # show the code language
highlight_shrink: false # true: shrink the code blocks / false: expand the code blocks | none: expand code blocks and hide the button
highlight_height_limit: 800 # unit: px
code_word_wrap: false
```

#### 图片设置
修改`主题配置文件`
```yml
# 网站图标
favicon: https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/logo.png

# 社交卡片头像
avatar:
  img: https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/logo.png
  effect: false

# 主页 banner 背景
index_img: https://w.wallhaven.cc/full/z8/wallhaven-z83g9o.jpg

# 默认 banner，当页面的 top_img 没有配置时，默认的显示
default_top_img:

# 文章封面设置
cover:
  # display the cover or not (是否顯示文章封面)
  index_enable: true
  aside_enable: true
  archives_enable: true
  # the position of cover in home page (封面顯示的位置)
  # left/right/both
  position: left
  # 当沒有设置cover时，默认的封面显示)
  default_cover:
         - https://pblood.oss-cn-hongkong.aliyuncs.com/img/cover/cover1.webp
         - https://pblood.oss-cn-hongkong.aliyuncs.com/img/cover/cover2.webp

# 404 页面（本地环境不显示）
error_404:
  enable: true
  subtitle: 'Page Not Found'
  background: https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/404.png

# 背景图片
background: url(https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/background.webp)

# 关闭 archive 页面 banner
archive_img: false
# 关闭子标签页面 banner
tag_img: false
# 关闭子分类页面 banner
category_img: false
```

#### 网页加载动画
修改`主题配置文件`
```yml
enter_transitions: false
```

#### 标题图标
修改`主题配置文件`
```yml
beautify:
  enable: true
  field: post # site/post 作用范围，全站/文章
  title-prefix-icon: \f863 # 标题图标，"\f863" 是 fontawesome 的图标代号
  title-prefix-icon-color: # 标题图标颜色 默认"#F47466"
```

#### 首页标题下一行字
修改`主题配置文件`
```yml
subtitle:
  enable: true
  # Typewriter Effect (打字效果)
  effect: true
  # loop (循環打字)
  loop: true
  # source 調用第三方服務
  # source: false 關閉調用
  # source: 1  調用一言網的一句話（簡體） https://hitokoto.cn/
  # source: 2  調用一句網（簡體） http://yijuzhan.com/
  # source: 3  調用今日詩詞（簡體） https://www.jinrishici.com/
  # subtitle 會先顯示 source , 再顯示 sub 的內容
  source: false
  # 如果關閉打字效果，subtitle 只會顯示 sub 的第一行文字
  sub:
    - The end is the beginning.
    - 我记住了他的气味、他的样子、他的声音，但我始终不知道他的名字。
```

## 常用插件

### 永久链接插件

[hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink) 可使文章拥有唯一永久链接，不会因移动文件位置而改变链接，有利于搜索和分享

1. 安装
```shell
npm install hexo-abbrlink --save
```
2. 打开`站点配置文件`，搜索`permalink:`，替换为以下内容
```yml
permalink: posts/:abbrlink/ # 替换原来的permalink配置
abbrlink:
  alg: crc32 #support crc16(default) and crc32
  rep: dec #support dec(default) and hex
```
{% note info flat %}
Front Matter`需要包含`title`字段才会自动添加链接
{% endnote %}

### 音乐播放器插件

[hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer)是[APlayer](https://github.com/DIYgod/APlayer)播放器的`Hexo`标签插件，可以十分方便地在文章内插入音乐播放器。

最新版本支持MeingJS。[MetingJS](https://github.com/metowolf/MetingJS) 是基于[Meting API](https://github.com/metowolf/Meting) 的`APlayer`衍生播放器，引入`MetingJS`后，播放器将支持局部对 QQ音乐、网易云音乐、虾米、酷狗、百度等平台的音乐播放，而且配置很简单，下面就采用这种办法引入音乐播放器。

1. 安装
```shell
npm install --save hexo-tag-aplayer
```
2. 打开站点配置文件，添加以下内容
```yaml
aplayer:
  meting: true  # 启用MetingJS
```
3. 接着就可以通过 `{% meting ...%}` 在文章中使用 MetingJS 播放器了

**参数列表:**
| 选项          | 默认值     | 描述                                                        |
| ------------- | ---------- | ----------------------------------------------------------- |
| id            | **必须值** | 歌曲 id / 播放列表 id / 相册 id / 搜索关键字                |
| server        | **必须值** | 音乐平台: `netease`, `tencent`, `kugou`, `xiami`, `baidu`   |
| type          | **必须值** | `song`, `playlist`, `album`, `search`, `artist`             |
| fixed         | `false`    | 开启固定模式                                                |
| mini          | `false`    | 开启迷你模式                                                |
| loop          | `all`      | 列表循环模式：`all`, `one`,`none`                           |
| order         | `list`     | 列表播放模式： `list`, `random`                             |
| volume        | 0.7        | 播放器音量                                                  |
| lrctype       | 0          | 歌词格式类型                                                |
| listfolded    | `false`    | 指定音乐播放列表是否折叠                                    |
| storagename   | `metingjs` | LocalStorage 中存储播放器设定的键名                         |
| autoplay      | `true`     | 自动播放，移动端浏览器暂时不支持此功能                      |
| mutex         | `true`     | 该选项开启时，如果同页面有其他 aplayer 播放，该播放器会暂停 |
| listmaxheight | `340px`    | 播放列表的最大长度                                          |
| preload       | `auto`     | 音乐文件预载入模式，可选项： `none`, `metadata`, `auto`     |
| theme         | `#ad7a86`  | 播放器风格色彩设置                                          |

**示例：**
单首歌曲 (id, server, type)
```
{% meting "1845504308" "netease" "song" %}
```
歌曲列表
```
{% meting "60198" "netease" "playlist" "autoplay" "mutex:false" "listmaxheight:340px" "preload:none" "theme:#ad7a86"%}
```

### 本地搜索插件

1. 安装[hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
```shell
npm install hexo-generator-search --save
```
2. 修改`主題配置文件`
```yml
local_search:
  enable: true
  preload: false  # 预加载，开启后，进入网页后会自动加载搜索文件。 关闭时，只有点击搜索按钮后，才会加载搜索文件
  CDN:  # 搜索文件的 CDN 地址（默认使用的本地链接）
```

### js 本地化插件

主题大量引用了`jsdelivr`的链接，默认是`cdn.jsdelivr.net`，由于`jsdelivr`在国内备案被吊销，所以域名经常被墙，直接导致我们的网站访问异常，这个时候就需要修改CDN了，主题默认将自带的 js 资源本地化，对于用户安装的第三方插件里的js，可以通过安装`hexo-butterfly-extjs`插件实现js本地化。

1. 安装
```shell
npm i hexo-butterfly-extjs
```
2. 修改主题配置文件
```yml
CDN:
  third_party_provider: local
```

如果仍然有链接没有被替换，我们直接手动替换，下面是可替代的 CDN 域名
- `gcore.jsdelivr.net`
- `fastly.jsdelivr.net`
- `jsdelivr.pai233.top` 网友搭建的反向代理服务

### 文章加密插件
[hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt) 是一个 hexo 博客专用的加密插件，支持多种主题

1. 安装
```shell
npm install --save hexo-blog-encrypt
```
2. 修改`站点配置文件`
```yml
# Security
encrypt: # hexo-blog-encrypt
  abstract: 有东西被加密了, 请输入密码查看.
  message: 您好, 这里需要密码.
  tags:
  - {name: tagName, password: 密码A}
  - {name: tagName, password: 密码B}
  theme: xray
  wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
  wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
```
3. 使用
在文章`front matter`填上`password`字段即可，例
```yml
---
title: Hello World
date: 2016-03-30 21:18:02
password: hello
---
```

## 其它技巧

### 跳过渲染
> Hexo默认会对`/source/`里的所有页面应用主题模板渲染，但有一些前端作品或demo页我们不希望经过渲染，而是能保持完全自定义的样子

**方法一：在 Front Matter 里加入以下代码**
```yml
---
layout: false
---
```

**方法二：修改站点配置文件`_config.yml`**
找到`skip_render`字段，配置需要跳过渲染的文件或者目录，注意文件或者目录要放在`source`目录下
示例：
```yml
# 不渲染 source/test.html
skip_render: test.html
# 不渲染 source/test 目录下的所有文件
skip_render: test/*
# 不渲染 source/test 目录下的所有文件包括子文件夹以及子文件夹内的文件
skip_render: test/**
# 多文件目录写法
skip_render:
  - text.html
  - text/*
```
修改了配置但生成出来的内容不一定及时应用了新配置，最好在生成之前执行一下`hexo clean`命令，清除掉旧的生成文件和缓存。

设置完成后通过`https://pblood.com/test/`就能访问了

{% note success flat %}
注意：通过`https://pblood.com/test/`访问，`index.html`引用资源的相对路径是相对于`/test`目录的；
而通过`https://pblood.com/test`访问，`index.html`引用资源的相对路径是相对于`/source`目录的。
想要两种方式都能访问只能以链接的方式引用资源文件
{% endnote %}