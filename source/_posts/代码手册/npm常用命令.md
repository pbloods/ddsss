---
title: npm常用命令
categories:
  - 代码手册
tags:
  - npm
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/img/cover/npm.png
top_img: false
abbrlink: 3476997871
date: 2019-12-25 14:27:01
---

>[npm](https://www.npmjs.com/)是一个辅助前端开发的包管理工具，常见的使用场景有以下几种：

* 允许用户从npm服务器下载别人编写的第三方包到本地使用。
* 允许用户从npm服务器下载并安装别人编写的命令行程序到本地使用。
* 允许用户将自己编写的包或命令行程序上传到npm服务器供别人使用。

- [npm CLI 官方文档]（https://docs.npmjs.com/cli/)

# 检测是否安装及版本

```sh
npm -v # 显示版本号说明已经安装相应的版本
```

# 生成package.json文件

```sh
npm init
```

> package.json用来描述项目中用到的模块和其他信息

# 安装模块

```sh
npm install # 安装package.json定义好的模块，简写 npm i

# 安装包指定模块
npm i <ModuleName>

# 安装指定版本模块
npm i <ModuleName>@2.2.2

# 全局安装
npm i <ModuleName> -g 

# 安装包的同时，将信息写入到package.json中的 dependencies 配置中
npm i <ModuleName> --save

# 安装包的同时，将信息写入到package.json中的 devDependencies 配置中
npm i <ModuleName> --save-dev

# 安装多模块
npm i <ModuleName1> <ModuleName2>

# 安装方式参数：
-save # 简写-S，加入到生产依赖中
-save-dev # 简写-D，加入到开发依赖中
-g # 全局安装 将安装包放在 /usr/local 下或者你 node 的安装目录
```

# 查看

```sh
# 查看所有全局安装的包
npm ls -g

# 查看本地项目中安装的包
npm ls

# 查看包的 package.json文件
npm view <ModuleName>

# 查看包的依赖关系
npm view <ModuleName> dependencies

# 查看包的源文件地址
npm view <ModuleName> repository.url

# 查看包所依赖的node版本
npm view <ModuleName> engines

# 查看帮助
npm help
```

# 更新模块

```sh
# 更新本地模块
npm update <ModuleName>

# 更新全局模块
npm update -g <ModuleName> # 更新全局软件包。
npm update -g # 更新所有的全局软件包。
npm outdated -g --depth=0 # 找出需要更新的包。
```

# 卸载模块

```sh
# 卸载本地模块
npm uninstall <ModuleName>

# 卸载全局模块
npm uninstall -g <ModuleName> # 卸载全局软件包。
```

# 清空缓存

```sh
# 清空npm缓存
npm cache clear
```

# 使用淘宝镜像

```sh
# 使用淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

# npx
>有些包我们只会使用一次，或者只想尝试以下，不想安装到全局，也不想作为当前项目的依赖,可以使用 npx 的方式来执行

npx 是 npm 5.2+ 版本之后自带的工具，能够帮助我们更高效的执行 npm 软件仓库里的安装包

更方便的执行当前项目中的可执行工具，比如：
```shell
# npx 之前
$ node ./node_modules/.bin/mocha

# 使用 npx:
$ npx mocha
```

也可直接执行那些不在当前项目，也没在全局安装过的 npm 工具包，比如：create-react-app
```shell
$ npx create-react-app my-app

# 执行以上这条命令 npx 会按以下顺序工作：
# 1. 先查看当前项目有没 create-react-app
# 2. 如果当前项目找不到，会去全局查找 create-react-app
# 3. 如果全局还找不到，会帮我们临时从 npm 包仓库安装 create-react-app，不会污染到当前项目，也不会装到全局
```
✨ 重点推荐 ✨：对于那些不常使用、或者只想一次性尝试的工具，推荐使用 npx 的方式代替 npm install -g、yarn global 全局安装

# 其他

```sh
# 更改包内容后进行重建
npm rebuild <ModuleName>

# 检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新
npm outdated

# 访问npm的json文件，此命令将会打开一个网页
npm help json

# 发布一个包的时候，需要检验某个包名是否存在
npm search <ModuleName>

# 撤销自己发布过的某个版本代码
npm unpublish <package> <version>
```



## 使用技巧

#### 多次安装不成功尝试先清除缓存

```sh
npm cache clean -f
```

#### 查看已安装的依赖包版本号

```sh
npm ls <ModuleName>
```

> 注意：用此方法才能准确的知道项目使用的版本号，查看package.json时，有“^" 符号表示大于此版本

## npm发布包

[npm发布包教程](https://segmentfault.com/a/1190000017461666)

包目录结构：
```shell
└── pkgname
    ├── README.md # 说明
    ├── index.js # 入口文件
    └── package.json # 包的基本信息
```

登录
```shell
npm login
```
初始化(注意项目名不能与npm上其它项目重复，其它随意)
```shell
npm init
```
上传(不能和已有版本重复)
```shell
npm publish
```
废弃/删除 包
```shell
# 废弃（安装时提示用户该包已废弃，但仍可用）
npm deprecate <package-name>[@<version>] <message>
# 删除（删除的版本24小时后方可重发!只有发布72小时之内的包可以删除!）
npm unpublish <package-name> --force
npm unpublish <usename/babel> --force
```

## 访问npm包内的文件
可以将自己的css、js、img等资源传到npm上，作CDN使用

语法（以jsDelivr为例）：
- 指定版本号：`https://gcore.jsdelivr.net/npm/包名@版本号/文件路径`
- 不指定版本号（默认最新版本）：`https://gcore.jsdelivr.net/npm/包名/文件路径`
示例：
- https://gcore.jsdelivr.net/npm/pblood@1.0.1/img/favicon.png
- https://gcore.jsdelivr.net/npm/pblood/img/favicon.png

其它CDN加速：
https://npm.elemecdn.com/pblood@1.0.1/img/favicon.png


## nrm的作用与使用

>nrm(npm registry manager )是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换

**安装**
```sh
npm install -g nrm
```
**使用**
```sh
nrm ls　#查看可用的源（有*号的表示当前所使用的源,以下<registry>表示源的名称）
nrm use <registry> # 将npm下载源切换成指定的源
nrm add <registry> <url> # 添加源，url为源的路径
nrm del <registry> # 删除源
nrm test <registry> # 测试源的响应时间，可以作为使用哪个源的参考

nrm help　# 查看nrm帮助
nrm home <registry>　# 跳转到指定源的官网
```






