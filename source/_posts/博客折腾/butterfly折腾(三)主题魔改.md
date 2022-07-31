---
title: butterfly折腾(三)主题魔改
categories:
  - 博客折腾
tags:
  - hexo
keywords: 'hexo,butterfly,魔改,主题,教程,美化'
cover: 'https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/hexo.png'
top_img: false
abbrlink: 506262125
date: 2022-04-12 07:36:02
---

>通过挂载 CSS、JS 或者修改主题源来实现更多功能，折腾就完事了

## 魔改说明

主要通过挂载 CSS、JS 的方法魔改，尽可能少地修改主题源码，给升级造成困难

**butterfly主题挂载 CSS、JS 方法：**
打开主题配置文件，搜索`inject:`，在对应位置挂载`css`或者`js`文件即可。这是 buterfly 主题特有的挂载方法，十分方便

1. 在`themes/butterfly/source/css/`目录下创建一个`pblood.css`文件（可自定义名称），里面填写 CSS 代码；
在`themes/butterfly/source/js/`目录下创建一个`pblood.js`文件（可自定义名称），里面填写 js 代码。js 文件访问异常容易造成阻塞，所以尽可能少用。
2. 修改`主题配置文件`
```yml
inject:
  head: # 挂载 css
    - <link rel="stylesheet" href="/css/pblood.css">
  bottom: # 挂载 js
    - <script src="/js/pblood.js"></script>
```

