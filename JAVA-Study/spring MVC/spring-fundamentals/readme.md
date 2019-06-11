[Spring The Big Picture- Dustin Schultz](#top)
[Spring Fundamentals- Bryan Hansen](#top)

- [The Spring Framework fundation](#the-spring-framework-fundation)
	- [Other Spring Project](#other-spring-project)
- [Architecture and project setup](#architecture-and-project-setup)
- [Annotation Configuration Using XML](#annotation-configuration-using-xml)
- [Spring Annotation Configuration using XML](#spring-annotation-configuration-using-xml)
	- [Setter Injection](#setter-injection)
	- [Constructor Injection](#constructor-injection)
	- [JSR-330](#jsr-330)
- [Spring Configuration using JAVA](#spring-configuration-using-java)
	- [constructor/setter Injection](#constructorsetter-injection)
	- [Autowired](#autowired)
- [Bean Scopes](#bean-scopes)
	- [Valid in any configuration](#valid-in-any-configuration)
	- [Valid only in web-aware Spring projects(Web scopes)](#valid-only-in-web-aware-spring-projectsweb-scopes)
- [Properties](#properties)
	- [using variable](#using-variable)
	- [using annotation](#using-annotation)

## The Spring Framework fundation

![](https://i.imgur.com/tYMlWlk.png)

![](https://i.imgur.com/oaq1GNE.png)

- Spring core:
  - provides a number of differentfeatures
    - i18n internationalization support
    - validation support
    - data binding support
    - type conversion support
  - At the center of Spring Core is Dependency Injection
  - fulfilling dependency: Object
- Spring web
  - Spring web MVC(Introduction to Spring MVC 4)
  - Spring Web Webflux: Reactive Programming(Spring WebFlux: Getting Started)
- Spring AOP(Aspect-oriented Programming)- (Aspect Oriented Programming using Spring AOP and AspectJ)
  - implement features in Spring
  - a valuble tool to handle cross-cutting concerns(span multiple ties of layers of an application)
  ```java
  @PreAuthorize("hasRole('admin')")
  public void sensitiveOperation() {
    // do sensitive operation
  }
  ```
- Spring Data Access:
  - using Database transactions with the Spring Framework’s Data Access module
    - `int cnt = new JdbcTemplate(ds).queryForInt("SELECT COUNT(*) FROM foo");`
  - Exception Translation: Vendor-specific(difference database error) exceptions are mapped into a well-known set of exceptionsdifference database
  - Testing data is easier
- Spring Integration
  - work with web service
  - ![](https://i.imgur.com/3AY2j2N.png)
  - RestTemplate
    - `restTemplate.getForObject("http://foo.com/account/123", Account.class);`
- Spring Testing

[back to top](#top)

### Other Spring Project

- Spring Data: https://spring.io/projects/spring-data (Getting started with Spring data JPA, Getting started with Spring data REST)
- Spring Cloud: https://spring.io/projects/spring-cloud (Spring Cloud Fundamentals)
- Spring Security: https://projects.spring.io/spring-security/ (Spring Security Fundamentals)

[back to top](#top)

## Architecture and project setup

```
├── java
│    └── com.pluralsight/
│        ├── Model/
│        │   └── Customer.java
│        ├── repository/
│        │   ├── CustomerRepository.java                 -- interface
│        │   └── HibernateCustomerRepositoryImpl.java    --
│        └── service/
│            ├── CustomerService.java         -- interface
│            └── CustomerServiceImpl.java     --
├── resources/
│    └── applicationContext.xml
```

- Tips:
  - create **Impl.java
  - right click -> Refactor -> Extract Interface
- [spring.io](https://spring.io/)

```xml
<build>
	  <plugins>
	  	<plugin>
		  	<groupId>org.apache.maven.plugins</groupId>
		  	<artifactId>maven-compiler-plugin</artifactId>
		  	<version>3.2</version>
		  	<configuration>
		  		<source>1.8</source>
		  		<target>1.8</target>
		  	</configuration>
	  	</plugin>
	  </plugins>
  </build>
```

[back to top](#top)

## Annotation Configuration Using XML

1. add dependencies in pom.xml

```xml
  <dependencies>
  	<dependency>
  		<groupId>org.springframework</groupId>
  		<artifactId>spring-context</artifactId>
  		<version>4.3.2.RELEASE</version>
  	</dependency>
  </dependencies>
```

1. create applicationContext.xml to declare bean configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
	<bean name="customerRepository"
		  class="com.pluralsight.repository.HibernateCustomerRepositoryImpl" />
	<bean name="customerService"
		  class="com.pluralsight.service.CustomerServiceImpl">
		  <property name="customerRepository" ref="customerRepository" />
	</bean>
</beans>
```

![](https://i.imgur.com/cFO33ul.png)

3. Setter injection

```java
// add setter in CustomerServiceImpl.java
public class CustomerServiceImpl implements CustomerService {
	//private CustomerRepository customerRepository = new HibernateCustomerRepositoryImpl();
	private CustomerRepository customerRepository;
	@Override
	public List<Customer> findAll(){
		return customerRepository.findAll();
	}
  //setter
	public void setCustomerRepository(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
}
//modify Application.java
public static void main(String[] args) {
		//CustomerService service = new CustomerServiceImpl();
		ApplicationContext appContext = new ClassPathXmlApplicationContext("applicationContext.xml");
		CustomerService service = appContext.getBean("customerService", CustomerService.class);
		System.out.println(service.findAll().get(0).getFirstname());
	}
```

4. constructor injection

   - change applicationContext.xml to use constructor-arg

   ```xml
   <bean name="customerService"
   		  class="com.pluralsight.service.CustomerServiceImpl">
   	<constructor-arg index="0" ref="customerRepository" />
   </bean>
   ```

   - add constructor in CustomerServiceImpl.java

   ```java
   public CustomerServiceImpl(){
   }
   public CustomerServiceImpl(CustomerRepository customerRepository){
   	this.customerRepository = customerRepository;
   }
   ```

5. Spring Automatically Wires Beans

spring automatically wires beans

- byType
- byName
- constructor
- no

```xml
<!-- autowire by constructor -->
<bean name="customerService"
		  class="com.pluralsight.service.CustomerServiceImpl" autowire="constructor">
</bean>
<!-- autowire by Name and by Type -->
<bean name="customerService"
		  class="com.pluralsight.service.CustomerServiceImpl" autowire="byName">   <!-- autowire="byType" -->
</bean>
```

[back to top](#top)

## Spring Annotation Configuration using XML

```xml
<!-- applicationContext.xml -->
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xs
	<context:annotation-config />
	<context:component-scan base-package="com.pluralsight" />
</beans>
```

```java
//CustomerServiceImpl.java
@Service("customerService")
public class CustomerServiceImpl implements CustomerService {
	//private CustomerRepository customerRepository = new HibernateCustomerRepositoryImpl();
	@Autowired
	private CustomerRepository customerRepository;
	@Override
	public List<Customer> findAll(){
		return customerRepository.findAll();
	}
}
// HibernateCustomerRepositoryImpl.java
@Repository("customerRepository")
public class HibernateCustomerRepositoryImpl implements CustomerRepository {
	@Override
	public List<Customer> findAll(){
		List<Customer> customers = new ArrayList<>();
		Customer customer = new Customer();
		customer.setFirstname("Bryan");
		customer.setLastname("Hansen");
		customers.add(customer);
		return customers;
	}
}
// application.java
public class Application {
	public static void main(String[] args) {
		//CustomerService service = new CustomerServiceImpl();
		ApplicationContext appContext = new ClassPathXmlApplicationContext("applicationContext.xml");
		CustomerService service = appContext.getBean("customerService", CustomerService.class);
		System.out.println(service.findAll().get(0).getFirstname());
	}
}
```

[back to top](#top)

### Setter Injection

```java
//CustomerServiceImpl.java
@Service("customerService")
public class CustomerServiceImpl implements CustomerService {
	//private CustomerRepository customerRepository = new HibernateCustomerRepositoryImpl();
	@Autowired
	private CustomerRepository customerRepository;
  @Autowired
	public void setCustomerRepository(CustomerRepository customerRepository) {
		System.out.println("We are using setter injection.");
		this.customerRepository = customerRepository;
	}
	@Override
	public List<Customer> findAll(){
		return customerRepository.findAll();
	}
}
```

[back to top](#top)

### Constructor Injection

```java
//CustomerServiceImpl.java
@Service("customerService")
public class CustomerServiceImpl implements CustomerService {
	//private CustomerRepository customerRepository = new HibernateCustomerRepositoryImpl();
	//@Autowired
	private CustomerRepository customerRepository;
  @Autowired
	public CustomerServiceImpl(CustomerRepository customerRepositoy){
		System.out.println("We are using constructor injection.");
		this.customerRepository = customerRepositoy;
	}
	@Override
	public List<Customer> findAll(){
		return customerRepository.findAll();
	}
}
```

### JSR-330

- dependency injection for JAVA

[back to top](#top)

## Spring Configuration using JAVA

- no applicationContext.xml
- AppConfig.java

```java
//AppConfig.java
@Configuration
public class AppConfig {
	@Bean(name="customerService")
	public CustomerService getCustomerService(){
		CustomerServiceImpl customerService = new CustomerServiceImpl();
		customerService.setCustomerRepository(getCustomerRepository());
		return customerService;
	}
	@Bean(name="customerRepository")
	public CustomerRepository getCustomerRepository(){
		return new HibernateCustomerRepositoryImpl();
	}
}
//CustomerServiceImpl.java
public class CustomerServiceImpl implements CustomerService {
	private CustomerRepository customerRepository;
	@Override
	public List<Customer> findAll(){
		return customerRepository.findAll();
	}
	public void setCustomerRepository(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
}
// application.java
public class Application {
	public static void main(String[] args) {
		ApplicationContext appContext = new AnnotationConfigApplicationContext(AppConfig.class);
		CustomerService service = appContext.getBean("customerService", CustomerService.class);
		System.out.println(service.findAll().get(0).getFirstname());
	}
}
```

[back to top](#top)

### constructor/setter Injection

```java
//AppConfig.java
@Configuration
public class AppConfig {
	@Bean(name="customerService")
	public CustomerService getCustomerService(){
		//constructor Injection
		//CustomerServiceImpl customerService = new CustomerServiceImpl(getCustomerRepository());
		//setter Injection
		CustomerServiceImpl customerService = new CustomerServiceImpl();
		customerService.setCustomerRepository(getCustomerRepository());
		return customerService;
	}
	@Bean(name="customerRepository")
	public CustomerRepository getCustomerRepository(){
		return new HibernateCustomerRepositoryImpl();
	}
}
//CustomerServiceImpl.java
public class CustomerServiceImpl implements CustomerService {
	private CustomerRepository customerRepository;
  public CustomerServiceImpl(){}
  //Constructor Injection
	public CustomerServiceImpl(CustomerRepository customerRepository){
		System.out.println("We are using constructor injection");
		this.customerRepository = customerRepository;
	}
	@Override
	public List<Customer> findAll(){
		return customerRepository.findAll();
	}
	public void setCustomerRepository(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
}
```

[back to top](#top)

### Autowired

```java
//AppConfig.java- remove all @bean
@Configuration
public class AppConfig {
}
//CustomerServiceImpl.java - add @Service and @Autowired
@Service("customerService")
public class CustomerServiceImpl implements CustomerService {
	//@Autowired
	private CustomerRepository customerRepository;
	public CustomerServiceImpl(){}
	//Constructor Injection
	public CustomerServiceImpl(CustomerRepository customerRepository){
		System.out.println("We are using constructor injection");
		this.customerRepository = customerRepository;
	}
	@Override
	public List<Customer> findAll(){
		return customerRepository.findAll();
	}
	@Autowired
	public void setCustomerRepository(CustomerRepository customerRepository) {
		System.out.println("We are using setter injection");
		this.customerRepository = customerRepository;
	}
}
```

[back to top](#top)

## Bean Scopes

### Valid in any configuration

- Singleton
  - One Instantiation
  - Default Bean Scope
  - Single instance per Spring container
  - ![](https://i.imgur.com/OvkDC5c.png)
- Prototype
  - Per request
  - Guaranteed unique
  - Opposite of Singleton

### Valid only in web-aware Spring projects(Web scopes)
  - Request
  - Session
  - GlobalSession

[back to top](#top)

## Properties

XML Config | JAVA Config
---|---
![](https://i.imgur.com/4P8Qs8l.png)|![](https://i.imgur.com/mQSGN2w.png)

**create a new file in resources-app.properties: `dbUserName=mysqlusername`**

### using variable

```xml
<!-- applicationContext.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
	<context:property-placeholder location="app.properties" />
	<bean name="customerRepository" class="com.pluralsight.repository.HibernateCustomerRepositoryImpl">
		<property name="dbUserName" value="${dbUserName}" />
	</bean>
	<bean name="customerService"
		  class="com.pluralsight.service.CustomerServiceImpl"
		  autowire="byType"
		  scope="prototype" />
</beans>
```

```java
public class HibernateCustomerRepositoryImpl implements CustomerRepository {
	private String dbUserName;   //property
	public void setDbUserName(String dbUserName) { // add a set
		this.dbUserName = dbUserName;
	}
	@Override
	public List<Customer> findAll(){
		System.out.println(dbUserName);  //show property
		List<Customer> customers = new ArrayList<>();
		Customer customer = new Customer();
		customer.setFirstname("Bryan");
		customer.setLastname("Hansen");
		customers.add(customer);
		return customers;
	}
}
```

### using annotation

```xml
<!-- applicationContext.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
	<context:annotation-config />
	<context:property-placeholder location="app.properties" />
	<bean name="customerRepository" class="com.pluralsight.repository.HibernateCustomerRepositoryImpl" />
	<bean name="customerService"
		  class="com.pluralsight.service.CustomerServiceImpl"
		  autowire="byType"
		  scope="prototype" />
</beans>
```

```java
public class HibernateCustomerRepositoryImpl implements CustomerRepository {
	@Value("${dbUserName}")
	private String dbUserName;   //property
	@Override
	public List<Customer> findAll(){
		System.out.println(dbUserName);  //show property
		List<Customer> customers = new ArrayList<>();
		Customer customer = new Customer();
		customer.setFirstname("Bryan");
		customer.setLastname("Hansen");
		customers.add(customer);
		return customers;
	}
}
```

Spring MVC 4
Spring Data JPA with Hibernate
Spring security
Design Patterns in JAVA