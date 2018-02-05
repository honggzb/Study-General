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

1. 引入MySQL依赖
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
