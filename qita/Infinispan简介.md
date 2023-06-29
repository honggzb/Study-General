## [Infinispan](#top)

- [Infinispan vs Redis](#infinispan-vs-redis)
- [Local Server set-up](#local-server-set-up)
  - [Windows](#windows)
  - [Linux](#linux)
- [Infinispan Monitoring Console](#infinispan-monitoring-console)
- [Infinispan Config XML Attributes](#infinispan-config-xml-attributes)
- [Remote Cache Client](#remote-cache-client)
  - [Infinispan Hot Rod Client Dependencies](#infinispan-hot-rod-client-dependencies)
  - [Infinispan Remote Client Setup - HotRod client to connect Infinispan](#infinispan-remote-client-setup---hotrod-client-to-connect-infinispan)

---------------------------------------------------

- Infinispan是开源的分布式内存数据网格(**In-Memory Data Grid**)
- infinispan是分布式的缓存框架，可以直接嵌入到jboss(WildFly)中运行，也可以独立部署
- It can be used both as an embedded Java library and as a language-independent service accessed remotely over a variety of protocols (Hot Rod, REST, Memcached and WebSockets)
- It offers advanced functionality such as transactions, events, querying and distributed processing as well as numerous integrations with frameworks such as the JCache API standard, CDI, Hibernate, WildFly, Spring Cache, Spring Session, Lucene, Spark and Hadoop
- ![Alt text](image-4.png)

### Infinispan vs Redis

```
            |            Redis                            |                 Infinispan
------------|---------------------------------------------|-----------------------------------------------------------------------
            |  1 thread I/O                               |   Multi-threaded, non-blocking architecture
            |  throughput is limited                      |
            |  To increase load u need to create replicas |   To increase load u need add cores and/or nodes
Scalability |    . master/slaves configuration            |     . peer-to-peer masterless with automatic discovery
            |    . asynchronous                           |     . both synchronous and asychronous
            |    . writes only go to master               |     . automatic rebalancing of data
------------|---------------------------------------------|------------------------------------------------------------------------
            |  Use sorted sets as index                   |   use ProtoBuf schema to determine value fields, types
Queries     |                                             |    indexed and non-indexed execution
            |                                             |   full-text engine courtesy of Lucene(fuzzy, term, range, regexp, etc)
------------|---------------------------------------------|-------------------------------------------------------------------------
Transaction | multi-exec operations                       |   real transactional caches

```

[back to top](#top)

### Local Server set-up

#### Windows

1. Navigate to the `<Home>\infinispan-server-10.1.8.Final\infinispan-server-10.1.8.Final\bin`
2. Run `server.bat -c infinispan-local.xml` to start the Infinispan server locally
3. Address and port can be defined `<Home>\infinispan-server-10.1.8.Final\infinispan-server-10.1.8.Final\server\conf\infinispan-local.xml`

#### Linux

1. Navigate to the downloaded path.
2. Run `sh server.sh -c infinispan-local.xml` to start the Infinispan server on Linux VM

### Infinispan Monitoring Console

- openning `http://127.0.0.1:11222/console/` on any browser.
- Once the caches are configured, it can be viewed here
- ![Alt text](image-5.png)

[back to top](#top)

### Infinispan Config XML Attributes

- [Infinispan Config Doc](https://docs.jboss.org/infinispan/10.1/configdocs/infinispan-config-10.1.html)

```
Sl. No.|       Tag	         | Attribute |DataType|Default|Description
-------|---------------------|-----------|--------|-------|-----------------------------------------------------------------------------------------------------------------------
       | cache-container →   | max-idle  |  long  |  -1   | Maximum idle time a cache entry will be maintained in the cache, in milliseconds. 
       | distributed-cache → |           |        |       | If the idle time is exceeded, the entry will be expired cluster-wide. -1 means the entries never expire
       | expiration          |-----------|--------|-------|----------------------------------------------------------------------------------------------------------------------  
  1    |                     | lifespan  |  long  |  -1   | Maximum lifespan of a cache entry, after which the entry is expired cluster-wide, in milliseconds.    
       |                     |           |        |       | -1 means the entries never expire. 
       |                     |-----------|--------|-------|---------------------------------------------------------------------------------------------------------------------- 
       |                     | interval  |  long  | 60000 |Interval (in milliseconds) between subsequent runs to purge expired entries from memory and any cache stores.   
       |                     |           |        |       |If you wish to disable the periodic eviction process altogether, set interval to -1.
-------|---------------------|-----------|--------|-------|---------------------------------------------------------------------------------------------------------------------- 
       | cache-container →   | strategy  | string |       | Possible values 
       | distributed-cache → |           |        |       |  strategy  |   description  
       | memory              |           |        |       | -----------|---------------------------------------------------------------------------------------------------------
       |                     |           |        |       |  NONE      | Eviction is not enabled and it is assumed that the user will not invoke evict directly on the cache.
       |                     |           |        |       |            | If passivation is enabled this will cause aa warning message to be emitted. This is the default strategy
 2     |                     |           |        |       | -----------|---------------------------------------------------------------------------------------------------------
       |                     |           |        |       |  MANUAL    | This strategy is just like <b>NONE</b> except that it assumes the user will be invoking evict directly
       |                     |           |        |       |            | This way if passivation is enabled no warning message is logged.
       |                     |           |        |       | -----------|---------------------------------------------------------------------------------------------------------
       |                     |           |        |       |  REMOVE    | This strategy will actually evict "old" entries to make room for incoming ones.
       |                     |           |        |       | -----------|---------------------------------------------------------------------------------------------------------
       |                     |           |        |       |  EXCEPTION | This strategy actually prevents new entries from being created by throwing a ContainerFullException. 
       |                     |           |        |       |            | This strategy only works with transactional caches that always run with 2 phase commit, 
       |                     |           |        |       |            | that is no 1 phase commit or synchronization optimizations allowed.
       |                     |-----------|--------|-------| ---------------------------------------------------------------------------------------------------------------------
       |                     |  size     | long   | -1    | Defines the size of the data container as a long. Eviction occurs when the number of entries exceeds the size
-------|---------------------|-----------|--------|-------|---------------------------------------------------------------------------------------------------------------------- 
       | cache-container →   | gauges    |boolean | true  | exports gauge metrics. Gauges are enabled by default but you must enable statistics so that they are exported.
       | metrics             |-----------|--------|-------| ---------------------------------------------------------------------------------------------------------------------
  3    |                     | histograms|boolean | false | Exports histogram metrics. Histograms are not enabled by default because they require additional computation.
       |                     |-----------|--------|-------| ---------------------------------------------------------------------------------------------------------------------
       |                     | prefix    |string  |       | Specifies a global name prefix for metrics.
       |                     |-----------|--------|-------| ---------------------------------------------------------------------------------------------------------------------
       |                     |namesAsTags|boolean | false | Put the cache manager and cache name in tags rather then include them in the metric name.
-------|---------------------|-----------|--------|-------|---------------------------------------------------------------------------------------------------------------------- 
```

[back to top](#top)

### Remote Cache Client

- Infinispan Hot Rod Clients
- Client applications communicate with the Infinispan server using the Hot Rod Java client API.

> Hot Rod is a binary TCP protocol that Infinispan offers high-performance client-server interactions.
> Hot Rod Java clients can use Java 8 or Java 11.

#### Infinispan Hot Rod Client Dependencies

- Add the infinispan-client-hotrod artifact as a dependency in the pom.xml:

```xml
<dependency>
    <groupId>org.infinispan</groupId>
    <artifactId>infinispan-client-hotrod</artifactId>
    <version>${version.infinispan}</version>
</dependency>
```

#### Infinispan Remote Client Setup - HotRod client to connect Infinispan

- using Declarative Configuration
  - in application.xml will help to setup the RemoteCacheManager which will enable to read/write from the cache server based on role definition
- using Programmatic Configuration
  - The RemoteCacheManager class instantiates connections to Hot Rod server(s)
  - Use the ConfigurationBuilder class to generate immutable configuration objects that you can pass to RemoteCacheManager

```xml
1. Declarative Configuration in Advisor-Web
<beans
  xmlns:infinispan="http://www.infinispan.org/schemas/spring"
  xsi:schemaLocation="http://www.infinispan.org/schemas/spring http://www.infinispan.org/schemas/infinispan-spring.xsd">
<infinispan:remote-cache-manager configuration="classpath:config/hotrod-client.properties"/>
<cache:annotation-driven />
```


[back to top](#top)

> references
- [infinispan~介绍](https://www.cnblogs.com/lori/archive/2021/11/25/15603926.html)
