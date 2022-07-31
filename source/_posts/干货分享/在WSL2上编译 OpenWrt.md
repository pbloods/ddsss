---
title: 在WSL2上编译OpenWrt
category:
  - 干货分享
tag:
  - openwrt
abbrlink: 1794170134
date: 2022-05-09 00:00:00
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/openwrt.png
---

## 准备

### 安装 WSL2

**请使用普通用户编译，默认不允许 root 用户编译，如果已经用了 root 用户可以执行下面的命令强制编译**
```shell
export FORCE_UNSAFE_CONFIGURE=1
```

### 设置命令行代理
>编译用到的资源几乎都在墙外，不用代理下载基本上没戏。

WSL2 不走主机端的代理，需要手动设置

修改`~/.bashrc`，在末尾加入以下代码（根据实际情况做对应修改，此处为 Clash 代理）：
```shell
alias proxy='export https_proxy="http://192.168.2.2:7890";export http_proxy="http://192.168.2.2:7890";export all_proxy="socks5://192.168.2.2:7891";curl ip.sb;'
alias unproxy='unset https_proxy;unset http_proxy;unset all_proxy;curl ip.sb;'
```
保存退出，重启终端生效
```shell
# 开启代理
proxy
# 关闭代理
unproxy
```
通过返回的IP判断是否代理成功

### 了解 OpenWrt 项目结构
此处为 openwrt 官方项目结构（21.02）
```shell
.
├── bin # 编译输出路径
│    ├── packages # 所有插件包
│    └── targets # 固件及插件输出路径
├── BSDmakefile
├── build_dir # 编译缓存
├── config
├── Config.in
├── COPYING
├── dl # dl库
├── feeds # feeds 库
├── feeds.conf.default # feeds源配置文件
├── include
├── key-build
├── key-build.pub
├── key-build.ucert
├── key-build.ucert.revoke
├── LICENSES
├── Makefile
├── package # 软件包
│    ├── feeds # feeds 软件的符号链接
│    └── others # 不在 feeds 源中的软件包，目录名任意
├── README.md
├── rules.mk
├── scripts
├── staging_dir # 编译时创建的软链接，指向 bin 目录
├── target
├── tmp # feeds 软件安装目录，删除相当于卸载软件
├── toolchain
├── tools
├──.config # 编译配置文件
└──
```


