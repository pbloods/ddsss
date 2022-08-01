---
title: SQL常用命令
categories:
  - 代码手册
tags:
  - SQL
abbrlink: 2462947224
top_img: false
date: 2022-01-21 11:20:30
---

# 前言

> SQL (Structured Query Language:结构化查询语言) 是用于管理关系数据库管理系统（RDBMS）。 SQL 的范围包括数据插入、查询、更新和删除，数据库模式创建和修改，以及数据访问控制。

## SQL分类
> 根据SQL指令完成的数据库操作的不同，可以将SQL指令分为四类：
- `DDL` Data Definition Language 数据定义语⾔（对数据库对象（数据库、数据表、视图、索引等）的创建、删除、修改）
- `DML` Data Manipulation Language 数据操作/操纵语⾔（对数据表中的数据的添加、删除、修改操作）
- `DQL` Data Query Language 数据查询语⾔（将数据表中的数据查询出来）
- `DCL` Data Control Language 数据控制语⾔（完成事务管理等控制性操作）

## SQL语言的规则与规范

**基本规则**
- SQL 可以写在一行或者多行。为了提高可读性，各子句分行写，必要时使用缩进
- 每条命令以`;`或`\g`或`\G`结束
- 关键字不能被缩写也不能分行
- 关于标点符号
  * 必须保证所有的`()`、`单引号`、`双引号`是成对结束的
  * 必须使用英文状态下的半角输入方式
  * 字符串型和日期时间类型的数据可以使用单引号`' '`表示
  * 列的别名，尽量使用双引号`" "`，而且不建议省略`as`

**SQL大小写规范 （建议遵守）**
- MySQL 在 Windows 环境下是大小写不敏感的
- MySQL 在 Linux 环境下是大小写敏感的
  * 数据库名、表名、表的别名、变量名是严格区分大小写的
  * 关键字、函数名、列名(或字段名)、列的别名(字段的别名) 是忽略大小写的。
- 推荐采用统一的书写规范：
  * 数据库名、表名、表别名、字段名、字段别名等都小写
  * SQL 关键字、函数名、绑定变量等都大写

**SQL注释写法**
```sql
单行注释：#注释文字(MySQL特有的方式)
单行注释：-- 注释文字(--后面必须包含一个空格。)
多行注释：/* 注释文字 */
```

