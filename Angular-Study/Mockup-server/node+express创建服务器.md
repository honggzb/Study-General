## [node+express创建服务器](#top)

- [1. 初始化环境](#初始化环境)
  - 设置自动编译typescript
  - 在VSCode使用d.ts文件进行js智能提示
- [2. 最简单的Node服务器](#最简单的服务器)
- [3. Node+Express](#Node+Express)
- [4. 配置angular使用express服务器](#配置angular使用express服务器)
- [5. webSocket服务器](#webSocket服务器)
- [6. MYSQL+NODE/EXPRESS](#MYSQL)
- [7. koa+webpack web server](#koa)

<h2 id="初始化环境">1. 初始化环境</h2>

```shell
mkdir server
cd server
npm init -y                #初始化一个node项目
npm i @types/node --save-dev   #引入node的typescripe类型定义文件
touch tsconfig.json        #创建配置文件，定义如何将typescript编译为javascript
tsc --init                 #安装typescript后自动创建tsconfig.json文件的命令
tsc -w                     #将typescript编译为javascript并watching for file changes
```

**tsconfig.json案例** - 会生成一个目录

```JSON
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "emitDecoratorMetadata":true,
    "experimentalDecorators":true,
    "outDir": "build",
    "lib": ["es6"]
  },
  "exclude": [
    "node_modules"
  ]
}
```

| tsconfig.json| 说明|
| :------------- | :------------- |
|target|编译之后生成的JavaScript文件需要遵循的标准。有三个候选项：es3、es5、es2015|
|noImplicitAny|为false时，如果编译器无法根据变量的使用来判断类型时，将用any类型代替。为true时，将进行强类型检查，无法推断类型时，提示错误|
|module|遵循的JavaScript模块规范。主要的候选项有：commonjs、AMD和es6|
|removeComments|编译生成的JavaScript文件是否移除注释|
|sourceMap|编译时是否生成对应的source map文件。这个文件主要用于前端调试。当前端js文件被压缩引用后，出错时可借助同名的source map文件查找源文件中错误位置|
|outDir|编译输出JavaScript文件存放的文件夹|
|include、exclude|编译时需要包含/剔除的文件夹|

**设置自动编译typescript**

- 命令行设置编译typescript：  `tsc -w`
- Webstorm设置自动编译typescript:  `Preferences` --> `Languages & Frameworks`  --> `Typescript` --> 将`Compiler`下的`Enable Typescript Compiler`和`Use tsconfig.json`勾选
- vscode设置自动编译typescript:   
  - `npm install -g typescript`, `npm update -g typescript`, 安装和更新TypeScript
  - `npm install -g typings`, typings主要是用来获取.d.ts文件。当typescript使用一个外部JavaScript库时,会需要这个文件
  - `typings install dt~node –global`, 安装 node 的 .d.ts 库
  - 编写好typescript代码后，按一下ctrl+s保存代码。就能把typescript编译为JavaScript
  - 不用保存代码后，使用ctrl+shift+B来编译
  - [使用Visual Studio Code搭建TypeScript开发环境](https://www.cnblogs.com/junxian_chen/p/5904888.html)
  - [打造TypeScript的Visual Studio Code开发环境](https://www.cnblogs.com/xuanhun/p/6027624.html)
- [使用webpack编译TypeScript，自动编译，自动刷新](http://blog.csdn.net/liqianglai/article/details/53839753)
- [WebStorm增加了TypeScript支持](https://www.jetbrains.com/help/webstorm/2016.2/typescript-support.html)
- [Eclipse也有了TypeScript插件](https://github.com/palantir/eclipse-typescript)
- [微软也发布了Sublime Text开发TypeScript插件](https://github.com/Microsoft/TypeScript-Sublime-Plugin)

```
npm install -g webpack webpack-dev-server typescript
npm run build
npm run dev
```

[back to top](#top)

**补充： 在VSCode使用d.ts文件进行js智能提示**

https://segmentfault.com/a/1190000007110845

1. 在项目的根目录，创建一个 jsconfig.json 文件

```javascript
{
   // See https://go.microsoft.com/fwlink/?LinkId=759670
   // for the documentation about the jsconfig.json format
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "allowSyntheticDefaultImports": true
    },
    "exclude": [
        "node_modules",
        "bower_components",
        "jspm_packages",
        "tmp",
        "temp"
    ]
}
```

2. 安装别人写好的相关的d.ts文件
3. [如何编写一个d.ts文件](https://segmentfault.com/a/1190000009247663)

```shell
# 比如说要提示jquery
npm install @types/jquery -save   #项目里面多了个node_modules/@types/jquery文件夹
```

[back to top](#top)

<h2 id="最简单的服务器">2. 最简单的Node服务器</h2>

```javascript
import * as http from 'http'
const server = http.createServer((request, response) => {
  response.end('Hello Node!')
});
server.listen(8000);
```

[back to top](#top)

<h2 id="Node+Express">3. Node+Express</h2>

```shell
npm i express --save
npm i @types/express --save
tsc -w        #命令行设置编译typescript
npm i -g nodemon       #实时监控服务器
nodemon build/auction_server.js
```

```javascript
import * as express from 'express';
const app = express();
app.get('/', (req, res)=> {
  res.send('Hello Express!')
});
app.get('/products', (req, res)=> {
  res.json(products)
});
const server = app.listen(8000, "localhost", () => {
  console.log("服务器已经在8000端口启动");
});
```

[back to top](#top)

<h2 id="配置angular使用express服务器">4. 配置angular使用express服务器</h2>

- 在根目录创建proxy.conf.json
- 修改package.json, `"start": "ng serve --proxy-config proxy.conf.json",`

```javascript
//proxy.conf.json
{
"/api": {
  "target":"http://localhost:8000"
}
}
//package.json
"scripts": {
"ng": "ng",
"start": "ng serve --proxy-config proxy.conf.json",
//...
},
```

[back to top](#top)

<h2 id="websocket服务器">5. websocket服务器</h2>

```shell
npm i ws --save
npm i @types/ws --save-dev
```

```javascript
import {Server} from 'ws';
const wsServer = new Server({port: 8085});
//只有websocket服务器连接上后才发送
wsServer.on("connection", websocket => {
  websocket.send("这个消息的服务器主动推送的。");
  websocket.on("message", message => {
    console.log("接受到的客户端的消息是："+message);
  });
});
//定时推送
setInterval(() => {
  if(wsServer.clients){   //如果有客户连到websocket服务器
    wsServer.clients.forEach(client => {
      client.send("这是定时推送");
    })
  }
}, 2000);
```

[back to top](#top)

<h2 id="MYSQL">6. MYSQL+NODE/EXPRESS</h2>

```javascript
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mysql = require('mysql'), myConnection = require('express-myconnection');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
// It has to be registered somewhere before app.router
app.use(myConnection(mysql, {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
}, 'single'));
app.use(app.router);
app.get('/', routes.index);
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
```

express-myconnection extends request object with the getConection(callback) function this way the connection instance can be accessed anywhere in routers during the request/response life cycle:

```javascript
exports.index = function (req, res, next) {
    req.getConnection(function (err, connection) {
        connection.query('SELECT ? AS RESULT', ['Hello World!'], function (err, results) {
            if (err) return next(err);

            res.render('index', {
                title: 'express-myconnection',
                result: results[0].RESULT
            });
        });
    });
};
```

[back to top](#top)

<h2 id="KOE">7. KOE</h2>

### 模拟接口

模拟接口的代码都写在`./mock`目录下，接口文件是`./mock/server.js`（目前只有这一个文件，真正开发项目时，应该会分不同模块）

```javascript
//server.js
var app = require('koa')();
var router = require('koa-router')();
var koaBody = require('koa-body')();
router.get('/', function *(next) {
    this.body = 'hello koa !'
});
router.get('/api', function *(next) {
    this.body = 'test data'
});
router.get('/api/1', function *(next) {
    this.body = 'test data 1'
});
router.get('/api/2', function *(next) {
    this.body = {
        a: 1,
        b: '123'
    }
});
router.post('/api/post', koaBody, function *(next) {
    console.log(this.request.body)
    this.body = JSON.stringify(this.request.body)
});
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);
```

然后在`./package.json`中增加如下代码，然后执行`npm run mock`即可启动模拟的接口服务。

```
  "scripts": {
    "mock": "node --harmony ./mock/server.js",
  },
```

启动之后，随便找一个 get 的接口，访问以下，例如`http://localhost:3000/api/1`

### 使用 webpack-dev-server 的代理

koa 接口的端口是`3000`，而我们项目的接口是`8080`，这样不就跨域了吗？————如果默认情况下，肯定是跨域了。此时就需要 webpack-dev-server 做一个代理的转发。配置代码在`./webpack.config.js`中

```javascript
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
// var nodeModulesPath = path.resolve(__dirname, 'node_modules')
// console.log(process.env.NODE_ENV)
module.exports = {
    entry: path.resolve(__dirname, 'app/index.jsx'),
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },

    resolve:{
        extensions:['', '.js','.jsx']
    },
    module: {
        // preLoaders: [
        //     // 报错 ？？？？？
        //     {test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: /node_modules/}
        // ],
        loaders: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!postcss!less' },
            { test: /\.css$/, exclude: /node_modules/, loader: 'style!css!postcss' },
            { test:/\.(png|gif|jpg|jpeg|bmp)$/i, loader:'url-loader?limit=5000' },  // 限制大小5kb
            { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader:'url-loader?limit=5000'} // 限制大小小于5k
        ]
    },

    eslint: {
        configFile: '.eslintrc' // Rules for eslint
    },

    postcss: [
        require('autoprefixer') //调用autoprefixer插件，例如 display: flex
    ],

    plugins: [
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // 打开浏览器
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],
    devServer: {
        proxy: {
          // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
          // koa 代码在 ./mock 目录中，启动命令为 npm run mock
          '/api': {
            target: 'http://localhost:3000',
            secure: false
          }
        },
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
}
```



> Reference
> [tsconfig.json配置](https://www.cnblogs.com/hnshi/p/7654842.html)
