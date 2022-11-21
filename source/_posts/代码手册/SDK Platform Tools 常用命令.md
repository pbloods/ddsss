---
title: SDK Platform Tools 常用命令
categories:
  - 代码手册
tags:
  - android
top_img: false
abbrlink: 1036142066
date: 2021-06-14 08:00:00
---

推荐：
- [官方文档](https://developer.android.com/studio/command-line/adb)
- [闷骚程序员整理的 adb 使用手册](https://mazhuang.org/awesome-adb/)

## ADB常用命令

Android 系统是基于`Linux`内核的，所以`Linux`里的很多命令在`Android`里也有相同或类似的实现，在`adb shell`里可以调用。

```shell
#基本命令
adb devices                                        #列出连接的设备
adb connect [ip]                                   #连接主机
adb -s [主机id] [shell命令]                         #只在某一主机执行命令
adb kill-server                                    #关闭adb
adb tcpip 5555                                     #先通过usb连接开启无线调试，若无线连接失败，可能是目标设备没有开启无线调试

#设置代理
adb shell settings put global http_proxy IP:端口
#清除代理
adb shell settings delete global global_http_proxy_host
adb shell settings delete global global_http_proxy_port
adb shell settings delete global http_proxy

adb install xxx.apk                                #安装软件
adb shell pm list packages                         #查看应用列表
adb shell dumpsys package <apkname>                #查看软件的Activity
adb uninstall [-k] com.example.myapp               #卸载软件([-k]表示保留软件数据)
adb push xxx.xxx                                   #向手机推送文件
adb pull xxx.xxx                                   #取出手机的文件
adb logcat -f /sdcard/1.txt                        #将日志导出到手机储存中的1.txt
adb shell screencap -p /sdcard/1.png               #截图保存为手机储存中的1.png
adb shell screenrecord /sdcard/1.mp4               #屏幕录制保存到手机储存中的1.mp4  

adb shell am start 包名/Activity类名                #启动软件
adb shell am stopservice [options]                 #停止软件
adb shell pm disable-user <apkname>                #禁用软件
adb shell pm enable <apkname>                      #启用用软件
adb shell am force-stop                            #强制停止软件
adb shell getprop ro.product.model                 #查看设备型号
adb shell dumpsys battery                          #查看设备电量
adb shell wm size                                  #查看设备分辨率
adb shell wm density                               #查看设备dpi
adb shell ifconfig                                 #查看设备网络信息
adb shell cat /proc/cpuinfo                        #查看设备cpu信息
adb shell cat /proc/meminfo                        #查看设备内存信息

#刷机命令
adb reboot recovery                                #重启到 Recovery 模式
adb reboot                                         #从 Recovery 重启到系统
adb reboot bootloader                              #重启到 Fastboot 模式
```

## Fastboot常用命令

```shell
fastboot devices                                    #列出连接的设备
fastboot reboot                                     #重启设备
fastboot reboot-<xxx模式>                           #重启到对应模式
fastboot oem device-info                            #查看设备bl锁状态
fastboot oem unlock                                 #解除bl锁
fastboot oem unlock-go                              #解除bl锁

fastboot update xxx.zip                             #升级系统(卡刷包)
fastboot flash 分区 xxxx.img                         #刷写分区
fastboot erase 分区                                  #擦除分区
fastboot format cache                                #清除cache分区
fastboot format userdata                             #清除userdata分区
fastboot boot kernel.img ramdisk.gz                  #刷入kernel.img
fastboot flash:raw boot kernel.img ramdisk.gz        #提取kernel.img
```

## 一加8T玩机指南

### AB双分区刷机命令

`fastboot flash boot boot.img`：默认刷入当前boot分区
`fastboot flash boot_a/boot_b boot.img`：刷入指定boot分区  

### 常用快捷键

fastboot模式：电源键+音量减（关机状态）
recovery模式：从fastboot模式进入

强制关机：长按电源键（正常开机状态）；长按电源键+音量加键+音量减键（系统下线状态）

### 玩机资源

- 一加8T/9R 官方安卓12（ColorOS 12.1 / 氧OS 12.1）[非官方TWRP_3.6.2_12_27082022](TWRP_3.6.2_12_27082022)，支持自动解密
- [一加8T 刷机包_官方ROM_全量包_线刷包_救砖包_降级包_固件下载](https://yun.daxiaamu.com/OnePlus_Roms_2/%E4%B8%80%E5%8A%A08T/)