- [pug中文教程](https://www.pugjs.cn/language/attributes.html)
- [网页模板 pug 的基本语法](https://www.wzhecnu.cn/2021/09/16/blog/wang-ye-mo-ban-pug-ji-ben-yu-fa/)

## 布局修改

### 导航栏居中

**方法一：**
```css
#nav .menus_items {
    position: absolute;
    width: fit-content;
    left: 50%;
    transform: translateX(-50%);
}
```

**方法二(源)：**

修改`themes\butterfly\layout\includes\header\nav.pug`
```pug
nav#nav
  #nav-group
    span#blog_name
      a#site-name(href=url_for('/')) #[=config.author]

    #menus
      !=partial('includes/header/menu_item', {}, {cache: true})

    #nav-right
      if (theme.algolia_search.enable || theme.local_search.enable)
        #search-button
          a.nav-rightbutton.site-page.social-icon.search
            i.fas.fa-search.fa-fw
        #toggle-menu
          a.nav-rightbutton.site-page
            i.fas.fa-bars.fa-fw
```

```js
function switchDarkMode() {
    "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? (activateDarkMode(),
        saveToLocal.set("theme", "dark", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)) : (activateLightMode(),
        saveToLocal.set("theme", "light", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)),
    "function" == typeof utterancesTheme && utterancesTheme(),
        "object" === ("undefined" == typeof FB ? "undefined" : _typeof(FB)) && window.loadFBComment(),
        window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout(function() {
            return window.disqusReset()
        }, 200)
}
```

```css
/*导航栏居中*/
#nav-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

#nav #blog_name {
    -webkit-flex: none;
    flex: none;
}

div#nav-right {
    display: flex;
}

#darkmode_navswitch, #nav #nav-right #search-button, #toggle-menu {
    width: 44px;
    height: 44px;
    text-align: center;
}
```

### 首页横向双栏布局
>参考: https://zfe.space/post/52914.html

1. 修改主题配置文件
```yml
cover:
  # the position of cover in home page (封面顯示的位置)
  # left/right/both
  position: left
```
2. 修改样式
```css
/*首页文章双栏布局*/
@media screen and (min-width: 1300px) {
    #recent-posts {
        margin-top: -1.25rem;/*第一排间距调整，若有磁贴或日历请注释掉该行*/
        align-content: flex-start;
        display: flex;
        flex-wrap: wrap;/*规定灵活的项目在必要的时候拆行或拆列。*/
        justify-content: space-between;
        width: 80%;
    }

    #recent-posts>.recent-post-item {
        margin-top: 1.25rem;/*左边第一列间距调整*/
        display: flex;
        flex-direction: row;
        height: 15em;/*文章容器容器高度*/
        width: 49.5%;/*文章容器容器宽度*/
    }

    #recent-posts>.recent-post-item .post_cover {
        width: 40%;/*图片封面宽度*/
        height: 100%;/*图片封面高度*/
    }

    #recent-posts>.recent-post-item .post_cover img.post_bg {
        width: 100%;/*图片宽度*/
        height: 100%;/*图片高度*/
    }

    #recent-posts>.recent-post-item .left_radius {
        border-radius: 8px 8px 0 0;/*圆角修改*/
    }

    #recent-posts>.recent-post-item .right_radius {
        border-radius: 8px 8px 0 0;/*圆角修改*/
    }

    .recent-post-info {

        padding: 0 20px!important;/*文字容器左右间距*/
        margin-top: 1em;/*文字容器上间距*/
        width: 60% !important;/*文字容器宽度*/

    }


    #recent-posts>.recent-post-item>.recent-post-info>.article-meta-wrap {
        margin-bottom: 1rem;/*控制标题meta信息的底部间距*/
    }

    /*底部页码导航居中*/
    #pagination {
        overflow: hidden;
        margin-top: 1rem;
        width: 100%;
    }

    /*内页容器加宽*/
    .layout#content-inner {
        max-width: 1450px;
    }

    #aside-content {
        width: 20%;
        padding-left: 0.8rem;/*侧边栏与首页文章容器距离*/
    }
    /*文章内页居中显示*/
    .layout {
        display: flex;
        justify-content: center;
        padding: .5rem 1.5rem;
    }

}
```

### 渐变色分类页布局(源)
>[预览](https://blog.leonus.cn/categories/)，参考：[hexo博客相关 | Leonus](https://blog.leonus.cn/2022/hexo.html)

#### 样式修改
将`themes\butterfly\source\css\_page\categories.styl`内容全部替换即可
```styl
.category-lists
  .category-title
    font-size: 2.57em

    +maxWidth768()
      font-size: 2em

  .category-list
    margin-bottom: 0

    a
      color: white

      &:hover
        color: $text-hover

      &::before 
        content: '|';
        color: #fff;
        margin: -2px 10px 0 0

      &::after
        content: '';
        position: relative;
        width: 0;
        bottom: 0;
        display: block;
        height: 3px;
        border-radius: 3px;
        background-color: #fff;

    .category-list-count
      margin-left: 8px
      color: white
      &:before
        content: '\f02d'
        padding-right: 15px
        font-size: 1.3rem;
        font: var(--fa-font-solid);

      &:after
        content: '';

  ul
    padding: 0 
    display: flex
    flex-wrap: wrap

    li
      font-weight: 600;
      padding: 0 2rem;
      display: flex;
      -webkit-box-pack: center;
      justify-content: space-evenly;
      -webkit-box-orient: vertical;
      flex-direction: column;
      height: 130px;
      font-size: 1.5rem;
      width: 30%;
      margin: 10px 1.66%;
      list-style: none;
      border-radius: 15px;
      align-items: flex-start;

      &:hover
        a
          &::after
            width: 100%;
            transition: all .5s;
        
      &:nth-child(1)
        background: linear-gradient(to right, rgb(251, 215, 134), rgb(247, 121, 125));
      
      &:nth-child(2)
        background: linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61));
      
      &:nth-child(3)
        background: linear-gradient(to right, rgb(255, 110, 127), rgb(191, 233, 255)); 
      
      &:nth-child(4)
        background: linear-gradient(to right, rgb(239, 50, 217), rgb(137, 255, 253));
      
      &:nth-child(5)
        background: linear-gradient(to right, rgb(192, 192, 170), rgb(28, 239, 255));
      
      &:nth-child(6)
        background: linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113));

      @media screen and (max-width: 950px)
          width: 46%
          margin: 10px 2%

      @media screen and (max-width: 768px)
          width: 95%
          margin: 10px 2.5%

//自适应布局
@media screen and (max-width: 950px)
  .category-lists ul li
    width: 46%;
    margin: 10px 2%;

@media screen and (max-width: 768px)
  .category-lists ul li
      width: 95%;
      margin: 10px 2.5%;

//所有页面标题居中显示
#page
  h1.page-title
    text-align: center
```

#### 关闭分类和标签页的侧边栏
>为分类和标签页添加一个侧边栏总开关，参考：[Butterffly 分类页和标签页隐藏侧栏 | Eurkon](https://blog.eurkon.com/post/d498d8b1.html)
1. 修改主题配置文件（默认false关闭状态，值为true时启用侧边栏）
```diff
aside:
  enable: true
  hide: false
  button: true
  mobile: true # display on mobile
  position: right # left or right
+ categories: false # 分类页侧栏开关
+ tags: false # 标签页侧栏开关
```
2. 添加判断代码，修改`\themes\butterfly\layout\includes\layout.pug`
```diff
    - var htmlClassHideAside = theme.aside.enable && theme.aside.hide ? 'hide-aside' : ''
    - page.aside = is_archive() ? theme.aside.archives : page.aside // - 归档页隐藏侧栏
+   - page.aside = is_category() || page.type === 'categories' ? theme.aside.categories : page.aside // - 分类页隐藏侧栏
+   - page.aside = is_tag() || page.type === 'tags' ? theme.aside.tags : page.aside // - 标签页隐藏侧栏
    - var hideAside = !theme.aside.enable || page.aside === false ? 'hide-aside' : ''
    - var pageType = is_post() ? 'post' : 'page'
```

### 自用子页面布局(源)
1. 使标题显示在日期上方，修改`themes\butterfly\layout\includes\mixins\article-sort.pug`
```diff
mixin articleSort(posts)
  .article-sort
    - var year
    - posts.each(function (article) {
      - let tempYear = date(article.date, 'YYYY')
      - let no_cover = article.cover === false || !theme.cover.archives_enable ? 'no-article-cover' : ''
      - let title = article.title || _p('no_title')
      if tempYear !== year
        - year = tempYear
        .article-sort-item.year= year
      .article-sort-item(class=no_cover)
        if article.cover && theme.cover.archives_enable
          a.article-sort-item-img(href=url_for(article.path) title=title)
            img(src=url_for(article.cover) alt=title onerror=`this.onerror=null;this.src='${url_for(theme.error_img.post_page)}'`)
        .article-sort-item-info
+          a.article-sort-item-title(href=url_for(article.path) title=title)= title        
          .article-sort-item-time
            i.far.fa-calendar-alt
            time.post-meta-date-created(datetime=date_xml(article.date) title=_p('post.created') + ' ' + full_date(article.date))= date(article.date, config.date_format)
-         a.article-sort-item-title(href=url_for(article.path) title=title)= title
    - })
```
2. 待更新

### Eurkon子页面布局(源)
样式 [预览](https://blog.eurkon.com/categories/%E4%BD%9C%E5%93%81%E6%A1%88%E4%BE%8B/)，参考：[Butterfly 分类标签归档页增加文章索引 | Eurkon](https://blog.eurkon.com/post/27df86b.html)

1. 修改文章渲染函数`\themes\butterfly\layout\includes\mixins\article-sort.pug` 
```diff
- mixin articleSort(posts)
+ mixin articleSort(posts, current)
    .article-sort
      - var year
      - posts.each(function (article) {
        - let tempYear = date(article.date, 'YYYY')
        - let no_cover = article.cover === false || !theme.cover.archives_enable ? 'no-article-cover' : ''
        - let title = article.title || _p('no_title')
        if tempYear !== year
          - year = tempYear
          .article-sort-item.year= year
        .article-sort-item(class=no_cover)
          if article.cover && theme.cover.archives_enable
            a.article-sort-item-img(href=url_for(article.path) title=title)
              img(src=url_for(article.cover) alt=title onerror=`this.onerror=null;this.src='${url_for(theme.error_img.post_page)}'`)
          .article-sort-item-info
            .article-sort-item-time
              i.far.fa-calendar-alt
              time.post-meta-date-created(datetime=date_xml(article.date) title=_p('post.created') + ' ' + full_date(article.date))= date(article.date, config.date_format)
            a.article-sort-item-title(href=url_for(article.path) title=title)= title
+           span.article-sort-item-index= (current - 1) * config.per_page + post_index + 1
      - })
```

2. 修改归档、分类、标签页面
归档页面`\themes\butterfly\layout\archive.pug`
```diff
extends includes/layout.pug

block content
  include ./includes/mixins/article-sort.pug
  #archive
    .article-sort-title= _p('page.articles') + ' - ' + site.posts.length
-   +articleSort(page.posts)
+   +articleSort(page.posts, page.current)
    include includes/pagination.pug
```
分类页面`\themes\butterfly\layout\archive.pug`
```diff
extends includes/layout.pug

block content
  if theme.category_ui == 'index'
    include ./includes/mixins/post-ui.pug
    #recent-posts.recent-posts.category_ui   
      +postUI
      include includes/pagination.pug    
  else
    include ./includes/mixins/article-sort.pug
    #category
      .article-sort-title= _p('page.category') + ' - ' + page.category
-     +articleSort(page.posts)
+     +articleSort(page.posts, page.current)
      include includes/pagination.pug
```
标签页面`\themes\butterfly\layout\tag.pug`
```diff
extends includes/layout.pug

block content
  if theme.tag_ui == 'index'
    include ./includes/mixins/post-ui.pug
    #recent-posts.recent-posts
      +postUI
      include includes/pagination.pug
  else
    include ./includes/mixins/article-sort.pug
    #tag
      .article-sort-title= _p('page.tag') + ' - ' + page.tag
-     +articleSort(page.posts)
+     +articleSort(page.posts, page.current)
      include includes/pagination.pug
```

3. 修改样式`\themes\butterfly\source\css\_page\archives.styl`，大概在 100 行的位置，增加`.article-sort-item-index`的样式
```diff
.article-sort
  margin-left: 10px
  padding-left: 20px
  border-left: 2px solid lighten($light-blue, 20)

  &-title
    position: relative
    margin-left: 10px
    padding-bottom: 20px
    padding-left: 20px
    font-size: 1.72em

    &:hover
      &:before
        border-color: var(--pseudo-hover)

    &:before
      position: absolute
      top: calc(((100% - 36px) / 2))
      left: -9px
      z-index: 1
      width: w = 10px
      height: h = w
      border: .5 * w solid $light-blue
      border-radius: w
      background: var(--card-bg)
      content: ''
      line-height: h
      transition: all .2s ease-in-out

    &:after
      position: absolute
      bottom: 0
      left: 0
      z-index: 0
      width: 2px
      height: 1.5em
      background: lighten($light-blue, 20)
      content: ''

  &-item
    position: relative
    display: flex
    align-items: center
    margin: 0 0 20px 10px
    transition: all .2s ease-in-out

    &:hover
      &:before
        border-color: var(--pseudo-hover)

    &:before
      $w = 6px
      position: absolute
      left: calc(-20px - 17px)
      width: w = $w
      height: h = w
      border: .5 * w solid $light-blue
      border-radius: w
      background: var(--card-bg)
      content: ''
      transition: all .2s ease-in-out

    &.no-article-cover
      height: 80px

      .article-sort-item-info
        padding: 0

    &.year
      font-size: 1.43em

      &:hover
        &:before
          border-color: $light-blue

      &:before
        border-color: var(--pseudo-hover)

    &-time
      color: $theme-meta-color
      font-size: 95%

      time
        padding-left: 6px
        cursor: default

    &-title
      @extend .limit-more-line
      color: var(--font-color)
      font-size: 1.1em
      transition: all .3s
      -webkit-line-clamp: 2

      &:hover
        color: $text-hover
        transform: translateX(10px)

+   &-index
+     opacity: .5
+     position: absolute
+     top: .5rem
+     right: .5rem
+     font-style: italic
+     font-size: 2.5rem
+     line-height: 1.5rem

    &-img
      overflow: hidden
      width: 80px
      height: 80px

      img
        @extend .imgHover

    &-info
      flex: 1
      padding: 0 16px
```

### 底部页码导航(源)
底部页码导航下一页按钮靠右显示，修改`theme\butterfly\source\css\_layout\pagination.styl`
```styl
#pagination
  .pagination
    position: relative
    margin-top: 20px
    text-align: center
    
  .page-number
    &.current
      background: $button-bg
      color: var(--white)

  .pagination-info
    position: absolute
    top: 50%
    padding: 20px 40px
    width: 100%
    transform: translate(0, -50%)

  .prev_info,
  .next_info
    @extend .limit-one-line
    color: var(--font-color)
    font-weight: 500

  .next-post
    .pagination-info
      text-align: right

  .pull-full
    width: 100% !important

  .prev-post .label,
  .next-post .label
    color: var(--font-color)
    text-transform: uppercase
    font-size: 90%

  .prev-post,
  .next-post
    @extend .postImgHover
    width: 50%

    +maxWidth768()
      width: 100%

    a
      position: relative
      display: block
      overflow: hidden
      height: 150px

  &.pagination-post
    overflow: hidden
    margin-top: 40px
    width: 100%
    background: $dark-black

.layout
  & > .recent-posts
    .pagination
      & > *
        display: inline-block
        margin: 0 6px
        width: w = 2.5em
        height: w
        line-height: w

      & > *:not(.space)
        @extend .cardHover


  & > div
    .pagination
      .page-number,.next,.prev
        color: var(--font-color)
        box-shadow: none !important
        border-radius: 8px;
        display: inline-block
        margin: 0 6px
        width: 2.5rem;
        height: 2.5rem
        text-align: center
        line-height: 2.5rem
        cursor: pointer
        border: 1px solid #e3e8f7 

        &:hover
          background: var(--btn-bg)
          color: white !important
          
      .next,.prev
        width: 4rem !important
        position: absolute
        right: 0
        
        @media screen and (max-width: 768px)
          width: 2.5rem !important
          position:relative

      .prev
        left: 0
```

### 底部分类导航栏(源)

修改`\theme\butterfly\layout\includes\footer.pug`
```pug
#footer_icon
  .icon_left
    a.icon_link(href="https://github.com/Lea321" title="我的Github主页")
      i.fa-brands.fa-github.fa-fw
      
    a.icon_link(href="/star" title="收藏夹")
      i.fa-solid.fa-star.fa-fw

  img.footer_logo(src='https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/logo.png' onclick="btf.scrollToDest(0,500)" title="返回顶部")

  .icon_left
    a.icon_link(href="/" title="我的主页")
      i.fa-solid.fa-compass.fa-fw

    a.icon_link(href="https://res.abeim.cn/api/qq/?qq=12345" title="联系QQ")
      i.fa-brands.fa-qq.fa-fw

    a.icon_link(href="/wechat/" title="联系微信")
      i.fa-brands.fa-weixin.fa-fw
    
    a.icon_link(href="mailto:12345@qq.com" title="联系邮箱")
      i.fa-solid.fa-envelope.fa-fw

#leonus-footer
  .footer-group
    h3.footer-title 直达
    .footer-links
      a.footer-item(href="/") 我的主页
      a.footer-item(href="/talk") 空间说说
      a.footer-item(href="/wallpaper") 壁纸收藏
      a.footer-item(href="/bg") 切换背景
  .footer-group
    h3.footer-title 分类
    .footer-links
      a.footer-item(href="/categories/博客相关") 博客相关
      a.footer-item(href="/categories/学习笔记") 学习笔记
      a.footer-item(href="/categories/实用教程") 实用教程
      a.footer-item(href="/categories/生活记录") 生活记录
      a.footer-item(href="/categories/随便写写") 随便写写
  .footer-group
    h3.footer-title 关于
    .footer-links
      a.footer-item(href="/about/#关于我") 关于我
      a.footer-item(href="/about/#访问统计") 站点统计
      a.footer-item(href="/archives") 文章归档
      a.footer-item(href="/update") 更新记录
  .footer-group#friend-links-in-footer
    h3.footer-title 友链
    .footer-links
      a.footer-item(href="xxx") xxx
      a.footer-item(href="xxx") xxx
      a.footer-item(href="/link") 查看更多
#footer-bottom
  .footer-bottom-links
    .footer-bottom-left
      #runtime
    .footer-bottom-right
      a.footer-bottom-link(href="https://hexo.io/zh-cn/" title="框架") Hexo
      a.footer-bottom-link |
      a.footer-bottom-link(href="https://butterfly.js.org/" title="主题") Butterfly
      a.footer-bottom-link |
      a.footer-bottom-link(href="https://beian.miit.gov.cn/" title="备案号") 豫ICP备xxx号
```

```css
#footer {
  background: linear-gradient(180deg,var(--heo-background) 0,var(--heo-card-bg) 25%);
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 101;
}

div#footer_icon {
  justify-content: center;
  display: flex;
  padding-top: 2rem;
  align-items: center;
}

#footer_icon i {
  padding-top: 1px;
  font-size: 20px;
  color: #fff;
  transition: .3s;
}

#footer_icon, #leonus-footer {
  margin: auto;
  max-width: 1200px;
  width: 97%;
}

.icon_left, .icon_right {
  display: flex;
}

a.icon_link {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  background-color: var(--font-color);
  border-radius: 3rem;
}

img.footer_logo {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 0 1rem;
  cursor: pointer;
  filter: drop-shadow(0 0 12px rgba(187, 138, 64, .35));
  transition: cubic-bezier(0, 0, 0, 1.29) .5s;
  transition: all .25s;
}

#leonus-footer {
  border-radius: 0 0 15px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  padding: 0 2rem 2rem;
}

#leonus-footer .footer-group {
  min-width: 120px;
}

#leonus-footer .footer-links {
  display: flex;
  flex-direction: column;
}

#leonus-footer .footer-item {
  font-size: 1rem;
  line-height: 1;
  margin: .38rem 0;
  color: var(--font-color);
}

#footer-bottom {
  font-size: 1rem;
  padding: 1rem;
  color: var(--font-color);
  margin-top: 1rem;
  background: var(--card-bg);
  display: flex!important;
  overflow: hidden;
  z-index: 1002;
  transition: .3s;
  border-top: 1px solid #e3e8f7;
}


#footer-bottom .footer-bottom-left {
  display: flex;
  flex-wrap: wrap;
  min-height: 32px;
  color: var(--font-color);
  font-weight: 700;
  white-space: nowrap;
}

#footer-bottom .footer-bottom-right {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#footer-bottom .footer-bottom-links {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
}

#footer-bottom .footer-bottom-link {
  margin-right: 1rem;
  color: var(--font-color);
  font-weight: 700;
  white-space: nowrap;
}
```

## 功能拓展

### 引入 iconfont 图标
通过`font-class`方式引入阿里图标，默认无色，后台可开启彩色图标，单一项目内彩色图标个数上限40个

1. 拷贝项目下面生成的`font-class 代码，如：
```yml
//at.alicdn.com/t/font_3348844_6k3vcwzq4su.css
```
2. 修改主题配置文件
```yml
inject:
  head: # 挂载css
    # - <link rel="stylesheet" href="/xxx.css">
    - <link rel="stylesheet" href="//at.alicdn.com/t/font_3348844_6k3vcwzq4su.css">
  bottom: # 挂载js
    # - <script src="xxxx"></script>
```
3. 使用
```md
iconfont icon-xxx
```

### Volantis 5 标签移植
>参考：[Volantis: 标签插件](https://volantis.js.org/v5/tag-plugins/#span)

#### span
1. 复制`span.js`到`themes\butterfly\scripts\tag`目录
2. 复制`span.styl`到`themes\butterfly\source\css\_tags\`目录

**注意：**字体 logo, code 参数无效

#### checkbox
方法同上

#### link
方法同上

#### ghcard
方法同上

### 浏览器搞笑标题
```js
// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = 'ヽ(●-`Д´-)ノ你要走嘛我好伤心！';
        clearTimeout(titleTime);
    }
    else {
        document.title = '(Ő∀Ő3)ノ哇喔！欢迎！' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});
```

### 首页哔哔(源)
参考文章：[Hexo博客哔哔更换记录 | Leonus](https://blog.leonus.cn/2022/bb.html)

### 分类标签导航栏(源)
>给分类标签添加一个导航栏，参考：[Butterfly 分类标签导航栏 | Eurkon](https://blog.eurkon.com/post/65b72006.html)

1. 在`\themes\butterfly\scripts\helpers\`目录下新建文件`catalog_list.js`
```js
hexo.extend.helper.register('catalog_list', function (type) {
  let html = ``
  hexo.locals.get(type).map(function (item) {
    html += `
    <div class="catalog-list-item" id="${type + '-' + item.name}">
      <a href="/${type}/${item.name}/">${item.name}<sup>${item.length}</sup></a>
    </div>
    `
  })
  return html
})
```
显示`分类/标签`时带 emoji，但相应`分类/标签`页面不带 emoji 写法 
```js
hexo.extend.helper.register('catalog_list', function (type) {
  let html = ``
  hexo.locals.get(type).map(function (item) {
    html += `
    <div class="catalog-list-item" id="${type + '-' + item.name}">
      <a href="/${type}/${item.name}/">${theme.emoji[item.name] + item.name}<sup>${item.length}</sup></a>
    </div>
    `
  })
  return html
})
```

2. 样式
```css
/* 分类目录条、标签目录条 */
#catalog-bar {
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    border: 1.5px solid var(--btn-bg);
    transition: .3s;
}
  
  #catalog-bar:hover {
    border-color: var(--main);
  }
  
  #catalog-bar i {
    line-height: inherit;
  }
  
  #catalog-list {
    margin: 0 0.5rem;
    display: flex;
    white-space: nowrap;
    overflow-x: scroll;
  }
  
  #catalog-list::-webkit-scrollbar {
    display: none;
  }
  
  .catalog-list-item a {
    padding: .3rem;
    margin: 2px;
    font-weight: bold;
    border-radius: 5px;
    color: var(--font-color);
  }
  
  .catalog-list-item:hover a {
    background: var(--btn-bg);
    color: aliceblue;
  }
  
  .catalog-list-item.selected a {
    background: var(--btn-hover-color);
    color: aliceblue;
    border-radius: 5px;
  }
  
  a.catalog-more {
    min-width: fit-content;
    font-weight: bold;
    color: var(--font-color);
  }
  
  a.catalog-more:hover {
    color: var(--btn-bg);
  }
