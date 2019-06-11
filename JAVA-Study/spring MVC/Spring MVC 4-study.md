[Spring MVC 4 Architecture](#top)

- [Concepts](#concepts)
- [Spring MVC 4 Controllers](#spring-mvc-4-controllers)
- [Spring MVC 4 Views](#spring-mvc-4-views)
  - [jsp view](#jsp-view)
  - [Static Resources - work with `WebMvcConfigurerAdapter`](#static-resources---work-with-webmvcconfigureradapter)
- [I18N](#i18n)
- [Spring MVC 4 Validation- based on JSP](#spring-mvc-4-validation--based-on-jsp)
  - [build-in Validation](#build-in-validation)
  - [Custom Validation](#custom-validation)
- [Spring MVC 4 REST and Ajax](#spring-mvc-4-rest-and-ajax)
  - [ContentNegotiatingViewResolver](#contentnegotiatingviewresolver)
  - [@RestController](#restcontroller)

## Concepts

- Controllers
  - XML configuration is reduced
  - New @RestController annotation
  - @EnableWebMvc
- Service
  - Java configuration doesn't require an appContext.xml or even a servlet-config.xml
  - annotations for various configuration elements
    - component-scan
    - interceptors
    - handlers
    - formatters
    - converters
  - convenience annotations similar to namespaces
- Reopsitory
  - doesn't require an appContext.xml or even a servlet-config.xml
  - different types of repositories if using spring data JPA
  - convention over configuration

## Spring MVC 4 Controllers

- Responsibilities
  - interpret user input and transform that input to a model
  - provide access to business logic
  - determines view based off of logic
  - interprets exceptions from the business logic/service tier
- controller annotations
  - `@Controller`, spring MVC 4
  - `@RestController`, new to Spring MVC 4
  - `@Configuration`, signifies a configuration class
  - `@EnableWebMvc`, enables our java configuration (WebMvcConfigurationSupport)
    - only used for java configuration of Spring MVC web apps
    - customizable by extending `WebMvcConfigurerAdapter`
  - `@ComponentScan`, override the default scan location for controllers
    - component scan in XML, `<context:component-scan base-package="com.pluralsight" />`
    - component scan in Java Config, `@ComponentScan(basePackage="com.pluralsight")`
- Using web.xml
- Without web.xml
  - WebApplicationInitializer
  - Builds ApplicationContext

```java
@Controller
public class HelloController {
	@RequestMapping(value="/greeting")
	public String sayHello(Model model){
		//...
	}
}
```

## Spring MVC 4 Views

### jsp view

![](https://i.imgur.com/9I401sc.png)

```java
//WebAppInitializer.java
public class WebAppInitializer implements WebApplicationInitializer {
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		WebApplicationContext context = getContext();
		servletContext.addListener(new ContextLoaderListener(context));
		ServletRegistration.Dynamic dispatcher = servletContext.addServlet("DispatcherServlet", new DispatcherServlet(context));
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping("*.html");
	}
	private AnnotationConfigWebApplicationContext getContext() {
		AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
		context.setConfigLocation("com.pluralsight.WebConfig");
		return context;
	}
}
//WebConfig.java
@Configuration
@EnableWebMvc
@ComponentScan(basePackages="com.pluralsight")
public class WebConfig{
	@Bean
	public InternalResourceViewResolver getInternalResourceViewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setPrefix("/WEB-INF/jsp/");
		resolver.setSuffix(".jsp");
		return resolver;
	}
}
```

### Static Resources - work with `WebMvcConfigurerAdapter`

```java
//WebAppInitializer.java
public class WebAppInitializer implements WebApplicationInitializer {
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		WebApplicationContext context = getContext();
		servletContext.addListener(new ContextLoaderListener(context));
		ServletRegistration.Dynamic dispatcher = servletContext.addServlet("DispatcherServlet", new DispatcherServlet(context));
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping("*.html");
		dispatcher.addMapping("*.pdf");      //static resources
	}
	private AnnotationConfigWebApplicationContext getContext() {
		AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
		context.setConfigLocation("com.pluralsight.WebConfig");
		return context;
	}
}
//WebConfig.java
@Configuration
@EnableWebMvc
@ComponentScan(basePackages="com.pluralsight")
public class WebConfig{
	@Bean
	public InternalResourceViewResolver getInternalResourceViewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setPrefix("/WEB-INF/jsp/");
		resolver.setSuffix(".jsp");
    resolver.setSuffix(".pdf");     //static resources
		return resolver;
	}
  //static resources
  @Override
	public void addResourceHandlers(ResourceHandlerRegistry registory){
		registory.addResourceHandler("/pdfs/**").addResourceLocations("/WEB-INF/pdf/");
	}
}
```

## I18N

1. add bean to WebConfig.java
  1. getResourceBundle Bean
  2. getSessionLocalResolver Bean
  3. addInterceptor Override

```java
//WebConfig.java
@Configuration
@EnableWebMvc
@ComponentScan(basePackages="com.pluralsight")
public class WebConfig extends WebMvcConfigurerAdapter{
	@Bean
	public MessageSource messageSource(){
		ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
		messageSource.setBasename("messages");
		return messageSource;
	}
	@Bean
	public LocaleResolver localeResolver(){
		SessionLocaleResolver resolver = new SessionLocaleResolver();
		resolver.setDefaultLocale(Locale.ENGLISH);
		return resolver;
	}
	@Override
	public void addInterceptors(InterceptorRegistry registry){
		LocaleChangeInterceptor changeInterceptor = new LocaleChangeInterceptor();
		changeInterceptor.setParamName("language");
		registry.addInterceptor(changeInterceptor);
	}
	//...
}
```

2. generate ResourceBundle: messages.properties
   1. main.resources.messages_en.properties
   2. main.resources.messages_es.properties

```
attendee.name=Enter Name
attendee.email.address=Enter Email Address
```

3. add tag and a href to jsp(attendee.jsp)
   1. Spring messages tag
   2. a href for changing languages

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<body>
<a href="?language=en">English</a>
<a href="?language=es">Spanish</a>
<form:form commandName="attendee">
	<form:errors path="*" cssClass="errorblock" element="div" />
	<label for="textinput1"><spring:message code="attendee.name" /> :</label>
	<form:input path="name"  cssErrorClass="error" />
	<form:errors path="name" cssClass="error" />
	<br>
	<label for="textinput2"><spring:message code="attendee.email.address" />: </label>
	<form:input path="emailAddress"  cssErrorClass="error" />
	<form:errors path="emailAddress" cssClass="error" />
	<br>
	<input type="submit" class="btn" value="Enter Attendee" />
</form:form>
</body>
```

[back to top](#top)

## Spring MVC 4 Validation- based on JSP

### build-in Validation

**JSR 303 - Bean Validation中内置的constraint**

Constraint|详细信息
---|---
@Null|被注释的元素必须为 null
@NotNull|被注释的元素必须不为 null
@AssertTrue|被注释的元素必须为 true
@AssertFalse|被注释的元素必须为 false
@Min(value)|被注释的元素必须是一个数字，其值必须大于等于指定的最小值
@Max(value)|被注释的元素必须是一个数字，其值必须小于等于指定的最大值
@DecimalMin(value)|被注释的元素必须是一个数字，其值必须大于等于指定的最小值
@DecimalMax(value)|被注释的元素必须是一个数字，其值必须小于等于指定的最大值
@Size(max, min|被注释的元素的大小必须在指定的范围内
@Digits (integer, fraction)|被注释的元素必须是一个数字，其值必须在可接受的范围内
@Past|被注释的元素必须是一个过去的日期
@Future|被注释的元素必须是一个将来的日期
@Pattern(value)|被注释的元素必须符合指定的正则表达式

**Hibernate Validator附加的constraint**

Constraint|详细信息
---|---
@Email|被注释的元素必须是电子邮箱地址
@Length|被注释的字符串的大小必须在指定的范围内
@NotEmpty|被注释的字符串的必须非空
@Range|被注释的元素必须在合适的范围内

```java
// Attendee.java
public class Attendee {
	@Size(min=2,max=30)
	private String name;
	@NotEmpty @Email
	private String emailAddress;
  //...
}
```

[back to top](#top)

### Custom Validation

```java
//Phone.java
package com.pluralsight.view;
//...
@Documented
@Constraint(validatedBy=PhoneConstraintValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Phone {
	String message() default "{Phone}";
	Class<?>[] groups() default {};
	Class<? extends Payload>[] payload() default{};
}
//PhoneConstraintValidator.java
package com.pluralsight.view;
public class PhoneConstraintValidator implements ConstraintValidator<Phone, String> {
	@Override
	public void initialize(Phone phone){
	}
	@Override
	public boolean isValid(String phoneField, ConstraintValidatorContext cxt){
		if(phoneField == null){
			return false;
		}
		return phoneField.matches("[0-9()-]*");
	}
}
// main.java.resources.messages_en.properties
Size.attendee.name=Name must be between {2} and {1} characters

Email=Not a valid email address

NotEmpty=Field cannot be left

Phone=Not a valid phone number

attendee.name=Enter Name
attendee.email.address=Enter Email Address
attendee.phone=Enter Phone
```

[back to top](#top)

## Spring MVC 4 REST and Ajax

### ContentNegotiatingViewResolver

![](https://i.imgur.com/e3iyCBD.png)

[back to top](#top)

![](https://i.imgur.com/UpYQNiA.png)

### @RestController

```java
@RestController
public class EventsReportController {
	@RequestMapping("/events")
	public List<Event> getEvents(){
		List<Event> events = new ArrayList<>();
		Event event1 = new Event();
		event1.setName("Java User Group");
		events.add(event1);
		Event event2 = new Event();
		event2.setName("Angular User Group");
		events.add(event2);
		return events;
	}
}
```

[back to top](#top)
