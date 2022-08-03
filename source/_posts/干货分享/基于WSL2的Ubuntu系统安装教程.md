---
title: 基于WSL2的Ubuntu系统安装教程
category:
  - 干货分享
tag:
  - linux
  - ubuntu
abbrlink: 4151449129
date: 2022-01-12 00:00:00
top_img: false
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/linux.png
---

>WSL 是一个集成在 Windows 上的虚拟化工具，现有两种版，WSL1 和 WSL2。WSL1 是 Windows32 套壳，与 windows 共用IP，能够双向访问；WSL2 是一个由 windows 优化的虚拟机，与 Windows 不共享 IP，但是 Windows 能通过 127.0.0.1 访问 WSL2 内的服务，WSL2则不能反向操作，WSL2 能够运行完整的 Linux 系统，和 VMware 相比优点是占用内存小，与 Windows 兼容性好。

## 参考

- 适用于 Linux 的 Windows 子系统文档：<https://docs.microsoft.com/zh-cn/windows/wsl/>

## 安装

1. 安装 WSL2（使用管理员身份打开`Windows Terminal`）
```powershell
# 适用于 Linux 的 Windows 子系统
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
# 开启虚拟机平台
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
# 选择 WSL1（选 1 就是 WSL2）
wsl --set-default-version 2
# 更新 WSL Linux 内核的版本(管理员)
wsl --update
```

2. 安装 Linux 子系统（使用管理员身份打开`Windows Terminal`）
```powershell
# 列出所有可安装的 linux 版本(ubuntu、debian、kali等)
wsl --list --online
# 这里选择安装 Ubuntu-20.04
wsl --install -d Ubuntu-20.04 
```
**常用 WSL 命令:**
```powershell
# 列出已安装的 Linux 发行版
wsl --list --verbose
# 关闭 WSL
wsl --shutdown
# 卸载 Linux 发行版
wsl --unregister <DistributionName>
# 将发行版导出到 TAR 文件(镜像备份)
wsl --export <Distribution Name> <FileName>
# 导入新发行版（镜像恢复）
wsl --import <Distribution Name> <InstallLocation> <FileName>

# 设置默认用户为 root（以 ubuntu-20.04为例）
ubuntu2004 config --default-user root
# 切换回设置的用户（以 ubuntu-20.04为例）
ubuntu2004 config --default-user <uesname>
```

第三方安装工具：[LxRunOffline 使用教程 - WSL 自定义安装、备份](https://p3terx.com/archives/manage-wsl-with-lxrunoffline.html)

## 配置

### 设置 root 用户密码
>ubuntu-22.04自带图形安装界面，但是乱码严重，有时候设置不了用户和密码，退出进入命令行手动设置
```shell
# 默认 root 用户无密码，先设置root用户密码
passwd
# 增加一个普通用户并设置密码
adduser <username>
```

### 安装 gedit
```shell
apt install -y gedit
```

### 设置代理（以 Clash 为例）
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

**永久代理**
将以上内容写入`/etc/profile`
```shell
export https_proxy="http://127.0.0.1:7890"
export http_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7891"
```

相关命令
```shell
# 查看所有环境变量
env
```

### 更换软件源
>其实不换也行，ubuntu 22.04 默认源也挺快的，这里记录一下

备份原来的源
```shell
cp /etc/apt/sources.list /etc/apt/sources.list.bak
```
```shell
vim /etc/apt/sources.list
```
将内容全部替换为：
```
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

更新软件
```shell
apt-get update && apt-get upgrade
```

参考链接：<https://blog.csdn.net/wangyijieonline/article/details/105360138>

### 网络配置

#### 开放防火墙
>默认情况下Windows的防火墙会阻止WSL2中应用对Windows的网络访问
```powershell
New-NetFirewallRule -DisplayName "WSL" -Direction Inbound  -InterfaceAlias "vEthernet (WSL)"  -Action Allow
```

#### WSL2的远程访问
从Windows访问WSL2中的端口可以使用`localhost`、`127.0.0.1`，从`localhost`访问速度低于`127.0.0.1`，并且使用`localhost`时WSL的某些端口无法在Windows上访问，`127.0.0.1`没有这个问题；
WSL2真实IP是类似于这样的：`172.30.239.234`，与本机IP：`192.168.1.x`并不能互访，其实就是一层NAT，微软通过一些技术手段把通过`127.0.0.1`的互访完全打通了，把`localhost`和`172.30.239.234`绑定在一起，但没有和`127.0.0.1`一样打通所有端口，而且都无法从其它主机访问WSL2中的服务，必须做端口转发才能实现WSL2的远程访问

**示例：80端口的转发**
```powershell
netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=localhost
```
开启之后就可以通过`172.30.239.234`和`192.168.1.x`远程访问了

**查看端口转发**
```powershell
netsh interface portproxy show all
```

**删除端口转发**
```powershell
netsh interface portproxy delete v4tov4 listenport=80 listenaddress=0.0.0.0
```

**避免端口冲突**
通过`localhost`配置的端口转发，在和Windows的服务端口冲突时, WSL的服务将会被覆盖!
通过WSL的地址`172.30.239.234`配置的端口转发，在和Windows的服务端口冲突时, Windows的服务将会被覆盖! 

### 修改 DNS
```shell
nano /etc/resolv.conf
```

#### 修改 HOST
```shell
nano /etc/hosts
```
>注意通过电脑127.0.0.1访问WSL内的服务发挥作用的是电脑的hosts文件

#### 修改解析服务配置文件
```shell
nano /etc/systemd/resolved.conf
```
### 其他设置

**设置中文语言**
```shell
# 安装中文语言包
apt-get install language-pack-zh-hans
# 修改配置文件
sed -i 's/LANG=C.UTF-8/LANG=zh_CN.UTF-8/g' /etc/default/locale
```
