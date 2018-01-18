[node+express创建服务器](#top)

- [1. 初始化环境](#初始化环境)
  - 设置自动编译typescript
  - 在VSCode使用d.ts文件进行js智能提示
- [2. 最简单的Node服务器](#最简单的服务器)
- [3. Node+Express](#Node+Express)
- [4. 配置angular使用express服务器](#配置angular使用express服务器)

<h2 id="初始化环境">1. 初始化环境</h2>

```shell
mkdir server
cd server
npm init -y                #初始化一个node项目
npm i @types/node --save   #引入node的typescripe类型定义文件
touch tsconfig.json        #创建配置文件，定义如何将typescript编译为javascript
tsc --init                 #安装typescript后自动创建tsconfig.json文件的命令
tsc -w                     #将typescript编译为javascript并watching for file changes
```

**tsconfig.json案例**

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
npm i -g nodemon       #实时监控服务器
nodemon build/aution_server.js
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

> Reference
> [tsconfig.json配置](https://www.cnblogs.com/hnshi/p/7654842.html)
