[Apache ActiveMQ](#top)

- [概述](#%E6%A6%82%E8%BF%B0)
- [ActiveMQ](#activemq)

## 概述

**消息队列**

消息队列中间件是分布式系统中重要的组件，主要解决应用耦合，异步消息，流量削锋等问题。实现高性能，高可用，可伸缩和最终一致性架构。是大型分布式系统不可缺少的中间件。

目前在生产环境，使用较多的消息队列有ActiveMQ，RabbitMQ，ZeroMQ，Kafka，MetaMQ，RocketMQ等

Apache ActiveMQ是目前最流行功能最强大的开源消息和 集成模式 服务。 Apache ActiveMQ不仅速度快而且支持众多的 跨语言平台和协议 ，同时拥有非常易用的 企业集成模式 以及支持JMS1.1 和J2EE1.4等众多 高级特性 。Apache ActiveMQ基于Apache 2.0许可发行

**特点和优势**

1. activemq可以很好的运行在任何JVM上，而不只是集成到JBoss的应用服务器中；
2. activemq支持大量的跨语言客户端；
3. activemq支持许多不同的协议，如Ajax，REST，Stomp，OpenWire，XMPP
4. activemq支持许多高级功能，例如MessageGroups，ExclusiveConsumer，CompositeDestinations
5. AdvisoryMessage
6. activemq支持可靠连接并且具有可配置的自动重连接
7. activemq对Spring有很好的支持
8. activemq支持跨网络的分布式目的地
9. activemq是速度非常快；一般要比jbossmq快10倍

**术语名词**

名词|英文全称|缩写|解释
---|---|---|---
生产者|MessageProvider|Provider|产生或发送消息的系统
消费者|MessageConsumer|Consumer|处理或接收消息的系统
点对点|Point to Point|P2P|点对点消息模型
发布/订阅|Publish/Subscribe|Pub/Sub|发布/订阅消息模型
连接工厂|ConnectionFactory|——|创建消息连接的工厂类
连接|Connection|——|用于接发消息的连接
会话|Session|——|由Connection创建，一个接发消息的会话
消息目的地|Destination|——|由Session创建，消息发送的目的地
队列|Queue|——|用于点对点消息模型
主题|Topic|——|用于发布/订阅模型

## ActiveMQ

**ActiveMQ的两种消息模式**

1. 一种是点对点的，即一个生产者和一个消费者一一对应
2. 另一种是发布/订阅模式，即一个生产者产生消息并进行发送后，可以由多个消费者进行接收

模式|说明
---|---
点对点模式| 点对点的模式主要建立在一个队列上面，当连接一个列队的时候，发送端不需要知道接收端是否正在接收，<br>可以直接向ActiveMQ发送消息，发送的消息，将会先进入队列中，如果有接收端在监听，则会发向接收端，如果没有接收端接收，<br>则会保存在activemq服务器，直到接收端接收消息，<br>点对点的消息模式可以有多个发送端，多个接收端，但是一条消息，只会被一个接收端给接收到，<br>哪个接收端先连上ActiveMQ，则会先接收到，而后来的接收端则接收不到那条消息
发布订阅模式|订阅/发布模式同样可以有着多个发送端与多个接收端，但是接收端与发送端存在时间上的依赖，<br>就是如果发送端发送消息的时候，接收端并没有监听消息，<br>那么ActiveMQ将不会保存消息，将会认为消息已经发送，换一种说法，<br>就是发送端发送消息的时候，接收端不在线，是接收不到消息的，哪怕以后监听消息，同样也是接收不到的。<br>这个模式还有一个特点，那就是，发送端发送的消息，<br>将会被所有的接收端给接收到，不类似点对点，一条消息只会被一个接收端给接收到

- [activeMQ的使用方法](https://blog.csdn.net/joy1211/article/details/79776733)
- [消息队列的使用场景](https://blog.csdn.net/he90227/article/details/50800646)
- [Apache ActiveMQ实战](https://blog.csdn.net/lifetragedy/article/details/51836557)
- [ActiveMQ安装使用与spring整合配置教程](https://blog.csdn.net/qq_22075041/article/details/77602996)


