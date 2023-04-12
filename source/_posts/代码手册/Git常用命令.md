---
title: Git 常用命令
categories:
  - 代码手册
tags:
  - git
top_img: false
abbrlink: 1608380678
date: 2022-02-18 10:43:57
---

推荐：
- [Git大全_Gitee](https://gitee.com/all-about-git)
- [Pro Git（中文版）](https://gitee.com/progit/index.html)
- [Git在线学习_Gitee](https://oschina.gitee.io/learn-git-branching/)
- [Git官方文档](https://git-scm.com/docs/)

## 基本概念

`Git`是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目工作中，在项目的开发进程中起着至关重要的作用。

- 工作区(workspace)：就是你在电脑里能看到的目录。
- 暂存区(index)：一般存放在`.git`目录下的`index文件`（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
- 版本库(.git)：工作区有一个隐藏目录`.git`，这个不算工作区，而是 Git 的版本库。

`HEAD`是个指针，默认指向最新的一次`commit`，使用`git log`查看提交版本ID
下面这个图展示了工作区、版本库中的暂存区和版本库之间的关系：
![img](https://www.runoob.com/wp-content/uploads/2015/02/1352126739_7909.jpg)

## Git 配置

Git 的配置文件为`.git/config`，当前仓库配置文件在当前目录下，全局配置文件在用户主目录下

配置用户名和邮箱是记录用户提交身份信息的，不是用来进行身份验证的，身份验证一般有 HTTPS 和 SSH 两种方式，参考[Github登录认证的两种方法](posts/2748237401)。

**在当前仓库设置提交身份信息**
```bash
git config user.name '你的名字'
git config user.email '你的邮箱'
```

**全局设置提交身份信息**
```shell
git config --global user.name '你的名字'
git config --global user.email '你的邮箱'
```

**修改 Git 配置**
>以文本编辑器方式编辑
```shell
# 当前仓库配置
git config --edit

# 全局配置
git config --global --edit
```

**设置代理**
给 git 设置 SOCKS5 代理：
使用 https 的时候，就是使用 https 协议复制仓库的时候,如: https://github.com/KyleBing/T...
端口号根据自己的代理端口进行修改，一般 ss 是1080，v2ray 是 1081，clash 是 7890
```shell
git config --global http.proxy 'http://127.0.0.1:7890'
git config --global https.proxy 'https://127.0.0.1:7890'
```
也可以直接修改用户主目录下的`.gitconfig`文件
```
[http]
        proxy = http://127.0.0.1:7890
[https]
        proxy = https://127.0.0.1:7890
```

**.gitignore**
```shell
# 忽略 index.css 这个文件
index.css

# 忽略所有 .a 文件
*.a

# 但跟踪所有的 lib.a，即使前面已经忽略
!lib.a

# 只忽略当前目录下的 TODO 文件
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc 及其子目录下所有 pdf 文件
doc/**/*.pdf
```

## 本地操作

### 新建 Git 版本库

```bash
# 在当前目录新建一个 Git 版本库，-b指定分支为master
git init -b master

# 在指定目录初始化一个 Git 版本库
git init [dir]

# 克隆一个项目和它的整个代码历史到指定目录，远程仓库自动被 Git 命名为 origin
git clone [url] [dir]

# 克隆一个项目的指定分支(-b)和分支的整个代码历史到指定目录
git clone -b [branch] [url] [dir]

# 克隆一个项目最新的一次提交(--depth)到指定目录
git clone --depth=1 [url] [dir]
```

### 查看信息

版本库、暂存区、工作区内容全部一致将不会返回任何信息

#### 查看文件状态

```shell
# 查看文件状态
$ git status
（红色）  # 新添加，未跟踪
modified:（红色） # 已修改，但未暂存
modified:（绿色） # 已修改，已暂存

# 指定目录或者文件
git status [dir]/[file]

# -s 精简输出
$ git status -s
 M README # 已修改，但未暂存 （M的位置靠右，红色）
MM Rakefile # 已修改，暂存后又作了修改（有暂存和未暂存）
A  lib/git.rb # 新添加到暂存区，未提交
M  lib/simplegit.rb # 已修改，已暂存 （M的位置靠左，绿色）
?? LICENSE.txt # 新添加，未跟踪
```
#### 查看版本历史

```shell
# 查看当前分支的HEAD之前的commitID和版本历史
git log

# 显示当前分支的最近几次commitID
# --stat 每次commit发生变更的文件
# --follow 显示某个文件的版本历史，包括文件改名
git reflog
```

### 比较

```bash
# 显示暂存区和工作区的差异
git diff

# 显示工作区和仓库的差异
git diff commitId [file]

# 显示暂存区和上一个commit的差异
git diff --cached [commit] [file]

# 显示工作区与当前分支最新commit之间的差异
git diff HEAD

# 显示两次提交之间的差异
git diff [commitId1] [commitId2]
```

### 添加工作区文件到暂存区

```bash
# 添加指定文件到暂存区
git add [file1] [file2] ...

# 添加当前目录的所有文件到暂存区
git add ./

# 将仓库内所有变更都加入到暂存区
git add -A
```

### 提交暂存区文件到版本库

```bash
# 提交暂存区到仓库区
git commit -m [message]

# 提交暂存区的指定文件到仓库区
git commit [file1] [file2] ... -m [message]

# 重做上一次commit，并包括指定文件的新变化
git commit --amend -m [message]
```

### 删除

```bash
# 删除工作区文件，并且将这次删除放入暂存区
git rm [file1] [file2] ...

# 从暂存区删除文件夹/文件
git rm --cache [dir]/[file]

# 只删除版本库文件
git rm --cached [file]
```

### 恢复

**git reset**（将HEAD向后移动，用来恢复指定commit）

基本格式
```bash
git reset --hard [HEAD]/[commitID] [file]
```

参数说明
```bash
--soft  # 暂存区和工作目录都不会被改变
--mixed # 默认选项。暂存区和你指定的提交同步，但工作目录不受影响
--hard  # 暂存区和工作目录都同步到你指定的提交
--before="1 days" # 恢复到1天前的版本
```

例：(将暂存区、工作区都恢复到上次commit的版本)
```shell
git reset --hard HEAD .
# 若不起作用尝试下面这个
git checkout HEAD --
```

**git revert**（新建n个commit，用来抵消指定commit的变化，HEAD向前移动到到最新分支）

和`git revert`的区别是`git reset`是把`HEAD`向后移动了一下，而`git revert`是`HEAD`继续前进，新的`commit内容`和`revert内容`正好相反，实现一样的恢复效果，正因为这样，使用`git revent`后用`git log`可查看所有历史`commit版本`。

**git checkout**

```bash
# 恢复暂存区指定文件到工作区
git checkout [file]

# 恢复暂存区所有文件到工作区
git checkout .

# 恢复某个commit的指定文件到暂存区和工作区
git checkout [commit] [file]
```

### 分支

#### 查看分支

```bash
# 查看本地分支
git branch

# 查看所有远程分支
git branch -r

# 查看所有本地分支和远程分支
git branch -a
```

#### 创建分支

```bash
# 新建一个分支，但依然停留在当前分支
git branch [branch-name]

# 新建一个分支，并切换到该分支
git checkout -b [branch]

# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [branch] [remote-branch]
```

#### 切换分支
```bash
# 切换到指定分支，并更新工作区(会丢失当前分支修改)
git checkout [branch-name]

# 切换到上一个分支
git checkout -
```

#### 合并分支
```bash
# 合并指定分支到当前分支
git merge [branch]

# 查看已经合并的分支
git branch --merged

# 查看未合并的分支
git branch --no-merged
```

#### 删除分支
```bash
# 删除本地分支(如果分支为未合并状态，则不允许删除)
git branch -d [branch-name]

# 强制删除
git branch -D [branch-name]

# 删除本地版本库上那些失效的远程追踪分支
git remote prune [shortname]
```

### 标签
有的时候，我们希望给某一个特定的历史提交打上一些标签

#### 新建标签

```bash
# 新建一个tag在当前commit
git tag [tag] [HEAD]
```

#### 查看 tag

```bash
# 列出所有tag
git tag

# 查看tag信息
git show [tag]
```

#### 删除 tag

```bash
# 删除本地tag
git tag -d [tag]

# 删除远程tag
git push origin :refs/tags/[tagName]
```

#### 提交 tag

```bash
# 提交指定tag
git push [remote] [tag]

# 提交所有tag
git push [remote] --tags

# 新建一个分支，指向某个tag
git checkout -b [branch] [tag]
```

## 远程操作

```bash
# 为远程仓库取一个简短的名字
git remote add [shortname] [url]

# 建立上游（-u），简化后续操作,只需 git push
git push --set-upstream [remote] [branch]

# 上传本地指定分支到远程仓库（-f：强制推送，覆盖远程仓库新的修改；-u：建立上游）
git push [remote] [branch]

# 取回远程仓库的变化，并与本地分支合并
git pull [remote] [branch]

# 提交到远程（分支）
git push origin [本地分支名称]:[远程分支名称]

# 远程先创建好分支然后拉取到本地
git checkout -b [本地分支名称] origin/[远程分支名称]

# 拉取远程分支到本地
git pull origin [远程分支名称]:[本地分支名称]

#上传本地指定文件夹到远程分支
git subtree push --prefix=[dir] [remote] [branch]

# 查看远程仓库
git remote show origin

# 查看本地分支
git branch

# 查看远程分支
git branch -r

# 查看所有分支
git branch -a

# 合并远程分支到当前分支
git merge [remote] [branch]

# 删除远程分支
git push origin --delete [远程分支名称]
# or
git push origin :[远程分支名称]

# 设置默认提交分支
git branch --set-upstream-to=origin/[远程分支名称] [本地分支名称]
```