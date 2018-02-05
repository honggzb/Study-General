[BookStore - Angular 2 Complete E-Commerce App Course - Java,Spring,MySQL](#top)

- [1. modules in bookstore](#modules)
- [2. Session and Auth sequence](#Session)
- [3. Spring environment setup in Eclipse](#Spring)
  - [3.1 Spring boot在Eclipse中的设置](#boot在Eclipse中的设置)
  - [3.2 Entity Relationship](#Relationship)
  - [3.3 SpringBoot链接MySQL](#SpringBoot链接MySQL)

<h2 id="modules">1. modules in bookstore</h2>

```shell
├── account module
│   ├── guest
│   │   ├── login
│   │   ├── forget password
│   │   └── create account
│   └── user
│       ├── profile
│       ├── billing
│       ├── shipping
│       └── order history
├── account module
│   ├── search
│   └── view book detail info
│       ├── add book to shopping cart
│       └── show book availability
├── Shopping cart module
│   ├── cart item
│   │   └── modify cart item
│   └── checkout
│       ├── shipping
│       ├── billing
│       ├── payment
│       └── order confirmation
└── book management - admin Portal
    └── book
        ├── add book
        ├── update book
        └── delete book
#新建project  
ng new bookstore -style less
cd bookstore
#using angular material
npm install --save @angular/material @angular/cdk
npm install --save hammerjs
#modify src/main.ts, adding
import 'hammerjs';   #for gesture in mat-slide-toggle, mat-slider, matTooltip component
#modify index.html, adding
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

[back to top](#top)

<h2 id="Session">2. Session and Auth sequence</h2>

- Session is a conversional state between client and server an it can consists of multiple request and response between client and server
- Identifier to provide Session
  - User Authentication(username and password)
  - HTML hidden Field
  - URL Rewriting: append a session identifier parameter
  - Cookies
- **Spring Session**
  - write horizontally scalable cloud native applications
  - offload the storage of session into specializd external session stores, such as Redis
  - keep http session alive when users are making requests over websocket
  - access session data from non-web request such as JMS message
  - support multiple sessions per browser foe a richer user experience
  - control how session ids are exchanged between clients and server, which makes it easy to write Restful API that can extract session id from an http header rather than relying on cookies
  - Spring session project **does not depend on Spring Framework**
- **two key problems of Spring session**
  - how to create a clustered high availability session that can store data reliable and efficiently
    - solved by a variety of data stores such as Redis, GemFire, Apache Geode and etc.
  - how to determine which session instance is associated with which incoming request, whether it is through http, websocket, AMQP or any other protocol
    - Spring session just need to define a standard set of interfaces
      - org.springframework.session.Session --> define the basic capabilities of a session
      - org.springframework.session.ExpiringSession --> to determine whether a session is expired
      - org.springframework.session.SessionRepository --> define method to create, save, delete and retrieve a session
- **How Spring session works**: how to associate a request to a specific session instance, is protocol specific
  - Http session can use cookies or headers
  - Https can use SSL session id
  - JMS can use JMS header
  - https://projects.spring.io/spring-session/

![](https://i.imgur.com/tC0LH3D.png)

[back to top](#top)

<h2 id="Spring">3. Spring environment setup in Eclipse</h2>

<h3 id="boot在Eclipse中的设置">3.1 Spring boot在Eclipse中的设置</h3>

- 1.Eclipse下载，https://www.eclipse.org/downloads/eclipse-packages/
- 2. Spring IDE 下载（也叫Spring Tool Suite 简称 STS）， https://spring.io/tools/sts/all, 并解压
- 3. Spring framework下载: http://repo.spring.io/libs-release-local/org/springframework/spring/, 并解压
- 4. 打开eclipse
  - 4.1 安装STS： `help`-> `Intall new software`-> `Add` -> `Local`导入springsource-tool-suite解压路径会自动找到相关的IDE, 或`Help` -> `Eclipse Marketplace…` -> 选择“Popular”标签去查找`Spring Tool Suite (STS) for Eclipse`插件
  - ![](https://i.imgur.com/BouGAUx.png)
  - 4.2 配置framework: 
    - 解压后将libs目录（spring framework所有的jar包）复制到eclipse建立一个项目都可以某一个指定目录下或者web项目的lib目录下
    - 复制之后如果是web项目会自动导入到项目，如果是普通项目则需要Build Path导入一下就可以使用了，其中junit-4.1.0.jar不是必须的，这只是单元测试所需要的一个jar包；commons-logging-1.2.jar项目中是没有的，它是Apache的日志管理工具，spring为了所有的java应用程序进行统一的日志接口管理，所以需要下载commons-logging.jar这个包，下载地址是：http://commons.apache.org/proper/commons-logging/index.html，进入后点击Download下载就行，然后和spring的包一起导入
    - commens-logging文件: http://download.csdn.net/detail/judy1990/4252960, 解压后将commons-logging-1.2.jar复制到eclipse项目的lib目录下
    - ![](https://i.imgur.com/xANyZLa.png)
  - 4.3 新建一个项目，spring Boot->Spring Starter Project
    - ![](https://i.imgur.com/ljR3Jjj.png)
    - ![](https://i.imgur.com/ewaw7dP.png)
    - ???加入build path，右键点击项目——properties——java build path，在libraries标签下点——add JARs...， 添加yourproject\lib里面的jar包
    - ![](https://i.imgur.com/b1tWcS2.png)
  - 4.4 运行SpringBootDemoApplication中的main方法：`Run As` -> `Spring Boot App`

**补充： Spring Boot: Change Port for Web Application**

- spring boot默认使用tomcat运行，端口port 8080
- 方法1: 在main()中加入
- 方法2: 在application.properties加入 -> `server.port=8181`
  - 如application.properties不存在， 右键点击src/java/resources， New-> Other-> General选中'File'后创建application.properties
  - 参见： https://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html

[back to top](#top)

<h3 id="Relationship">3.2 Entity Relationship</h3>

> https://www.draw.io/

![](https://i.imgur.com/UJlJa0m.png)

```xml
<!-- 添加JDBC依赖 -->
<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<!-- 添加JPA -->  
<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
</dependency>
<!-- 添加MySql依赖 -->
<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
</dependency>
<dependency>
	    <groupId>org.springframework.security</groupId>
	    <artifactId>spring-security-web</artifactId>
</dependency>
```

https://projects.spring.io/spring-security/

[back to top](#top)

<h3 id="SpringBoot链接MySQL">3.3 SpringBoot链接MySQL</h3>

**windows下mysql配置**

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

> 补充： 忘记密码，按以下步骤重设密码
- 登陆:` mysql -uroot -p `登录时，不知道密码，按以下步骤设置密码
  - 编辑my.ini文件，在[mysqld]这个条目下加`skip-grant-tables`, 保存退出后重启mysql
  - 点击“开始”->“运行”(快捷键Win+R)
  - 停止：输入 `net stop mysql`
  - 启动：输入 `net start mysql`
  - cmd里面输入`mysql -u root -p`就可以不用密码登录了，出现password：的时候直接回车可以进入
- 进入mysql 数据库:  `usemysql> mysql;`
  - 给root用户设置新密码，在命令行输入：`mysql>（版本5.7）update user set authentication_string=password('123qwe') where user='root' and Host = 'localhost';`
  - 刷新数据库  `mysql> flush privileges;`
  - 退出mysql： `mysql> quit`
- 再修改一下my.ini这个文件，把加入的"skip-grant-tables"这行删除，保存退出再重启mysql就可以了
- 登录：`mysql -uroot -p123qwe`
- 但此时操作似乎功能不完全，还要alter user… 
  - `mysql> alter user 'root'@'localhost' identified by '123';`
  - 或 `mysql> set password for 'root'@'localhost'=password('123');`
  - 然后：`mysql>quit;`, 登录：`Mysql -uroot -p123` 就可以直接登录。
  - 以后也可以直接在命令行输入  `Mysql -uroot -p`， 输入密码后进入

**MySQL基本语句**

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

[windows下mysql配置（第一次）](https://www.cnblogs.com/by330326/p/5608290.html)

**在Spring Roo赖
2. 引入Spring JDBC依赖
3. 配置MySQL链接

```
1） 编辑Application.properties
  spring.datasource.url = jdbc:mysql://localhost:3306/spring_boot  
  spring.datasource.username = root  
  spring.datasource.password = root  
  spring.datasource.driverClassName = com.mysql.jdbc.Driver  
  # Specify the DBMS  
  spring.jpa.database = MYSQL  
  # Show or not log for each sql query  
  spring.jpa.show-sql = true  
  # Hibernate ddl auto (create, create-drop, update)  
  spring.jpa.hibernate.ddl-auto = update  
  # Naming strategy  
  spring.jpa.hibernate.naming-strategy = org.hibernate.cfg.ImprovedNamingStrategy  
  # stripped before adding them to the entity manager)  
  spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5Dialect    
2）或
属性配置文件： MySQL的配置文件默认存放在/etc/my.cnf或者/etc/mysql/my.cnf
mysql.url=jdbc:mysql://127.0.0.1:3306/tenghu
mysql.username=root
mysql.password=xiaohu

SpringBoot配置文件：
server:
  port: ${rest.port}
  context-path: /sbm/
  tomcat:
    uri-encoding: UTF-8
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: ${mysql.url}
    username: ${mysql.username}
    password: ${mysql.password}
```

> 补充： Eclipse常用快捷键

| 功能| 快捷键|
| :------------- | :------------- |
| import lib|ctrl+shift+O|
| sources |Alt+Shift+S|

> Reference
> - http://ldeng.net/courses.html
