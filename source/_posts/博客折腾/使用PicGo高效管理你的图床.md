---
title: 使用PicGo高效管理你的图床
categories:
  - 博客折腾
tags:
  - 工具
keywords: '图床,博客,教程,文档'
abbrlink: 1105215673
date: 2022-01-03 12:55:43
top_img: false
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/img_bed.png
---

>为博客搭建一个图床，使用 PicGO 管理，方便文章的维护，提升写作效率。

## PicGo

{% note info simple %}
一个用于快速上传图片并获取图片`URL`链接的工具，支持macOS,Windows,Linux。
{% endnote %}

PicGo 支持如下图床：

 - `七牛图床` v1.0
 - `腾讯云 COS` v4\v5 版本 v1.1 & v1.5.0
 - `又拍云` v1.2.0
 - `GitHub` v1.5.0
 - `SM.MS` V2 v2.3.0-beta.0
 - `阿里云 OSS` v1.6.0
 - `Imgur` v1.6.0

通过安装插件PicGo可以支持更多图床和储存库：[PicGo插件](https://github.com/PicGo/Awesome-PicGo/)

使用帮助：[PicGo文档](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E5%9B%BE%E5%BA%8A%E5%8C%BA)

## Github 图床
单仓库大小上限500M，总仓库容量5G，但是GitHub图床仓库超过1G后会有人工审核仓库内容，如果发现用来做图床，轻则删库重则封号。

**配置**
```json
{
  "repo": "", // 仓库名，格式是 username/reponame
  "token": "", // github token
  "path": "", // 自定义存储路径，比如 img/
  "customUrl": "", // 自定义域名，注意要加 http://或者 https:// ，末尾没有/，用于CDN加速
  "branch": "" // 分支名，默认是 main
}
```

**使用**

在VScode编辑器中直接使用以下快捷键，将自动完成上传并将图片链接自动插入到Markdown页面中。

**从剪贴板上传图像**

- Windows / Unix：<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>u</kbd>
- OsX：<kbd>Cmd</kbd> + <kbd>Opt</kbd> + <kbd>u</kbd>

小技巧：选择行内文本再使用上述命令会将图片名改为文本内容

**从资源管理器上传图像**

- Windows / Unix：<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>e</kbd>
- OsX：<kbd>Cmd</kbd> + <kbd>Opt</kbd> + <kbd>e</kbd>

**从输入框上传图像**

- Windows / Unix：<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>o</kbd>
- OsX：<kbd>Cmd</kbd> + <kbd>Opt</kbd> + <kbd>o</kbd>

## Github 图床优化

国内网络经常访问不了 <raw.githubusercontent.com> ，导致图片显示不出来，可以用以下几种方法解决

#### jsDelivr

> jsDelivr 提供免费的 CDN服务，可以加速 github 公开仓库中的图片、js、css等小文件

**使用方法：**

PicGo插件里自定义域名填写`https://gcore.jsdelivr.net/gh/<用户名><仓库名>`，注意末尾没有`/`

更多CDN服务请查看：<https://blog.skk.moe/post/public-cdn-in-diffrent-views/>

#### Github pages

> Github pages 使用的域名是`github.io`，国内貌似是可以访问的

**使用方法：**

1. 开启你Github图床仓库的pages服务

2. 在`PicGo`自定义域名里填入`https://pbloods.github.io`

得到的链接：https://pbloods.github.io/cdn/img/site/background.webp

#### Cloudflare CDN

> [Cloudflare](https://www.cloudflare.com/zh-cn/)是一家美国跨国IT公司，总部位于旧金山。其主要业务是向客户提供基于反向代理的内容分发网络(CDN)和分布式域名解析服务(分布式域名服务器)。Cloudflare可以帮助受保护的网站抵御数据包拒绝服务攻击等网络攻击，保证网站长时间在线，提高网站的性能和加载速度，改善访客体验。

**使用方法：**

1. 准备一个域名，将域名转入[Cloudflare](https://www.cloudflare.com/zh-cn/)

2. 在github图床仓库根目录创建一个`CNMAE文件`，填上你的域名。在`Cloudflare`创建一个`CNAME`解析，解析地址填写你的`github`图床仓库`page`地址，开启CDN

3. 在`PicGo`自定义域名里填入`你的域名地址`

## 阿里云OSS图床

使用 [阿里云国际版OSS](https://account.alibabacloud.com/) 的海外空间不用实名，5G 免费存储空间，100G 免费流量，支持 PicGo。

## 七牛云OSS图床

[七牛云](https://www.qiniu.com/) 提供 10G 免费海内外存储空间，每月 10G 免费流量。需要实名，绑定域名才能使用，支持 PicGo。

## DogeClooud图床

[DogeClooud](https://www.dogecloud.com/) 提供免费 10G 海内外储存 + 每日 20G 免费流量。需要实名，暂不支持PicGo，暂采用FTP方式上传，不是很方便

参考：[官方文档](https://docs.dogecloud.com/oss/)

## 其它

### 其它图床管理工具

#### 兰空图床 Lsky Pro

{% note info simple %}
`兰空图床`是一个用于在线上传、管理图片的图床程序，搭建好后打开网站即用！[演示站点](https://pic.iqy.ink/)
{% endnote %}

支持`本地`等多种第三方云储存`AWS S3`、`阿里云 OSS`、`腾讯云 COS`、`七牛云`、`又拍云`、`SFTP`、`FTP`、`WebDav`、`Minio`

可以用来搭建自己的在线图床，并且也支持使用`PicGo`管理，见：[Lsky 文档](https://docs.lsky.pro/)

#### PicX

一款 github 在线图床管理工具，打开网站即用！[PicX官网](https://picx.xpoet.cn/)

#### BlazeB2图床

基于 BackBlazeB2 和 Cloudflare 开发的图床工具，[BlazeB2图床官网](https://blazeb2.js.org/)

### 公共图床

无需注册，直接上传，也可以使用PicGo上传，缺点是图片迁移困难，还容易失效

 - sm.ms：<https://sm.ms/login> 支持PicGo
 - imgur：<https://imgur.com/> 貌似是利用一种分布式上传图片的方式，同样需要注册
 - 聚合图床：<https://www.superbed.cn/>
 - 路过图床：<https://imgtu.com/> 有点广告，需要注册
 - IMGPP：<https://imgpp.com/>
 - 星痕图床：<https://imgtu.pro/>
 - 初见图床：<https://image.icu/>
