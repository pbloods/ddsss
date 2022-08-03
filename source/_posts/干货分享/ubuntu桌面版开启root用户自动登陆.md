---
title: ubuntu桌面版开启root用户自动登陆
category:
  - 干货分享
tag:
  - linux
  - ubuntu
abbrlink: 87670707
date: 2022-03-17 00:00:00
top_img: false
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/linux.png
---

>ubuntu22.04桌面版默认不支持root用户登陆，测试环境每次都要敲个sudo，实在麻烦

1. 先给root用户设置密码
```shell
sudo passwd root
```
2. 将下面两个文件`/etc/pam.d/gdm-password`和`/etc/pam.d/gdm-autologin`中的一行代码
```shell
auth required pam_succeed_if.so user != root quiet_success
```
3. 修改`/root/.profile`文件
```diff
- mesg n 2＞ /dev/null || true
+ tty -s && mesg n || true
```
4. 修改`/etc/gdm3/custom.conf`，没有这个文件就在设置里开启自动登录，或者自己创建
```diff
# GDM configuration storage
#
# See /usr/share/gdm/gdm.schemas for a list of available options.

[daemon]
AutomaticLoginEnable=true
- AutomaticLogin=pblood
+ AutomaticLogin=root

# Uncomment the line below to force the login screen to use Xorg
#WaylandEnable=false

# Enabling automatic login

# Enabling timed login
#  TimedLoginEnable = true
#  TimedLogin = user1
#  TimedLoginDelay = 10

[security]

[xdmcp]

[chooser]

[debug]
# Uncomment the line below to turn on debugging
# More verbose logs
# Additionally lets the X server dump core if it crashes
#Enable=true
```

**另外，桌面版也不支持root用户远程登陆，下面是开启方法**
1. 安装openssl-server
```shell
apt install openssh-server
```
2. 修改`/etc/ssh/sshd_config`文件
```diff
- #PermitRootLogin prohibit-password
+ PermitRootLogin yes
```
3. 重启ssh服务
```shell
service ssh restart
```
测试：
```shell
ssh root@localhost
```