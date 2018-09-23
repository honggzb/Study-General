[NodeJS -2018新莫马前端](#top)

- [模块系统](#模块系统)
  -  [require方法加载规则](#require方法加载规则)
  -  [require标识符分析](#require标识符分析)
  -  [模块查找机制](#模块查找机制)
- [核心模块](#核心模块)
- [补充说明](#补充说明)
- [社区项目](#社区项目)

-----------------
```
01-basic   - 用本地文件db.json作为数据来源+express 
02-MongoDB
```
----------------

## 模块系统

- 在 Node中没有全局作用域的概念
    - 在 Node中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件
    - require加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
      - 模块完全是封闭的
      - 外部无法访问内部
      - 内部也无法访问外部
    - 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
- 模块与模块通信
    - 在每个模块中，都提供了一个对象：`exports`
    - 该对象默认是一个空对象
    - `require`这个模块可以得到模块内部的 `exports` 接口对象
- export和module-export的区别
  - 每个模块内部都有一个自己的module对象, 该module对象中，有一个成员叫：exports也是一个对象
  - 如果需要对外导出成员，只需要把导出的成员挂载到module.exports中
  - 谁require，谁就得到module.exports
  - 最后return的是module.exports, 不是exports
  - [深入浅出Node.js（三）：深入Node.js的模块机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism)
  - https://github.com/JacksonTian

```javascript
//foo.js
var foo = 'bar';
function add(x, y) {
  return x+y;
}
//导出多个成员
module.exports = {
  add: function () {
    return x + y
  },
  str: 'hello'
}
//为了简化操作，node专门提供了一个变量：exports==module.exports
var module = {
  exports: {
    str: 'bar',
    add: function
  }
}
//main.js
var foo = require('/foo');
console.log(foo);
```

### require方法加载规则

  + 优先从缓存加载
  + 核心模块
  + 路径形式的模块
  + 第三方模块:  node_modules

### require标识符分析

- 如果是非路径形式的模块标识
  - 路径形式的模块：首位的/在这里表示的是当前文件模块所属磁盘根路径
   - `./` 当前目录，不可省略
   - `../` 上一级目录，不可省略
- 核心模块的本质也是文件
  - 核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载就可以了
  - `require('fs')`
- 第三方模块:   凡是第三方模块都必须通过npm来下载
  - 使用的时候就可以通过 require('包名') 的方式来进行加载才可以使用
    - 先找到当前文件所处目录中的node_modules目录
    - `node_modules/art-template`
    - `node_modules/art-template/package.json`文件
    - `node_modules/art-template/package.json`文件中的`main`属性, `main`属性中就记录了art-template 的入口模块
  - 然后加载使用这个第三方包
  - 如果package.json文件不存在或者`main`指定的入口模块是也没有, 则node会自动找该目录下`index.js`
  - 如果以上所有任何一个条件都不成立，则会进入上一级目录中的node_modules目录查找
  - 如果上一级还没有，则继续往上上一级查找
  - 。。。
  - 如果直到当前磁盘根目录还找不到，最后报错：can not find module xxx

### 模块查找机制

- 优先从缓存加载
- 核心模块
- 路径形式的文件模块
- 第三方模块
  - node_modules/art-template/
  - node_modules/art-template/package.json
  - node_modules/art-template/package.json main
  - index.js 备选项
  - 进入上一级目录找 node_modules
- 按照这个规则依次往上找，直到磁盘根目录还找不到，最后报错：Can not find moudle xxx
- 一个项目有且仅有一个 node_modules 而且是存放到项目的根目录

## 核心模块

- fs 文件操作模块
- http 网络服务构建模块
- os 操作系统信息模块
- path 路径处理模块

```javascript
//1) 文件操作模块
// 1.1) 读取文件
//    第一个参数就是要读取的文件路径
//    第二个参数是一个回调函数
var fs = require('fs');
fs.readFile('./data/a.txt', function(error, data){
    if (error) {
    console.log('读取文件失败了')
  } else {
    console.log(data.toString())
  }
});
// 1.2) 写文件
// 第一个参数：文件路径
// 第二个参数：文件内容
// 第三个参数：回调函数
fs.writeFile('./data/你好.md', '大家好，给大家介绍一下，我是Node.js', function (error) {
  if (error) {
    console.log('写入失败')
  } else {
    console.log('写入成功了')
  }
})
//2) 网络服务构建模块
var http = require('http')
var server = http.createServer();
//
server.on('request', function () {
  console.log('收到客户端的请求了')
});
//res
server.on('request', function (request, response) {
  console.log('收到客户端的请求了，请求路径是：' + request.url);
  response.write('hello');
  response.write(' nodejs');
  response.end();
});
//url - 监听 request请求事件，设置请求处理函数
//请求不同的路径的时候响应不同的结果
  //  例如：
  //  / index
  //  /login 登陆
  //  /register 注册
  //  /haha 哈哈哈
server.on('request', function (req, res) {
  console.log('收到请求了，请求路径是：' + req.url);
  console.log('请求我的客户端的地址是：', req.socket.remoteAddress, req.socket.remotePort);
  var url = req.url;
  if (url === '/') {
    res.end('index page');
  } else if (url === '/login') {
    res.end('login page');
  } else if (url === '/products') {
    var products = [
      {name: '苹果 X', price: 8888 },
      {name: '菠萝 X', price: 5000},
      {name: '小辣椒 X', price: 1999}
    ];
    res.end(JSON.stringify(products));    // 响应内容只能是二进制数据或者字符串
  } else {
    res.end('404 Not Found.')
  }
});
// 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
});
```

## 补充说明 

  + Content-Type
    * 不同的资源对应的Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
    * 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
    * 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理
  + jQuery的each和原生的JavaScript方法forEach
  + EcmaScript 5 提供的
    * 不兼容 IE 8
  + jQuery 的 each 由 jQuery 这个第三方库提供
    * jQuery 2 以下的版本是兼容 IE 8 的
    * 它的 each 方法主要用来遍历 jQuery 实例对象（伪数组）
    * 同时它也可以作为低版本浏览器中 forEach 替代品
    * jQuery 的实例对象不能使用 forEach 方法，如果想要使用必须转为数组才可以使用:  `[].slice.call(jQuery实例对象)`

## 社区项目

### 功能

- 增删改查
- 登陆
- 注册
- 头像
  + 服务端图片
  + 水印
  + 图片水印
- 找回密码
- 密码修改

### 路由设计

| 请求方法 |     请求路径      | get 参数 |           post 参数            |       备注       |
|----------|------------------|----------|--------------------------------|------------------|
| GET      | /studens         |          |                                | 渲染首页         |
| GET      | /students/new    |          |                                | 渲染添加学生页面 |
| POST     | /studens/new     |          | name、age、gender、hobbies     | 处理添加学生请求 |
| GET      | /students/edit   | id       |                                | 渲染编辑页面     |
| POST     | /studens/edit    |          | id、name、age、gender、hobbies | 处理编辑请求     |
| GET      | /students/delete | id       |                                | 处理删除请求     |

**路由模块设计方法一**

```javascript
//router.js
module.exports = function(app){
    app.get('/', (req,res) => {
        //...
    });
}
//app.js
var router = require('./router.js');
//...
router(app);
//...
module.exports = app;
```

**路由模块设计方法二**

```javascript
//router.js
var express = require('express');
//1) 创建一个router容器
var router = express.Router();
//2) 将路由都挂载到router容器中
router.get('/', (req,res) => {
        //...
});
//3)将router导出
module.exports = router
//app.js
var router = require('./router.js');
//将路由router容器都挂载到app中
app.use(router);
//...
module.exports = app;
```

[back to top](#top)

### 封装异步API

```javascript
//1) 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
function fn(callback) {
  setTimeout(function () {   //异步
    var data = 'hello'
    callback(data)
  }, 1000)
}
fn(function(data){
   console.log(data)
});
/*
实际案例
callback第一个参数error:
  成功是 null
  错误是 错误对象
callback第二个参数是结果
  成功是 数组
  错误是 undefined
*/
fs.readFile(dbPath, 'utf8', (err,data)=>{
        if(err){
            return callback(err);
        }
       callback(null, JSON.parse(data).students);
  
});
//2) 使用Promise
function fn(data) {
  return  new Promise((resolve, reject) => {  //异步
   setTimeout(function () {   //异步
      //var data = 'hello'
      resolve(data);
    }, 500);
  });
}
fn("aaa")
  .then(() =>{ return fn("bbb");})
  .then(() =>{ return fn("ccc");});
```

[back to top](#top)



------------------------------------------------------

```
npm i --global npm   #更新
npm init -y  #跳过向导
```

## art-template

```shell
npm i --save art-template
npm i --save express-art-template
app.engine('html', require('express-art-template'))
app.get('/', (req, res) => {
  res.render('index.html', { title: "title" })
})
```

- https://v3.bootcss.com/examples/dashboard/
- ` npm i --save bootstrap@3.3.7`

> [npm 常用命令详解](https://www.cnblogs.com/PeunZhang/p/5553574.html)
