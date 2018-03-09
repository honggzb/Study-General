## configuration


```shell
# 1. Start MongoDB - need to specify an alternate path for data files 
C:\mongodb\bin\mongod.exe --dbpath C:\MongoDB\data
# 1.1 for git bash
C:\mongodb\bin\mongod.exe --dbpath C:/MongoDB/data   
# 1.2  If your path includes spaces, enclose the entire path in double quotes, for example:
C:\mongodb\bin\mongod.exe --dbpath "C:\MongoDB db data"
# 1.3 or using window service  - for window
net start MongoDB
net stop MongoDB
##########################################################
# 2. Connect to MongoDB
C:\mongodb\bin\mongo.exe
```

### Component Set Binaries

命令|功能
---|---
Server|mongod.exe
Router	|mongos.exe
Client	|mongo.exe
MonitoringTools|	mongostat.exe, mongotop.exe
ImportExportTools|	mongodump.exe, mongorestore.exe, mongoexport.exe, mongoimport.exe
MiscellaneousTools|	bsondump.exe, mongofiles.exe, mongooplog.exe, mongoperf.exe

### Configure a Windows Service for MongoDB

```shell
"C:\mongodb\bin\mongod.exe" --config "C:\mongodb\mongod.cfg" --install
net start MongoDB
net stop MongoDB
# remove the MongoDB service use the following command:
"C:\mongodb\bin\mongod.exe" --remove
```

## 常用命令

命令|功能
---|---
`db.help()`|显示数据库操作命令，里面有很多的命令 
**数据库**  |  ---
`use <db name>`|如果数据库不存在，则创建数据库，否则切换到指定数据库
`db.dropDatabase()`|切换到数据库后, 执行删除命令
**显示**  |  ---
`show users`|显示用户
`show dbs`|显示数据库列表 
`show collections`|显示当前数据库中的集合（类似关系数据库中的表） 
**collection集合**  |  
`db.createCollection('collection');`|  
`db.collection.insert({title: 'MongoDB 教程'})`|单条插入, 批量插入可以自己写for循环，里面就是insert
`db.collection.update({name:""},{name:"description"});`| 第一个参数为“查找的条件”，第二个参数为“更新的值”
`db.collection.save(document)`|
`db.collection.remove({})`, `db.collection.deleteMany({})`|移除集合中的所有数据,类似常规 SQL 的 truncate 命令
`db.collection.remove({name: "jack"});`, `db.collection.deleteMany({ status : "A" })`|移除集合中的所有找到的记录
`db.collection.remove({name: "jack"}, 1);`,`db.collection.deleteOne( { status: "D" } )`|移除集合中的第一条找到的记录
`db.collection.count()`|
`db.collection.drop()` | 删除整个集合
`db.collection.help()`|显示集合操作命令，同样有很多的命令，foo指的是当前数据库下，一个叫foo的集合，并非真正意义上的命令 
`db.collection.find();`|查找所有, 对于当前数据库中的foo集合进行数据查找（由于没有条件，会列出所有数据） 
`db.collection.find().pretty()`|同上，但格式化显示
`db.collection.find({ a : 1 })`|对于当前数据库中的foo集合进行查找，条件是数据中有一个属性叫a，且a的值为1

## 细说增删查改

### Find

find()方法可以传入多个键(key)，每个键(key)以逗号隔开，即常规SQL的AND条件

```shell
# <1>   > ,  >=   ,  <   ,  <=   ,  !=   , =
#    "$gt", "$gte", "$lt", "$lte", "$ne", "没有特殊关键字"
MongoDB Enterprise > db.user.find({"age": {$gt:22}})
# <2>  And   ,    OR ,  In , NotIn
#   "无关键字“, "$or", "$in", "$nin"
# And
MongoDB Enterprise > db.user.find({"by":"菜鸟", "title":"MongoDB"}).pretty() 
# Or
MongoDB Enterprise > db.user.find($or: [{"by":"菜鸟", "title":"MongoDB"}]}).pretty()
# AND 和 OR 联合使用
MongoDB Enterprise > db.user.find({"likes": {$gt:50}, $or: [{"by": "菜鸟"},{"title": "MongoDB"}]}).pretty()
# <3> 正则表达式
MongoDB Enterprise > db.user.find({"name": /^j/, "name", /e$/})
# <4> $where
MongoDB Enterprise > db.user.find({$where:function(){return this.name=='jack'}})
```

MongoDB 与 RDBMS Where 语句比较

操作|格式|	范例	|RDBMS中的类似语句
---|---|---|---
等于|{ key : value }	|db.col.find({"by":"菜鸟教程"}).pretty()	|where by = '菜鸟教程'
小于|{ key :{$lt: value }}	|db.col.find({"likes":{$lt:50}}).pretty()	|where likes   50
小于或等于|{ key :{$lte: value }}	|db.col.find({"likes":{$lte:50}}).pretty()	|where likes  = 50
大于|{ key :{$gt: value }}|	db.col.find({"likes":{$gt:50}}).pretty()	|where likes   50
大于或等于|{ key :{$gte: value }}	|db.col.find({"likes":{$gte:50}}).pretty()|	where likes  = 50
不等于|{ key :{$ne: value }}|	db.col.find({"likes":{$ne:50}}).pretty()	|where likes != 50

### update

```json
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```

- query : update的查询条件，类似sql update查询内where后面的。
- update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- writeConcern :可选，抛出异常的级别

```shell
# <1> 整体更新
MongoDB Enterprise > db.user.update({"age":33})
# <2> 局部更新, $inc 和 $set(如果“文档”中没有此key，则会创建key)
MongoDB Enterprise > db.user.update({"name": "jack"}, {$inc:{"age", 30}})   #increase 30
MongoDB Enterprise > db.user.update({"name": "jack"}, {$set:{"age", 10}})
# <3> upsert
# mongodb创造出来的“词”，大家还记得update方法的第一次参数是“查询条件”吗？，那么这个upsert操作就是说：如果没有查到，就在数据库里面新增一条，其实这样就是避免了在数据库里面判断是update还是add操作，使用起来很简单, 将update的第三个参数设为true即可
MongoDB Enterprise > db.user.update({"name": "jacddak"}, {$inc:{"age", 10}}, true)
# <3> 批量更新: 在update的第四个参数中设为true即可
MongoDB Enterprise > db.user.update({"name": "jacddak"}, {$inc:{"age", 10}}, true, true)
```

## mongoose to connect mongodb

 ```javascript
var mongo = require("mongodb");
var mongoose = require("mongoose");
var db = mongoose.connection;
moongoose.connect('mongodb://<dbuser>:<dbpassword>@ds061731.mongolab.com:61731/mongocrud');
```