```

3. 所在分类/标签高亮JS
```js
function catalogActive (type) {
  let xscroll = document.getElementById('catalog-list')
  if (xscroll) {
    // 鼠标滚轮滚动
    xscroll.addEventListener('mousewheel', function (e) {
      //计算鼠标滚轮滚动的距离
      xscroll.scrollLeft -= e.wheelDelta / 2
      //阻止浏览器默认方法
      e.preventDefault()
    }, false)

    // 高亮当前页面对应的分类或标签
    let path = window.location.pathname
    path = decodeURIComponent(path)
    let pattern = type == 'tags' ? /\/tags\/.*?\// : /\/categories\/.*?\//
    if (pattern.test(path)) {
      document.getElementById(type + '-' + path.split('/')[2]).classList.add('selected')
    }
  }
}
catalogActive('categories')
catalogActive('tags')
```
4. 修改分类导航栏`\themes\butterfly\layout\category.pug`
```diff
extends includes/layout.pug

block content
  if theme.category_ui == 'index'
    include ./includes/mixins/post-ui.pug
    #recent-posts.recent-posts.category_ui
      +postUI
      include includes/pagination.pug
  else
    include ./includes/mixins/article-sort.pug
    #category
+     #catalog-bar
+       i.fa-fw.fas.fa-shapes
+       #catalog-list
+         !=catalog_list("categories")
+       a.catalog-more(href="/categories/")!= '更多'
-     .article-sort-title= _p('page.category') + ' - ' + page.category
      +articleSort(page.posts)
      include includes/pagination.pug
