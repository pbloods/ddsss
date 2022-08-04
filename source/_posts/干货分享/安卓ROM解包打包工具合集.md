---
title: 安卓ROM解包/打包，支持安卓9+
category:
  - 干货分享
tag:
  - android
abbrlink: 693417627
date: 2021-06-15 00:00:00
top_img: false
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/linux.png
---

## 参考

- https://rendiix.github.io/

## 解包 

### payload.bin

工具：https://github.com/vm03/payload_dumper，Windows版本：https://mrzzoxo.lanzouw.com/iR65zpaueyd

### system.dat.br

工具：https://github.com/google/brotli

```shell
brotli -d system.dat.br -o system.dat
```

### system.dat

工具：https://github.com/xpirt/sdat2img

需要Python 2.7+环境支持
```shell
sdat2img.py system.transfer.list system.new.dat system.img
```

## 打包

### 查看原img信息
确保打包的后img包和原包格式一致，能被系统识别
```shell
file system.img                 #查看修改前system.img格式
ls -l system.img                #查看修改前system.img分区大小
```

### 打包为img格式

工具：https://github.com/rendiix/make_ext4fs

```shell
make_ext4fs -s -l 3221225472 -a system system.img /system
#参数说明：
-s 表示安静处理，不输出动作，可以不带该参数
-l 表示最大的文件大小（system分区大小）单位也可以为MB
注:(其中的-l 参数3221225472数就是system.img的分区大小总字节数，需换成自己合适的参数
-a 表示Android的分区名，比如我这里是system
system.img 表示输出文件名
/system 表示被打包的输入目录
```

::: warning
打包完成后输入`file system.img`查看镜像信息,如果文件格式和原来不一样，需要转换文件格式
:::

```shell
simg2img system.img system_new.img        #转换为ext4格式
```
### `.img`格式转`.dat`

工具：https://github.com/jazchen/rimg2sdat 需要Python 2.7.5+环境支持

```shell
rimg2sdat.py system_new.img -o /rom -v 4
```

>成功执行后在rom目录转出`system.new.dat`和`system.transfer.list`两个文件

### `.dat`转`.br`

在转出的rom目录手动新建一个`system.patch.dat`的空文件
```shell
brotli -q 0 /rom/system.new.dat
```