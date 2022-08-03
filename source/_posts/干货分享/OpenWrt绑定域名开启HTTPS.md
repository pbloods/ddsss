---
title: OpenWrt绑定域名开启HTTPS
category:
  - 干货分享
tag:
  - openwrt
abbrlink: 1697202410
date: 2022-04-01 00:00:00
top_img: false
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/openwrt.png
---

>在家里搭建了一些服务，使用HTTP协议通过动态DDNS访问，为了安全，还是上个HTTPS

## OpenWrt Web 管理页面 SSL
对于支持 SSL 的 OpenWrt 固件，HTTPS 很容易配置，有些固件默认就有 SSL ，简单配置一下就可以。
但是默认的SSL证书一般是私有证书，不被浏览器认可，访问起来老是感叹号，这就很难受，还是配个正经的域名证书比较好

1. 申请证书
推荐一个脚本 <https://acme.sh/> ,可以在 Linux 系统下自动申请续期域名的 SSL 证书，当然你也可以选择手动续期

2. 将对应证书文件重命名为`uhttpd.crt`、`uhttpd.key`，上传到`/etc/ssl`目录下，覆盖原文件

3. 修改 OpenWrt Web 管理页面 SSL 的端口
几乎所有地区的运营商都禁用了家庭宽带的 80、8080、443 这些默认的 web 服务端口，SSL 默认端口就是 443，想要通过公网 IP 访问路由器必须将 443 端口换掉
大多数 openwrt 固件都是用 uhttpd 作为 Web 服务系统的，配置文件路径是`/etc/config/uhttpd`，可以在里面配置端口，修改完重启 uhttpd 服务
```shell
/etc/init.d/uhttpd restart
```
记得开放防火墙对应端口

>不会修改也没事，有更简单的方法，直接在后台设置端口转发，将你喜欢的端口（比如4433）转发到 443 端口就行啦，最后通过`https://domain:4433`就能使用`SSL协议`远程访问我们的路由器后台啦！