```
5. 修改标签导航栏`\themes\butterfly\layout\tag.pug`
```diff
extends includes/layout.pug

block content
  if theme.tag_ui == 'index'
    include ./includes/mixins/post-ui.pug
    #recent-posts.recent-posts
      +postUI
      include includes/pagination.pug
  else
    include ./includes/mixins/article-sort.pug
    #tag
+     #catalog-bar
+       i.fa-fw.fas.fa-tags
+       #catalog-list
+         !=catalog_list("tags")
+       a.catalog-more(href="/tags/")!= '更多'
      .article-sort-title= _p('page.tag') + ' - ' + page.tag
      +articleSort(page.posts)
      include includes/pagination.pug
```

### 导航栏增加子菜单
抄张洪的，目前有个问题，导航栏设置居中时子菜单不跟随移动，整不明白😐

1. 修改`themes\butterfly\layout\includes\header\nav.pug`
```diff
nav#nav
  #nav-group
    span#blog_name
+     div(class='back-home-button')
+       a.back-home-button-icon.fas.fa-grip-vertical
+       div(class='back-menu-list-groups')
+         div(class='back-menu-list-group')
+           div(class='back-menu-list-title') 我的
+           div(class='back-menu-list')
+             <a class="back-menu-item" href="https://i.pblood.com/" rel="external nofollow" title="前往我的引导页" target="_blank">
+               <img class="back-menu-item-icon entered loading" src="https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/logo.png" data-ll-status="loading">
+               <span class="back-menu-item-text">引导页</span></a>
+             <a class="back-menu-item" href="https://blog.pblood.com/" title="前往我的阅览室" target="_blank">
+               <img class="back-menu-item-icon entered loading" src="https://weread.qq.com/favicon.ico" data-ll-status="loading">
+               <span class="back-menu-item-text">阅览室</span></a>
+           div(class='back-menu-list-title') 平行博客
+           div(class='back-menu-list')
+             <a class="back-menu-item" href="https://blog.pblood.com/" target="_blank">
+               <img class="back-menu-item-icon entered loading" src="https://pblood.oss-cn-hongkong.aliyuncs.com/img/site/logo.png" data-ll-status="loading">
+               <span class="back-menu-item-text">主线路</span></a>
+             <a class="back-menu-item" href="https://pblood.gitee.io/" rel="external nofollow" target="_blank">
+               <img class="back-menu-item-icon entered loading" src="https://gitee.com/favicon.ico" data-ll-status="loading">
+               <span class="back-menu-item-text">Gitee线路</span></a>
      a#site-name(href=url_for('/')) #[=config.author]

    #menus
      !=partial('includes/header/menu_item', {}, {cache: true})

    #nav-right
      if (theme.algolia_search.enable || theme.local_search.enable)
        #search-button
          a.nav-rightbutton.site-page.social-icon.search
            i.fas.fa-search.fa-fw
        #darkmode_navswitch
          a.nav-rightbutton.site-page.darkmode_switchbutton(onclick="switchDarkMode()")
            i.fas.fa-adjust
        #toggle-menu
          a.nav-rightbutton.site-page
            i.fas.fa-bars.fa-fw
