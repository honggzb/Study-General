[Redis安装、配置和使用](#top)

- [Redis的安装](#Redis的安装)
  - [1. window下安装Redis](#window)
  - [2. Linux下安装Redis](#Linux下安装Redis)
  - [3. Ubuntu下安装Redis](#Ubuntu下安装Redis)
- [Redis配置](#Redis配置)
- [Redis的数据类型](#Redis的数据类型)
- [Redis的命令](#Redis的命令)

[redis](https://redis.io/)是一种非关系型数据库，与mongoDB不同的是redis是内存数据库，所以访问速度很快。常用作缓存和发布-订阅式的消息队列。

<h2 id="Redis的安装">Redis的安装</h2>

<h3 id="window">1. window下安装Redis</h3>

- 下载Redis-x64-3.2.100.zip并解压(https://github.com/MicrosoftArchive/redis/releases)
- 切换目录到C:\software\DevSetup\Redis-x64-3.2.100, 运行 `redis-server.exe redis.windows.conf`
- 另启一个cmd窗口，原来的不要关闭，不然就无法访问服务端了。切换到redis目录下运行 `redis-cli.exe -h 127.0.0.1 -p 6379`

<h3 id="Linux下安装Redis">2. Linux下安装Redis</h3>

- http://redis.io/download

```shell
$ wget http://download.redis.io/releases/redis-2.8.17.tar.gz
$ tar xzf redis-2.8.17.tar.gz
$ cd redis-2.8.17
$ make   #make完后 redis-2.8.17目录下会出现编译后的redis服务程序redis-server,还有用于测试的客户端程序redis-cli,两个程序位于安装目录 src 目录下
#下面启动redis服务.
$ cd src
$ ./redis-server    # 注意这种方式启动redis使用的是默认配置。也可以通过启动参数告诉redis使用指定配置文件使用下面命令启动。
$ cd src
$ ./redis-server redis.conf   #redis.conf是一个默认的配置文件。可以根据需要使用自己的配置文件。
# 启动redis服务进程后，就可以使用测试客户端程序redis-cli和redis服务交互了。 比如：
$ cd src
$ ./redis-cli
redis> set foo bar
OK
redis> get foo
"bar"
``` 

<h3 id="Ubuntu下安装Redis">3. Ubuntu下安装Redis</h3>

```shell
$sudo apt-get update
$sudo apt-get install redis-server
# 启动 Redis
$ redis-server
# 查看 redis 是否启动？
$ redis-cli
# 以上命令将打开以下终端：
#redis 127.0.0.1:6379>
# 127.0.0.1 是本机 IP ，6379 是 redis 服务端口。现在我们输入 PING 命令。
redis 127.0.0.1:6379> ping
#PONG
```

[back to top](#top)

<h2 id="Redis配置">Redis配置</h2>

Redis的配置文件位于Redis安装目录下，文件名为redis.conf, 

- 可以通过 CONFIG 命令查看或设置配置项: `redis 127.0.0.1:6379> CONFIG GET CONFIG_SETTING_NAME`
- 可以通过修改 redis.conf文件或使用`CONFIG set`命令来修改配置

<small>
|编号|redis.conf配置项|说明|
| :------------- | :------------- | :------------- |
|1|`daemonize no`|Redis默认不是以守护进程的方式运行，可以通过该配置项修改，使用yes启用守护进程 |
|2|`pidfile /var/run/redis.pid`|当Redis以守护进程方式运行时，Redis默认会把pid写入/var/run/redis.pid文件，可以通过pidfile指定|
|3|`port 6379`|指定Redis监听端口，默认端口为6379，作者在自己的一篇博文中解释了为什么选用6379作为默认端口，因为6379在手机按键上MERZ对应的号码，而MERZ取自意大利歌女Alessia Merz的名字|
|4|`bind 127.0.0.1`|绑定的主机地址|
|5|`timeout 300`|当客户端闲置多长时间后关闭连接，如果指定为0，表示关闭该功能|
|6|`loglevel verbose`|指定日志记录级别，Redis总共支持四个级别：debug、verbose、notice、warning，默认为verbose|
|7   |`logfile stdout`| 日志记录方式，默认为标准输出，如果配置Redis为守护进程方式运行，而这里又配置为日志记录方式为标准输出，则日志将会发送给/dev/null|
| 8|`databases 16`|设置数据库的数量，默认数据库为0，可以使用SELECT <dbid>命令在连接上指定数据库id|
|9   |`save <seconds> <changes>`|指定在多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件配合<br>Redis默认配置文件中提供了三个条件：<br>  save 900 1<br>save 300 10<br>save 60 10000<br>分别表示900秒（15分钟）内有1个更改，300秒（5分钟）内有10个更改以及60秒内有10000个更改|
|10   |`rdbcompression yes`| 指定存储至本地数据库时是否压缩数据，默认为yes，Redis采用LZF压缩，如果为了节省CPU时间，可以关闭该选项，但会导致数据库文件变的巨大|
|11   |`dbfilename dump.rdb`|指定本地数据库文件名，默认值为dump.rdb|
|12   |`dir ./`|指定本地数据库存放目录|
|13   |`slaveof <masterip> <masterport>`|设置当本机为slav服务时，设置master服务的IP地址及端口，在Redis启动时，它会自动从master进行数据同步|
|14   |`masterauth <master-password>`|当master服务设置了密码保护时，slav服务连接master的密码|
|15   |`requirepass foobared`|设置Redis连接密码，如果配置了连接密码，客户端在连接Redis时需要通过AUTH <password>命令提供密码，默认关闭|
|16   |`maxclients 128`|设置同一时间最大客户端连接数，默认无限制，Redis可以同时打开的客户端连接数为Redis进程可以打开的最大文件描述符数，如果设置 maxclients 0，表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回max number of clients reached错误信息|  
|17   |`maxmemory <bytes>`| 指定Redis最大内存限制，Redis在启动时会把数据加载到内存中，达到最大内存后，Redis会先尝试清除已到期或即将到期的Key，当此方法处理 后，仍然到达最大内存设置，将无法再进行写入操作，但仍然可以进行读取操作。Redis新的vm机制，会把Key存放内存，Value会存放在swap区|
|18   |`appendonly no`|指定是否在每次更新操作后进行日志记录，Redis在默认情况下是异步的把数据写入磁盘，如果不开启，可能会在断电时导致一段时间内的数据丢失。因为 redis本身同步数据文件是按上面save条件来同步的，所以有的数据会在一段时间内只存在于内存中。默认为no|
|19   |`appendfilename appendonly.aof`|appendfilename appendonly.aof|
|20   |`appendfsync everysec`|指定更新日志条件，共有3个可选值：<br>   no：表示等操作系统进行数据缓存同步到磁盘（快） <br>  always：表示每次更新操作后手动调用fsync()将数据写到磁盘（慢，安全） <br>  everysec：表示每秒同步一次（折衷，默认值）|
|21   |`vm-enabled no`|指定是否启用虚拟内存机制，默认值为no，简单的介绍一下，VM机制将数据分页存放，由Redis将访问量较少的页即冷数据swap到磁盘上，访问多的页面由磁盘自动换出到内存中（在后面的文章我会仔细分析Redis的VM机制）|
|22   |`vm-swap-file /tmp/redis.swap`|虚拟内存文件路径，默认值为/tmp/redis.swap，不可多个Redis实例共享|
|23   |`vm-max-memory 0`|将所有大于vm-max-memory的数据存入虚拟内存,无论vm-max-memory设置多小,所有索引数据都是内存存储的(Redis的索引数据 就是keys),也就是说,当vm-max-memory设置为0的时候,其实是所有value都存在于磁盘。默认值为0|
| 24  |`vm-page-size 32`|Redis swap文件分成了很多的page，一个对象可以保存在多个page上面，但一个page上不能被多个对象共享，vm-page-size是要根据存储的 数据大小来设定的，作者建议如果存储很多小对象，page大小最好设置为32或者64bytes；如果存储很大大对象，则可以使用更大的page，如果不 确定，就使用默认值|
|26   |`vm-pages 134217728`|设置swap文件中的page数量，由于页表（一种表示页面空闲或使用的bitmap）是在放在内存中的，，在磁盘上每8个pages将消耗1byte的内存|
|25   |`vm-max-threads 4`|设置访问swap文件的线程数,最好不要超过机器的核数,如果设置为0,那么所有对swap文件的操作都是串行的，可能会造成比较长时间的延迟。默认值为4|
|27   |`glueoutputbuf yes`|设置在向客户端应答时，是否把较小的包合并为一个包发送，默认为开启|
|28   |`hash-max-zipmap-entries 64`<br>`hash-max-zipmap-value 512`| 指定在超过一定的数量或者最大的元素超过某一临界值时，采用一种特殊的哈希算法|
|29   |`activerehashing yes`|指定是否激活重置哈希，默认为开启|
|30   |`include /path/to/local.conf`| 指定包含其它的配置文件，可以在同一主机上多个Redis实例之间使用同一份配置文件，而同时各个实例又拥有自己的特定配置文件|

> 补充:
- 守护进程（Daemon Process），也就是通常说的Daemon进程（精灵进程），是Linux中的后台服务进程。它是一个生存期较长的进程，通常独立于控制终端并且周期性地执行某种任务或等待处理某些发生的事件
- 守护进程是个特殊的孤儿进程，这种进程脱离终端，为什么要脱离终端呢？之所以脱离于终端是为了避免进程被任何终端所产生的信息所打断，其在执行过程中的信息也不在任何终端上显示。由于在 linux 中，每一个系统与用户进行交流的界面称为终端，每一个从此终端开始运行的进程都会依附于这个终端，这个终端就称为这些进程的控制终端，当控制终端被关闭时，相应的进程都会自动关闭

</small>

[back to top](#top)

<h2 id="Redis数据类型">Redis数据类型</h2>

string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)

**String（字符串）**

- string是redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value
- string类型是二进制安全的。意思是redis的string可以包含任何数据。比如jpg图片或者序列化的对象 
- string类型是Redis最基本的数据类型，一个键最大能存储512MB

```
redis 127.0.0.1:6379> SET name "runoob"
OK
redis 127.0.0.1:6379> GET name
"runoob"

```

- 键为name，对应的值为runoob。
- 注意：一个键最大能存储512MB。

**Hash（哈希）**

- Redis hash是一个键值(key=>value)对集合
- Redis hash是一个string类型的field和value的映射表，hash特别适合用于存储对象

```
redis> HMSET myhash field1 "Hello" field2 "World"
"OK"
redis> HGET myhash field1
"Hello"
redis> HGET myhash field2
"World"
```

- hash数据类型存储了包含用户脚本信息的用户对象。 实例中使用Redis HMSET, HGETALL命令，user:1 为键值
- 每个 hash 可以存储 232 -1 键值对（40多亿）

**List（列表）** 

- Redis列表是简单的字符串列表，按照插入顺序排序。可以添加一个元素到列表的头部（左边）或者尾部（右边）
- 列表最多可存储 232 - 1 元素 (4294967295, 每个列表可存储40多亿)

```
redis 127.0.0.1:6379> lpush runoob redis
(integer) 1
redis 127.0.0.1:6379> lpush runoob mongodb
(integer) 2
redis 127.0.0.1:6379> lpush runoob rabitmq
(integer) 3
redis 127.0.0.1:6379> lrange runoob 0 10
1) "rabitmq"
2) "mongodb"
3) "redis"
redis 127.0.0.1:6379>
```

**Set（集合）**

- Redis的Set是string类型的无序集合。
- 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。
- sadd命令: ` sadd key member`, 添加一个string元素到,key对应的set集合中，成功返回1,如果元素已经在集合中返回0,key对应的set不存在返回错误
 
```shell
redis 127.0.0.1:6379> sadd runoob redis
(integer) 1
redis 127.0.0.1:6379> sadd runoob mongodb
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabitmq
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabitmq
(integer) 0
redis 127.0.0.1:6379> smembers runoob
1) "rabitmq"
2) "mongodb"
3) "redis"
4) 
```

- 注意：以上实例中 rabitmq 添加了两次，但根据集合内元素的唯一性，第二次插入的元素将被忽略。
- 集合中最大的成员数为 232 - 1(4294967295, 每个集合可存储40多亿个成员)。

**zset(sorted set：有序集合)**

- Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员, 不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序
- zset的成员是唯一的,但分数(score)却可以重复。
- zadd命令: `zadd key score member`, 添加元素到集合，元素在集合中存在则更新对应score

```shell
redis 127.0.0.1:6379> zadd runoob 0 redis
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 mongodb
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabitmq
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabitmq
(integer) 0
redis 127.0.0.1:6379> ZRANGEBYSCORE runoob 0 1000
1) "redis"
2) "mongodb"
3) "rabitmq"
```

[back to top](#top)

<h2 id="Redis命令">Redis命令</h2>

https://redis.io/commands

```shell
#启动redis客户端，打开终端并输入命令redis-cli。该命令会连接本地的redis服务
$redis-cli
#在远程redis服务上执行命令
$redis-cli -h host -p port -a password 
$redis-cli -h 127.0.0.1 -p 6379 -a "mypass"
#PING命令，用于检测redis服务是否启动
$redis 127.0.0.1:6379> PING     
PONG
#管理 redis 的键
$redis 127.0.0.1:6379> COMMAND KEY_NAME    #set, del
#管理 redis 字符串值
```

> http://www.runoob.com/redis/redis-tutorial.html
