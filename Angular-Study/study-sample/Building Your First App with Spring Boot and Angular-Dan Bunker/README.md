[Building Your First App with Spring Boot and Angular- Dan Bunker](#top)

- [POJO Model and RestController](#pojo-model-and-restcontroller)
  - [Creat an app at https://start.spring.io](#creat-an-app-at-httpsstartspringio)
  - [Add a POJO bike model](#add-a-pojo-bike-model)
- [Persistence Layer](#persistence-layer)
- [Integrate Angular Project](#integrate-angular-project)
- [setup proxy](#setup-proxy)
  - [Development](#development)
  - [Production](#production)
- [Security Application](#security-application)
  - [register and configuration in auth0.com](#register-and-configuration-in-auth0com)
  - [configuration in Eclipse](#configuration-in-eclipse)

## POJO Model and RestController

### Creat an app at https://start.spring.io

- copy zip file and unzip
- import maven project in eclipse

### Add a POJO bike model

- create com.globomatics.bike.models.Bike.java
- created com.globomatics.bike.controllers.BikeContoller.java, add a `@RestController`

```java
//Bike.java
public class Bike {
	private Long id;
	private String name;
	private String email;
	private String phone;
	private String model;
	private String serialNumber;
	private BigDecimal purchasePrice;
	private Date purchaseDate;
	private boolean contact;
	//...
}
//BikeContoller.java
@RestController
@RequestMapping("/api/v1/bikes")
public class BikesController {
	@GetMapping
	public List<Bike> list(){
		List<Bike> bikes = new ArrayList<>();
		return bikes;
	}
	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void create(@RequestBody Bike bike){
	}
	@GetMapping("/{id}")
	public Bike get(@PathVariable("id") long id){
		return new Bike();
	}
}
```

[back to top](#top)

## Persistence Layer

- create sqlite database and table
- copy bike.db to project root directory

```shell
sqlite3 bike.db
.help
.databases
.tables
.quit
```

- Add Spring Data JPA dependency
  - modify pom.xml
  - modify application.properties
- Add a JpaRepository interface - create com.globomatics.repositories.BikeRepositories.java
- Convert Bike POJO to JPA Entity - Bike.java
- Customizing JSON payloads

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
	<groupId>org.xerial</groupId>
	<artifactId>sqlite-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>com.zsoltfabok</groupId>
    <artifactId>sqlite-dialect</artifactId>
    <version>1.0</version>
</dependency>
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLiteDialect
spring.jpa.database-platform=org.hibernate.dialect.SQLiteDialect
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true

spring.datasource.url=jdbc:sqlite:bike.db
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=org.sqlite.JDBC
```

```java
//BikeRepositories.java
package com.globomatics.bike.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.globomatics.bike.models.Bike;
public interface BikeRepository extends JpaRepository<Bike, Long> {
}
//Bike.java
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})   //add Json annotation
public class Bike {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String name;
	private String email;
	private String phone;
	private String model;
	private String serialNumber;
	private BigDecimal purchasePrice;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern= "MM-dddd-yyyy")
	private Date purchaseDate;
	private boolean contact;
	//...
}
//BikeContoller.java
@RestController
@RequestMapping("/api/v1/bikes")
public class BikesController {
    @Autowired
	private BikeRepository bikeRepository;
	@GetMapping
	public List<Bike> list(){
		return bikeRepository.findAll();
	}
	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void create(@RequestBody Bike bike){
        bikeRepository.save(bike);
	}
	@GetMapping("/{id}")
	public Bike get(@PathVariable("id") long id){
		return bikeRepository.getOne(id);
	}
}
```

[back to top](#top)

## Integrate Angular Project

```shell
ng set --global packageManager=yarn  #optional
ng new bike-ui --routing
```

## setup proxy

### Development
  - create proxy.conf.json in root directory, note it is **NOT FOR PRODUCTION**
  - modify package.json, `"start": "ng serve --proxy-config proxy.conf.json",`

  ```json
  {
  	"/api/*": {
  		"target": "http://localhost:2022",
  		"secure": false,
      "changeOrigin": true,
      "logLevel": "debug"
  }
  ```

### Production

```shell
ng build
npm i express http body-parser express-http-proxy cors port --save
/root/server.js
```

[back to top](#top)

## Security Application

### register and configuration in auth0.com

![](https://i.imgur.com/xHeOp8N.png)
![](https://i.imgur.com/MAEoRZk.png)

### configuration in Eclipse

1. configuration

```javascript
//1) pom.xml
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>auth0-spring-security-api</artifactId>
  <version>1.0.0-rc.3</version>
</dependency>
//2) src/main/resources/application.properties
auth0.issuer:https://gzbhong.auth0.com/
auth0.apiAudience:http://localhost:2022
```

2. create SecurityConfiguration.java

```java
package com.globomatics.bike.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import com.auth0.spring.security.api.JwtWebSecurityConfigurer;
@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Value(value = "${auth0.apiAudience}")
	private String apiAudience;
	@Value(value = "${auth0.issuer}")
	private String issuer;
	@Override
	protected void configure(HttpSecurity http) throws Exception {
	    JwtWebSecurityConfigurer
        .forRS256(apiAudience, issuer)
        .configure(http)
        .authorizeRequests()
        .antMatchers(HttpMethod.POST, "/api/v1/bikes").permitAll()
        .antMatchers(HttpMethod.GET, "/api/v1/bikes").hasAuthority("view:registrations")
        .antMatchers(HttpMethod.GET, "/api/v1/bikes/**").hasAuthority("view:registration")
        .anyRequest().authenticated();
	}
}
```

https://github.com/dlbunker/ps-spring-boot-and-angular

3. front end security

- setup by creating auth.service(authorization service)
  - [Auth0- Angular: Login](https://auth0.com/docs/quickstart/spa/angular2/01-login#loading-via-dependencies)
- modify bike.service, adding authorization bearer token to header
- security angular router by using auth.guard

[back to top](#top)

> reference
- Twitter: @mcirque
- Website: codecram.com
- LinkedIn: www.linkedin.com/in/bunkerdan