更多参考：[阿里巴巴Java开发手册——MySQ部分](https://github.com/alibaba/p3c)

## 相关概念

![数据库系统](https://pblood.oss-cn-hongkong.aliyuncs.com/img/note/数据库系统.png)
![主要概念](https://pblood.oss-cn-hongkong.aliyuncs.com/img/note/主要概念.png)

## MySQL管理工具

**命令行**

登录
```shell
mysql -hlocalhost -P3306 -uroot -p
```

成功登录后修改密码
```shell
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

**图形化工具**
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) MySQL官方提供的工具
- [SQLyog](https://webyog.com/) 经典工具
- [Navicat](https://www.navicat.com.cn/) 界面好看，对于新手来说易学易用
- [dbeaver](https://dbeaver.io/download/) 比大多数的SQL管理工具要轻量

# DDL 数据定义语⾔
>使⽤DDL语句可以创建数据库、查询数据库、修改数据库、删除数据库

## DDL-数据库操作

**查询数据库**
```sql
-- 显示当前mysql中的数据库列表(有一个S，代表多个数据库)
SHOW DATABASES;

-- 查看数据库的创建信息
SHOW CREATE DATABASE <dbName>;
```

**创建数据库**
```sql
-- 创建数据库 dbName表示创建的数据库名称，可以⾃定义
CREATE DATABASE <dbName>;

-- 判断数据库是否已经存在，不存在则创建数据库（ 推荐 ）
CREATE DATABASE IF NOT EXISTS <dbName>;

-- 创建数据库并指定字符集（字符集：数据存储在数据库中采⽤的编码格式 utf8 gbk）
CREATE DATABASE <dbName> CHARACTER SET utf8;
```

**修改数据库编码格式为utf8**
```sql
ALTER DATABASE <dbName> CHARACTER SET utf8;
```

**删除数据库** 
注意：删除数据库时会删除当前数据库中所有的数据表以及数据表中的数据
```sql
-- 删除指定的数据库
DROP DATABASE <dbName>;

-- 删除指定的数据库（ 推荐 ）
DROP DATABASE IF EXISTS <dbName>;
```

**使⽤/切换数据库**
```sql
USE <dbName>
```

## DDL-数据表操作

**创建数据表**
数据表实际就是⼀个⼆维的表格，⼀个表格是由多列组成，表格中的每⼀类称之为表格
的⼀个字段

```sql
CREATE TABLE [if not exists] <tableName>(
    字段名称 数据类型 属性 约束条件 注释,
    字段名称 数据类型 属性 约束条件 注释
);
```

示例
```sql
CREATE TABLE students(
 学号 CHAR(9) NOT NULL UNIQUE,
 姓名 VARCHAR(20) NOT NULL,
 性别 CHAR(2) NOT NULL,
 年龄 INT NOT NULL,
 专业 VARCHAR(20)
)CHARACTER SET utf8 COLLATE utf8_general_ci;
-- CHARACTER SET:指定数据库采用的字符集,utf8不能写成utf-8
-- COLLATE:指定数据库字符集的排序规则,utf8的默认排序规则为utf8_general_ci（通过show character set查看）
```

**查询数据表**
```sql
--查询有哪些表
SHOW TABLES;
--查看指定表编码
SHOW CREATE TABLE <tableName>;
```

**查询表结构**
```sql
DESC <tableName>;
```

**删除数据表**
```sql
--删除数据表
DROP TABLE <tableName>;

--当数据表存在时删除数据表
DROP TABLE IF EXISTS <tableName>;
```

**修改数据表**
```sql
--修改表名
ALTER TABLE <tableName> RENAME TO <newTableName>;

--数据表也是有字符集的，默认字符集和数据库⼀致
ALTER TABLE <tableName> CHARACTER SET  utf8;

--添加列（字段）
ALTER TABLE <tableName> ADD <<columnName>> VARCHAR(200);

--修改列（字段）的列表和类型
ALTER TABLE <tableName> CHANGE <oldColumnName> <newCloumnName> <type>;

--只修改列（字段）类型
ALTER TABLE <tableName> MODIFY <<columnName>> <newType>;

--删除列（字段）
ALTER TABLE <tableName> DROP <<columnName>>;
```

# DML 数据操纵语⾔
>⽤于完成对数据表中数据的插⼊、删除、修改操作

## 添加数据

语法
```sql
INSERT INTO <tableName>(<columnName>,<columnName>....)
VALUES(value1,value2....);
```
- 字段或值之间用英文逗号隔开
- ‘ 字段1,字段2…’ 该部分可省略，但添加的值务必与表结构，数据列，顺序相对应，且数量一致
- 可同时插入多条数据,`VALUES`后用英文逗号隔开

示例
```sql
INSERT INTO students(学号,姓名,年龄,性别,专业) VALUES
('161228001','张三','20','男','JavaEE'),
('161228002','李四','19','女','H5'),
('161228003','王五','21','男','Android'),
('161228004','赵六','20','女','PHP'),
('161228005','钱七','23','男','JavaEE'),
('161228006','孙八','22','男','Android');
```

## WHERE⼦句
在删除、修改及查询的语句后都可以添加where⼦句（条件），⽤于筛选满⾜特定的添
加的数据进⾏删除、修改和查询操作。

**条件关系运算符**
```sql
--等于( = )
SELECT * FROM <tableName> WHERE 修改 = 6867;
--不等于( != <> )
SELECT * FROM <tableName> WHERE 学号 != '161228001';
SELECT * FROM <tableName> WHERE 学号 <> '161228001';
--⼤于( > )
SELECT * FROM <tableName> WHERE 年龄>18;
--⼩于( < )
SELECT * FROM <tableName> WHERE 年龄<20;
--⼤于等于( >= )
SELECT * FROM <tableName> WHERE 年龄>=20;
--⼩于等于( <= )
SELECT * FROM <tableName> WHERE 年龄<=20;
-- between and 区间查询 between v1 and v2 [v1,v2]
SELECT * FROM <tableName> WHERE 年龄 between 18 and 20;
```

## 删除数据
从数据表中删除满⾜特定条件（所有）的记录

**delete**
语法
```sql
DELETE FROM <tableName> [WHERE <conditions>];
```
注意：<conditions>为筛选条件 , 如不指定则删除该表的所有列数据

示例
```sql
-- 删除学号为20210102的学⽣信息
DELETE FROM students WHERE 学号='20210102';
-- 删除年龄⼤于20岁的学⽣信息(如果满⾜where⼦句的记录有多条，则删除多条记录)
DELETE FROM students WHERE 年龄>20;
-- 如果删除语句没有where⼦句，则表示删除当前数据表中的所有记录(敏感操作)
DELETE FROM students;
```

**turncate**
TRUNCATE命令用于完全清空表数据 , 但表结构 , 索引 , 约束等不变
```sql
TRUNCATE <tableName>;

-- 清空学生表
TRUNCATE students;
```

**delete和turncate命令区别**
- 相同 : 都能删除数据 , 不删除表结构 , 但TRUNCATE速度更快
- 不同
  - 使用TRUNCATE TABLE 重新设置AUTO_INCREMENT计数器
  - 使用TRUNCATE TABLE不会对事务有影响 （事务后面会说）

## 修改数据
对数据表中已经添加的记录进⾏修改

语法
```sql
--如果update语句没有where⼦句，则表示修改当前表中所有⾏（记录）
UPDATE <tableName> SET <columnName1>=<value1>,<columnName2>=<value2> [WHERE conditions]
```

示例
```sql
--将学号为20210105的学⽣姓名修改为“孙七”（只修改⼀列）
UPDATE students SET 姓名='孙七' WHERE 学号='161228009';
--将学号为161228001的学⽣ 性别修改为“男”,同时将年龄修改为 17（修改多列）
UPDATE students SET 性别='男',年龄='17'
WHERE 学号='161228001';
```

# DQL 数据查询语⾔
DQL( Data Query Language 数据查询语言 )
- 查询数据库数据 , 如SELECT语句
- 简单的单表查询或多表的复杂查询和嵌套查询
- 是数据库语言中最核心，最重要的语句
- 使用频率最高的语句

**查询基础语法**
```sql
SELECT colnumName1[,colnumName2,colnumName3...] FROM <tableName> [WHERE conditions];

--如果要显示查询到的记录的所有列，则可以使⽤ * 替代字段名列表 （在项⽬开发中不建议使⽤*）
SELECT * FROM students;
```

## 条件查询（WHERE）
>在删除、修改及查询的语句后都可以添加where⼦句（条件），⽤于筛选满⾜特定的添加的数据进⾏删除、修改和查询操作。
```sql
DELETE FROM tableName WHERE conditions;
UPDATE tabeName SET ... WHERE conditiSELECT .... FROM tableName WHERE conditions;
```

### 关系运算符
```sql
--等于( = )
SELECT * FROM <tableName> WHERE 修改 = 6867;
--不等于( != <> )
SELECT * FROM <tableName> WHERE 学号 != '161228001';
SELECT * FROM <tableName> WHERE 学号 <> '161228001';
--⼤于( > )
SELECT * FROM <tableName> WHERE 年龄>18;
--⼩于( < )
SELECT * FROM <tableName> WHERE 年龄<20;
--⼤于等于( >= )
SELECT * FROM <tableName> WHERE 年龄>=20;
--⼩于等于( <= )
SELECT * FROM <tableName> WHERE 年龄<=20;
-- between and 区间查询 between v1 and v2 [v1,v2]
SELECT * FROM <tableName> WHERE 年龄 between 18 and 20;
```

### 逻辑操作符
![20220426170404](https://pblood.oss-cn-hongkong.aliyuncs.com/img/note/20220426170404.png)
```sql
-- and 并且 筛选多个条件同时满足
SELECT * FROM students WHERE 性别='⼥' and 年龄<21;
-- or 或者 筛选多个条件中⾄少满⾜⼀个条件
SELECT * FROM students WHERE 性别='⼥' or 年龄<21;
-- not 取反
SELECT * FROM students WHERE 年龄 not between 18 and 20;
```

### LIKE模糊查询
> 在where⼦句的条件中，我们可以使⽤like关键字来实现模糊查询

语法
```sql
SELECT * FROM <tableName> WHERE <columnName> like 'reg';
```

- 在like关键字后的reg表达式中
  -`%`表示任意多个字符 【`%o%`包含字⺟o】
  -`_`表示任意⼀个字符 【`_o%`第⼆个字⺟为o】

示例
```sql
-- 查询学⽣姓名包含字⺟o的学⽣信息
SELECT * FROM students WHERE 姓名 like '%o%';
-- 查询学⽣姓名第⼀个字为`张`的学⽣信息
SELECT * FROM students WHERE 姓名 like '张%';
-- 查询学⽣姓名最后⼀个字⺟为o的学⽣信息
SELECT * FROM students WHERE 姓名 like '%o';
-- 查询学⽣姓名中第⼆个字⺟为o的学⽣信息
SELECT * FROM students WHERE 姓名 like '_o%';
```

### IN范围查询
```sql
-- 使用IN范围查询学号为161228001,161228002,161228003的学生信息
SELECT 学号,姓名 FROM students
WHERE 学号 IN (161228001,161228002,161228003);

-- 使用IN范围查询学号不是161228001,161228002,161228003的学生信息
SELECT 学号,姓名 FROM students
WHERE 学号 NOT IN (161228001,161228002,161228003);
```

### NULL空值查询
```sql
-- IS NULL 空值查询，查询出生日期没有填写的同学
-- 不能直接写=NULL , 这是代表错误的 , 用 is SELECT studentname FROM student
WHERE BornDate IS NULL;

-- 查询出生日期填写的同学，即生日SELECT studentname FROM student
WHERE BornDate IS NOT NULL;

-- 查询没有写家庭住址的同学(空字符串不等于nSELECT studentname FROM student
WHERE Address='' OR Address IS NULL;
```

### 分组查询(GROUP BY)
>分组——就是将数据表中的记录按照指定的类进⾏分组

语法
```sql
SELECT 分组字段/聚合函数
FROM 表名
[WHERE 条件]
group by 分组列名 [having 条件]
[order by 排序字段]
```
 
### 分⻚查询(LIMIT)
>当数据表中的记录⽐较多的时候，如果⼀次性全部查询出来显示给⽤户，⽤户的可读性/体验性就不太好，因此我们可以将这些数据分⻚进⾏展示

语法
```sql
SELECT ...
FROM ...
WHERE ...
LIMIT param1,param2
```
- param1 int , 表示获取查询语句的结果中的第⼀条数据的索引（索引从0开始）
- param2 int, 表示获取的查询记录的条数（如果剩下的数据条数<param2，则返回剩下的所有记录）

案例
对数据表中的学⽣信息进⾏分⻚显示，总共有10条数据，我们每⻚显示3条
>总记录数 count 10
>每⻚显示 pageSize 3
>总⻚数： pageCount = count%pageSize==0 ? count/pageSize : count/pageSize +1;

```sql
# 查询SELECT * FROM students [WHERE ...] LIMIT 0,3; (1-1)*3
# 查询SELECT * FROM students [WHERE ...] LIMIT 3,3; (2-1)*3
# 查询SELECT * FROM students [WHERE ...] LIMIT 6,3; (3-1)*3
# 查询SELECT * FROM students [WHERE ...] LIMIT 9,3; (4-1)*3

# 如果在⼀张数据表中：
# pageNum表示查询的⻚码
# pageSize表示每⻚显示的条数
# 通⽤分⻚语SELECT * FROM <tableName> [WHERE ...] LIMIT (pageNum-1)*pageSize,pageSize;
```

#  聚合函数
SQL中提供了⼀些可以对查询的记录的列进⾏计算的函数——聚合函数

`count()` 统计函数，统计满⾜条件的指定字段值的个数（记录数）
`max()` 计算最⼤值，查询满⾜条件的记录中指定列的最⼤值
`min()` 计算最⼩值，查询满⾜条件的记录中指定列的最⼩值
`sum()` 计算和，查询满⾜条件的记录中 指定的列的值的总和
`avg()` 求平均值，查询满⾜条件的记录中 计算指定列的平均值

示例
```sql
-- 统计学⽣表中学⽣总数
SELECT count(学号) FROM students;
```

# ⽇期函数 和 字符串函数

## ⽇期函数
>当我们向⽇期类型的列添加数据时，可以通过字符串类型赋值（字符串的格式必须为
>yyyy-MM-dd hh:mm:ss）
>如果我们想要获取当前系统时间添加到⽇期类型的列，可以使⽤`now()`或者`sysdate()`

## 字符串函数
>就是通过SQL指令对字符串进⾏处理

示例
```sql
# concat(colnum1,colunm2,...) SELECT concat(姓名,'-',性别) FROM students;
+---------------------------------+
| concat(姓名,'-',性别) |
+---------------------------------+
| 韩梅梅-⼥ |
| Tom-男 |
| Lucy-⼥ |
| 林涛-男 |
+---------------------------------+
# upper(column) 将字段的值转换成⼤写
mySELECT upper(姓名) FROM students;
+-----------------+
| upper(姓名) |
+-----------------+
| 韩梅梅 |
| TOM |
| LUCY |
| POLLY |
| THEO |
| 林涛 |
+-----------------+
# lower(column) 将指定列的值转换成⼩写
mySELECT lower(姓名) FROM students;
+-----------------+
| lower(姓名) |
+-----------------+
| 韩梅梅 |
| tom |
| lucy |
| polly |
| theo |
+-----------------+
# substring(column,start,len) 从指定列中截取部分显示 start从1开始
mySELECT 姓名,substring(stu_tel,8,4) FROM students;
+-----------+------------------------+
| 姓名 | substring(stu_tel,8,4) |
+-----------+------------------------+
| 韩梅梅 | 3311 |
| Tom | 3302 |
| Lucy | 3334 |
+-----------+------------------------+
```

# 对查询结果的处理

## 设置查询的列
>声明显示查询结果的指定列
```sql
SELECT colnumName1,columnName2,... FROM students WHERE 年龄>20;
```

## 字段取别名(AS)
>我们可以为查询结果的列名 去⼀个语义性更强的别名 (如下案例中 as 关键字也可以省略
```sql
SELECT 姓名,2021-年龄 as stu_birth_year FROM students;
```

## 计算列
>对从数据表中查询的记录的列进⾏⼀定的运算之后显示出来

```sql
# 出⽣年份 = 当前年份 SELECT 姓名,2021-年龄 FROM students;
+-----------+--------------+
| 姓名 | 2021-年龄 |
+-----------+--------------+
| omg | 2000 |
| 韩梅梅 | 2003 |
| Tom | 2001 |
| Lucy | 2000 |
| Polly | 2000 |
| Theo | 2004 |
+-----------+--------------+
```

## distinct 消除重复⾏
>从查询的结果中将重复的记录消除 distinct
```sql
SELECT 年龄 FROM students;
+---------+
| 年龄 |
+---------+
| 21 |
| 18 |
| 20 |
| 21 |
| 21 |
| 17 |
+------SELECT distinct 年龄 FROM students;
+---------+
| 年龄 |
+---------+
| 21 |
| 18 |
| 20 |
| 17 |
+---------+
```

# 其它

数据导入指令
```shell
mysql> source d:\mysqldb.sql
```