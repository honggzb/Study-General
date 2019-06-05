## 通过Maven新建一个Web项目

1. 在Eclipse中新建Maven项目，选择“Create a simple project”
2. 修改层面信息
   1. ![](https://i.imgur.com/DU51IzQ.png)
3. 将webcontent中的所有内容复制到webapp目录下，并删除webContent目录
   1. ![](https://i.imgur.com/olRdHzE.png)
4. 修改项目的部署信息，删除测试文件夹，添加webapp为项目根目录
   1. ![](https://i.imgur.com/kB02jHg.png)
   2. 如果不打算在pom.xml中添加对Server runtime的依赖，则这里必须手动添加依赖，如下图
   3. ![](https://i.imgur.com/s832Eav.png)
   4. 另外如果pom.xml报错，修改任意位置保存
5. 添加依赖的jar包

	```xml
	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
		<modelVersion>4.0.0</modelVersion>
		<groupId>com.zhangguo</groupId>
		<artifactId>SpringMVC01</artifactId>
		<version>0.0.1</version>
		<packaging>war</packaging>

		<properties>
			<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
			<spring.version>4.3.0.RELEASE</spring.version>
		</properties>

		<dependencies>
			<!--Spring框架核心库 -->
			<dependency>
				<groupId>org.springframework</groupId>
				<artifactId>spring-context</artifactId>
				<version>${spring.version}</version>
			</dependency>
			<!-- Spring MVC -->
			<dependency>
				<groupId>org.springframework</groupId>
				<artifactId>spring-webmvc</artifactId>
				<version>${spring.version}</version>
			</dependency>
			<!-- JSTL -->
			<dependency>
				<groupId>javax.servlet</groupId>
				<artifactId>jstl</artifactId>
				<version>1.2</version>
			</dependency>
	</dependencies>
	</project>
	```

> reference
- [Spring MVC 学习总结（一）——MVC概要与环境配置（IDea与Eclipse示例）](https://www.cnblogs.com/best/p/5653916.html)
