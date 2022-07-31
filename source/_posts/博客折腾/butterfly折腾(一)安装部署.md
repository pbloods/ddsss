---
title: butterfly折腾(一)安装部署
categories:
  - 博客折腾
tags:
  - hexo
  - 建站
keywords: 'hexo,butterfly,blog,主题,doc,教程,文档'
top_img: false
cover: 'https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/hexo.png'
abbrlink: 1799496650
date: 2022-04-10 06:36:02
---

>[butterfly](https://butterfly.js.org/) 是基于 [Hexo](https://hexo.io/) 静态网站框架的一个主题，可扩展性较强，适合展示类博客或者网站。

# 安装

用到的工具：
- [Nodejs](https://nodejs.org/zh-cn/)
- [Git](https://git-scm.com/downloads)
- Windows 10

## 安装 Hexo
1. 安装 hexo 初始化脚本
```shell
npm install -g hexo-cli
```
2. 启用 windows shell 外部脚本
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass
```
3. 创建并进入 hexo 目录，作为博客目录
```shell
mkdir hexo && cd hexo
```
4. 初始化(安装 Hexo)
```shell
hexo init
```
{% hideToggle 初始项目结构（版本不同可能会有差别） %}
```md
.
├── .github
| 	└── dependabot.yml  # 依赖更新脚本，会创建一个新分支存放最新依赖，建议删除
├── node_modules # 依赖
├── scaffolds # 模板，可在这里设置 Front Matter
| 	├── draft.md  # 草稿模板
| 	├── page.md # 页面模板
|	  └── post.md # 文章模板
├── source # 存放文章、页面
|	  └── _posts  # 文章
├── themes  # 主题文件目录
├── _config.landscape.yml # 默认主题配置，安装完新主题后可删除
├── _config.yml # 站点配置文件
├── .gitignore  # git忽略文件，用来指定哪些文件或者目录不被提交
├── package.json  # 包管理配置文件，记录项目信息和依赖名称及版本
└── yarn.lock # 存储每个安装的依赖是哪个版本
```
{% endhideToggle %}

## 安装 butterfly
1. 下载主题
```
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```
{% note warning simple %}
下载完成后请删除主题文件夹下的`.git`、`.github`目录，否则 Git 不会上传主题，后续无法使用 GitActions 或者 Vercel 之类的平台编译
{% endnote %}

2. 安装[pug](https://pugjs.org/zh-cn/)以及`stylus`的渲染器（butterfly 依赖此插件运行）
```
npm install hexo-renderer-pug hexo-renderer-stylus --save
```
3. 应用主題
修改 hexo 配置文件`_config.yml`，搜索`theme:`字段，修改默认主题为`butterfly`
```
theme: butterfly
```

# 命令行控制

|Hexo基本命令|	作用|
|:--|:--|
|hexo init|	一键安装Hexo|
|hexo s	|本地运行博客，默认端口`4000`|
|hexo c|	清除静态资源|
|hexo g| 将markdown文档编译为HTML源码，默认存放目录`public`|
|hexo n title|	创建一篇新的文章，文章标题是 title|

# 内容创建

## 创建文章

**Post Front Matter**
```
---
title: 笔记 # 【必需】文章标题
date: 2022-01-12 11:51:53 # 【必需】文章创建日期
categories: # 【必需】文章分类
    - 前端
    - 技术
tags: # 【必需】文章标签
    - CSS
    - 技术
top_img:  # 【可选】文章顶部图片
cover:  # 【可选】文章封面（如果没有设置top_img，文章页顶部将显示缩略图，可设为false/图片地址/留空）
sticky: 1 # 文章置顶，数值越大，优先级越大

aside:  # 【可选】显示侧边栏 （默认 true）
comments: # 【可选】显示文章评论模块（默认 true）

updated:  # 【可选】文章更新日期
keywords: # 【可选】文章关键词
description:  # 【可选】文章描述，设置后优先出现在文章预览界面

toc:  # 【可选】显示文章TOC（默认为设置中toc的enable配置）
toc_number: # 【可选】显示toc_number（默认为设置中toc的number配置）
toc_style_simple: # 【可选】显示 toc 简洁模式

copyright:  # 【可选】显示文章版权模块（默认为设置中post_copyright的enable配置）
copyright_author: # 【可选】文章版权模块的文章作者
copyright_author_href:  # 【可选】文章版权模块的链接文章作者
copyright_url:  # 【可选】文章版权模块的链接文章链接
copyright_info: # 【可选】文章版权模块的文字版权声明

mathjax:  # 【可选】显示mathjax（当设置mathjax的per_page： false时，才需要配置，默认 false）
katex:  # 【可选】显示katex（当设置katex的per_page： false时，才需要配置，默认 false）
aplayer:  # 【可选】在需要的页面加载aplayer的js和css
highlight_shrink: # 【可选】配置代码框是否展开（true/false）（默认为设置中highlight_shrink的配置）
---
```

**文章分类写法**
```markdown
categories: 
  - 笔记
  - linux
```
还可以这样写
```markdown
categories: 
  - [笔记,linux]
  - [搭建]
```
`linux`是`笔记`的一个子分类，`搭建`是单独的一个分类

## 创建页面

**Page Front Matter**
```
---
title:  # 【必需】页面标题
type: # 【必需】标签、分类和友情链接三个页面需要配置
top_img:  # 【可选】页面顶部图片
toc: # 【可选】侧边栏目录
comments: # 【可选】显示页面评论模块（默认 true）
aside:  # 【可选】显示侧边栏（默认 true）

date: # 【可选】页面创建日期
updated:  # 【可选】页面更新日期
description:  # 【可选】页面描述
keywords: # 【可选】页面关键词
mathjax:  # 【可选】显示mathjax（当设置mathjax的per_page： false时，才需要配置，默认 false）
katex:  # 【可选】显示katex（当设置katex的per_page： false时，才需要配置，默认 false）

aplayer:  # 【可选】在需要的页面加载aplayer的js和css
highlight_shrink: # 【可选】配置代码框是否展开（true/false）（默认为设置中highlight_shrink的配置）
---
```

**分类页面**
```shell
hexo new page categories
```

**标签页面**
```shell
hexo new page tags
```

**关于页面**
```Shell
hexo new page about
```

编辑`about/index.md`文件，在`Post Front Matter`里添加`type: true`（标签、分类、友情链接三个页面必须填写）

**友链页面**

```Shell
hexo new page link
```

可以直接编辑`source/link/index.md`文件，也可以直接用主题提供的方法

在`source/_data`目录中（如果沒有`_data`文件夹，请自行创建），创建一个文件`link.yml`，编辑你的友链

```yml
- class_name: 友情链接
  class_desc: 那些人，那些事
  link_list:
    - name: Hexo
      link: https://hexo.io/zh-tw/
      avatar: https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
      descr: 快速、简单且强大的博客框架

- class_name: 网站
  class_desc: 值得推荐的网站
  link_list:
    - name: Youtube
      link: https://www.youtube.com/
      avatar: https://i.loli.net/2020/05/14/9ZkGg8v3azHJfM1.png
      descr: 视频网站
    - name: Twitter
      link: https://twitter.com/
      avatar: https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png
      descr: 社交分享平台
```

# 升级
在 [hexo-theme-butterfly/releases](https://github.com/jerryc127/hexo-theme-butterfly/releases) 查看新版的更新内容，根据实际情况更新你的配置内容。

# 部署

## Github pages

- 优点：可以自动更新 page 服务、支持自定义域名
- 缺点：国内延迟比较高，免费版必须公开仓库才能使用 page 服务

### 手动部署

```ps1
hexo clean && hexo g

# 推送主项目到 master 分支
git init
git add .
git commit -m "deploy"
git push -f https://github.com/pbloods/pbloods.github.io master
cd public

# 推送静态资源到 gh-pages 分支
git init
git add .
git commit -m "github-pages"
git push -f https://github.com/pbloods/pbloods.github.io master:gh-pages
```

将上面的脚本文件命名为`deply.ps1`,放在项目根目录下，终端执行`.\deply.ps1`，将博客项目上传到 master 分支，将博客部署到 gh-pages 分支，再开启 gh-pages 分支的 page 服务即可

### hexo deploy
hexo 自带的功能，当执行`hexo deploy`时，Hexo 会将`public`目录中的文件和目录推送至`_config.yml`中指定的远端仓库和分支中，并且完全覆盖该分支下的已有内容，[详见](https://hexo.io/zh-cn/docs/one-command-deployment.html)

### Github Actions

```yml
name: ci

on: [push]

jobs: # 工作流
  build: # 自定义名称
    runs-on: ubuntu-latest #运行在虚拟机环境ubuntu-latest

    steps: # 步骤
      - name: Checkout 🛎️
        uses: actions/checkout@v3 # 步骤1、检出仓库，获取源码

      - name: setup-node
        uses: actions/setup-node@v3 # 步骤2、安装node
        with:
          node-version: '16'

      - name: Install and Build 🔧 
        run: |
          npm install
          npm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.5 # 步骤3、将静态资源推送到指定分支
        with:
          branch: gh-pages # 需要上传静态资源的分支
          folder: public # 静态资源目录
```

对应`deply.ps1`脚本内容
```ps1
git add ./
git commit -m "update"
git push
```

## Gitee pages
使用`github actions`自动部署`gitee pages`服务， [详见](https://github.com/yanglbme/gitee-pages-action)

- 优点：国内服务，延迟低
- 缺点：不支持自定义域名、需实名认证、内容需要审核

```yml
name: gitee

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: git@github.com:pbloods/pbloods.github.io.git
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: git@gitee.com:pblood/pblood.git

      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: pblood
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: pblood/pblood
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: master
```

**注意：**
- 一定要仔细检查 github 和 gitee 上的公匙是否一致
- 若没有开启过 gitee 的 page 服务，请先手动启动一次，否则`yanglbme/gitee-pages-action`会报错


## vercel
[Vercel](https://vercel.com/)是一个提供静态资源网络托管的综合平台，支持`Hexo`、`Hugo`等几十种框架。从 Github 仓库自动同步代码，支持自定义域名，访问速度也不错，能够很好地替代`github pages`。

## 阿里云 OSS
使用 [阿里云OSS](https://account.alibabacloud.com/) 静态托管服务部署

相关链接：
**ossbrowser**：<https://help.aliyun.com/document_detail/209974.htm>
**阿里云对象存储oss关闭HTTP访问**：<https://help.aliyun.com/document_detail/39539.htm>

- 优点：香港空间不用实名，5G免费存储空间，送100G免费流量，同样可以使用`git actions`自动部署
- 缺点：必须绑定域名才能访问

```yml
name: oss

on: [push]

jobs: # 工作流
  build: # 自定义名称
    runs-on: ubuntu-latest # 运行在虚拟机环境 ubuntu-latest

    steps: # 步骤
      - name: Checkout 🛎️
        uses: actions/checkout@v3 # 检出仓库，获取源码

      - name: Setup ossutil
        uses: manyuanrong/setup-ossutil@master  # 部署到到阿里云OSS
        with:
          endpoint: "oss-cn-hongkong.aliyuncs.com"   # 你的阿里云 Endpoint（地域节点），在阿里云 <对象存储/Bucket列表/uesname/概览> 里查询
          access-key-id: ${{ secrets.ACCESS_KEY_ID }}   # 你的阿里云 ACCESS_KEY_ID，在 <github/remote/Settings/secrets/Actions> 里填写，可以自定义名称
          access-key-secret: ${{ secrets.ACCESS_KEY_SECRET }} # 你的阿里云 AccessKey Secret，在 <github/remote/Settings/secrets/Actions> 里填写，可以自定义名称
      - run: ossutil cp -rf public oss://pblood/  # 将 public 目录复制到你的阿里云 Bucket
```

## 其它部署方式

- [Uicloud](https://unicloud.dcloud.net.cn) 选择阿里云提供的服务完全免费，需要实名，只有国内空间，必须备案才能自定义域名
- [七牛云kodo](https://www.qiniu.com/) 10G免费存储空间，每月10G免费下载流量，免费一年SSL证书，可设置HTTP跳转HTTPS，海外空间不用实名，需要绑定域名才能使用
- [netlify](https://www.netlify.com/)和 vercel 类似，但是国内访问速度很慢
- [cloudflare pages](https://pages.cloudflare.com/) 国内访问速度慢