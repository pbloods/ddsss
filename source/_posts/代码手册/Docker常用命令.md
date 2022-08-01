---
title: Docker 常用命令
categories:
  - 代码手册
tags:
  - docker
top_img: false
abbrlink: 4059019427
date: 2021-11-21 11:20:30
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/docker.png
---

## 参考

- Docker 官方文档：<https://docs.docker.com/reference/>

## 镜像命令

### 查看镜像(docker images)

```shell
[root@localhost ~]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
centos       latest    e6a0117ec169   7 months ago   272MB
```
`REPOSITORY`：镜像在仓库中的名称
`TAG`：镜像标签
`IMAGE ID`：镜像ID
`CREATED`：镜像创建日期（不是获取该镜像的日期）
`SIZE`：镜像大小

### 搜索镜像(docker search)
从网络中找出需要的镜像
```shell
[root@localhost ~]# docker search mysql
NAME                              DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                             MySQL is a widely used, open-source relation…   11997     [OK]       
mariadb                           MariaDB Server is a high performing open sou…   4595      [OK]       
mysql/mysql-server                Optimized MySQL Server Docker images. Create…   899                  [OK]

# 可选项,通过搜索来过滤
--filter = STARS = 3000  搜索出的镜像是STARS>3000的
```
`NAME`：镜像名称
`DESCRIPTION`：镜像描述
`STARS`：用户评价（受欢迎的程度）
`OFFICIAL`：是否为官方构建
`AUTOMATED`：自动构建，表示该镜像是由 Docker Hub 自动构建流程创建的

### 拉取镜像(docker pull)
拉取镜像就是从中央仓管总下载镜像到本地

如果不声明`Tag`镜像标签信息则默认拉取`latest`版本，通过<https://hub.docker.com>搜索镜像，可以查看支持的`Tag`信息。
```shell
docker pull centos  # 相当于 docker pull centos:latest
```

通过`Tag`信息，下载centos_20.04的镜像
```shell
docker pull centos:20.04
```

### 删除镜像(docker rmi)

```shell
# 删除单个镜像
docker rmi 镜像ID

# 删除多个镜像
docker rmi [镜像ID] [镜像ID] [镜像ID] 

docker images -q 可以查询到所有镜像的 ID，通过组合命令可以实现删除所有镜像的操作。
docker rmi `docker images -q`
或者
docker rmi $(docker images -aq)

# 删除没用的镜像,按需更改关键字test
docker images|grep none|awk '{print $3}'|xargs docker rmi
docker images|grep test|awk '{print $3}'|xargs docker rmi

# 清除没有用到的数据卷，有重要数据要谨慎
docker volume prune
# 删除 dangling volmue
docker volume rm $(docker volume ls -qf dangling=true)
```
注意：如果通过了某个镜像创建了容器，则该镜像无法删除。

解决办法：先删除镜像中的容器，在删除该镜像，或者使用`-f`强制删除

### 提交镜像(docker commit)
将已有容器创建为一个新的镜像，包含容器的所有层， 比较臃肿，主要用来备份容器。

```
docker commit [可选参数] [容器名|容器ID]:[Tag] [新的镜像名]
```
参数说明：
`-a`:提交的镜像作者
`-c`:使用Dockerfile指令来创建镜像
`-m`:提交时的说明文字
`-p`:在commit时，将容器暂停

### 导出镜像(docker save)
将指定镜像保存成tar归档文件
```
docker save [可选参数] [tar归档文件] [容器名|容器ID]:[Tag]
# >可指定目录
docker save [可选参数] [容器名|容器ID]:[Tag] > [tar归档文件]
```
可选参数:
`-o` ：--output 保存到文件,默认为标准输出STDOUT

```shell
# 导出镜像,支持同时导出多个镜像，如果没有指定tag,则默认保存所有tag,而非latest
docker save -o images.tar image1:tag [image2:tag ...]
# 导出镜像并压缩
docker save nginx:1.20.1 | gzip > nginx_1.20.1.tar.gz
# 打包所有镜像,两条命令等同
docker save $(docker images --format "{{.Repository}}:{{.Tag}}" |tr '\n' ' ') -o k8s-images.tar
docker save $(docker images | grep -v REPOSITORY | awk 'BEGIN{OFS=":";ORS=" "}{print $1,$2}') -o k8s-images.tar
```