```

2. 添加样式
```css
#nav #blog_name {
    display: flex;
}

.back-home-button {
    display: flex;
    width: 35px;
    height: 35px;
    padding: 0!important;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    transition: .3s;
    border-radius: 8px;
    color: var(--font-color);
}

    .back-home-button .back-menu-list-groups {
        position: absolute;
        top: 65px;
        left: 1.5rem;
        background: var(--global-bg);
        border-radius: 12px;
        border: var(--style-border);
        flex-direction: column;
        font-size: 12px;
        color: var(--font-color);
        transition: 0s;
        opacity: 0;
        pointer-events: none;
    }

            .back-home-button .back-menu-list-group {
                display: flex;
                flex-direction: column;
            }

                .back-home-button .back-menu-list-group .back-menu-list-title {
                    margin: 8px 0 0 16px;
                    transition: .3s;
                }

                .back-home-button .back-menu-list {
                    display: flex;
                    flex-direction: column;
                }
                    .back-home-button .back-menu-list::before {
                        position: absolute;
                        top: -15px;
                        left: 0;
                        width: 100%;
                        height: 20px;
                        content: '';
                    }
                    .back-home-button .back-menu-list .back-menu-item {
                        display: flex;
                        align-items: center;
                        margin: 4px 8px;
                        padding: 4px 8px!important;
                        transition: .3s;
                        border-radius: 8px;
                    }
                        .back-home-button .back-menu-list .back-menu-item .back-menu-item-icon {
                            width: 24px;
                            height: 24px;
                            border-radius: 24px;
                            background: var(--global-bg);
                        }