## 编译
>以[openwrt 官方源](https://github.com/openwrt/openwrt)为例

### 安装依赖
Ubuntu 22.04 的依赖，用于 OpenWrt master，22.03 和 21.02 分支，实测也可用于 lean 源
更多 Linux 发行版及依赖查看[官方文档](https://openwrt.org/docs/guide-developer/toolchain/install-buildsystem)
```shell
sudo apt install -y build-essential gawk gcc-multilib flex git gettext libncurses5-dev libssl-dev python3-distutils zlib1g-dev
```

### 下载源码
```shell
git clone https://github.com/openwrt/openwrt.git
cd openwrt
```

### 下载软件
1. 下载 feeds 软件（通过`feeds.conf.default`文件里配置的地址将软件源码下载到`/feeds`目录并生成索引文件）
```shell
./scripts/feeds update -a
```

2. 安装下载好的 feeds 软件（创建`/feeds`目录的软链接到`/package/feeds`目录，使其能够被 menuconfig 识别
```shell
./scripts/feeds install -a
```

### 基础配置
```shell
make menuconfig
```
执行后会出现一个图形界面
![20220601212243](https://pblood.oss-cn-hongkong.aliyuncs.com/img/note/20220601212243.png)

**操作方法：**
<kbd>空格</kbd>：选择( `*` 代表编入固件，`M` 表示编译成模块或者IPK包， `空`不编译 )
<kbd>上下左右键</kbd>：移动选择条
<kbd>Enter</kbd>：进入/确定
`<Select>`：进入下级菜单
`<Exit>`：返回上级菜单
`<Save>`：保存
`<Load>`：导入配置

**基本参数说明**

* `Target System` 你的路由器的 Soc 架构  
* `Subtarget` 你的路由器 Soc 的型号  
* `Target Profile` 你的路由器的型号
- `Target Images` 保存目标镜像的格式
- `Advanced configuration options (for developers)` 开发者选项，启用后可在`Local mirror for source packages`配置 dl 库链接
- `Build the OpenWrt SDK` 是否编译 SDK
- `Languages` 额外的语言环境（Go、Nodejs、PHP、python等）    
- `Libraries` 依赖库
  * `Libraries`  --->`Languages`  --->
- `LuCI` 需要安装的软件包  

**常用插件列表中英文对照表**
:::: details 点击展开

|插件中文名	|Luci App|
|--|--|
|网络向导	| luci-app-quickstart|
|实时监控	| luci-app-netdata|
|释放内存	| luci-app-ramfree|
|WireGuard 状态	| luci-app-wireguard|
|Web管理	| luci-app-webadmin|
|TTYD 终端	| luci-app-ttyd|
|磁盘管理	| luci-app-diskman|
|高级设置	| luci-app-advanced|
|定时重启	| luci-app-autoreboot|
|Argon 主题设置	| luci-app-argon-config|
|文件传输	| luci-app-filetransfer|
|关机	| luci-app-poweroff|
|应用商店	| luci-app-store|
|阿里云盘 WebDAV	| luci-app-aliyundrive-webdav|
|Mentohust 锐捷拨号客户端	| luci-app-mentohust|
| Minieap 锐捷拨号客户端 |  luci-app-minieap |
|甜糖星愿自动采集	| luci-app-ttnode|
|Hello World	| luci-app-vssr|
|Clash(frainzy1477)	| luci-app-clash|
|PassWall	| luci-app-passwall|
|Bypass	| luci-app-bypass|
|V2ray 服务器	| luci-app-v2ray-server|
|广告屏蔽大师 Plus+	| luci-app-adbyby-plus|
|iKoolProxy 滤广告	| luci-app-ikoolproxy|
|DNS 过滤器	| luci-app-dnsfilter|
|ShadowSocksR Plus+	| luci-app-ssr-plus|
|AdGuard Home	| luci-app-adguardhome|
|京东签到服务	| luci-app-jd-dailybonus|
|易有云文件管理器	| luci-app-linkease|
|DDNS.to内网穿透	| luci-app-ddnsto|
|微信推送	| luci-app-serverchan|
|全能推送	| luci-app-pushbot|
|上网时间控制	| luci-app-accesscontrol|
|解锁网易云灰色歌曲	| luci-app-unblockmusic|
|OpenClash	| luci-app-openclash|
|阿里DDNS	| luci-app-aliddns|
|动态 DNS(支持阿里腾讯)	| luci-app-ddns|
|QoS Nftables 版	| luci-app-nft-qos|
|SmartDNS	| luci-app-smartdns|
|LXC Containers	| luci-app-lxc|
|天翼家庭云/天翼云盘提速	| luci-app-familycloud|
|网络唤醒	| luci-app-wol|
|WatchCat	| luci-app-watchcat|
|UU游戏加速器	| luci-app-uugamebooster|
|VPN 绕过	| luci-app-vpnbypass|
|Frps	| luci-app-frps|
|Frp 内网穿透	| luci-app-frpc|
|UPnP	| luci-app-upnp|
|Nps 内网穿透	| luci-app-nps|
|迅雷快鸟	| luci-app-xlnetacc|
|OpenConnect VPN	| luci-app-ocserv|
|OpenVPN(客户端)	| luci-app-openvpn|
|uHTTPd	| luci-app-uhttpd|
|KMS 服务器	| luci-app-vlmcsd|
|RP PPPoE Server	| luci-app-rp-pppoe-server|
|IPTV 帮手	| luci-app-iptvhelper|
|组播代理	| luci-app-omcproxy|
|udpxy	| luci-app-udpxy|
|MWAN3 分流助手	| luci-app-mwan3helper|
|AirPlay 2 音频接收器	| luci-app-airplay2|
|Docker CE 容器	| luci-app-docker|
|Docker(Dockerman)	| luci-app-dockerman|
|可道云	| luci-app-kodexplorer|
|NFS 管理	| luci-app-nfs|
|微力同步	| luci-app-verysync|
|USB 打印服务器	| luci-app-usb-printer|
|打印服务器(模块)	| luci-app-p910nd|
|硬盘休眠	| luci-app-hd-idle|
|网络共享(SMB)	| luci-app-samba|
|Aria2 配置	| luci-app-aria2|
|挂载 SMB 网络共享	| luci-app-cifs-mount|
|Rclone	| luci-app-rclone|
|miniDLNA	| luci-app-minidlna|
|Transmission	| luci-app-transmission|
|FTP 服务器	| luci-app-vsftpd|
|PCHiFi 数字转盘遥控	| luci-app-music-remote-center|
|qBittorrent| luci-app-qbittorrent|
|aMule | luci-app-amule|
|BaiduPCS Web	| luci-app-baidupcs-web|
|N2N v2 VPN	| luci-app-n2n_v2|
|SoftEther VPN 服务器	| luci-app-softethervpn|
|IPSec VPN 服务器	| luci-app-ipsec-server|
|OpenVPN 服务器	| luci-app-openvpn-server|
|PPTP VPN 服务器	| luci-app-pptp-server|
|ZeroTier	| luci-app-zerotier|
|IP/MAC绑定	| luci-app-arpbind|
|简单MESH	| luci-app-easymesh|
|流量统计	| luci-app-bandwidthd|
|网速测试	| luci-app-netspeedtest|
|SQM QoS | luci-app-sqm|
|IPv6 端口转发	| luci-app-socatg|
|网速控制	| luci-app-eqos|
|应用过滤	| luci-app-oaf|
|服务质量(QoS)	|| luci-app-qos|
|多线多拨	| luci-app-syncdial|
|负载均衡	| luci-app-mwan3|
|Turbo ACC 网络加速|	| luci-app-turboacc|
|网络带宽监视器	| luci-app-nlbwmon|
|实时流量监测	| luci-app-wrtbwmon|
|IPV6|	ipv6helper|

::::

更多插件说明：
<https://www.right.com.cn/forum/thread-3682029-1-1.html>
<https://max.book118.com/html/2021/0405/8133116046003071.shtm>

**示例配置：**
基础
* `LuCI` ---> `Collections`  ---> `<*>luci` (Luci 后台，必备)
* `LuCI` ---> `Modules` ---> `Translations` ---> `<*>Chinese Simplified (zh_Hans)` (中文语言)
* `Extra packages`--->`ipv6helper` (IPV6支持)
多拨
* `Kernel modules` ---> `Network Devices` ---> `kmod-macvlan` 虚拟网络设备
* `LuCI` ---> `Applications` ---> `<*> luci-app-mwan3` 负载均衡
* `LuCI` ---> `Applications` ---> `<*> luci-app-syncdial` 多线多拨（lean源）

保存后配置会写入`.config`文件，里面有源码所有配置，未选择的配置以注释的形式存在，图形界面找不到的配置可以在`.config`文件里搜索再修改

### 进阶配置

#### 添加最新 argon 主题
>把插件源码及依赖放到`/package`目录下，编译时会自动遍历
```shell
## openwrt 源
git clone https://github.com/jerrykuku/luci-theme-argon.git package/luci-theme-argon
## Lean 源
rm -rf package/feeds/luci/luci-theme-argon
git clone -b 18.06 https://github.com/jerrykuku/luci-theme-argon.git package/feeds/luci/luci-theme-argon
```

#### 添加 ssr-plus
添加 helloworld 源
```shell
sed -i '$asrc-git helloworld https://github.com/fw876/helloworld' feeds.conf.default
```
更新
```shell
./scripts/feeds update -a
./scripts/feeds install -a
```
添加一些依赖，暂时没搞清楚，自己琢磨
>新版openwrt都默认禁止通过MD5认证的订阅链接了，导致很多老机场订阅不能用，可通过以下方法关闭

修改`helloworld/luci-app-ssr-plus/root/usr/share/shadowsocksr/subscribe.lua`
删除以下验证代码：
```diff
-- https://www.v2fly.org/config/protocols/vmess.html#vmess-md5-认证信息-淘汰机制
if info.aid and (tonumber(info.aid) > 0) then
result.server = nil
end
```

#### 替换已有软件
有些软件需要很多依赖，还涉及到源码的修改，比较复杂，这里只作简要说明

对于只在`/package`目录里的软件，直接替换即可；

对于`/feeds`目录下的软件，需要先删除`/package/feeds`目录下对应的软连接，再删除`/tmp`目录下的缓存，替换软件包，再安装一遍就可以了

#### 修改 Luci 后台地址
修改文件`/package/basefiles/files/bin/config_generate`
```diff
		static)
			local ipad
			case "$1" in
+			lan) ipad=${ipaddr:-"192.168.1.1"} ;;
				*) ipad=${ipaddr:-"192.168.$((addr_offset++)).1"} ;;
			esac

			netm=${netmask:-"255.255.255.0"}

			uci -q batch <<-EOF
				set network.$1.proto='static'
				set network.$1.ipaddr='$ipad'
				set network.$1.netmask='$netm'
			EOF
			[ -e /proc/sys/net/ipv6 ] && uci set network.$1.ip6assign='60'
		;;
```

#### 修改主机名
修改文件`/package/basefiles/files/bin/config_generate`
```diff
	uci -q batch <<-EOF
		delete system.@system[0]
		add system system
+		set system.@system[-1].hostname='OpenWrt'
		set system.@system[-1].timezone='UTC'
		set system.@system[-1].ttylogin='0'
		set system.@system[-1].log_size='64'
		set system.@system[-1].urandom_seed='0'
```

#### 修改版本号
搜索`DISTRIB_REVISION`

#### 修改 SSH 登陆欢迎信息
修改文件`/package/base-files/files/etc/banner`
可以在[此处](http://patorjk.com/software/taag/)定制自己的样式

#### 修改 dts
在`/target/linux/ramips/dts/`目录下找到自己机型的 dts，修改以下内容
```dts
			partition@50000 {
				compatible = "denx,uimage";
				label = "firmware";
				reg = <0x50000 0x1fb0000>;
			};
```
其中`1f60000`=32M；`1fb0000`=16M；`7b0000`=8M

附：
[在线进制转换工具](https://c.runoob.com/front-end/58/)


### 下载 dl 库
```shell
make download -j8
```
::: warning
建议焕源，如果采用默认dl库，很容易因为某个文件出错无限卡，可以通过更换第三方dl库解决，[参考教程](https://doc.openwrt.cc/1-General/8-Source-Mirror/)
:::

**下面是可更换的dl库地址：**
OpenWrt 官方dl库（下载经常卡在某个地方，两个都一样）
- `https://sources.openwrt.org/` 默认源（墙）
- `http://downloads.openwrt.org.cn/sources/` 国内源

第三方dl库
| 项目	| 支持分支	| 源码包镜像地址 |
| -- | -- | -- |
| [openwrt/openwrt](https://github.com/openwrt/openwrt) |	master / openwrt-21.02 / openwrt-19.07 / openwrt-18.06 / lede-17.01	|https://openwrt.cc/dl/openwrt/openwrt|
|[coolsnowwolf/lede](https://github.com/coolsnowwolf/lede) |	master|	https://openwrt.cc/dl/coolsnowwolf/lede|
|[immortalwrt/immortalwrt](https://github.com/immortalwrt/immortalwrt) |	master / openwrt-21.02 / openwrt-18.06 / openwrt-18.06-k5.4	|https://openwrt.cc/dl/immortalwrt/immortalwrt|
|[Lienol/openwrt](https://github.com/Lienol/openwrt) |	main / 19.07 / 21.02	| https://openwrt.cc/dl/lienol/openwrt|

### 编译固件
-j 后面是线程数，第一次编译推荐用单线程，方便发现并解决错误
```shell
## 单线程编译
make V=s -j1
## 以最大线程编译
make V=s -j$(nproc)
```
使用 WSL 编译，可能会因为Windows路径里带空格导致编译失败，在 make 编译命令前需要加上以下代码
···
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```
进阶编译操作
```shell
## 单独编译内核
make target/linux/compile V=s      
## 单独编译插件，此处以luci-app-netdata为例              
make package/lean/luci-app-netdata/compile V=s
## 还原为初始状态重新配置编译
rm -rf ./tmp && rm -rf .config
./scripts/feeds clean
./scripts/feeds update -a && ./scripts/feeds install -a
make menuconfig
make V=s -j$(nproc)
```
```
>编译完成后输出路径：`bin/targets`
```shell
.
├── config.buildinfo # 编译配置文件
├── feeds.buildinfo # feeds 源文件
├── openwrt-ramips-mt7620-aigale_ai-br100-initramfs-kernel.bin # 调试固件包（重启路由自动恢复出厂设置）
├── openwrt-ramips-mt7620-aigale_ai-br100.manifest # 所有插件版本信息
├── openwrt-ramips-mt7620-aigale_ai-br100-squashfs-sysupgrade.bin # 固件包
├── packages # 固件包含的所有插件
├── sha256sums
└── version.buildinfo # 版本信息
```
在 Windows 资源管理器地址栏输入`\\wsl$`即可访问 WSL 下的文件


## 相关资料
- OpenWRT 论坛：<https://forum.openwrt.org/>

### 源码汇总

#### openwrt
- [openwrt 官方源](https://github.com/openwrt/openwrt) 自带插件很少，但最稳定
- [lede 源](https://github.com/coolsnowwolf/lede) 基于官方[17.01分支](https://github.com/openwrt/openwrt/tree/lede-17.01)，自带插件很全，但不是最新
- [Lienol 源](https://github.com/Lienol/openwrt) 基于官方最新分支，自带插件挺多，没有科学，版本也很新，除了多拨创建的虚拟接口需要手动绑定才能正常使用没啥毛病
- [immortalwrt 源](https://github.com/immortalwrt/immortalwrt) 功能很丰富，但是太丰富了以至于出现了很多bug

#### 软件源
- 来自神秘网友 kenzok8（ssrp、passwall、openclash 等）
  * [kenzok8/openwrt-packages](https://github.com/kenzok8/openwrt-packages)
  * [kenzok8/small](https://github.com/kenzok8/small)
  * [kenzok8/small-package](https://github.com/kenzok8/small-package) 最新源
- [helloworld](https://github.com/fw876/helloworld) 科学上网插件集
	* [immortalwrt/packages](https://github.com/immortalwrt/packages)
- [passworld](https://github.com/xiaorouji/openwrt-passwall)

**软件源使用方法：**
1. 添加软件源
```shell
sed -i '$asrc-git helloworld https://github.com/fw876/helloworld' feeds.conf.default
```
解释："helloworld"是软件源的别名，软件会被下载到`/feeds/helloworld`目录，链接为软件源地址

2. 执行以下命令下载安装软件
```shell
## 全部下载并安装
./scripts/feeds update -a
./scripts/feeds install -a
## 单独下载并安装
./scripts/feeds update helloworld
./scripts/feeds install -a -p helloworld
```

###  插件、固件下载
#### 插件下载

- [官方 ipk 库](https://openwrt.pkgs.org/)
- [supes.top/packages](https://op.supes.top/packages/)
- [openwrt常用软件包](https://op.dllkids.xyz/)

#### 固件下载
- [openwrt 官方固件](https://downloads.openwrt.org/) && [openwrt 官方固件索引](https://firmware-selector.openwrt.org/) && 
- [openwrt 天灵固件索引](https://firmware-selector.immortalwrt.org/)
- [第三方 lede 固件](https://openwrt.mpdn.fun:8443/)  第三方使用 lean 源码编译的 openwrt 固件
- [supes.top](https://supes.top/) 第三方固件定制，免费在线编译，几分钟就编译好了，缺点是有他们家的广告
- [清华 openwrt 镜像](https://mirrors.tuna.tsinghua.edu.cn/openwrt/)

#### 其他
* [padavan 固件下载](https://opt.cn2qq.com/padavan/)

## 疑难杂症

- 可以登录 SSH，但是登录 luci 后台一直失败（官方源）
原因：官方 openwrt 采用了 cookie 验证，需要删除旧的 cookie 才能登录
