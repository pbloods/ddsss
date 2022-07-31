---
title: 白嫖 Replit 服务器
categories:
  - 干货分享
tags:
  - 云计算
abbrlink: 1824629746
date: 2021-06-09 14:27:01
top_img: false
---

## Replit 使用说明

参考：[replit 官方教程](https://docs.replit.com/tutorials/00-overview)

>Replit 是一个编码平台，可让您编写代码和托管应用，支持从 github 导入项目。它还内置了许多教育功能，非常适合教师和学习者。

通过不同的方式使用 Replit 可以实现以下功能：

- 代码编辑器（例如 VS Code、Sublime Text、IntelliJ）
- 开发环境（例如，您的操作系统，以及 npm 或 pip 等构建工具）
- 云提供商（例如AWS，Netlify）
- 团队协作工具（例如 Google Docs、GitHub）
- 教学工具（如Canva，Moodle，Blackboard）
- 学习工具（例如Codecademy，Coursera，Udemy，Udacity）

[Repl.it](https://replit.com/)免费给每个用户分配一台 1G 运存的虚拟主机，支持 50 多种语言的一键配置，不限流量，不限时间，主要用途是开发调试以及编程学习，所以 Replit 的应用在一段时间不访问后会自动休眠。

类似的平台还有[Koyeb](https://www.koyeb.com/)、[Render](https://render.com/)、[Railway](https://railway.app/)、[Heroku](https://www.heroku.com/)、[codesandbox](https://codesandbox.io/)

### 自定义环境

#### replit.nix

通过`replit.nix`文件可以安装[Nix](https://search.nixos.org/packages)上可用的任何软件包，单个`repl`中可以支持任意数量的语言。可以[在此](https://search.nixos.org/packages)处搜索可用软件包的列表。

示例：
```
{ pkgs }: {
    deps = [
        pkgs.cowsay
    ];
}
```
填写后 <kbd>Ctrl</kbd> + <kbd>S</kbd> 保存，即可更新 nix ，非常方便

#### .replit

`.replit`是主要的配置文件，其中最基本的是命令。通过`.replitrun`可以自动运行你设定的命令文件

`.replit`文件遵循[toml](https://learnxinyminutes.com/docs/toml/)配置格式，如下所示：
```shell toml
# 单击“运行”按钮时执行的命令。
run = ["cargo", "run"]

# 编辑器中打开的默认文件。
entrypoint = "src/main.rs"

# 设置环境变量
[env]
FOO="foo"

# 通用软件包管理器的打包程序配置
# 请访问 https://github.com/replit/upm 了解支持的语言。
[packager]
language = "rust"

  [packager.features]
  # 启用包搜索侧栏
  packageSearch = true
  # 启用包自动联想
  guessImports = false

# 单独语言配置，格式: language.<lang name>
[languages.rust]
# 匹配该编程语言文件的 glob 模式（所有以 .rs 结尾的文件都被视为 Rust 文件）
pattern = "**/*.rs"

    # LSP configuration for code intelligence
    [languages.rust.languageServer]
    start = ["rust-analyzer"]
```

更多配置项参考：[官方配置文档](https://docs.replit.com/programming-ide/configuring-repl)

在上面的代码中，每当您点击“run”按钮时，分配到的数组中的字符串都会在 shell 中按顺序执行。


### 网站保活
由于 Replit 的应用在一段时间不访问后会自动休眠，再次访问需要等一会才能进入程序，可以设置每 30 分种访问一次网站阻止其休眠

- 通过`UptimeRobot`对应用地址进行状态监控

- 使用`curl`命令配合定时任务

- 使用`git actions`定时任务

## 实例

### 部署 Alist 网盘（bash）

> [Alist](https://github.com/Xhofe/alist)是一款支持多种存储的目录文件列表程序，能让你或者其他人随时随地访问你的个人储存盘或者云盘。

类似的工具还有[Nextcloud](https://nextcloud.com/)、[可道云](http://kodcloud.com/)、[filebrowser](https://filebrowser.org/)

**搭建教程**

1. 创建一个 Bash 语言项目
![20220522170711](https://pblood.oss-cn-hongkong.aliyuncs.com/img/note/20220522170711.png)

2. 下载最新版本[alist-linux-amd64.tar.gz](https://github.com/Xhofe/alist/releases/latest/download/alist-linux-musl-amd64.tar.gz)
```replitshell
wget https://github.com/Xhofe/alist/releases/latest/download/alist-linux-musl-amd64.tar.gz
```
解压解压至项目根目录
```replitshell
tar xvf alist-linux-musl-amd64.tar.gz
```

3. 编写`main.sh`脚本
```main.sh
chmod  +x  alist-linux-musl-amd64.tar.gz
./alist-linux-musl-amd64
```
编写完成后直接点击主页的`run`即可
>远程访问必须绑定域名，测试域名只能在 replit 后台访问

**网站保活（每30分钟访问一次网页目录）**
1. 路由器等定时任务
```shell
*/30 * * * * curl -d '{"path":"/","password":"","page_num":1,"page_size":30}' -H "Content-Type: application/json" -X POST https://pan.pblood.com/api/public/path
```
定时语法：
```shell
# 每五分钟执行
*/5 * * * *
# 每小时执行
0 * * * *
# 每天执行        
0 0 * * *
# 每周执行
0 0 * * 0
# 每月执行
0 0 1 * *
# 每年执行
0 0 1 1 *
```

2. Git actions 定时任务
```yml
name: cron

on:
  schedule:
    - cron:  '30 * * * *'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: 检索 Alist 目录
        run: |
          curl -d '{"path":"/","password":"","page_num":1,"page_size":30}' -H "Content-Type: application/json" -X POST https://pan.pblood.com/api/public/path
```

**利用镜像仓库搭建网盘**

工具：
https://github.com/xausky/DockerRegisterCloud

在线工具：
http://drcd.xausky.cn/#/

仓库：(好像都是不限速不限流量)
阿里云：https://cr.console.aliyun.com
华为云：https://console.huaweicloud.com/swr
Docker Hub：https://hub.docker.com/

### 部署 Wordpress (PHP)

1. 创建一个 PHP 语言环境（自动生成 PHP 环境默认的`.replit`配置文件）
```
run = "php -S 0.0.0.0:8000 -t ."

entrypoint = "index.php"
```

2. 修改`replit.nix`文件
```nix
{ pkgs }: {
	deps = [
    pkgs.php74
    pkgs.less
    pkgs.wp-cli
	];
}
```

3. 运行一键脚本，填写配置信息即可
```bash
bash <(curl -s https://raw.githubusercontent.com/ethanpil/wordpress-on-replit/master/install-wordpress-on-replit.sh)
```

注意此脚本采用的数据库是`WP_SQLite_DB\PDOEngine`，数据不稳定，有次我填写了好久的数据居然重置了！