### 载入镜像(docker load)
通过save导出和load导入的镜像信息应该是完全一致的才对，如tag和images id都是一致的，否则报错。

```shell
# 导入镜像
docker load -i images.tar
# 导入压缩的镜像包
gunzip -c nginx_1.20.1.tar.gz | docker load
# 或者解压后再导入
tar -zxf nginx_1.20.1.tar.gz
docker load -i nginx_1.20.1.tar
# 打包指定前缀的镜像,两条命令等同
docker save $(docker images --format "{{.Repository}}:{{.Tag}}" rancher/* |tr '\n' ' ') -o rancher-images.tar
docker save $(docker images rancher/* | grep -v REPOSITORY | awk 'BEGIN{OFS=":";ORS=" "}{print $1,$2}') -o rancher-images.tar
```

### 推送镜像(docker push)

#### Docker Hub

1. [注册](https://hub.docker.com/)
2. **登录**
通过执行`docker login`命令交互式的输入用户名及密码来完成在命令行界面登录 Docker Hub。
```shell
docker login
```
通过`docker logout`退出登录。
3. 新建Tag
```shell
# 查看镜像列表
$ docker images
ubuntu:18.04     8.0.11      5dbe5b6313e1        2 years ago         445MB
# 打上Tag
docker tag 5dbe5b6313e1 username/ubuntu:18.04
```
4. 推送
```shell
docker push username/ubuntu:18.04
```
5. 查看
```shell
$ docker search username
NAME                      DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
username/ubuntu
```
注意：推送完成的镜像可能需要几个小时才能被搜索到

#### ghcr.io
GitHub 镜像仓库服务(ghcr.io)

1. Github创建登陆 Token
Github Container registry 需要使用 https://github.com/settings/tokens/new 页面创建的 Token 作为密码才可以推送镜像。
打开上面的链接，勾选 write:packages 和 read:packages ，repo 会自动选中，创建 Token。

下面以`$PAT`代指这里的Token值。
1. 登陆
```shell
echo $PAT | docker login ghcr.io --username username --password-stdin
```
3. 新建Tag
```shell
# 查看镜像列表
$ docker images
mysql     8.0.11      5dbe5b6313e1        2 years ago         445MB
# 打上Tag
docker tag 5dbe5b6313e1 ghcr.io/username/app:1.0.0
```
4. 推送
```shell
docker push ghcr.io/username/app:1.0.0
```

推送完成镜像之后，在github个人的主页`packages`标签页下面，可以看到镜像列表。

### 构建镜像(Dockerfile)
Dockerfile 是用于构建 docker 镜像的配置文件，使用 Dockerfile 可以定制镜像

**基本语法：**
1. 每个保留关键字(指令)都必须是大写字母
2. 执行从上到下的顺序
3. `#` 表示注释
4. 每一个指令都会创建一个新的镜像层并提交

**示例：**构建一个基于`debian:bullseye-slim`的nginx镜像

1. 新建一个工作目录，创建一个名为 Dockerfile 的文件，写入以下内容
```Dockerfile
# 基础镜像（本地没有会从 docker hub 下载）
FROM debian:bullseye-slim
# 添加镜像信息
LABEL version="1.0" author="pblood"
# 设置容器环境变量
ENV NGINX_VERSION   1.22.0
# 安装nginx
RUN apt-get update \
    && apt install -y make gcc g++ libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev wget \
    && wget http://nginx.org/download/nginx-1.22.0.tar.gz \
    && tar -zxvf nginx-1.22.0.tar.gz && cd nginx-1.22.0 \
    && ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module \
    && make \
    && make install
# 开放80端口
EXPOSE 80/tcp
EXPOSE 80/udp
# 启动命令，tail命令是为了防止容器因没有前台进程而自动退出
ENTRYPOINT /usr/local/nginx/sbin/nginx && tail -f /etc/passwd
```
>这种方法是编译安装nginx，会使镜像过大，仅作学习使用。
这是 Docker Hub 上 nginx 官方的[Dockerfile 文件](https://github.com/nginxinc/docker-nginx/blob/d4a47bc6602d3a1412dad48a8513b83805605ef3/stable/debian/Dockerfile)，可以参考参考

2. 开始构建镜像
```shell
docker build -t nginx:1.22.0 .
```
`-t`：指定镜像名称:镜像标签，如`bash:5.0`，不指定标签默认为`latest`
`.`：上下文路径，docker build 会上传工作目录下的所有文件，通过 Dockerfile 调用，出现在`.dockerignore`文件里的目录或文件将不会被上传

`.dockerignore`文件的写法和`.gitignore`类似，支持正则和通配符，具体规则如下：
- 每行为一个条目；
- 以`#`开头的行为注释；
- 空行被忽略；
- 构建上下文路径为所有文件的根路径；
- 文件匹配规则具体语法如下：
```shell
# comment
*/temp* # 匹配根路径下一级目录下所有以 temp 开头的文件或目录
*/*/temp* # 匹配根路径下两级目录下所有以 temp 开头的文件或目录
temp? # 匹配根路径下以 temp 开头，任意一个字符结尾的文件或目录
**/*.go # 匹配所有路径下以 .go 结尾的文件或目录，即递归搜索所有路径

# 匹配根路径下所有以 .md 结尾的文件或目录，但 README.md 除外
*.md
!README.md
```
构建完成可以用`docker images`命令查看

**易混淆的dockerfile命令**

COPY 和 ADD
- `ADD`：拷贝文件或目录到容器中，如果是URL或压缩包便会自动下载或自动解压
- `COPY`：拷贝文件或目录到容器中，跟ADD类似，但不具备自动下载或解压的功能

ENTRYPOINT 和 CMD
- `ENTRYPOINT`：运行容器时执行的shell命令
- `CMD`：运行容器时提供默认值。这些默认值可以是可执行文件，也可以省略可执行文件，省略可执行文件时必须用ENTRYPOINT为指令提供默认参数(Exec 格式);如果有多个则只有最后一个生效

ENV 和 ARG
- `ENV`：容器环境变量
- `ARG`：只作用于 Dockerfile 内部的环境变量

## 容器命令

### 查看容器信息

```shell
# 查看正在运行的容器并带出历史运行过的容器
docker ps -a
# 只显示容器ID
docker ps -q
# 查看所有容器（包括运行和停止）
docker ps -f startus=exited
# 查看最后一次运行的容器
docker ps -l
# 列出最近创建的 n 个容器
docker ps -n 3

# 查看容器元信息
docker inspect [容器名称|容器ID]

# 筛选查看IP地址
docker inspect --format='{{.NetworkSettings.IPAddress}}' [容器名|容器ID]

# 查看容器cpu占用
docker stats

# 查看容器内部的进程
docker top [容器ID]
```

### 创建容器(docker run)

**语法**
```shell
docker run [可选参数] image [COMMAND] [ARG...]`
```

可选参数说明：
`--network="bridge"`：指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型,默认bridge模式，host模式不需要设置映射端口,自动映射全端口到外网
`--restart`：重启策略
- `no`      容器退出后不重启容器,此为默认策略
- `always`  总是重启容器,不管容器是否为异常退出
- `on-failure[:max-retries]`  当容器异常退出(状态码为非0)时重启容器,可以设置最大重启次数
- `unless-stopped`            当容器被手动停止或docker服务停止(或重启)时不重启容器
`-i`：表示运行容器
`-t`：表示容器启动后会进入容器
`--name`：为创建的容器命名
`-v`：表示目录映射关系（前者是宿主机目录，后者是映射到宿主机的目录）可以用多个-v做多个目录映射
`-d`：创建一个守护式容器在后台运行，不会自动进入容器
`-p`：表示端口映射，前者是宿主机端口，后者是容器内的映射端口，可以使用多个-p做多端口映射
`-p 主机端口:容器端口`，例：`-p 8080:8080`

示例：
```shell
$ docker run --name test -it debian
$ docker run -it --rm ubuntu bash
$ docker run -it --privileged ubuntu bash
$ docker run -w /path/to/dir/ -it ubuntu pwd
# 挂载本地目录到容器,并指定容器的工作目录
$ docker run -v /doesnot/exist:/foo -w /foo -it ubuntu bash
# 只读挂载
$ docker run --read-only -v /icanwrite busybox touch /icanwrite/here
$ docker run -p 127.0.0.1:80:8080/tcp ubuntu bash
$ docker run --expose 80 ubuntu bash
# 指定容器环境变量
$ docker run -e MYVAR1 --env MYVAR2=foo --env-file env.list ubuntu bash
$ docker run --env VAR1=value1 --env VAR2=value2 ubuntu env | grep VAR
$ docker run --env-file env.list ubuntu env | grep VAR
# 指定容器标签
$ docker run -l my-label --label com.example.foo=bar ubuntu bash
$ docker run --label-file labels ubuntu bash
$ docker run -itd --network=my-net busybox
$ docker run --volumes-from 777f7dc92da7 --volumes-from ba8c0c54f0f2:ro -it ubuntu pwd
$ docker run -it --rm --gpus all ubuntu nvidia-smi
$ docker run --restart=always redis
# 指定hosts记录
$ docker run --add-host=docker:192.168.10.10 --rm -it alpine
```

**进入容器**
```
# 进入容器后开启一个新的终端
docker exec -it [容器名称|容器ID] /bin/bash
# 进入一个容器正在执行的终端
docker attach [容器名称|容器ID]
```

**退出当前容器**

直接退出容器并停止
```
exit
```
容器不停止退出
`Ctrl+P+Q`

### 停止与启动容器
```shell
# 启动容器
docker start 容器ID
# 重启容器
docker restart 容器ID
# 停止当前容器
docker stop 容器ID
# 强制停止容器
docker kill 容器ID
# 停止所有容器,两条命令等同
docker stop $(docker ps -aq)
docker ps -aq |xargs docker stop
```

### 删除容器(docker rm)
```shell
# 删除指定的容器,不能删除正在运行的容器,强制删除rm -f
docker rm [容器名称|容器ID]
# 删除所有容器,两条命令等同
docker rm $(docker ps -q)
docker ps -aq |xargs docker rm
# 删除所有关闭的容器
docker rm $(docker ps -aq -f status=exited)
# 删除异常状态容器
docker ps -a |grep Exited | awk '{print $1}'|xargs docker rm
docker ps -a |grep Created | awk '{print $1}'|xargs docker rm

# 清除没有用到的数据卷，有重要数据要谨慎
docker volume prune
# 删除 dangling volmue
docker volume rm $(docker volume ls -qf dangling=true)
```

### 导出容器(docker export)
```shell
# 导出容器,只能导出单个容器
docker export -o container1.tar container1
```

### 导入容器(docker import)
```shell
# 导入容器
docker import -i container1.tar
```

### 文件拷贝(docker cp)
将文件拷贝到容器内
```
docker cp [需要拷贝的文件或目录] [容器名称:容器目录]
```
将文件从容器内拷贝出来
```
docker cp [容器名称:容器目录] [需要拷贝的文件或目录]
```

### 目录挂载(-v)
​目录挂载是属于容器数据卷操作，我们可以在创建容器的时候，将宿主机的目录与容器内的目录进行映射，从而创建一个共享目录
文件共享，但是容器被删除的时候，宿主机的内容并不会被删除，如果多个容器挂载同一个目录，其中一个容器被删除，其他容器的内容也不会受到影响。

创建容器时添加`-v`参数，格式为`-v [宿主机目录]:[容器目录]`， 例如：
```shell
docker run -id -v /mydata/docker_centos/data:/usr/local/data --name centos01 centos:7
# 多个目录挂载
docker run -id -v 宿主机目录1:容器目录1 -v 宿主机目录2:容器目录2 --name 容器名 镜像名
```
在挂载时有可能会出现权限不足的提示。这是因为 CentOS7 中的安全模块 SELinux 把权限禁掉了，在`docker run`时通过`-privileged=true`给该容器加权限来解决挂载的目录没有权限的问题

#### 匿名挂载
```
docker run -id -v /usr/local/data --name centos02 centos:7
```
匿名挂载只需要写容器目录即可，容器外对应的目录会在`/var/lib/docker/volumes`中生成。

**查看 volume 数据卷信息**
```
$ docker volume ls
image-20220331113929297
```

#### 具名挂载
具名挂载就是给数据卷取个名字，容器外对应的目录就会在`/var/lib/docker/volume`中生成。
```
docker run -id -v docker_centos_data:/usr/local/data --name centos03 centos:7
```

#### 指定目录挂载
最开始的挂载就是指定目录挂载，这种方式的挂载不会在`/var/lib/docker/volume`目录生成内容。
```
docker run -id -v /mydata/docker_centos/data:/usr/local/data --name centos01 centos:7
```

#### 查看目录挂载关系
通过`docker volue inspect [数据卷名称]`可以查看该数据卷对应宿主机目录地址。
```
[root@localhost ~]# docker volume inspect centos_data
[
    {
        "CreatedAt": "2022-03-30T20:40:07-07:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/centos_data/_data",
        "Name": "centos_data",
        "Options": null,
        "Scope": "local"
    }
]
```
通过`docker inspect [容器ID或名称]`，在返回的JSON节点中找到`Mounts`， 可以查看详细数据挂载信息。

#### 只读只写
只读：只能通过修改宿主机内容实现对容器的数据管理
```
docker run -it -v [宿主机目录]:[容器目录]:ro --name [容器名] [镜像名]:[标签]
```
只写：默认，宿主机和容器可以双向操作数据
```
docker run -it -v [宿主机目录]:[容器目录]:rw --name [容器名] [镜像名]:[标签]
```

#### 继承（volumes-from）
也就是将其他一个或多个容器继承于某一个容器的挂载目录
```shell
# 容器 centos7-01 指定目录挂载
docker run -id -v /mydata/data:/usr/local/data --name centos7-01 centos:7
# 容器 centos7-02 和 centos7-03 相当于继承 centos7-01 容器的挂载目录、
docker run -id --volumes-from centos7-01:ro --name centos7-04 centos:7	# 只读
docker run -id --volumes-from centos7-01:rw --name centos7-05 centos:7	# 双向（默认）
```

## 其它命令

### 帮助命令
```
docker [命令] --help
```

### 查看日志
```
docker -f -t --tail
```
* `-f`:显示日志
* `-t`:带上时间戳
* `--tail`:显示多少条日志

### 显示docker的版本信息
```
docker version
```

### 显示docker的系统信息
镜像和容器的数量等
```
docker info
```

### 彻底删除未使用的容器和镜像
```shell
$ docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          36        21        7.412GB   3.798GB (51%)
Containers      69        35        460.8MB   460.4MB (99%)
Local Volumes   8         8         141.8MB   0B (0%)
Build Cache     0         0         0B        0B
$ docker ps -a | grep Exited | wc -l
33
$ docker ps | wc -l
36
$ docker images | wc -l
38
$ docker container prune
$ docker image prune
$ docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache
$ docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          36        17        7.412GB   5.204GB (70%)
Containers      36        35        354.6kB   0B (0%)
Local Volumes   8         5         141.8MB   771.3kB (0%)
Build Cache     0         0         0B        0B
```

## 案列

> 以装nginx为例

1. 搜索镜像:`docker search nginx`(dockerhub网站搜更方便)
2. 下载镜像:`docker pull nginx`
3. 查找镜像:`docker images`
4. 以后台方式运行容器,改名并且映射端口后:`docker run -d --name nginx01 -p 3401:80 nginx`
5. 查看运行的容器:`docker ps`
6. 测试容器是否成功:`curl localhost:3401`
7. 进入容器内部:`docker exec -it nginx01 /bin/bash`
8. 停止容器:`docker stop nginx01`
9. 删除指定容器:`docker rm nginx01`

>安装`tomcat`

```shell
# 官网使用命令
docker run -it --rm -p 8888:8080 tomcat:9.0
```

1. nginx的案列是启动在后台,停止了容器还是可以查到.
2. `docker run -it --rm`:`--rm`一般用来测试,用完就会被删除
