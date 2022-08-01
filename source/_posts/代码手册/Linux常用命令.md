---
title: Linux 常用命令
categories:
  - 代码手册
tags:
  - linux
abbrlink: 1247907182
top_img: false
date: 2022-3-19 17:43:57
cover: https://pblood.oss-cn-hongkong.aliyuncs.com/blog/cover/linux.png
---

## 参考资料
- [Linux Command](https://linux-command-pi.vercel.app/)

* [ubuntu 中文 man 手册](https://manpages.ubuntu.com/manpages/jammy/zh_CN/man8/)
* [Linux命令大全(手册) | Linux就该这么学](https://www.linuxcool.com/)
* [Linux常用命令汇总 | Linux Top](https://www.linuxtop.cn/command/command-introduction.html)
* [Linux shell 命令大全 |  简单教程](https://www.twle.cn/l/yufei/man/man-basic-index.html)
- [manpages-zh](https://github.com/man-pages-zh/manpages-zh)

## 文件管理

### 查看文件或目录

#### ls
显示目录或文件
```shell
## 显示当前目录的目录和文件，不包括隐藏的
ls
## 显示当前目录所有的目录和文件，包括隐藏的
ls -a
## 列表形式显示详细信息
ls -l
也可以直接输入
ll
## 显示文件大小，默认从小到大
ls -S
## 按修改时间排序
ls -t
## 按修改时间倒序排序
ls -r
```

#### du
>统计文件和目录的磁盘占用空间
```shell
### 显示当前目录下子目录的大小
du -sh *
## 文件从大到小排序
du -sh * |sort -rh
## 查看指定目录下所有文件所占的空间
du ./*
```

#### df
>显示磁盘的相关信息
```shell
## 查看系统磁盘设备，默认是KB为单位：
df
## 使用-h选项以KB以上的单位来显示，可读性高
df -h
## 查看全部文件系统
df -a
## 显示 public 目录中的可用空间量
df public
```

#### tree
以目录树的形式显示目录或文件
```shell
## 列出目录/private/ 第一级文件名
$ tree  /private/ -L 1
/private/
├── etc
├── tftpboot
├── tmp
└── var
## 忽略当前目录文件夹node_modules
tree -I node_modules
## 忽略多个文件夹
tree -I 'node_modules|icon|font'
## 列出当前目录文件夹node_modules的目录结构
tree -P node_modules
## 显示目录node_modules两层的目录树结构
tree -P node_modules -L 2
## 当前目录结果存到 tree.txt 文件中
tree -L 2 > /home/www/tree.txt
## 非树状结构列出目录/private/下的所有文件
$ tree -if /private/
/private
/private/a1
/private/a2
/private/etc
/private/etc/b1
/private/etc/b2
/private/tftpboot
```

#### wc
统计文件信息
```shell
wc -l a.txt # 查看 a.txt 行数
wc -w a.txt # 统计 a.txt 单词个数
wc -c a.txt # 统计 a.txt 字符数
```

#### file
显示文件类型
```shell
file a.txt
```

#### md5sum
查看文件MD5值
```shell
md5sum a.txt
```

#### stat
查看文件属性
```shell
stat a.txt
```

### 查看文件内容

#### cat
查看文件内容，一次性读取文件，适合小文件和行数少的文件

```shell
## 显示文件a.txt的内容
cat a.txt
## 显示行号(包括空行)
cat -n a.txt
## 显示行号(非空行)
cat -b a.txt
## 将 a.txt b.txt 文件内容覆盖写入 c.txt
cat a.txt b.txt > c.txt
## 将 a.txt b.txt 文件内容追加写入 c.txt 末尾
cat a.txt b.txt >> c.txt
## 直接将文本数据覆盖写入 a.txt
cat > a.txt << EOF
第一行
第二行
第三行
EOF
```

#### more
分页查看文件内容，一次性读取文件，适合小文件和行数多的文件

Options:
`-s`将多个连续的空行显示为1行
`-NUM`指定每次滚动的行数,如-10
`+NUM`打开文件后定位到指定行,如+20
`+/STRING`打开文件后定位到匹配的行,如+/source

Commands:
`空格`显示下一屏
`回车`显示下一行
`f`显示下一屏
`b`显示上一屏
`q`退出

```shell
$ more +5 a.txt
5
6
7
8
...
$ more +/11 a.txt
...skipping
9
10
11
12
...
```

#### less
分屏上下翻页浏览文件内容，需要多数读多少，适合大文件和行数多的文件
```shell
less /var/log/shadowsocks.log
```

#### head
```shell
head file #显示文件file的前10行
```

#### tail
```shell
tail file # 显示文件file的最后10行
tail -n +20 file # 显示文件file的内容，从第20行至文件末尾
tail -c 10 file # 显示文件file的最后10个字节
tail -25 mail.log # 显示 mail.log 最后的 25 行

tail -f mail.log # 实时追踪已存在文件末尾内容，多用于查看日志
tail -F mail.log # 实时追踪文件（可以不存在）末尾内容
```

### 创建

#### touch
创建文件或者更改文件时间
```shell
## 创建一个文件a.txt
touch file.txt
## 批量创建文件a.txt b.txt ... y.txt z.txt
touch file{a..z}.txt
## 批量创建文件1.txt 2.txt 3.txt 4.txt 5.txt
touch file{1..5}.txt
## 批量创建文件,跳过一个序号(..2) 1.txt 3.txt 5.txt
touch file{1..5..2}.txt
```

#### mkdir
创建目录
```shell
## 新建一个test目录
mkdir test
## 创建多级目录
mkdir -p /opt/test/ahzoo
```

#### ln
创建链接文件
```shell
## 创建文件硬链接
ln a b
## 创建软链接
ln -s a b
```
注意
如果是跨目录创建链接,建议源和目的均使用绝对路径
强烈反对使用嵌套链接,如果链接目录下有其他链接目录,一旦目录结构改变,可能会引起循环嵌套,或者链接失效
删除软链接目录的时候最后一定不要加/,不要使用tab自动补全目录名,否则将会删除源目录下的所有内容,导致数据丢失

硬链接:
1.硬链接不会增加inode值,即与源文件inode值相同,属于同一个文件,只是链接次数依次+1
2.只能对已存在的文件进行创建
3.不能跨驱动器设备或分区创建硬链接
4.硬链接只支持文件,不支持目录
5.删除一个硬链接文件并不影响其他有相同inode值的文件,删除一个链接次数为1的文件则会彻底删除该文件

软连接:
1.软链接相当于创建一个新文件,有自己的文件属性及权限等,链接次数不会增加
2.可对不存在的文件或目录创建软链接
3.软链接可以跨分区建立
4.软链接支持文件或目录
5.软链接相当于快捷方式,推荐使用绝对路径,相对路径的话是相对于软链接的相对路径
6.删除软链接并不影响源文件,如果源文件被删除,则对应的软连接变为死链接,显示为红色,创建或恢复同名源文件,则软连接恢复

#### 修改文件权限

**查看权限**
在命令行使用命令，可以查看文件或者文件的权限
```shell
$ ll
## 或者
$ ls -a
-rw-r--r--. 1 root root 6 Nov  9 16:42 a.txt
```

>`-rw-r--r--`表示权限，一共有十个字符，从左往右分别是`文件类型（1位）`+`属主权限（3位）`+`属组权限（3位）`+`其他用户权限（3位）`

**文件类型：**d（directory目录文件）、-（普通文件）、l（link符号链接文件）、b（block块设备文件）、c（char字符设备文件）、p（pipe管道文件）、s（socket管道文件）。
**所有者权限：**文件所有者权限，可认为是文件创建者权限
**用户组权限：**文件所有者所在组权限
**其他用户权限：**非同组用户权限

`u`-`g`-`o`：分别表示用户-用户组-其他用户；`a` : 表示所有用户。
`r`是读权限、`w`是写权限、`x`是可执行权限、`-`没有对应字符的权限。
Linux里面对这些字符设置对应的数值，`r`是`4`，`w`是`2`，`x`是`1`，`-`是`0`。

上面的例子中的权限是：`-rw-r--r--`：
所有者权限是`rw-`，对应数值是`6`（=4+2+0）
用户组权限是`r--`，对应数值是`4`（=4+0+0）
其他用户权限也是`r--`，对应数值是`4`（=4+0+0）
所以`a.txt`的权限是`644`，属于root用户组的root用户。

##### chmod
用来变更文件或目录的权限
```shell
## 添加组用户的写权限。
chmod g+w ./test.log
## 删除其他用户的所有权限。
chmod o= ./test.log
## 使得所有用户都没有写权限。
chmod a-w ./test.log
## 当前用户具有所有权限，组用户有读写权限，其他用户只有读权限。
chmod u=rwx, g=rw, o=r ./test.log
## 等价的八进制数表示：
chmod 764 ./test.log
## 将目录以及目录下的文件都设置为所有用户拥有读写权限。
## 注意，使用'-R'选项一定要保留当前用户的执行和读取权限，否则会报错！
chmod -R a=rw ./testdir/
## 根据其他文件的权限设置文件权限。
chmod --reference=./1.log  ./test.log

```

##### chown
修改所属用户和用户组权限，和修改文件夹的权限是基本相同的，只不过是把chmod命令换成了chown。

```shell
## 修改a.txt文件所属用户（jay）和用户组（fefjay）
chown jay:fefjay a.txt
## 修改文件夹所属用户和用户组
### 只改文件夹本身所属用户和用户组，不改子文件（夹）
chown redis:redis /var/lib/redis
### 改变文件夹及所有子文件（夹）所属用户和用户组
chown -R redis:redis /var/lib/redis
```

### 查找

#### whereis
仅查找二进制程序、代码等相关文件路径
```shell
whereis tomcat
```

#### find
直接查找文件、文件夹

```SHELL
## 默认路径为当前目录,并且递归查找子目录
find -name "a.txt"

## 支持指定多个目录查找
find dir1 dir3 dir4 -name 'a.tar.gz'

## 指定文件类型查找
### 查找文件类型
find -type f a.txt
### 查找文件夹类型
find -type d /a

## 指定路径,三个命令结果一致，'*.txt'表示模糊搜索，匹配所有以 .txt 结尾的文件
find ./bak -name '*.txt'
find -path './bak/*.txt'
find -path './bak*' -name '*.txt'

## 查找大小超过5M的log文件
find -size +5M -name '*.log'

## 传递参数给下一个指令,用 {} 表示传递的参数
### 批量删除txt文件，-exec ... {} \; 不需要确认
find / '*.txt' -exec rm {} \;
### 批量删除txt文件，-ok ... {} \; 需要一个个确认
find / -name '*.txt' -ok rm {} \;

## -mtime -n +n 匹配修改内容的时间（-n指n天以内，+n指n天以前）
### 查找五天前的日志
find / -name "a.log" -mtime +5
```

#### xargs
给其他命令传参数的过滤器
```shell
通过-i传递管道符前面的参数，用{}表示
find /home *.txt | xargs -i cp {} {}.bak
```

### 其它
#### echo
echo命令是一个内置在Bash中的shell，通常用于shell脚本中以显示消息或输出其他命令的结果。

```shell
## 显示普通字符串(双引号完全可以省略)
echo "It is a test"

## 输出某个变量值内容
echo $PATH

## 搭配转义符一起使用，输出纯字符串内容
echo \$PATH

## 搭配输出重定向符 > 运算符将字符串内容直接写入文件中，而不是在屏幕上显示输出
echo "Hello World" > Document

## 原样输出字符串，不进行转义或取变量(用单引号)
echo '$path'

## 搭配反引号执行命令，并将执行结果输出
echo `date`

## 输出带有换行符的内容
echo -e "First\nSecond\nThird"

## 指定删除字符串中某些字符，随后将内容输出
echo -e "123\b456" 

## 使用$（command）表达式将命令输出作为参数传递给echo
## 显示当前日期
echo "The date is: $(date +%D)"
```

#### cp
复制文件或目录

```shell
## 复制目录：
cp -rf test /opt
```
- `-r` 递归复制目录中的子目录及文件
注意
文件到文件的复制: 目标文件不存在则新建;目标文件存在则提示/覆盖/更新
文件到目录的复制: 源文件可以指定多个,但是目标目录只能指定一个且必须存在
目录到目录的复制: 两个目录之间复制,目标目录不存在则新建,存在则将源目录作为子目录复制到目标目录下;多个目录复制,源可以指定多个目录,最后一个目录为目标目录,所有目录必须存在.

复制目录下的所有文件但不包括隐藏文件`cp -a dir1/* dir2/`
复制目录下的所有文件包括隐藏文件`cp -a dir1/. dir2/`
只复制目录下的隐藏文件`cp -a dir1/.[^.]* dir2/`

#### mv
移动文件或目录,重命名

```SHELL
移动文件：
## mv a.txt /opt
重命名文件：
## mv a.txt b.txt
```

#### rename(Perl版本)
用字符串替换的方式批量改变文件名

选项：
`-v`  --verbose，成功重命名的文件的打印名称。
`-0`  --null，从STDIN读取时，请使用\0作为记录分隔符
`-n`  --nono，打印要重命名的文件名，但不重命名。
`-f`  --force，允许覆盖现有文件
`--path`  --fullpath，重命名完整路径：包括任何目录组件。默认
`-d`, --filename, --nopath, --nofullpath，不重命名目录：仅重命名路径的文件名部分
`-e`  可以重复来构建代码（比如“perl-e”）。如果没有-e，则第一个参数用作代码。
`-E`  对文件名执行操作的代码，如-e，但终止于 ';'.

**Perl正则表达式**
三种形式
```shell
## 匹配：
m// 可以省略m，直接写成/regexp/
## 替换：s/// 
s/PATTERN/REPLACEMENT/egimosx
  `e` 将右侧作为表达式计算。
  `g` 全匹配
  `i` 不区分大小写的模式匹配
  `m` 将字符串视为多行。
  `o` 只编译一次模式，即使其中的变量发生变化。
  `s` 将字符串视为单行。
  `x` 使用扩展正则表达式
## 转化：tr///　
转化有两种等价表达方式，如下：
tr/SEARCHLIST/REPLACEMENTLIST/cds
y/SEARCHLIST/REPLACEMENTLIST/cds
  `c` 补充 SEARCHLIST.
  `d` 删除找到但未替换的字符
  `s` 压缩重复的替换字符
```

示例
```shell
## 将1.txt 2.txt重命名为1.log 2.log
rename -v "s/txt/log/g" 1.txt 2.txt
## 替换当前目录以及子目录下所有文件或目录字符
find . | rename -v 's/需要替换的内容/替换后的内容/'
## 把所有的文件名头部增加hello前缀，*表示在当前目录操作
rename 's/^/hello/' *
## 在所有文件名尾部增加.zip后缀
rename 's/$/.zip/' *
## 把.html 后缀的改成 .php后缀
rename "s//.html//.php/" *
## 把所有以.bak结尾的文件的后缀.bak删掉
rename 's/\.bak$//' *
```

#### rm
删除文件或目录

```SHELL
## 删除文件
rm a.txt
## 删除目录（不需要确认）
rm -r dir1
## 强制删除目录（不需要确认，慎用）
rm -rf dir1
## 删除当前目录下的所有文件及目录，不包括隐藏文件
rm -r *
## 删除当前目录下的所有文件及目录
rm -rf .*
```

#### vim
参考：https://www.linuxtop.cn/command/vim.html?highlight=vim

```shell
vim -d test.txt #并列打开多个文件进行差异对比,切换窗口先按ctrl+w,然后按ctrl+h或ctrl+l,退出所有窗口命令:qa
vim -b test.txt #二进制模式打开文件
vim + test.txt #打开文件并将光标定位到最后一行
```

**命令模式(Normal)默认** 
默认模式,可以移动光标,复制粘贴删除等操作

* 移动光标到首行行首：<kbd>gg</kbd>
* 移动光标到最后一行行尾：<kbd>G</kbd>
* 切换光标到当前行行尾：<kbd>shift</kbd>+<kbd>4($)</kbd>

- 复制：单行(光标所在行)<kbd>yy</kbd>；多行(光标下的行)<kbd>3yy</kbd>
- 粘贴：光标下行粘贴<kbd>p</kbd>；光标上行粘贴：<kbd>P</kbd>；`:set paste`+`i`进入粘贴模式，若直接粘贴丢失格式可使用这种粘贴方式
- 剪贴(删除)：
单行(光标所在行)：<kbd>dd</kbd>
多行(光标下的行)：<kbd>3dd</kbd>；光标所在行光标后面内容：<kbd>D</kbd>
光标后的单个字符：<kbd>x</kbd>
光标后的所有字符：<kbd>dG</kbd>
- 撤销：<kbd>u</kbd>
- 恢复：<kbd>Ctrl</kbd>+<kbd>r</kbd>

- 搜索：
```shell
/word\c 或者 \cWord 忽略大小写,匹配word, Word, WORD...
/Word\C 或者 \CWord 精确匹配大小写,只匹配Word
n 跳转到下一个搜索结果
```

**插入模式Insert**
`i`键进入，进行文本编辑

**底线模式(Command-line)**：<kbd>:</kbd>进入，进行保存,退出,更改设置等操作
  * 保存：`:w`；保存为新文件：`:w /home/new.txt`
  * 退出：`:q`；强制退出：`q!`
  * 强制写入并退出：`:wq!`、`:x!`
  * 临时显示行号：`:set nu`；永久显示行号：修改`/etc/vim/vimrc`,在末尾加入`:set number`
  * 切换光标到指定行行首：`:行号`或者`行号`+<kbd>G</kbd>

- 替换
```shell
:s/aaa/bbb/ 单行替换(光标后的第一个匹配项)
:s/aaa/bbb/g 单行替换(行内所有匹配项)
:s/aaa/bbb/i 单行替换(忽略大小写)

:%s/aaa/bbb/ 全局替换(光标后的第一个匹配项)
:%s/aaa/bbb/g 全局替换(所有匹配项)
:%s/aaa/bbb/i 全局替换(忽略大小写)

:%s/\CWord/World/g  区分大小写替换Word为World
:%s/\cWord/World/g  不区分大小写替换word,Word,WORD,WorD...为World
```
- 其它
```
:%s/aaa/&cc/g  追加,&表示引用前面查找到的内容
:%s/a.a/name:&/g  正则搜索替换
:%s@/etc@/var@g  分隔符可以更改为其他字符,如@#+等
:%s/^/#/g  注释当前文件的所有行包括空行
:%s/./#&  注释当前文件的所有非空行,为了美观可以在#号后加一个空格
:%s/^#//  取消注释
:%s/.$/&;  在所有非空行的行尾加;号
:1s/aaa/bbb/  替换第一行的aaa为bbb
:10,20s/^/#/g  注释当前文件的第10-20行包括空行
:10,20s/./#&  注释当前文件的第10-20行之间的非空行
```

**可视模式(Visual)**：
选择模式：
从左到右从上到下的连续选框：<kbd>v</kbd>
从上到下，以行为单位的连续选框：<kbd>V</kbd>
上下左右任意选框(非连续矩形选框)：<kbd>Ctrl</kbd>+<kbd>v</kbd>

从当前光标位置或者首次光标位置开始进行文本选择，可使用命令模式的移动方式进行光标移动，光标停止位置为选择结束位置，以下是特有命令：
* 编辑：<kbd>I</kbd>
* 删除：<kbd>d</kbd>
* 复制：<kbd>y</kbd>

#### nano
**光标控制**
移动光标：使用用方向键移动。
选择文字：按住鼠标左键拖到。

**复制、剪贴和粘贴**
复制一整行：Alt+6
剪贴一整行：Ctrl+K
粘贴：Ctrl+U

如果需要复制／剪贴多行或者一行中的一部分，先将光标移动到需要复制／剪贴的文本的开头，按Ctrl+6（或者Alt+A）做标记，然后移动光标到 待复制／剪贴的文本末尾。这时选定的文本会反白，用Alt+6来复制，Ctrl+K来剪贴。若在选择文本过程中要取消，只需要再按一次Ctrl+6。

**搜索**
Ctrl+W，然后输入你要搜索的关键字，回车确定。这将会定位到第一个匹配的文本，接着可以用Alt+W来定位到下一个匹配的文本。

**翻页**
Ctrl+Y 到上一页
Ctrl+V 到下一页

**保存：**Ctrl+O

**退出：**Ctrl+X

**显示行号**
显示当前行：Ctrl+C
显示所有行：先按Ctrl+3(#)，再按 Shift+3(#)

## 压缩文件

### zip
```shell
## 将home目录下所有文件和文件夹打包为当前目录下的html.zip
zip -q -r html.zip home

## 将当前目录下所有文件和文件夹打包为当前目录下的html.zip
zip -q -r html.zip *

## 压缩率选择 1-9 faster->better
zip -q -r -9 html.zip *

## 将压缩文件html.zip在当前目录下解压缩。
unzip html.zip

## 将压缩文件html.zip在指定目录/tmp下解压缩，如果已有相同的文件存在，要求unzip命令不覆盖原先的文件。
unzip -n html.zip -d /tmp

## 查看压缩文件目录，但不解压。
unzip -v html.zip

## 将压缩文件html.zip在指定目录/tmp下解压缩，如果已有相同的文件存在，要求unzip命令覆盖原先的文件。
unzip -o html.zip -d tmp/

### 解压指定文件，* 用作通配符。
unzip html.zip "*.jpg"
```

### tar
（该格式仅仅打包，不压缩）
```shell
## 打包
tar -cvf [目标文件名].tar [原文件名/目录名]
## 解包
tar -xvf [原文件名].tar
```
注：c参数代表create（创建），x参数代表extract（解包），v参数代表verbose（详细信息），f参数代表filename（文件名），所以f后必须接文件名。

### tar.gz
方式一：利用前面已经打包好的tar文件，直接用压缩命令。
```shell
## 压缩
gzip [原文件名].tar
## 解压
gunzip [原文件名].tar.gz
```
方式二：一次性打包并压缩、解压并解包
```shell
## 打包并压缩
tar -zcvf [目标文件名].tar.gz [原文件名/目录名]
## 解压并解包
tar -zxvf [原文件名].tar.gz
```
注：z代表用gzip算法来压缩/解压。

### tar.bz2
方式一：利用已经打包好的tar文件，直接执行压缩命令：
```shell
## 压缩
bzip2 [原文件名].tar
## 解压
bunzip2 [原文件名].tar.bz2
```
方式二：一次性打包并压缩、解压并解包
```shell
## 打包并压缩
tar -jcvf [目标文件名].tar.bz2 [原文件名/目录名]
## 解压并解包
tar -jxvf [原文件名].tar.bz2
```
注：小写j代表用bzip2算法来压缩/解压。

### tar.xz
方式一：利用已经打包好的tar文件，直接用压缩命令：
```shell
## 压缩
xz [原文件名].tar
## 解压
unxz [原文件名].tar.xz
```
方式二：一次性打包并压缩、解压并解包
```shell
## 打包并压缩
tar -Jcvf [目标文件名].tar.xz [原文件名/目录名]
## 解压并解包
tar -Jxvf [原文件名].tar.xz
```
注：大写J代表用xz算法来压缩/解压。

### jar
```shell
## 压缩
jar -cvf [目标文件名].jar [原文件名/目录名]
## 解压
jar -xvf [原文件名].jar
```
注：如果是打包的是Java类库，并且该类库中存在主类，那么需要写一个META-INF/MANIFEST.MF配置文件，内容如下：
```
Manifest-Version: 1.0
Created-By: 1.6.0_27 (Sun Microsystems Inc.)
Main-class: the_name_of_the_main_class_should_be_put_here
```
然后用如下命令打包：
```
jar -cvfm [目标文件名].jar META-INF/MANIFEST.MF [原文件名/目录名]
```
这样以后就能用“java -jar [文件名].jar”命令直接运行主类中的public static void main方法了。

### 7z
```shell
## 压缩
7z a [目标文件名].7z [原文件名/目录名]
## 解压
7z x [原文件名].7z
```
注：这个7z解压命令支持rar格式，即：
```shell
7z x [原文件名].rar
```

## 网络工具

### ping
测试主机之间网络的连通性，执行ping指令会使用ICMP传输协议，发出要求回应的信息，若远端主机的网络功能没有问题，就会回应该信息，因而得知该主机运作正常。

```shell
ping 127.0.0.1
## 如果测试成功，表明网卡、TCP/IP 协议的安装、IP 地址、子网掩码的设置正常

ping localhost
## ping localhost 需要经过本地 host 文件

ping 本机 IP 地址
## 如果测试不成功，则表示本地配置或安装存在问题

ping 局域网内其他 IP
## 如果测试成功，表明本地网络中的网卡和载体运行正确。但如果收到 0 个回送应答，那么表示子网掩码不正确或网卡配置错误或电缆系统有问题

ping www.baidu.com
## 如果这里出现故障，则表示本机 DNS 服务器的 IP 地址配置不正确，或它所访问的 DNS 服务器有故障
```

### lsof
用于查看你进程打开的文件，打开文件的进程，进程打开的端口(TCP、UDP)。

```shell
## 查看与888端口有关的进程
lsof -i:888
## 获取端口对应的进程ID=>pid
lsof -i:9981 -P -t -sTCP:LISTEN
## 列出指定进程号所打开的文件
lsof -p $pid
## 列出打开文件的进程
lsof $filename
```

### wget
非交互式网络下载，类似于HTTP客户端

```SHELL
## 下载单个文件
wget http://www.jsdig.com/testfile.zip
## 下载并以不同的文件名保存
wget -O wordpress.zip http://www.jsdig.com/testfile.zip
## 后台下载
wget -b http://www.jsdig.com/testfile.zip
## 伪装代理名称下载
wget --user-agent="Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16" http://www.jsdig.com/testfile.zip
```

### curl
```shell
$ curl -V
curl 7.29.0 (x86_64-redhat-linux-gnu) libcurl/7.29.0 NSS/3.53.1 zlib/1.2.7 libidn/1.28 libssh2/1.8.0
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp scp sftp smtp smtps telnet tftp
Features: AsynchDNS GSS-Negotiate IDN IPv6 Largefile NTLM NTLM_WB SSL libz unix-sockets

## URL匹配
字符串匹配  http://{www,ftp,mail}.a.com/
字符匹配  http://www.a.com/file[a-z].html
数字匹配  http://www.a.com/file[1-10].html

## 默认显示html源码
$ curl http://www.a.com
<!DOCTYPE html>
<!--STATUS OK--><html> <title>hello,world
...
## -I 显示响应头
$ curl -I http://www.a.com
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: keep-alive
Content-Length: 277
Content-Type: text/html
Date: Sat, 23 Oct 2021 14:34:11 GMT
Etag: "575e1f59-115"
Last-Modified: Mon, 13 Jun 2016 02:50:01 GMT
Pragma: no-cache
Server: nginx
## --compressed 压缩请求
$ curl -I --compressed http://www.a.com
HTTP/1.1 200 OK
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: keep-alive
Content-Encoding: gzip
...
## -o 保存文件,指定文件名
$ curl -o a.html https://www.a.com/index.html
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2443  100  2443    0     0  13313      0 --:--:-- --:--:-- --:--:-- 13349
$ ll a.html
-rw-r--r-- 1 root root 2443 Oct 24 13:35 a.html
## -O 保存文件,使用远程文件名
$ curl -O https://www.a.com/index.html
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2443  100  2443    0     0  14981      0 --:--:-- --:--:-- --:--:-- 15080
$ ll index.html
-rw-r--r-- 1 root root 2443 Oct 24 13:37 index.html
## 批量下载test1-test10
$ curl -O https://www.a.com/test[1-10].html
## -C - 自动识别上次传输中止的位置进行续传,最后的-不能少
$ curl -O -C - https://www.a.com/index.html
## -A 指定客户端UA
$ curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36" https://www.a.com/index.html
## -c 保存cookie
$ curl -c cookie.txt https://www.a.com/index.html
## -b 指定cookie
$ curl -b "user=admin,userid=1001" https://www.a.com/index.html
$ curl -b cookie.txt https://www.a.com/index.html
## -d 提交数据
$ curl -d "user=admin,password=admin" https://www.a.com/index.html
## -F 提交表单数据
$ curl -c cookie.txt -F login=admin -F password=admin  https://www.a.com/index.html
## -D 保存header
$ curl -D header.txt  https://www.a.com/index.html
## -e 指定referer
$ curl -e https://www.b.com/  https://www.a.com/index.html
## -f 显示curl错误信息而不显示错误输出
$ curl -f https://www.a.com/a.html
curl: (22) The requested URL returned error: 404 Not Found
## -H 指定header
$ curl -H "Content-Type: text/xml"  https://www.a.com/index.html
## -i 同时显示header和响应信息
$ curl -i  https://www.a.com/index.html
## -L 跟随重定向
$ curl -L  http://www.a.com/
## -k 忽略ssl检查
$ curl -k https://www.a.com/
## -N 禁用缓存
$ curl -N  https://www.a.com/index.html
## -x 使用代理
$ curl -x 123.45.67.89:1080 https://www.a.com/
## -X 指定请求方法
$ curl -X DELETE https://www.a.com/index.html
## -s 静默模式,配合-S可以显示错误信息
$ curl -s https://www.a.com/index.html
$ curl -sS https://www.a.com/index.html
## -w 显示指定信息,如http_code
$ curl -o /dev/null -s -w %{http_code} https://www.a.com/index.html
200
## -v 显示通信的具体过程
$ curl -v https://www.a.com/
## --trace 用于debug
$ curl --trace debug.txt https://www.a.com/index.html
$ more debug.txt
== Info: About to connect() to www.a.com port 443 (#0)
== Info:   Trying 110.120.130.1...
== Info: Connected to www.a.com (110.120.130.1) port 443 (#0)
== Info: Initializing NSS with certpath: sql:/etc/pki/nssdb
== Info:   CAfile: /etc/pki/tls/certs/ca-bundle.crt
  CApath: none
== Info: SSL connection using TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
== Info: Server certificate:
== Info: 	subject: CN=a.com,O="a Technology Co., Ltd",O
U=IT,L=beijing,ST=beijing,C=CN
== Info: 	start date: Jul 01 01:16:03 2021 GMT
== Info: 	expire date: Aug 02 01:16:03 2022 GMT
== Info: 	common name: a.com
== Info: 	issuer: CN=GlobalSign Organization Validation CA - SHA256 - G2,O=GlobalSign
nv-sa,C=BE
=> Send header, 83 bytes (0x53)
...

## 获取域名ssl证书的过期时间,注意如果是自签名证书,需要将对应的CA证书添加到当前系统中,否则会报错 unknown CA (560),添加CA证书参考openssl命令
$ curl -Ivs https://www.a.com 2>&1|grep "expire date" |awk '{$1=$2=$3="";print}'
   May 22 07:39:19 2023 GMT
```

### host
```shell
$ host -V
host 9.11.4-P2-RedHat-9.11.4-26.P2.el7_9.7

$ host www.baidu.com
www.baidu.com has address 110.242.68.3
www.baidu.com has address 110.242.68.4
www.baidu.com is an alias for www.a.shifen.com.
www.baidu.com is an alias for www.a.shifen.com.
## -t 指定查询类型
$ host -t cname www.baidu.com
www.baidu.com is an alias for www.a.shifen.com.
## nslookup命令
$ nslookup www.baidu.com 223.5.5.5
Server:		223.5.5.5
Address:	223.5.5.5#53

Non-authoritative answer:
Name:	www.baidu.com
Address: 110.242.68.4
Name:	www.baidu.com
Address: 110.242.68.3
www.baidu.com	canonical name = www.a.shifen.com.
```

### netstat
用来打印Linux中网络系统的状态信息，可让你得知整个Linux系统的网络情况

参数：
`-r`显示路由表
`-i`显示接口表
`-n`不解析名字
`-p`显示程序名 PID/Program
`-l`显示监听的socket
`-a`显示所有socket
`-o`显示计时器
`-Z`显示上下文
`-t`只显示tcp连接
`-u`只显示udp连接
`-s`显示每个协议统计信息

示例：
```SHELL
## 显示所有监听
netstat -anltu
## 显示所有TCP连接
netstat -antp
## 显示所有UDP连接
netstat -anup
## 显示路由表
netstat -r
## 查看80端口的socket -w：完全匹配
netstat -lnp|grep -w 80
## 查看php进程的socket -w：完全匹配
netstat -lnp|grep -w php
```
```
lsof -i:80
```

### firewall-cmd
firewalld的配置文件格式为xml,系统配置文件目录为`/etc/firewalld/`,同时也是用户自定义配置文件目录,会优先加载.
默认配置文件目录为`/usr/lib/firewalld/`,预定义的配置文件保存在此目录中,也可作为用户自定义配置的模板.
复制`/usr/lib/firewalld/`中的xml文件到`/etc/firewalld/`中,然后再进行编辑,reload后生效.
如果两个目录中存在同名配置文件,则以`/etc/firewalld/`目录中的文件为准.

**语法**
```
firewall-cmd [OPTIONS...]
```

**示例**
```SHELL
## 开启防火墙
systemctl start firewalld

##开放指定端口（8080）
firewall-cmd --zone=public --add-port=8080/tcp --permanent
命令含义：
–zone #作用域
–add-port=8080/tcp #添加端口，格式为：端口/通讯协议
–permanent #永久生效，没有此参数重启后失效

## 关闭指定端口（8080）
firewall-cmd --zone=public --remove-port=8080/tcp --permanent
## 重启防火墙
firewall-cmd --reload
## 查看开放的端口
irewall-cmd --list-all
## 关闭防火墙
systemctl stop firewalld.service
## 查看防火墙状态
firewall-cmd --state
## 查询指定端口（8080）是否开启成功
firewall-cmd --query-port=8080/tcp
```

### iptables
用于IPv4/IPv6数据包过滤和NAT的管理工具

配置文件路径：`/etc/sysconfig/iptables`

iptables是Linux下的配置防火墙的工具，用于配置Linux内核集成的IP信息包过滤系统，使增删改查信息包过滤表中的规则更加简单
iptables分为四表五链，表是链的容器，链是规则的容器，规则指定动作

几种类型防火墙：
- 包过滤防火墙：包过滤是IP层实现，包过滤根据数据包的源IP、目的IP、协议类型（TCP/UDP/ICMP）、源端口、目的端口等包头信息及数据包传输方向灯信息来判断是否允许数据包通过
- 应用层防火墙：也称为应用层代理防火墙，基于应用层协议的信息流检测，可以拦截某应用程序的所有封包，提取包内容进行分析有效防止SQL注入或者XSS（跨站脚本攻击）之类的恶意代码
- 状态检测防火墙：结合包过滤和应用层防火墙优点，基于连接状态检测机制，将属于同一连接的所有包作为一个整体的数据流看待，构成连接状态表（通信信息，应用程序信息等），通过规则表与状态表共同配合，对表中的各个连接状态判断

四表：
|filter|用于包过滤|
|--|--|
|nat|网络地址转发|
|mangle|对特定数据包修改|
|raw|不做数据包链接跟踪|

五链：
|INPUT|本机数据包入口|
|OUTPUT|本机数据包出口|
|FORWARD|经过本机转发的数据包|
|PREROUTING|防火墙之前，修改目的地址（DNAT）|
|POSTROUTING|防火墙之后，修改源地址（SNAT）|

表中的链：
|表|链|
|--|--|
|filter|	|INPUT、OUTPUT和FORWARD|
|nat|	|PREROUTING、POSTROUTING和OUTPUT|
|mangle	|PREROUTING、POSTROUTING、INPUT、OUTPUT和FORWARD|
|raw	|PREROUTING和OUTPUT|

命令格式：`iptables [-t table] 命令 [chain] 匹配条件 动作`

参数：
`-A`，append 追加一条规则
`-I`，insert 插入一条规则，默认链头，后跟编号，指定第几条
`-D`，delete 删除一条规则
`-F`，flush 清空规则
`-L`，list 列出规则
`-P`，policy 设置链缺省规则
`-m`，module 模块，比如state、multiport

匹配条件
`-i`入口网卡
`-o`出口网卡
`-s`源地址
`-d`目的地址
`-p`协议类型
`–sport`源端口
`–dport`目的端口

动作：
`ACCEPT`允许数据包通过
`DROP`丢弃数据包不做处理
`REJECT`拒绝数据包，并返回报错信息
`SNAT`一般用于nat表的POSTROUTING链，进行源地址转换
`DNAT`一般用于nat表的PREROUTING链，进行目的地址转换
`MASQUERADE`动态源地址转换，动态IP时使用

模块：
`state` 包状态，有四个：NEW、RELATED、ESTABLISHED和INVALID
`mac` 源MAC地址
`limit` 包速率限制
`multiport` 多端口，以逗号分隔
`iprange` 端口范围，以逗号分隔

示例：
```SHELL
## 基本命令
service iptables status # 查询防火墙状态
service iptables stop # 关闭防火墙
service iptables start  # 启动防火墙
service iptables restart  # 重启防火墙

## 端口命令
iptables -A INPUT -p tcp --dport 22 -j ACCEPT # 开启22端口
iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT
iptables -L -n  # 查看端口是否开启 
service iptables save # 保存配置

## 常用的规则配置方法
iptables -F         # 清空表规则，默认filter表
iptables -t nat -F     # 清空nat表
iptables -A INPUT -p tcp --dport 22 -j ACCEPT    # 允许TCP的22端口访问
iptables -I INPUT -p udp --dport 53 -j ACCEPT    # 允许UDP的53端口访问，插入在第一条
iptables -A INPUT -p tcp --dport 22:25 -j ACCEPT # 允许端口范围访问
iptables -D INPUT -p tcp --dport 22:25 -j ACCEPT # 删除这条规则

## 允许多个TCP端口访问
iptables -A INPUT -p tcp -m multiport --dports 22,80,8080 -j ACCEPT  
iptables -A INPUT -s 192.168.1.0/24 -j ACCEPT   # 允许192.168.1.0段IP访问
iptables -A INPUT -s 192.168.1.10 -j DROP       # 对1.10数据包丢弃
iptables -A INPUT -i eth0 -p icmp -j DROP       # eth0网卡ICMP数据包丢弃，也就是禁ping
## 允许来自lo接口，如果没有这条规则，将不能通过127.0.0.1访问本地服务
iptables -A INPUT -i lo -j ACCEPT   
## 限制并发连接数，超过30个拒绝    
iptables -I INPUT -p tcp --syn --dport 80 -m connlimit --connlimit-above 30 -j REJECT   
## 限制每个IP每秒并发连接数最大3个
iptables -I INPUT -p tcp --syn -m limit --limit 1/s --limit-burst 3 -j ACCEPT           
iptables -A FORWARD -p tcp --syn -m limit --limit 1/s -j ACCEPT
## iptables服务器作为网关时，内网访问公网
iptables –t nat -A POSTROUTING -s [内网IP或网段] -j SNAT --to [公网IP]      
## 访问iptables公网IP端口，转发到内网服务器端口          
iptables –t nat -A PREROUTING -d [对外IP] -p tcp --dport [对外端口] -j DNAT --to [内网IP:内网端口] 
## 本地80端口转发到本地8080端口  
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080
## 允许已建立及该链接相关联的数据包通过            
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT    
## ASDL拨号上网                
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o pppo -j MASQUERADE                   
iptables -P INPUT DROP  # 设置INPUT链缺省操作丢弃所有数据包，只要不符合规则的数据包都丢弃注意要在最后设置，以免把自己关在外面！
```

### telnet
TELNET协议工具,用于远程登录,也可用于测试目标端口是否正常
```shell
## 测试目标IP和端口连接正常
$ telnet 192.168.31.80 80
Escape character is '^]'.
## 无法连接,目标IP可能没有启用指定的监听端口
$ telnet 192.168.31.80 8088
telnet: connect to address 192.168.31.80: Connection refused
## 连接超时,原因很多
$ telnet www.baidu.com 8088
telnet: connect to address 110.242.68.4: Connection timed out
## 查看目标ssh协议版本
$ telnet 127.0.0.1 22
Escape character is '^]'.
SSH-2.0-OpenSSH_7.4
```

### nmap
网络端口扫描工具

官方文档 
https://nmap.org/book/man.html
中文文档 
https://nmap.org/man/zh/
http://www.nmap.com.cn/

```shell
## 扫描域名端口
nmap pblood.com
## 扫描IP端口，支持多种不同类型的地址格式,支持单个或多个地址
nmap 192.168.1.1
nmap 192.168.10.0/24
nmap 10.20.0-255.1-254
### 指定不连续的地址段10,15,16,20-25
nmap 172.16.10,15,16,20-25.1-253
### nmap www.a.com 192.168.80.10 192.168.10.0/24
## 测试域名或者IP指定端口是否开放
nmap pblood.com -p 80
nmap 192.168.1.1 -p 80

## -sn 进行Ping扫描
nmap -sn pblood.com
### 指定端口扫描（STATE为open表示端口开放,closed表示关闭,filtered表示被防火墙过滤的无法确定状态）
nmap -p80 pblood.com
## 获取远程主机的系统类型及开放端口
nmap -sS -P0 -sV -O <target>
这里的 < target > 可以是单一 IP, 或主机名，或域名，或子网
-sS TCP SYN 扫描 (又称半开放,或隐身扫描)
-P0 允许你关闭 ICMP pings.
-sV 打开系统版本检测
-O 尝试识别远程操作系统
其它选项:
-A 同时打开操作系统指纹和版本检测
-v 详细输出扫描情况.
nmap -sS -P0 -A -v < target >
```

### tcpdump
```shell
$ tcpdump --version
tcpdump version 4.9.2
libpcap version 1.5.3
OpenSSL 1.0.2k-fips  26 Jan 2017

## 获取eth0接口的tcp80或443的数据包
$ tcpdump -i eth0 tcp port 80 or 443
## 新开窗口执行
$ curl -I http://www.baidu.com

## -c 100 抓取100个包
$ tcpdump -i eth0 tcp port 443 -c 100
## -D 显示可用接口
$ tcpdump -D
1.eth0
2.docker0
3.nflog (Linux netfilter log (NFLOG) interface)
4.nfqueue (Linux netfilter queue (NFQUEUE) interface)
5.any (Pseudo-device that captures on all interfaces)
6.lo [Loopback]

## 将抓包显示的内容保存到cap文件中,注意此为文本文件而非数据包文件,可以直接cat查看,但不可通过-r读取
$ tcpdump -i eth0 -f -l tcp port 80 | tee cap
$ file cap
cap: ASCII text
$ more cap
## 保存抓取的数据包到文件中,-w保存的文件可以通过-r读取
$ tcpdump -i eth0 -f -l tcp port 80 -w data.cap
$ file data.cap
data.cap: tcpdump capture file (little-endian) - version 2.4 (Ethernet, capture length 262144)
$ tcpdump -r data.cap

## -nn 显示IP和端口号,而非主机名和协议名称.
$ tcpdump -r data.cap -nn
## -q 简化显示 -# 行首显示序列号
$ tcpdump -r data.cap -nn -# -q
reading from file data.cap, link-type EN10MB (Ethernet)
    1  18:26:20.550939 IP 192.168.31.11.23902 > 192.168.31.80.80: tcp 0
    2  18:26:20.551640 IP 192.168.31.80.80 > 192.168.31.11.23902: tcp 0
    3  18:26:20.551750 IP 192.168.31.11.23902 > 192.168.31.80.80: tcp 0
    4  18:26:20.552072 IP 192.168.31.11.23902 > 192.168.31.80.80: tcp 75
## -Q out 抓取出去的流量
$ tcpdump -i eth0 tcp port 80 -nn -# -Q out
## -s 0 设置截取数据包的长度为0,表示按数据包的长度来截取数据,避免产生数据丢失
$ tcpdump -i eth0 tcp port 443 -nn -s 0 -c 100
## -tttt 显示时间
$ tcpdump -r data.cap -tttt
reading from file data.cap, link-type EN10MB (Ethernet)
2022-01-16 18:26:20.550939 IP centos7.23902 > 192.168.31.80.http: Flags [S], seq 641484940, win 29200, options [mss 1460,sackOK,TS val 35876125 ecr 0,nop,wscale 9], length 0
2022-01-16 18:26:20.551640 IP 192.168.31.80.http > centos7.23902: Flags [S.], seq 1734186162, ack 641484941, win 28960, options [mss 1460,sackOK,TS val 1873151467 ecr 35876125,nop,wscale 9], length 0


$ tcpdump -i eth0 host 192.168.80.12
$ tcpdump host 192.168.80.12 and 192.168.80.13
$ tcpdump ip host ! 192.168.80.12
$ tcpdump src host 192.168.80.12
$ tcpdump dst host 192.168.80.13
$ tcpdump host 192.168.31.12 and tcp port 80 or 443
$ tcpdump -i eth0 icmp
$ tcpdump -i eth0 broadcast
$ tcpdump -i eth0 multicast
$ tcpdump tcp -i eth0 -s 0 -c 100 and dst port 80 or 443 and src 192.168.31.12 -w data.cap
```

## 系统管理

### 查看系统信息

#### arch
查看系统架构

#### 查看Linux版本
```shell
## 列出所有版本信息(适用于所有的Linux发行版)
lsb_release -a
或者
cat /etc/issue
## 这种方法只适合Redhat系的Linux
cat /etc/redhat-release
```
#### uname
打印系统信息

参数：
`-a`打印所有信息
`-s`打印内核名称
`-n`打印主机名
`-r`打印内核发行版
`-v`打印内核版本
`-m`打印机器硬件名
`-p`打印处理器类型
`-i`打印硬件平台
`-o`打印操作系统

示例：
```SHELL
## 打印所有系统信息
uname -a
##打印主机名
uname -a
## 打印内核版本
uname -r
## 打印操作系统
uname -o
```

#### 查看ip
```shell
ip addr |grep inet
```

#### date（日期）
功能：打印或设置系统日期和时间

### 进程与服务

#### service

示例：
```shell
service mysql start # 启动mysql
service mysql stop # 停止mysql
service mysql restart # 重启mysql
mysql --status-all # 查看所有服务状态
```
相当于执行了如下命令
/etc/init.d/mysqld restart

#### systemctl
systemctl命令是系统服务管理器指令，主要负责控制systemd系统和服务管理器，它实际上将 service 和 chkconfig 这两个命令组合到一起
systemd是系统管理的守护进程，用来取代system v的初始进程；我们可以看到systemd的进程号就是1

- systemd的配置文件目录
  * /usr/lib/systemd/system/：每个服务最主要的启动脚本的配置放在这，有点类似以前的/etc/init.d；
  * /run/systemd/system/：系统执行过程中所产生的服务脚本所在目录，这些脚本的优先级要比/usr/lib/systemd/system/高；
  * /etc/systemd/system/：管理员根据主机系统的需求所创建的执行脚本所在目录，执行优先级比/run/systemd/system/高；

```shell
## 基本服务管理
systemctl start   <xxx>.service # 启动某服务
systemctl restart <xxx>.service # 重启某服务
systemctl stop    <xxx>.service # 停止某服务
systemctl reload  <xxx>.service # 重新加载某个服务的配置文件
systemctl enable  <xxx>.service # 使某服务开机自启
systemctl disable <xxx>.service # 取消某服务开机自启
systemctl status <xxx>.service # 查看某服务状态
## 系统管理 
systemctl poweroff  #系统关机
systemctl reboot   #重新开机
systemctl suspend   #进入暂停模式
systemctl rescue   #强制进入救援模式
systemctl hibernate   #进入休眠模式
systemctl emergency   #强制进入紧急救援模式
## 其它
systemctl #范列出系统上面有启动的unit
systemctl list-unit-files #列出所有已经安装的unit有哪些
systemctl list-unit-files | grep enable # 查看自启动的软件。
systemctl list-units --type=service --all  #列出类型为service的所有项目，不论启动与否
systemctl get-default  #输入目前机器默认的模式，如图形界面模式或者文本模式
systemctl isolate multi-user.target  #将目前的操作环境改为纯文本模式，关掉图形界面
systemctl isolate graphical.target  #将目前的操作环境改为图形界面
systemctl list-dependencies --reverse   #查询当前默认的target关联了啥
systemctl list-dependencies graphical.target  #查询图形界面模式的target关联了啥
systemctl list-sockets   #查看当前的socket服务
systemctl show etcd.service   #查看 unit 的详细配置情况
systemctl mask etcd.service   #禁用某个服务
systemctl unmask etcd.service   #解除禁用某个服务

```
参考：https://juejin.cn/post/6963550409482829832#%E2%80%A2systemd%E5%92%8Csystemctl

#### ps

```shell
ps a
## ax显示所有进程
ps ax | head
## 查看指定进程
ps -ef | grep nginx
```

#### kill
```SHELL
### 强制关闭进程
$ ps ax|head
      PID    PPID    PGID     WINPID   TTY         UID    STIME COMMAND
     1492    1328    1491       1264  cons0     197609 18:13:23 /usr/bin/head
kill -9 1492
## 强制关闭8080端口
kill -9 8080
```

#### top
top命令相当于Windows下的任务管理器，能够实时显示系统进程情况，查看系统负载等信息。

示例：
```SHELL
## 显示所有进程
top
## 只显示指定进程
top -Hp 123
```

**htop–增强版的top**
htop 命令以直观的格式来显示信息
官网地址：http://hisham.hm/htop/

#### lsof
用于查看你进程打开的文件，打开文件的进程，进程打开的端口(TCP、UDP)。
```shell
## 列出指定进程号所打开的文件
lsof -p $pid

## 获取端口对应的进程ID=>pid
lsof -i:9981 -P -t -sTCP:LISTEN

## 列出打开文件的进程
lsof $filename
```

## 软件包管理

**Debian系列（Debian、Ubuntu等）**
- `.deb`：安装包格式(基本命名规则：名称_版本-修订号_平台.deb)
- `.tar.gz`：源码包
- `dpkg`：安装deb包的命令
- `apt`：包管理工具

**RedHat 系列（Redhat、Centos、Fedora等）**
- `.rpm`：安装包格式(基本命名规则：名称-版本-修订号.平台.deb)
- `.src.rpm` 、`.tar.gz`：源码包
- `rpm`：安装deb包的命令
- `yum`：包管理工具

### apt
查看不了dpkg本地安装的软件
```shell
## 安装软件包
apt install <package_name> 
## 移除软件包
apt remove <package_name> 
## 移除软件包及配置文件
apt purge <package_name> 
## 刷新存储库索引
apt update
## 升级所有可升级的软件包
apt upgrade
## 自动删除不需要的包
apt autoremove
## 在升级软件包时自动处理依赖关系
apt full-upgrade
## 查找软件包
apt search <keyword> 
## 显示安装细节
apt show <package_name> 
## 列出包含条件的包（已安装<installed>，可升级<updates>，已安装但不在Repository内<extras>）
apt list --installed
## 编辑源列表
apt edit-sources
```

### dpkg
dpkg是用来安装.deb文件,但不会解决模块的依赖关系,且不会关心ubuntu的软件仓库内的软件,可以用于安装本地的deb文件。
apt会解决和安装模块的依赖问题,并会咨询软件仓库, 但不会安装本地的deb文件, apt是建立在dpkg之上的软件管理工具。

```shell
## 安装deb包
dpkg -i xxx.deb
## 查看已安装软件相关目录
dpkg -L nginx
## 查看指定的软件是否已经安装
dpkg -l | grep ftp
`ii`表示该软件需要安装且已经安装，没有出现错误；
`iu`表示已经安装该软件，但未正确配置；
`rc`表示该软件已经被删除，但配置文件未清理
## 删除所有与mysql相关的安装包
dpkg -l |grep mysql|awk '{print $2}'|xargs sudo dpkg -P
```

### yum
>红帽子系列
```shell
## 安装软件包
yum install <package_name> 
## 安装本地软件包
yum localinstall <package_name> 
## 移除软件包
yum remove <package_name> 
## 升级所有可升级的软件包
yum update
## 查找软件包
yum search <keyword>
## 列出包含条件的包（已安装<installed>，可升级<updates>，已安装但不在Repository内<extras>）
yum list installed
## 显示rpm软件包的所有依赖关系
yum deplist
```

### rpm
示例：
```shell
rpm -qa|grep -i mysql
```

* `-i`, --install 安装软件包
* `-v`, --verbose 提供更多的详细信息输出
* `-h`, --hash 软件包安装的时候列出哈希标记 (和 -v 一起使用效果更好)，展示进度条
* `–a`，选项是查询所有已经安装的软件包
* `-q`，是查询一个包是否安装
（显示区别：已经安装的rpm包不会显示后缀.rpm ，而未安装的包则显示后缀.rpm）

- `-ivh` 安装并显示安装进度（规则：rpm –ivh 包名）
- `-Uvh` 升级软件包（rpm –Uvh 包名 //升级软件包-旧升新，低升高）
- `-ql` 列出rpm软件包内的文件信息（显示已安装软件包内容）
- `-qi` 列出rpm软件包描述信息（显示已安装软件包属性）
- `-qf` 查看指定文件属于哪个软件包（rpm –qf 文件名）
- `-Va` 校验所有rpm包，查找丢失的文件
- `-e` 删除rpm软件包（rpm –e 包名）
- `-qpR` 查看rpm包依赖关系
- `--force` 忽略软件包及文件的冲突，即强制安装（长格式命令）
- `--nodeps` 忽略软件包的依赖关系（长格式命令）
- `--test` 安装测试，并不实际安装（长格式命令）

### opkg
>OpenWrt 软件包管理器
参考链接：<https://openwrt.org/zh/docs/techref/opkg>

```shell
## 更新软件包索引(软件包索引保存在内存中，每次重启后需要再次更新索引)
opkg update

## 列出可安装的所有 LuCI APP
opkg list | grep luci-app | grep -v Translation

## 安装软件包 (以 luci-app-ssr-plus 为例)
opkg install luci-app-ssr-plus

### 查找该软件包的中文翻译包
$ opkg list | grep luci-app-ssr-plus | grep zh-cn
luci-i18n-ssr-plus-zh-cn（使用 opkg install 命令安装此翻译包即可）
```

### yarn
相关链接：
- [yarn英文文档](https://classic.yarnpkg.com/en/docs)
- [yarn 中文文档](https://www.yarnpkg.cn/cli/add)

```shell
## 查看全局目录
yarn global dir
## 查看全局安装的软件包
yarn global list --depth=0
## 删除全局安装的软件包
yarn global remove [pkg]
```

## 其它

### alias
定义或显示命令别名
**语法**
```shell
alias [-p] [name[=value] ... ]
```
**注意**
别名不能重复,否则会覆盖之前定义的别名
设置全局别名建议添加别名配置到`/etc/profile`,仅当前用户生效建议添加别名配置到`~/.bashrc`

**示例**
```shell
## 显示别名
$ alias
alias cp='cp -i'
alias mv='mv -i'
alias rm='rm -i'

## 设置临时别名
$ alias ll='ls -al'

## 设置当前用户别名
$ vim ~/.bashrc
...
alias cc='clear'
alias sst='ss -tunl'

## 设置全局别名
$ vim /etc/profile
...
alias ll='ls -al --color=auto'
alias ls='ls -p --color=auto'
alias lsl='ls -l --color=auto'
```

### corn定时任务
cron是一款定时任务软件，用于管理周期性任务，最小间隔为一分钟，类似的还有atd（一次性定时任务，不循环）

查看是否安装
```shell
pgrep corn
```
若没有安装执行安装命令
```
apt install corn
```
启动
```
service corn start
```
查看是否成功启动
```
ps -ef |grep cron
或者
pgrep cron
```

**管理任务计划文件**
cron 的所有任务计划都记录在`/var/spool/cron/crontabs/`目录中，通过 crontab 命令对该任务文件进行管理。

参数说明：
`-u user` 指定用户
`-e` 编辑某个用户的计划任务文件，若不指定用户，默认编辑当前用户的计划任务文件
`-l` 显示某个用户的计划任务文件，若不指定用户，默认显示当前用户的计划任务文件
`-r` 删除某个用户的计划任务文件，若不指定用户，默认删除当前用户的计划任务文件
`-i` 在删除之前推送确认提示

使用示例：
```shell
crontab -u pblood -e     #编辑用户 pblood 的计划任务文件
crontab -e            #编辑当前用户的计划任务文件
crontab -u pblood -l     #显示用户 pblood 的计划任务文件
crontab -l            #显示当前用户的计划任务文件
crontab -r            #删除当前用户的计划任务文件
```

任务计划的语法格式如下：
```shell
m h dom mon dow   command
0-59 0-23 1-31 1-12 0-7  command
```
`m`: 表示分钟
`h`: 表示小时
`dom`: 表示日期
`mon`: 表示月份
`dow`: 表示星期
`command`: 预执行的命令

另外需要使用一些特殊符号实现灵活的配置：
`*` 代表所有值
`/` 代表“每”
`-` 代表范围
`,` 分割数字

**示例：**

指定具体执行时间
```shell
2   *  *  *  * ls    #每个小时的第2分钟执行一次 ls 命令
30  7  *  *  * ls    #每天7：30执行一次 ls 命令
30 20  *  *  2 ls    #每周二，20：30执行一次 ls 命令（0和7表示星期天）
```

指定间隔时间
```shell
*/2 *  *  *  * ls    #每隔2分钟执行一次 ls 命令
```

指定时间段
```shell
30  7 3-6 *  * ls    #每个月的3，4，5，6号的7：30分各执行一次 ls 命令
```

指定多个时间
```shell
30  7 3,6 *  * ls    #每月的3号和6号的7：30分各执行一次 ls 命令

## 另外，使用 run-parts 可以运行指定目录下所有的脚本（注意脚本必须加上 “#!/bin/bash"，否则 run-parts 会调用失败）.
30 7 * * * run-parts /home   #每天7：30运行 /home 目录下的所有脚本按照指定格式添加任务，保存后，任务生效。
```

下面是corn的配置文件`/etc/crontab`，本身也支持计划任务
```shell
## /etc/crontab: system-wide crontab
## Unlike any other crontab you don't have to run the `crontab'
## command to install the new version when you edit this file
## and files in /etc/cron.d. These files also have username fields,
## that none of the other crontabs do.

SHELL=/bin/sh
## You can also override PATH, but by default, newer versions inherit it from the environment
##PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

## Example of job definition:
## .---------------- minute (0 - 59)
## |  .------------- hour (0 - 23)
## |  |  .---------- day of month (1 - 31)
## |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
## |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
## |  |  |  |  |
## *  *  *  *  * user-name command to be executed
17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly
25 6    * * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6    * * 7   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6    1 * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
##
```