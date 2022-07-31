---
title: 使用Git actions云编译openwrt
category:
  - 干货分享
tag:
  - openwrt
date: 2022-05-10 00:00:00
---


>使用 Git actions 编译不会出现因国内网络环境引发的一系列问题，每次编译 openwrt 大概需要一个多小时（单线程），如果本地编译老是失败或者编译速度太慢可以尝试使用

## 获取配置文件
>使用 Git actions 编译最主要的一步就是修改配置文件，可以在本地`.config`文件里查找，具体方法参考[本地编译](/posts/3688402127)部分

## 创建 CI 文件

```shell
# 创建 workflows 目录
mkdir -p .github/workflows
# 创建 openwrt-ci.yml
touch .github/workflows/openwrt-ci.yml
```
写入以下内容

:::: details 代码

```yml
name: openwrt-ci

on:
  push:
    branches: 
      - master
  # schedule:
  #   - cron: 0 20 * * *
  release:
    types: [published]

jobs:

  build_openwrt:

    name: 编译 openwrt 固件

    runs-on: ubuntu-latest

    if: github.event.repository.owner.id == github.event.sender.id

    steps:

      - name: 获取仓库源码
        uses: actions/checkout@v2
        with:
          ref: master

      - name: 清理残留，安装依赖
        env:
          DEBIAN_FRONTEND: noninteractive
        run: |
          docker rmi `docker images -q`
          sudo rm -rf /usr/share/dotnet /etc/mysql /etc/php /etc/apt/sources.list.d /usr/local/lib/android
          sudo -E apt-get -y purge azure-cli ghc* zulu* hhvm llvm* firefox google* dotnet* powershell openjdk* adoptopenjdk* mysql* php* mongodb* dotnet* moby* snapd* || true
          sudo -E apt-get update
          sudo -E apt-get -y install build-essential asciidoc binutils bzip2 gawk gettext git libncurses5-dev libz-dev patch python3 unzip zlib1g-dev lib32gcc1 libc6-dev-i386 subversion flex uglifyjs gcc-multilib g++-multilib p7zip p7zip-full msmtp libssl-dev texinfo libglib2.0-dev xmlto qemu-utils upx libelf-dev autoconf automake libtool autopoint device-tree-compiler antlr3 gperf swig libtinfo5
          sudo -E apt-get -y autoremove --purge
          sudo -E apt-get clean
          # sudo mkdir -p -m 777 /mnt/openwrt/bin /mnt/openwrt/build_dir/host /mnt/openwrt/build_dir/hostpkg /mnt/openwrt/dl /mnt/openwrt/feeds /mnt/openwrt/staging_dir
          # ln -s /mnt/openwrt/bin ./bin
          # mkdir -p ./build_dir
          # ln -s -f /mnt/openwrt/build_dir/host ./build_dir/host
          # ln -s -f /mnt/openwrt/build_dir/hostpkg ./build_dir/hostpkg
          # ln -s /mnt/openwrt/dl ./dl
          # ln -s /mnt/openwrt/feeds ./feeds
          # ln -s /mnt/openwrt/staging_dir ./staging_dir
          df -h
      - name: 更新 feeds 
        run: |
          ./scripts/feeds update -a
          ./scripts/feeds install -a

      - name: 下载外部插件
        run: |
          # argon 主题(示例)
          git clone https://github.com/jerrykuku/luci-theme-argon.git package

      - name: 添加配置
        run: |
          # 删除本地配置（本地配置只有部分生效，索性都在线生成）
          rm -f ./.config*
          touch ./.config
          #
          # 在 cat >> .config <<EOF 到 EOF 之间粘贴你的编译配置, 需注意缩进关系
          cat >> .config <<EOF

          # 示例配置
          # 小娱C5
          CONFIG_TARGET_ramips=y
          CONFIG_TARGET_ramips_mt7621=y
          CONFIG_TARGET_ramips_mt7621_DEVICE_xiaoyu_xy-c5=y
          # 默认 luci 后台
          CONFIG_PACKAGE_luci=y
          # 默认 argon 主题
          CONFIG_PACKAGE_luci-theme-argon=y
          # 中文语言
          CONFIG_LUCI_LANG_zh_Hans=y

          EOF
          # ===============================================================
          # 
          sed -i 's/^[ \t]*//g' ./.config
          make defconfig
      - name: 下载 dl 库
        run: |
          make download -j8 || make download -j1 V=s
          rm -rf $(find ./dl/ -size -1024c)
          df -h
      - name: 编译固件
        run: |
          make -j$(nproc) || make -j8 V=s
          echo "======================="
          echo "Space usage:"
          echo "======================="
          df -h
          echo "======================="
          du -h ./ --max-depth=1
          du -h /mnt/openwrt/ --max-depth=1 || true
      - name: 移动待输出文件到指定目录
        run: |
          mkdir -p ./artifact/firmware
          mkdir -p ./artifact/package
          mkdir -p ./artifact/buildinfo
          rm -rf $(find ./bin/targets/ -type d -name "packages")
          cp -rf $(find ./bin/targets/ -type f) ./artifact/firmware/
          cp -rf $(find ./bin/packages/ -type f -name "*.ipk") ./artifact/package/
          cp -rf $(find ./bin/targets/ -type f -name "*.buildinfo" -o -name "*.manifest") ./artifact/buildinfo/
      - name: 输出构建信息文件
        uses: actions/upload-artifact@v2
        with:
          name: OpenWrt_buildinfo
          path: ./artifact/buildinfo/

      - name: 10.输出 ipk 包
        uses: actions/upload-artifact@v2
        with:
          name: OpenWrt_package
          path: ./artifact/package/

      - name: 输出固件
        uses: actions/upload-artifact@v2
        with:
          name: OpenWrt_firmware
          path: ./bin/targets/

      - name: 上传固件到 release asset
        if: github.event == 'release'
        uses: svenstaro/upload-release-action@v2
        with:
          repo_token: ${{ secrets.YOURTOKEN }}
          file: ./artifact/firmware/*
          tag: ${{ github.ref }}
          file_glob: true
```