.back-home-button:hover .back-menu-list-groups {
    display: flex;
    opacity: 1;
    transition: .3s;
    top: 55px;
    pointer-events: auto;
    left: 1.5rem;
}

.back-home-button .back-menu-list .back-menu-item .back-menu-item-text {
    font-size: var(--global-font-size);
    margin-left: .5rem;
    color: var(--font-color)!important;
}

.page #nav a:hover {
    color: var(--btn-bg);
    transition: .3s;
    box-shadow: var(--btn-bg);
}

.back-home-button .back-menu-list .back-menu-item:hover {
    background: var(--btn-bg);
}

@media screen and (max-width: 768px){
.back-home-button:hover .back-menu-list-groups {
    width: 100%;
    border-radius: 0;
    padding-bottom: 8px;
    left: 0;
}}
```

### 站点公祭日自动变灰

```js
if(PublicSacrificeDay()){
  document.getElementsByTagName("html")[0].setAttribute("style","filter:gray !important;filter:grayscale(100%);-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);");
}

function PublicSacrificeDay(){
    var PSFarr=new Array("0403","0404","0405","0406","0414","0512","0707","0807","0814","0909","0918","0930","1025","1213");
    //2020年4月4日 新冠肺炎哀悼日，清明节
    //2010年4月14日，青海玉树地震
    //2008年5月12日，四川汶川地震
    //1937年7月7日,七七事变 又称卢沟桥事变
    //2010年8月7日，甘肃舟曲特大泥石流
	  //8月14日，世界慰安妇纪念日
    //1976年9月9日，毛主席逝世
  	//1931年9月18日，九一八事变
  	//烈士纪念日为每年9月30日
    //1950年10月25日，抗美援朝纪念日
    //1937年12月13日，南京大屠杀
    var currentdate = new Date();
    var str = "";
    var mm = currentdate.getMonth()+1;
    if(currentdate.getMonth()>9){
      str += mm;
    }else{
      str += "0" + mm;
    }
    if(currentdate.getDate()>9){
      str += currentdate.getDate();
    }else{
      str += "0" + currentdate.getDate();
    }
    if(PSFarr.indexOf(str)>-1){
        return 1;
    }else{
        return 0;
    }
}
```

### 访问统计图表
参考：<https://blog.eurkon.com/post/61763977.html>

### 安装后台
使用[Qexo](https://github.com/Qexo/Qexo)为博客安装一个后台，在线编辑发布文章，使静态博客也能动态化。

**开启文章编辑**
在文章标题旁边显示一个编辑按钮，点击会跳转到对应的链接去。

打开`主题配置文件`，搜索`post_edit:`
```yml
post_edit:
  enable: true
  # url: https://github.com/user-name/repo-name/edit/branch-name/subdirectory-name/
  # For example: https://github.com/jerryc127/butterfly.js.org/edit/main/source/
  url: https://github.com/pbloods/pbloods.github.io/edit/master/source/
```

## 美化/特效

### 阅读模式美化

```css
/* 阅读模式优化 */
.read-mode {
  /* 字体大小 */
  font-size: 17px;
  /* 可以在这里引入自定义字体，具体方法请自行百度css引入字体 */
  /* 背景颜色 */
  background: #fdf6e3;
}
/* 夜间阅读模式优化 */
[data-theme="dark"]
.read-mode {
  font-size: 17px;
  background: #343a40;
}
```

### hide折叠框背景色修改
```diff
.toggle
  margin-bottom: 20px
- border: 1px solid $tag-hide-toggle-bg
+ border: 1px solid #ffabad
  & > .toggle-button
    padding: 6px 15px
-   background: $tag-hide-toggle-bg
+   background: #ffabad
    color: #1F2D3D
    cursor: pointer

  & > .toggle-content
    margin: 30px 24px
```

### 滚动条美化

```css
/* 滚动条美化 */
::-webkit-scrollbar-thumb {
  /*分割为四部分，以两种不同颜色区分*/
  background-image: -webkit-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.4) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.4) 50%,
          rgba(255, 255, 255, 0.4) 75%,
          transparent 75%,
          transparent
  );
  border-radius: 2em;/*圆角*/
}
```

### 毛玻璃效果

```css
/* 毛玻璃效果开始!!! */

/*社交卡片*/
#aside-content > .card-widget:first-child {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
}
/*夜间模式_社交卡片*/
[data-theme="dark"]
#aside-content > .card-widget:first-child {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}

/*侧边栏卡片*/
#aside-content .card-widget {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
}

/*夜间模式_侧边栏卡片*/
[data-theme="dark"]
#aside-content .card-widget {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}

/*文章页*/
.layout > div:first-child:not(.recent-posts) {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
}

/*夜间模式_文章页*/
[data-theme="dark"]
.layout > div:first-child:not(.recent-posts) {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
}

/*首页文章卡片*/
#recent-posts > .recent-post-item {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
}

/*夜间模式_首页文章卡片*/
[data-theme="dark"]
#recent-posts > .recent-post-item {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}

/*搜索框*/
.search-dialog {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
  border-radius: 0px;
}

#search-mask {
  background: rgba(255,255,255,0);
}

/*夜间模式_搜索框*/
[data-theme="dark"]
.search-dialog {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 0px;
}

/*目录卡片，与文章页一致*/
#aside-content #card-toc {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
  }

/*夜间模式_目录卡片，与文章页一致*/
[data-theme="dark"]
#aside-content #card-toc {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
}

/*手机端导航栏*/
#sidebar #sidebar-menus.open {
  background: rgba(255,255,255,0.7);
  /*RGB动态背景*/
  /*
  background: linear-gradient(60deg, #ffd7e4 0%, #c8f1ff 100%);
  */
  backdrop-filter: blur(10px);
}

