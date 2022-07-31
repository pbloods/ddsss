---
title: Vercel部署Typecho博客
categories:
  - 干货分享
tags:
  - typecho
keywords: 'typecho,handsome,blog,主题,doc,教程,文档'
cover: 'https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/typecho.png'
top_img: false
abbrlink: 3696020312
date: 2021-11-10 22:36:02
---

## 前言
>[Vercel](https://vercel.com/)通过`Community Runtimes`也可以像[replit](https://replit.com/)那样调用其它语言环境，我们可以利用这个在vercel上部署PHP等环境，从而支持typecho等程序的运行。参考[vercel文档](https://vercel.com/docs/runtimes?query=php#advanced-usage/community-runtimes)。

## 准备
- [Typecho_1.2正式版](https://typecho.org/)
- 数据库(MySQL、PostgreSQL、SQLite)

注意：使用Vercel部署typecho博客可以省去一个服务器，在一定程度上也能避免网络攻击，只要买一个数据库服务即可使用，也能省几块钱吧。

## 步骤

1. 将typecho源码解压到项目目录
2. 在项目根目录下新建配置文件`vercel.json`,调用php环境
```json
{
    "functions": {
      "api/*.php": {
        "runtime": "vercel-php@0.4.0"
      }
    },
    "routes": [
      { "src": "/(.*)",  "dest": "/api/index.php" }
    ]
  }
```
- `vercel-php@0.5.1` - PHP 8.1.x
- `vercel-php@0.4.0` - PHP 8.0.x
- `vercel-php@0.3.2` - PHP 7.4.x
3. 在项目根目录下新建`api/index.php`
`api/index.php`是php程序的入口，它应该放在api文件夹中
```php
<?php
$file= __DIR__ . '/..'.$_SERVER["PHP_SELF"];

if(file_exists($file))
{
   return false;
}
else
{
    require_once __DIR__ . '/../index.php';
}
#echo $_SERVER["PHP_SELF"];
```
4. 修改项目根目录下的`install.php`文件，删掉`if (!$writeable)`中的`!`，跳过`/usr/uploads`目录权限检查（vercel项目文件都无法通过typecho在线修改）
```diff
-   if (!$writeable) {
+   if ($writeable) {
        $errors[] = _t('上传目录无法写入, 请手动将安装目录下的 %s 目录的权限设置为可写然后继续升级', $uploadDir);
    }
```
5. 将项目上传到[vercel](https://vercel.com/)，通过vercel的测试域名访问安装页面，填写数据库信息，当然vercel无法直接修改文件，typecho安装页面会根据你填写的数据生成配置文件内容，手动在本地项目根目录下新建文件`config.inc.php`，填入typecho网页生成的内容，重新上传即可配置成功。

>或者直接使用我配置好的项目 [typecho_vercel](https://github.com/pbloods/typecho) 一键部署到，直接从第5步开始，默认环境PHP 8.0.x。**