::::

你可以参照以下内容自行修改

**修改固件平台（示例）：**
在 `添加配置`步骤里的 `cat >> .config <<EOF` 和 `EOF` 之间添加
```x64固件
CONFIG_TARGET_x86=y
CONFIG_TARGET_x86_64=y
CONFIG_TARGET_x86_64_Generic=y
```
修改后的样子
```diff
      - name: 添加配置
        run: |
          rm -f ./.config*
          touch ./.config
          #
          # 在 cat >> .config <<EOF 到 EOF 之间粘贴你的编译配置, 需注意缩进关系
          # ===============================================================          
          cat >> .config <<EOF
+         # 示例（编译X64固件）
+         CONFIG_TARGET_x86=y
+         CONFIG_TARGET_x86_64=y
+         CONFIG_TARGET_x86_64_Generic=y
          EOF
          # ===============================================================
          # 
          sed -i 's/^[ \t]*//g' ./.config
          make defconfig
```

:::: details 代码

```shell
# K2P
CONFIG_TARGET_ramips=y
CONFIG_TARGET_ramips_mt7621=y
CONFIG_TARGET_ramips_mt7621_DEVICE_phicomm_k2p=y
# 小米AC2100
CONFIG_TARGET_ramips=y
CONFIG_TARGET_ramips_mt7621=y
CONFIG_TARGET_ramips_mt7621_DEVICE_xiaomi_mi-router-ac2100=y
# 红米AC2100
CONFIG_TARGET_ramips=y
CONFIG_TARGET_ramips_mt7621=y
CONFIG_TARGET_ramips_mt7621_DEVICE_xiaomi_redmi-router-ac2100=y
# NEWIFI3 D2
CONFIG_TARGET_ramips=y
CONFIG_TARGET_ramips_mt7621=y
CONFIG_TARGET_ramips_mt7621_DEVICE_d-team_newifi-d2=y
# 小娱C5
CONFIG_TARGET_ramips=y
CONFIG_TARGET_ramips_mt7621=y
CONFIG_TARGET_ramips_mt7621_DEVICE_xiaoyu_xy-c5=y
# 斐讯 N1（未测试）
CONFIG_TARGET_armvirt=y
CONFIG_TARGET_armvirt_64=y
CONFIG_TARGET_BOARD="armvirt"
CONFIG_TARGET_ARCH_PACKAGES="aarch64_cortex-a53"
# 斐讯 K3（未测试）
CONFIG_TARGET_bcm53xx=y
CONFIG_TARGET_bcm53xx_DEVICE_phicomm-k3=y
CONFIG_TARGET_BOARD="bcm53xx"
```

::::

## 基本配置合集
```yml
          # 默认 luci 后台
          CONFIG_PACKAGE_luci=y
          # 默认 argon 主题
          CONFIG_PACKAGE_luci-theme-argon=y
          # 中文语言
          CONFIG_LUCI_LANG_zh_Hans=y
          # 多拨
          CONFIG_PACKAGE_luci-app-mwan3=y
          CONFIG_PACKAGE_kmod-macvlan=y
```

>最后把修改后的项目 push 到 Github 就会触发自动编译啦！

编译完成后 `Acions` 的 `Artifacts` 项下会出现三个压缩包:
- OpenWrt_buildinfo 编译配置文件
- OpenWrt_firmware 固件包及相关信息，主要有以下两种固件
  * `openwrt-ramips-mt7621-xiaoyu_xy-c5-initramfs-kernel` 重启路由器后就会恢复出厂设置
  * `openwrt-ramips-mt7621-xiaoyu_xy-c5-squashfs-sysupgrade` 正常固件
- OpenWrt_package 使用`*`或者`M`选中插件的 ipk 包

## 参考链接
<https://github.com/P3TERX/Actions-OpenWrt>

<https://github.com/KFERMercer/OpenWrt-CI>

<https://github.com/P3TERX/Actions-OpenWrt>