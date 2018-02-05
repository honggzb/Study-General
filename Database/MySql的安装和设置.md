[MySql的安装和设置](#top)

- [1. windows下mysql配置](#windows下mysql配置)
- [2. MySql重设密码](#MySql重设密码)
- [3. MySql的基本语句](#MySql的基本语句)

<h2 id="windows下mysql配置">1. windows下mysql配置</h2>

- 安装包： https://dev.mysql.com/downloads/file/?id=474802
- MySQL workbench(tool)
- 免安装， [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)，可以直接解压到需要的地方
  - 环境变量的配置：计算机-》右键-》属性-》高级系统设置-》高级-》环境变量  在PATH里面加入解压的地方，比如我是E盘，就加入E:\mysql-5.7.13-winx64\bin
  - 在解压的地方E:\mysql-5.7.13-winx64新建一个my.ini文件

```shell
[client]
port=3306
default-character-set=utf8
[mysqld]
port=3306
character_set_server=utf8
#解压目录
basedir="C:/software/DevSetup/mysql-5.7.21-winx64"
#解压目录下data目录
datadir="C:/software/DevSetup/mysql-5.7.21-winx64/data"
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
```

  - 开始-》运行-》cmd

```shell
cd C:\software\DevSetup\mysql-5.7.21-winx64\bin  
mysqld --initialize      #直接初始化mysql，生成data文件夹中的文件。
mysqld -install          #安装mysql
net start mysql          #启动服务器
#Other
mysqld --console          #控制台
net stop mysql            #关闭服务器
mysqld -remove           #卸载mysql
mysqld --datadir=C:/software/DevSetup/mysql-5.7.21-winx64/data
```

[back to top](#top)

<h2 id="MySql重设密码">2. MySql重设密码</h2>

> 补充： 忘记密码，按以下步骤重设密码(` mysql -uroot -p `登录时，不知道密码，按以下步骤设置密码)
- 编辑my.ini文件，在[mysqld]这个条目下加`skip-grant-tables`, 保存退出后重启mysql
- 点击“开始”->“运行”(快捷键Win+R)
- 停止：输入 `net stop mysql`
- 启动：输入 `net start mysql`
- cmd里面输入`mysql -u root -p`就可以不用密码登录了，出现password：的时候直接回车可以进入
- 如不成功，进入mysql 数据库:  `usemysql> mysql;`
  - 给root用户设置新密码，在命令行输入：`mysql>（版本5.7）update user set authentication_string=password('123qwe') where user='root' and Host = 'localhost';`
  - 刷新数据库  `mysql> flush privileges;`
  - 退出mysql： `mysql> quit`
- 再修改一下my.ini这个文件，把加入的"skip-grant-tables"这行删除，保存退出再重启mysql就可以了
- 登录：`mysql -uroot -p123qwe`
- ？？但此时操作似乎功能不完全，还要alter user… 
  - `mysql> alter user 'root'@'localhost' identified by '123';`
  - 或 `mysql> set password for 'root'@'localhost'=password('123');`
  - 然后：`mysql>quit;`, 登录：`Mysql -uroot -p123` 就可以直接登录。
  - 以后也可以直接在命令行输入  `Mysql -uroot -p`， 输入密码后进入
  
[back to top](#top)

<h2 id="MySql的基本语句">3. MySql的基本语句</h2>

```sql
CREATE DATABASE mysql_shiyan;   #建数据库mysql_shiyan
show databases;                 #查看数据库
use mysql_shiyan                #使用 mysql_shiyan 数据库
#表
show tables;    #查看表
#新建表
CREATE TABLE 表的名字
(
列名a 数据类型(数据长度),
列名b 数据类型(数据长度)，
列名c 数据类型(数据长度)
);
#比如：
CREATE TABLE employee (id int(10),name char(20),phone int(12));
#插入数据
INSERT INTO 表的名字(列名a,列名b,列名c) VALUES(值1,值2,值3);
#查询数据
SELECT * FROM employee;
#约束
约束类型：   主键          默认值     唯一     外键          非空
关键字：    PRIMARY KEY DEFAULT   UNIQUE    FOREIGN KEY      NOT NUL
#直接使用github上复制的源码
source /home/shiyanlou/Desktop/SQL3/MySQL-03-01.sql
#select语句
SELECT 要查询的列名 FROM 表名字 WHERE 限制条件;（where可以不填）
SELECT name,age FROM employee WHERE age<25 OR age>30;     #筛选出age小于25，或age大于30
SELECT name,age FROM employee WHERE age>25 AND age<30;    #筛选出age大于25，且age小于30
SELECT name,age,phone,in_dpt FROM employee WHERE in_dpt IN ('dpt3','dpt4');
SELECT name,age,phone,in_dpt FROM employee WHERE in_dpt NOT IN ('dpt1','dpt3');
SELECT name,age,phone FROM employee WHERE phone LIKE '1101__'; #_代表一个  
SELECT name,age,phone FROM employee WHERE name LIKE 'J%';# %代表不确定数量
SELECT name,age,salary,phone FROM employee ORDER BY salary DESC; # 对结果排序 asc升 desc降
#函数名：COUNT   SUM AVG      MAX      MIN
#作用： 计数  求和  求平均值   最大值  最小值
SELECT MAX(salary) AS max_salary,MIN(salary) FROM employee;
#子查询
SELECT of_dpt,COUNT(proj_name) AS count_project FROM project
WHERE of_dpt IN
(SELECT in_dpt FROM employee WHERE name='Tom');
#连接查询
SELECT id,name,people_num
FROM employee,department
WHERE employee.in_dpt = department.dpt_name
ORDER BY id;
```

- [windows下mysql配置（第一次）](https://www.cnblogs.com/by330326/p/5608290.html)
- [Mysql5.7忘记root密码及mysql5.7修改root密码的方法](http://blog.csdn.net/z1074907546/article/details/51482594)
