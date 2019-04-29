[Spring boot study-Dan Bunker](#top)

## Environment Setup

### Eclipse setup

- install sprint tools in eclipse
  - http://download.springsource.com/snapshot/TOOLS/nightly/e4.5

### create a simple spring boot Project

1. create a new maven project
2. modify 'pom.xml', adding dependencies of springboot

   ```html
   <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.3.1.RELEASE</version>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
   ```

   1. if "The import org.springframework cannot be resolved."
   2. 'project --> Maven --> Update Project' then click OK
   3. 'project --> Maven ---> Add Dependency' == then choose the name or parent name of missing dependency
3. modify 'com.boot.App.java'

   ```java
   package com.boot;
    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    @SpringBootApplication
    public class App
    {
        public static void main( String[] args )
        {
            SpringApplication.run(App.class, args);
        }
    }
   ```

4. add 'com.boot.controller.HomeController.java

   ```java
    package com.boot.controller;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;
    @RestController
    public class HomeController {
        @RequestMapping("/")
        public String home(){
            return "Das Boot, reporting for duty!";
        }
    }
    ```

5. right click App.java, runing As 'Java Application'
6. go to 'localhost:8080'

### Spring MVC Integration Overview

1. dsf
   - edit pom.xml
   - setup viewResolvers
   - set up static resource serving
   - set up HttpMessageConverter
   - set up customizable hooks
2. application.properities
    1. place on classpath root
    2. YAML or Properites format
2. Environmental Configuration
   1. appication-{profile}.properties
   2. appplication-dev.properties

### Default static content locations of Spring boot Project

- classpath
    - /static
    - /public
    - /resources

```
|src/
├───main/
│   ├╌╌╌╌ resources/
│   │     └╌╌╌public/
│   │           ├╌╌╌╌╌css/
│   │           ├╌╌╌╌╌images/
│   │           ├╌╌╌╌╌js/
│   │           ├╌╌╌╌╌lib/
│   │           ├╌╌╌╌╌views/
│   │           └╌╌╌╌╌index.html
│   └╌╌╌╌ java
│         └╌╌╌com/
├───test/
```

## Configuration and Accessing a Data Source

### Spring Boot Initializers

- Web intializer: http://start.spring.io
- Command line: [Spring boot cli](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/html/spring-boot-cli.html#cli)

### How does Spring boot work?

- Main method entry point: App.java  (Plain Java program)
- Spring context initialization
- Embedded container and container less deployments
- Embedded Server: default is Tomcat, auto configured

![](https://i.imgur.com/jPKPm0b.png)

[back to top](#top)

### add H2 dependency

- adding following code in pom.xml
- update maven project

```xml
<dependency>
   	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
   	<groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
</dependency>
```

- run --> run configuration --> `-Dspring.profiles.active=test`
- DataSource configuration: adding following code in application.properities

```shell
spring.h2.console.enabled=true
spring.h2.console.path=/h2

spring.datasource.url=jdbc:h2:file:~/dasboot
spring.datasource.username=sa
spring.datasource.password=
spring.datasource.driver-class-name=org.h2.Driver
## database pooling configuration
spring.datasource.max-active=10
spring.datasource.max-idle=8
spring.datasource.max-wait=10000
spring.datasource.min-evictable-idle-time-millis=1000
spring.datasource.min-idle=8
spring.datasource.time-between-eviction-runs-millis=1
```

![](https://i.imgur.com/AQAQcyi.png)

- `http://localhost:9090/h2`

###  Add the flyway migration dependency - migrated with Flyway DB

- adding following code in pom.xml
- update maven project

```xml
<dependency>
   	<groupId>org.flywaydb</groupId>
   	<artifactId>flyway-core</artifactId>
   	<version>4.1.2</version>
</dependency>
```

- adding following code in application.properits

```shell
flyway.baseline-on-migrate=true
spring.jpa.hibernate.ddl-auto=false;
```

**error -> org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer'**

- https://stackoverflow.com/questions/41147768/caused-by-org-flywaydb-core-api-flywayexception-validate-failed-migration-che/41147917
- Delete the file called `V2__create_shipwreck.sql`, clean and build the project again
- Run the project again, login into h2 and delete the table called "schema_version": `drop table 'schema_version';`
- create `V2__create_shipwreck.sql` file and rerun the project again

```sql
/* according to com.boot.model.shipWrack.java */
CREATE TABLE SHIPWRECK(
	ID INT AUTO_INCREMENT,
    NAME VARCHAR(255),
    DESCRIPTION VARCHAR(2000),
    CONDITION VARCHAR(255),
    DEPTH INT,
    LATITUDE DOUBLE,
    LONGITUDE DOUBLE,
    YEAR_DISCOVERED INT
);
```

[back to top](#top)

### Spring Boot Java Configuration(JPA)

- add datasource.flyway in application.properties
- create a persistenceConfiguration, com.boot.config.PersistenceConfiguration.java
- create a repository interface, com.boot.repository.ShipWreckRepository.java
- add inject to model, com.boot.model.Shipwreck.java
- modify controller to use repository, com.boot.controller.ShipwreckController.java

```java
//application.properites
datasource.flyway.url=jdbc:h2:file:~/dasboot
datasource.flyway.username=sa
datasource.flyway.password=
datasource.flyway.driver-class-name=org.h2.Driver
//PersistenceConfiguration.java
package com.boot.config;
import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.flyway.FlywayDataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
@Configuration
public class PersistenceConfiguration {
	@Bean
	@ConfigurationProperties(prefix="spring.datasource")
	@Primary
	public DataSource dataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean
	@ConfigurationProperties(prefix="datasource.flyway")
	@FlywayDataSource
	public DataSource flywayDataSource() {
		return DataSourceBuilder.create().build();
	}
}
// ShipWreckRepository.java
package com.boot.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.boot.model.Shipwreck;
public interface ShipWreckRepository extends JpaRepository<Shipwreck, Long> {
}
// Shipwreck.java
package com.boot.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Shipwreck {
	@Id    //inject Id
	@GeneratedValue(strategy = GenerationType.AUTO)   //inject
	Long id;
	String name;
	String description;
	String condition;
	Integer depth;
	Double latitude;
	Double longitude;
	Integer yearDiscovered;
	public Shipwreck() { }
	public Shipwreck(Long id, String name, String description, String condition, Integer depth, Double latitude, Double longitude, Integer yearDiscovered) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.condition = condition;
		this.depth = depth;
		this.latitude = latitude;
		this.longitude = longitude;
		this.yearDiscovered = yearDiscovered;
	}
//...
}
//Shipwreckontroller
package com.boot.controller;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.boot.model.Shipwreck;
import com.boot.repository.ShipWreckRepository;
@RestController
@RequestMapping("api/v1/")
public class Shipwreckontroller {

	@Autowired   //add autowired
	private ShipWreckRepository shipwreckRepository;

	@RequestMapping(value="shipwrecks", method = RequestMethod.GET)
	public List<Shipwreck> list(){
		return shipwreckRepository.findAll();  //use shipwreckRepository instead of ShipwreckStub
	}

	@RequestMapping(value="shipwrecks", method = RequestMethod.POST)
	public Shipwreck create(@RequestBody Shipwreck shipwreck){
		return shipwreckRepository.saveAndFlush(shipwreck);
	}

	@RequestMapping(value="shipwrecks/{id}", method = RequestMethod.GET)
	public Shipwreck update(@PathVariable long id){
		return shipwreckRepository.findOne(id);
	}

	@RequestMapping(value="shipwrecks/{id}", method = RequestMethod.PUT)
	public Shipwreck create(@PathVariable long id, @RequestBody Shipwreck shipwreck){
		Shipwreck existingShipwreck = shipwreckRepository.findOne(id);
		BeanUtils.copyProperties(shipwreck, existingShipwreck);
		return shipwreckRepository.saveAndFlush(existingShipwreck);
	}

	@RequestMapping(value="shipwrecks/{id}", method = RequestMethod.DELETE)
	public Shipwreck delete(@PathVariable long id){
		Shipwreck existingShipwreck = shipwreckRepository.findOne(id);
		shipwreckRepository.delete(existingShipwreck);
		return existingShipwreck;
	}
}
```

[back to top](#top)

## Test the spring boot project

- spring-boot-starter-test
- JUnit      : all unit testing
- Hamcrest   : Matching and assertions
- Mockito    : Mock objects and verify
- Spring Test: Testing tools and integration testing support

### spring-boot-starter-test

```java
//pom.xml
<dependency>
   	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
// AppTest.java
package com.boot;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import com.boot.controller.HomeController;
public class AppTest {
	@Test
	public void testApp(){
		HomeController hc = new HomeController();
		String result = hc.home();
		assertEquals(result, "Das Boot, reporting for duty!");
	}
}
```

### Mockito and Hamcrest test

```java
//pom.xml
<dependency>
	<groupId>org.mockito</groupId>
	<artifactId>mockito-all</artifactId>
	<version>1.10.19</version>
	<scope>test</scope>
</dependency>
<dependency>
	<groupId>org.hamcrest</groupId>
	<artifactId>hamcrest-all</artifactId>
	<version>1.3</version>
	<scope>test</scope>
</dependency>
// ShipwreckControllerTest.java
package com.boot;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import com.boot.controller.Shipwreckontroller;
import com.boot.model.Shipwreck;
import com.boot.repository.ShipWreckRepository;

public class ShipwreckControllerTest {
	@InjectMocks
	private Shipwreckontroller sc;
	@Mock
	private ShipWreckRepository shipwreckRepository;
	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}
	@Test
	public void testShipwreckGet(){
		Shipwreck sw = new Shipwreck();
		sw.setId(1l);
		when(shipwreckRepository.findOne(1l)).thenReturn(sw);
		Shipwreck wreck = sc.get(1l);

		verify(shipwreckRepository).findOne(1l);
		assertEquals(1l, wreck.getId().longValue());
	}
}
//shipwreckControllerTest.java
package com.boot;
import static org.junit.Assert.assertEquals;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import com.boot.controller.ShipwreckController;
import com.boot.model.Shipwreck;
import com.boot.repository.ShipwreckRepository;
public class ShipwreckControllerTest {
	@InjectMocks
	private ShipwreckController sc;
	@Mock
	private ShipwreckRepository shipwreckRepository;
    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }
	@Test
	public void testShipwreckGet() {
    	Shipwreck sw = new Shipwreck();
    	sw.setId(1l);
		when(shipwreckRepository.findOne(1l)).thenReturn(sw);
		Shipwreck wreck = sc.get(1L);
		verify(shipwreckRepository).findOne(1l);
//		assertEquals(1l, wreck.getId().longValue());
		assertThat(wreck.getId(), is(1l));
	}
}
```

### Intergration Testing - ShipwreckRepositoryIntergartion.ava

```
Traditional Spring Apps                |  Spring boot Apps
---------------------------------------|---------------------------------------
Containers are difficult to test       | No container, easier to start app
Spring context needs to be available   | Spring context auto configuration
App/Test startup can be slow           | App/Test startup can be slow
Database state needs to be consistent  | Database state needs to be consistent
```

### Web Intergration Testing

[back to top](#top)

> references
- https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples
- https://github.com/dlbunker/ps-spring-boot-resources


Eclipse Theme

- Eclipse Marketplace --> 搜索DevStyle
- Window --> Preference --> General --> Appearance --> Color Theme
- http://eclipse-color-theme.github.io/update/


```
│   package.json
├───node_modules
│       └╌╌ 下面是npm包
├───dist
│     └╌╌╌╌╌logo.jpg
├───build
│   ├╌╌╌╌╌ build.js
│   ├╌╌╌╌╌ webpack.base.conf.js
│   ├╌╌╌╌╌ webpack.dev.conf.js
│   └╌╌╌╌╌ webpack.prod.conf.js
├───src
│   ├╌╌╌╌╌ main.js
│   └╌╌╌╌╌tmp
│         ├╌╌╌╌╌home.js
│         ├╌╌╌╌╌about.js
│         └╌╌╌╌╌contact.js
│   └╌╌╌╌╌template
│         └╌╌╌╌╌daqi.html // 为hmtl插件的模板
│   └╌╌╌╌╌images
│         └╌╌╌╌╌logo.jpg
```