/*夜间模式_手机端导航栏*/
[data-theme="dark"]
#sidebar #sidebar-menus.open {
  background: rgba(0, 0, 0, 0.7);
  /*RGB动态背景*/
  /*
  background: linear-gradient(60deg, #ffd7e4 0%, #c8f1ff 100%);
  */
  backdrop-filter: blur(10px);
}

/*取消手机端导航栏左侧遮罩*/
#sidebar #menu-mask {
  background: rgba(255, 255, 255, 0);
}

/* 修复夜间阅读模式 */
[data-theme="dark"]
  .read-mode #aside-content .card-widget{
        background: rgba(0, 0, 0, 0.9);
        color: #ffffff;
      }
[data-theme="dark"]  
  .read-mode div#post{
      background: rgba(0, 0, 0, 0.9);
      color: #ffffff;
      }

/*修复 tab 容器显示效果*/
.tab-contents {
  background: rgba(255, 255, 255, 0.9);
}
[data-theme="dark"]  
.tab-contents {
  background: rgba(0, 0, 0, 0.9);
}

/*修复 table 表格显示效果*/
tbody {
  background: rgba(255, 255, 255, 0.9);
}
[data-theme="dark"]  
tbody {
  background: rgba(0, 0, 0, 0.9);
}

/*修复 note 容器显示效果*/
.note {
  background: rgba(255, 255, 255, 0.9);
}
[data-theme="dark"] 
.note {
  background: rgba(0, 0, 0, 0.9);
}

/*修复版权信息显示效果*/
#post .post-copyright {
  background: rgba(255, 255, 255, 0.9);
}
[data-theme="dark"] 
#post .post-copyright {
  background: rgba(0, 0, 0, 0.9);
}

/* 毛玻璃效果结束!!! */
```

### 图标相关

#### 动态图标
来自开源项目 [l-lin/font-awesome-animation](https://github.com/l-lin/font-awesome-animation)，能让 DOM 的任何元素动起来，主要用于图标，但不止图标

**配置：**
在`主题配置文件`的`inject`配置项添加引入`font-awesome-animation.min.css`即可，也可下载到本地
```yml
inject:
  head:
    - <link rel="stylesheet" href="https://gcore.jsdelivr.net/npm/font-awesome-animation@0.2.1/dist/font-awesome-animation.min.css">
  bottom:
    # - <script src="xxxx"></script>
```

**使用：**
以主题默认的 [fontawesome](https://fontawesome.com/icons) 图标为例

对于导航栏、社交卡片的图标可以直接使用，如：
```yml
menu:
  主页: / || fas fa-home faa-wrench animated
```

HTML用法：
```html
<i class="fas fa-home faa-wrench animated"></i>

<span class="fas fa-home faa-wrench animated">首页</span>

<span><i class="fas fa-home faa-wrench animated"></i>首页</span>
```

#### 自定义 h1~6 标题图标
文章 h1~6 级标题前 icon，以 h1 为例 
```CSS
#article-container h1:before {
  font-family: "iconfont"; /*使用阿里图标，去掉这行使用 fontawesome 图标*/
  content: "<custom>"; /*图标的Unicode*/
}
```

#### 标题图标旋转
```css
#article-container.post-content h1:before,
h2:before,
h3:before,
h4:before,
h5:before,
h6:before {
  -webkit-animation: avatar_turn_around 1s linear infinite;
  -moz-animation: avatar_turn_around 1s linear infinite;
  -o-animation: avatar_turn_around 1s linear infinite;
  -ms-animation: avatar_turn_around 1s linear infinite;
  animation: avatar_turn_around 1s linear infinite;
}
```
也可以使用上面动态图标的方式旋转

### 背景相关

#### 去除主页 banner 背景

```css
#page-header {
    background-color: rgba(255, 255, 255, 0);
  }
```

#### 去除黑色遮罩效果
```css
/*去除主页 banner 黑色透明玻璃遮罩*/
#page-header:not(.not-top-img):before {
  background-color: rgba(255, 255, 255, 0);
}
/*去除移动端菜单栏黑色遮罩*/
#search-mask {
    background: rgba(255, 255, 255, 0);
    }
```

#### 加载动画背景修改(源)
修改文件`themes\butterfly\source\css\_layout\loading.styl`
```diff
if hexo-config('preloader')
  .loading-bg
    position: fixed
    z-index: 1000
    width: 50%
    height: 100%
-   background-color: var(--preloader-bg)
+   background-color: rgba(255, 255, 255, 0.7);
```

#### 渐变色背景
参考链接：<https://www.antmoe.com/posts/7198453/>

粉蓝色渐变
```css
#web_bg {
  background-image: url(""),
    -moz-linear-gradient(45deg, #6dd0f2 15%, #f59abe 85%);
  background-image: url(""),
    -webkit-linear-gradient(45deg, #6dd0f2 15%, #f59abe 85%);
  background-image: url(""),
    -ms-linear-gradient(45deg, #6dd0f2 15%, #f59abe 85%);
  background-image: url(""),
    linear-gradient(45deg, #6dd0f2 15%, #f59abe 85%);
}
```
<div style="display:inline-block;width:100%;height:200px;background-image:linear-gradient(45deg,#6dd0f2 15%,#f59abe 85%);text-align:center;line-height:200px">粉蓝色渐变</div>

橙青色渐变
```css
#web_bg {
background-image: url(""), -moz-linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)), url("");
background-image: url(""), -webkit-linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)), url("");
background-image: url(""), -ms-linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)), url("");
background-image: url(""), linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)), url("");
}
```
<div style="display:inline-block;width:100%;height:200px;background-image:linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35));text-align:center;line-height:200px">橙青色渐变</div>

美美哒渐变
```css
#web_bg {
    background: linear-gradient(102.7deg,#fddaff 8.2%,#dfadfc 19.6%,#adcdfc 36.8%,#adfcf4 73.2%,#caf8d0 90.9%);
}
```

<div style="display:inline-block;width:100%;height:200px;background-image:linear-gradient(102.7deg,#fddaff 8.2%,#dfadfc 19.6%,#adcdfc 36.8%,#adfcf4 73.2%,#caf8d0 90.9%);text-align:center;line-height:200px">美美哒渐变</div>

动态渐变
```css
@keyframes gradientBG {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
#web_bg {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
}
```
<div class="bg_test" style="display:inline-block;width:100%;height:200px;background:linear-gradient(-45deg,#ee7752,#e73c7e,#23a6d5,#23d5ab);background-size:400% 400%;animation:gradientBG 15s ease infinite;text-align:center;line-height:200px;cursor:pointer">动态渐变</div>

#### 随机背景
```js
//随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var backimg =[
  "url(/img/bg1.JPG)",
  "url(/img/bg2.jpg)",
  "url(/img/bg3.jpg)",
  "url(/img/bg4.jpg)"
];
//获取背景图片总数，生成随机数
var bgindex =Math.floor(Math.random() * backimg.length);
//重设背景图片
document.getElementById("web_bg").style.backgroundImage = backimg[bgindex];
//随机banner数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var bannerimg =[
  "url(/img/bg1.JPG)",
  "url(/img/bg2.jpg)",
  "url(/img/bg3.jpg)",
  "url(/img/bg4.jpg)"
];
//获取banner图片总数，生成随机数
var bannerindex =Math.floor(Math.random() * bannerimg.length);
//重设banner图片
document.getElementById("page-header").style.backgroundImage = bannerimg[bannerindex];
```

#### 上升气泡
在`主题配置文件`的`inject`配置项添加引入js
```yml
inject:
  head:
  bottom: # 挂载 js
    # - <script src="xxxx"></script>
    - <script defer src="https://cdn.jsdelivr.net/combine/npm/jquery@latest/dist/jquery.min.js,gh/weilining/jsdelivr/jquery/circlemagic/circlemagic.min.js,gh/weilining/jsdelivr@latest/jquery/circlemagic/butterflycirclemagic.js"></script>
