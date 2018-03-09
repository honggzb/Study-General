
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

## Component Set Binaries

命令|功能
---|---
Server|mongod.exe
Router	|mongos.exe
Client	|mongo.exe
MonitoringTools|	mongostat.exe, mongotop.exe
ImportExportTools|	mongodump.exe, mongorestore.exe, mongoexport.exe, mongoimport.exe
MiscellaneousTools|	bsondump.exe, mongofiles.exe, mongooplog.exe, mongoperf.exe

## Configure a Windows Service for MongoDB

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
`show dbs`|显示数据库列表 
`show collections`|显示当前数据库中的集合（类似关系数据库中的表） 
`show users`|显示用户
`use <db name>`|切换当前数据库，这和MS-SQL里面的意思一样 
---|---
 `db.foo.help()`|显示集合操作命令，同样有很多的命令，foo指的是当前数据库下，一个叫foo的集合，并非真正意义上的命令 
 `db.foo.find();`|查找所有, 对于当前数据库中的foo集合进行数据查找（由于没有条件，会列出所有数据） 
 `db.foo.find().pretty()`|同上，但格式化显示
 `db.foo.find({ a : 1 })`|对于当前数据库中的foo集合进行查找，条件是数据中有一个属性叫a，且a的值为1
---|---
`db.createCollection('articles');`|
`db.articles.insert({name:""});`|
`db.articles.update({name:""},"$set:{description:""}});`|
`db.foo.remove({});`|

## mongoose to connect mongodb

 ```javascript
var mongo = require("mongodb");
var mongoose = require("mongoose");
var db = mongoose.connection;
moongoose.connect('mongodb://<dbuser>:<dbpassword>@ds061731.mongolab.com:61731/mongocrud');
```

