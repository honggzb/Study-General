[Mongo DB](#top)

- [配置](#%E9%85%8D%E7%BD%AE)
- [启动](#%E5%90%AF%E5%8A%A8)
    - [命令行下运行MongoDB服务器](#%E5%91%BD%E4%BB%A4%E8%A1%8C%E4%B8%8B%E8%BF%90%E8%A1%8Cmongodb%E6%9C%8D%E5%8A%A1%E5%99%A8)
    - [以windows服务方式启动](#%E4%BB%A5windows%E6%9C%8D%E5%8A%A1%E6%96%B9%E5%BC%8F%E5%90%AF%E5%8A%A8)
    - [MongoDB的可视化工具](#mongodb%E7%9A%84%E5%8F%AF%E8%A7%86%E5%8C%96%E5%B7%A5%E5%85%B7)
- [使用mongoDB](#%E4%BD%BF%E7%94%A8mongodb)
    - [一般应用](#%E4%B8%80%E8%88%AC%E5%BA%94%E7%94%A8)
    - [高级应用](#%E9%AB%98%E7%BA%A7%E5%BA%94%E7%94%A8)

## 配置

1. 设置Path环境变量： 将· `D:\MongoDB\Server\4.0\bin` 加入系统`PATH`
   运行`mongod -version` 看是否安装成功
2. Mongo默认配置文件是`D:\MongoDB\Server\4.0\bin\mongod.cfg`
3. 自定义配置文件
  1.  创建数据存放目录data, 并创建两个子目录 data/db、data/logs
  2. 在data的同目录下创建一个mongod.cfg文件，有两个属性logpath和dbpath，分别设定值

```
systemLog:
	destination: file
	path: D:\MongoDB\data\log\mongod.log
storage:
    dbPath: D:\MongoDB\data\db
#----------或----------------
dbpath=D:\mongodb\data\db
logpath=D:\mongodb\data\log\mongodb.log
```

    - 默认MongoDB监听的端口是27017(mysql的是3306)
    - 该端口绑定在127.0.0.1，无法远程连接，设置bing_ip为0.0.0.1可以远程连接`bind_ip=0.0.0.0`       
    - 需要认证才能连接，先设置用户再开启认证,  `auth =true`

[back to top](#top)

## 启动

### 命令行下运行MongoDB服务器

```shell
D:\MongoDB\Server\4.0\bin> mongod -dbpath "d:\mongodb\data\db"    #启动
D:\MongoDB\Server\4.0\bin> mongo                                  #连接
D:\MongoDB\Server\4.0\bin> exit                                   #退出MongoDB连接
D:\MongoDB\Server\4.0\bin> db.serverCmdLineOpts()                 #查看mongod的启动参数
```

> 如包含空格，必须用双引号

**mongod常用的参数是:**

- **--dbpath <db_path>**：存储MongoDB数据文件的目录
- **--directoryperdb**：指定每个数据库单独存储在一个目录中（directory），该目录位于--dbpath指定的目录下，每一个子目录都对应一个数据库名字。Uses a separate directory to store data for each database. The directories are under the --dbpath directory, and each subdirectory name corresponds to the database name.
- **--logpath <log_path>**：指定mongod记录日志的文件
- **--fork**：以后台deamon形式运行服务
- **--journal**：开始日志功能，通过保存操作日志来降低单机故障的恢复时间
- **--config**（或-f）<config_file_path>：配置文件，用于指定runtime options
- **--bind_ip <ip address>**：指定对外服务的绑定IP地址
- **--port <port>**：对外服务窗口
- **--auth**：启用验证，验证用户权限控制
- **--syncdelay<value>**：系统刷新disk的时间，单位是second，默认是60s
- **--replSet <setname>**：以副本集方式启动mongod，副本集的标识是setname

**mongo命令常用参数**

- **--nodb:** 阻止mongo在启动时连接到数据库实例；
- **--port <port>** ：指定mongo连接到mongod监听的TCP端口，默认的端口值是27017；
- **--host <hostname>** ：指定mongod运行的server，如果没有指定该参数，那么mongo尝试连接运行在本地（localhost）的mongod实例；
- <db address>：指定mongo连接的数据库
- **--username/-u <username> 和** **--password/-p <password>**：指定访问MongoDB数据库的账户和密码，只有当认证通过后，用户才能访问数据库；
- **--authenticationDatabase <dbname>**：指定创建User的数据库，在哪个数据库中创建User时，该数据库就是User的**Authentication Database**

`mongo --host 127.0.0.1:27017`

### 以windows服务方式启动

- 将mongodb服务添加到windows服务列表(将MongoDB安装为windows服务): 

- **管理员**运行cmd 打开D:\MongoDB\Server\4.0\bin目录执行下面命令
  `mongod -f "D:\MongoDB\mongod.cfg"  --install -serviceName "mongodb"`
- 启动mongodb服务
   `D:\MongoDB\Server\4.0\bin> NET START mongodb` 
- 打开任务管理器，可以看到进程已经启动
- 关闭服务和删除进程
  
```shell
   D:\MongoDB\Server\4.0\bin>NET stop mongodb   #关闭服务
   D:\MongoDB\Server\4.0\bin>mongod --dbpath "d:\mongodb\data\db" --logpath "d:\mongodb\data\log\MongoDB.log" --remove --serviceName "mongodb"  #删除，注意不是--install了
```

[back to top](#top)

### MongoDB的可视化工具

- Robomongo(推荐): Robomongo 是开源，免费的MongoDB管理工具，下载地址：[Robomongo下载](https://robomongo.org/)
- MongoBooster:  支持MongoDB 3.2 版本，个人使用免费，用于商业收费，下载地址：[MongoBooster下载](http://mongobooster.com/downloads%20)

[back to top](#top)

##  使用mongoDB

### 一般应用

命令|功能
:---|:---
**1.常用的命令: 数据库命令**|
`show dbs`| 显示数据库列表
`use dbname`|进入dbname数据库，大小写敏感，如没有该数据库则创建新数据库
`show collections`|显示数据库中的集合，相当于表格
**2.创建&新增**|
`db.createCollection(name, options)`|创建集合
`db.users.save({"name":"lecaf"})`|创建了名为users的集合，并新增了一条{"name":"lecaf"}的数据
`db.users.insert({"name":"ghost", "age":10})`|在users集合中插入一条新数据，，如果没有users这个集合，mongodb会自动创建

> save()和insert()也存在着些许区别|若新增的数据主键已经存在，insert()会不做操作并提示错误，而save() 则更改原来的内容为新内容。
- 存在数据：`{_id:1, "name":"n1"}` -> _id是主键
- `insert({_id:1, "name":"n2"})`->会提示错误
- `save({_id:1, "name":"n2"})`  ->会把 n1改为n2，有update的作用

命令|功能
:---|:---
**3.删除**|
`db.dropDatabase()`|删除当前数据库
`db.collection.drop()`|删除集合
`db.users.remove()`|删除users集合下所有数据
`db.users.remove({"name": "lecaf"})`|删除users集合下name=lecaf的数据
`db.users.drop()或db.runCommand({"drop","users"})`|删除集合users
`db.runCommand({"dropDatabase": 1})`|删除当前数据库
**4.查找**|
db.users.find()|查找users集合中所有数据
db.users.findOne()|查找users集合中的第一条数据
**5.修改**|
`db.users.update({"name":"lecaf"}, {"age":10})`|修改name=lecaf的数据为age=10，第一个参数是查找条件，第二个参数是修改内容，除了主键，其他内容会被第二个参数的内容替换，主键不能修改

[back to top](#top)

### 高级应用

1. **条件查找**

```shell
db.collection.find({"key":value})            #查找key=value的数据
db.collection.find({"key":{$gt: value}})   #key > value
db.collection.find({"key":{$lt: value}})   #key < value
db.collection.find({"key":{$gte: value}})  #key >= value
db.collection.find({"key":{$lte: value}})  #key <= value
db.collection.find({"key":{$gt: value1 , $lt: value2}})  #value1 < key <value2
db.collection.find({"key":{$ne: value}})  #key <> value
db.collection.find({"key":{$mod : [ 10 , 1 ]}})   #取模运算，条件相当于key % 10 == 1 即key除以10余数为1的
db.collection.find({"key":{$nin: [ 1, 2, 3 ]}})   #不属于，条件相当于key的值不属于[ 1, 2, 3 ]中任何一个
db.collection.find({"key":{$in: [ 1, 2, 3 ]}})    #属于，条件相当于key等于[ 1, 2, 3 ]中任何一个
db.collection.find({"key":{$size: 1 } })    #$size 数量、尺寸，条件相当于key的值的数量是1（key必须是数组，一个值的情况不能算是数量为1的数组）
db.collection.find({"key":{$exists : true|false}})    #$exists 字段存在，true返回存在字段key的数据，false返回不存在字度key的数据
db.collection.find({"key":/^val.*val$/i })   # 正则，类似like；“i”忽略大小写，“m”支持多行
db.collection.find({$or:[{a : 1}, {b : 2} ]})    #$or或 （注意：MongoDB 1.5.3后版本可用），符合条件a=1的或者符合条件b=2的数据都会查询出来
db.collection.find({"key":value, $or : [{a : 1} , {b : 2}]})    #符合条件key=value ，同时符合其他两个条件中任意一个的数据
db.collection.find({"key.subkey":value})    #内嵌对象中的值匹配，注意："key.subkey"必须加引号
db.collection.find({"key":{$not: /^val.*val$/i}})    #这是一个与其他查询条件组合使用的操作符，不会单独使用。上述查询条件得到的结果集加上$not之后就能获得相反的集合。
```

[back to top](#top)

2. **排序**

`db.collection.find().sort({"key1" : -1 ,"key2" : 1})    #这里的1代表升序，-1代表降序`

3. **其他**

```shell
db.collection.find().limit(5)  #控制返回结果数量，如果参数是0，则当作没有约束，limit()将不起作用
db.collection.find().skip(5)   #控制返回结果跳过多少数量，如果参数是0，则当作没有约束，skip()将不起作用，或者说跳过了0条
db.collection.find().skip(5).limit(5)  #可用来做分页，跳过5条数据再取5条数据
db.collection.find().count(true)       #count()返回结果集的条数
db.collection.find().skip(5).limit(5).count(true)  #在加入skip()和limit()这两个操作时，要获得实际返回的结果数，需要一个参数true，否则返回的是符合查询条件的结果总数
```

---------------------
> Reference

- [菜鸟教程之MongoDB](http://www.runoob.com/mongodb/mongodb-tutorial.html)

- **1，推荐学习MongoDB书籍**

  动物书《MongoDB权威指南-第二版》，非常经典

  **2，学习MongoDB的官方手册：** [MongoDB Manual](https://docs.mongodb.com/manual/crud/)

  **3，学习MongoDB的入门教程**：[MongoDB Tutorial](http://www.tutorialspoint.com/mongodb/mongodb_create_database.htm)