```

#### 樱花动效
在`主题配置文件`的`inject`配置项添加引入js
```yml
inject:
  head:
  bottom: # 挂载js
    # - <script src="xxxx"></script>
    - <script src="https://gcore.jsdelivr.net/gh/pbloods/cdn/js/sakura.js"></script> # 樱花动效
```

#### 星空背景和流星特效
新建`\themes\source\js\universe.js` 
```js
function dark() {window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;var n,e,i,h,t=.05,s=document.getElementById("universe"),o=!0,a="180,184,240",r="226,225,142",d="226,225,224",c=[];function f(){n=window.innerWidth,e=window.innerHeight,i=.216*n,s.setAttribute("width",n),s.setAttribute("height",e)}function u(){h.clearRect(0,0,n,e);for(var t=c.length,i=0;i<t;i++){var s=c[i];s.move(),s.fadeIn(),s.fadeOut(),s.draw()}}function y(){this.reset=function(){this.giant=m(3),this.comet=!this.giant&&!o&&m(10),this.x=l(0,n-10),this.y=l(0,e),this.r=l(1.1,2.6),this.dx=l(t,6*t)+(this.comet+1-1)*t*l(50,120)+2*t,this.dy=-l(t,6*t)-(this.comet+1-1)*t*l(50,120),this.fadingOut=null,this.fadingIn=!0,this.opacity=0,this.opacityTresh=l(.2,1-.4*(this.comet+1-1)),this.do=l(5e-4,.002)+.001*(this.comet+1-1)},this.fadeIn=function(){this.fadingIn&&(this.fadingIn=!(this.opacity>this.opacityTresh),this.opacity+=this.do)},this.fadeOut=function(){this.fadingOut&&(this.fadingOut=!(this.opacity<0),this.opacity-=this.do/2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},this.draw=function(){if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20*t)+")",h.rect(this.x-this.dx/4*t,this.y-this.dy/4*t-2,2,2),h.fill()}else h.fillStyle="rgba("+r+","+this.opacity+")",h.rect(this.x,this.y,this.r,this.r);h.closePath(),h.fill()},this.move=function(){this.x+=this.dx,this.y+=this.dy,!1===this.fadingOut&&this.reset(),(this.x>n-n/4||this.y<0)&&(this.fadingOut=!0)},setTimeout(function(){o=!1},50)}function m(t){return Math.floor(1e3*Math.random())+1<10*t}function l(t,i){return Math.random()*(i-t)+t}f(),window.addEventListener("resize",f,!1),function(){h=s.getContext("2d");for(var t=0;t<i;t++)c[t]=new y,c[t].reset();u()}(),function t(){document.getElementsByTagName('html')[0].getAttribute('data-theme')=='dark'&&u(),window.requestAnimationFrame(t)}()};
dark()
```
```css
/* 背景宇宙星光  */
#universe{
  display: block;
  position: fixed;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}
```
在`主题配置文件`的`inject`配置项添加引入js、css
```yml
inject:
  head:
      - <link rel="stylesheet" href="/css/custom.css">
  bottom: # 挂载js
    # - <script src="xxxx"></script>
      - <canvas id="universe"></canvas>
      - <script defer src="/js/universe.js"></script>
```

### 页脚渐变色滚动动画

```css
/* 页脚footer */
/* 渐变色滚动动画 */
@-webkit-keyframes Gradient {
  0% {
      background-position: 0 50%;
  }

  50% {
      background-position: 100% 50%;
  }

  100% {
      background-position: 0 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
      background-position: 0 50%;
  }

  50% {
      background-position: 100% 50%;
  }

  100% {
      background-position: 0 50%;
  }
}

@keyframes Gradient {
  0% {
      background-position: 0 50%;
  }

  50% {
      background-position: 100% 50%;
  }

  100% {
      background-position: 0 50%;
  }
}
#footer {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: Gradient 10s ease infinite;
  -moz-animation: Gradient 10s ease infinite;
  animation: Gradient 10s ease infinite;
  -o-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#footer:before {
  background-color: rgba(0, 0, 0, 0);
}
```

### 页脚跳动的心
1. 修改`themes\butterfly\layout\includes\footer.pug`文件，加个爱心图标
```code
- .copyright!= `&copy;${nowYear} by ${config.author}`
+ .copyright!= `&copy;${nowYear} <i id="heartbeat" style="color:#FF6A6A" class="fa fa-heartbeat"></i> ${config.author}`
```
2. 挂载 CSS，使其动起来，如果用了上面的动态图标可以跳过这一步
```css
/* 跳动的心 */
#heartbeat {
  color: red;
  animation: iconAnimate 1.33s ease-in-out infinite;
}
@-moz-keyframes iconAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}
@-webkit-keyframes iconAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}
@-o-keyframes iconAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}
@keyframes iconAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}
```