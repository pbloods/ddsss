---
title: ColorOS TV 固件提取
category:
  - 干货分享
tag:
  - android
top_img: false
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/linux.png
---

1. 开启ADB
设置 > 系统 > 关于本机 > 设备型号，依次快速按方向键`上``上``右``右``确认`键

2. 安装Fiddler

3. 安装ADB

4. 设置代理
```shell
adb shell settings put global http_proxy 192.168.2.127:8888
```

5. 抓取固件地址
设置 > 系统 > 系统更新

当前系统版本：ColorOS TV 2.3 (XD050_02.A.01_120_2204280559)

**接口：otac.h2os.com:443**
```请求
CONNECT otac.h2os.com:443 HTTP/1.1
Host: otac.h2os.com:443
Connection: Keep-Alive
User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; OPPOCNM632 Build/PPR2.180905.006.A1)

A SSLv3-compatible ClientHello handshake was found. Fiddler extracted the parameters below.

Version: 3.3 (TLS/1.2)
Random: A0 D6 14 AC 4B B4 D6 43 C1 7B D2 33 CF 6C 10 1D C2 3B A7 B3 80 B9 30 CE 7F E8 E6 34 CC 38 FE A8
"Time": 2061/6/27 5:26:56
SessionID: empty
Extensions: 
	renegotiation_info	00
	server_name	otac.h2os.com
	extended_master_secret	empty
	SessionTicket	empty
	signature_algs	ecdsa_secp256r1_sha256, rsa_pss_rsae_sha256, rsa_pkcs1_sha256, ecdsa_secp384r1_sha384, rsa_pss_rsae_sha384, rsa_pkcs1_sha384, rsa_pss_rsae_sha512, rsa_pkcs1_sha512, rsa_pkcs1_sha1
	status_request	OCSP - Implicit Responder
	ALPN		http/1.1
	ec_point_formats	uncompressed [0x0]
	supported_groups	x25519 [0x1d], secp256r1 [0x17], secp384r1 [0x18]
Ciphers: 
	[C02B]	TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
	[C02C]	TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
	[CCA9]	TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256
	[C02F]	TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
	[C030]	TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
	[CCA8]	TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
	[C009]	TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA
	[C00A]	TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA
	[C013]	TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA
	[C014]	TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA
	[009C]	TLS_RSA_WITH_AES_128_GCM_SHA256
	[009D]	TLS_RSA_WITH_AES_256_GCM_SHA384
	[002F]	TLS_RSA_WITH_AES_128_CBC_SHA
	[0035]	TLS_RSA_WITH_AES_256_CBC_SHA

Compression: 
	[00]	NO_COMPRESSION
```

```响应
HTTP/1.1 200 Connection Established
FiddlerGateway: Direct
StartTime: 13:33:02.993
Connection: close
```

**接口：tv.magzine.oppomobile.com:443**
```请求
CONNECT tv.magzine.oppomobile.com:443 HTTP/1.1
Host: tv.magzine.oppomobile.com:443
Connection: Keep-Alive
User-Agent: okhttp/3.14.4

After the client received notice of the established CONNECT, it failed to send any data.
```
```响应
HTTP/1.1 200 Connection Established
FiddlerGateway: Direct
StartTime: 13:35:11.206
Connection: close
```

**接口：conn3.coloros.com/generate204**
```请求
GET http://conn3.coloros.com/generate204 HTTP/1.1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.32 Safari/537.36
Host: conn3.coloros.com
Connection: Keep-Alive
Accept-Encoding: gzip
```
```响应
HTTP/1.1 204 No Content
Server: nginx
Date: Sun, 14 Aug 2022 05:37:32 GMT
Connection: keep-alive
X-Backend-Host: 0286:10122
X-Gateway-Host: 0afa9160f04a31458fd2dc56f735c04e5eb4523ceae6af616a99b7b71728704fb95552b18aa08354a5af461585fea058
```

**接口：conn1.coloros.com:443**
```请求
CONNECT conn1.coloros.com:443 HTTP/1.1
Host: conn1.coloros.com:443
Connection: Keep-Alive
User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; OPPOCNM632 Build/PPR2.180905.006.A1)

After the client received notice of the established CONNECT, it failed to send any data.
```
```响应
HTTP/1.1 200 Connection Established
FiddlerGateway: Direct
StartTime: 13:38:46.564
Connection: close
```

接口暂时看不懂，暂存

最后记得清除代理
```shell
adb shell settings delete global http_proxy
```