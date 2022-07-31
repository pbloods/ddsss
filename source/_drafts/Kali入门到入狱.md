---
title: Kali入门到入狱
category:
  - linux
tag:
  - linux
  - kali
abbrlink: 3278893514
date: 2022-02-17 00:00:00
---

入狱教程：
https://www.kali.org/tools/
https://wizardforcel.gitbooks.io/daxueba-kali-linux-tutorial/content/index.html

# 设置中文
```shell
sudo dpkg-reconfigure locales
```
执行完会出现一个图形界面，空格选择`zh_CN.UTF-8`，`Enter`进入再保存一次，重启

# 安装谷歌拼音输入法
```shell
sudo install -y fcitx fcitx-googlepinyin
```
默认<kbd>Ctrl</kbd>+<kbd>空格</kbd>切换中英文，可在设置里修改快捷键

# 设置代理

## 命令行代理
>linux系统通用方法
**临时代理（重启失效）**
```shell
export https_proxy="http://127.0.0.1:7890"
export http_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7891"
```
查看代理是否成功(显示为国外ip就是成功了)
```shell
curl ip.sb
```
移除代理
```shell
unset https_proxy="http://127.0.0.1:7890"
unset http_proxy="http://127.0.0.1:7890"
unset all_proxy="socks5://127.0.0.1:7891"
```

**alias快捷命令**
1. 修改`/etc/profile`文件，在末尾加入以下代码
```shell
alias proxy='export https_proxy="http://192.168.2.2:7890";export http_proxy="http://192.168.2.2:7890";export all_proxy="socks5://192.168.2.2:7891";curl ip.sb;'
alias unproxy='unset https_proxy;unset http_proxy;unset all_proxy;curl ip.sb;'
```
2. 由于kali更换了默认终端，导致`/etc/profile`里的脚本不会触发，需要修改新终端的配置文件`/root/.zshrc`，在末尾加入以下代码
```shell
source /etc/profile
```
使用方法：
```shell
# 开启代理
proxy
# 关闭代理
ubproxy
```

## 分应用代理
>Kali 自带 ProxyChains4 代理工具，通过命令行可为每个应用单独配置代理，配置文件路径`/etc/proxychains4.conf`
```diff
[ProxyList]
# add proxy here ...
# meanwile
# defaults set to "tor"
- socks4  127.0.0.1 9050

+ http 127.0.0.1 7890
+ https 127.0.0.1 7890
+ socks5  127.0.0.1 7891
```

使用方法：
```shell
proxychains [软件名]
```
示例：
```shell
# 代理火狐浏览器
proxychains firefox
# 代理 curl
proxychains curl ip.sb
```