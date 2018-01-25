[Angular CLI](#top)

- [1. setup by using angular-cli](#setup-by-using-angular-cli)
  - [1.1 Updating Angular CLI](#Updating-Angular-CLI)
    - [1.1.1 创建新的Angular应用程序](#创建新的Angular应用程序)
    - [1.1.2 添加功能到现有的 Angular 应用程序](#添加功能到现有的Angular应用程序)
    - [1.1.3 运行应用程序&构建应用程序](#运行应用程序)
    - [1.1.4 eject and undo eject- 自定义构建流程](#eject)
    - [1.1.5 Updating Angular CLI](#Updating-Angular-CLI)
    - [1.1.6 using LESS/SASS preprocessor](#less)
  - [1.2 Proxy To Backend](#Proxy-To-Backend)
  - [1.3 Deploying the app via GitHub Pages](#Deploying-the-app-via-GitHub-Pages)
  - [1.4 Third Library Installation](#Library-Installation)
    - 1.1 bootstrap 4
    - 1.1 awesome font
    - 1.1 underscore
    - 1.1 d3
    - [1.4 angular material](#angular-material)
    - [1.5 less(ng new project_name --style less when create new project)](#less)
- [2. project struture the Angular CLI setup](#project-struture)
- [3. Adding an Express server to an Angular CLI project](#add-express)
- [4. Adding an Angular CLI project to JAVA Project](#add-java)
- [5.Create a Progressive Web App with Angular CLI](#Progressive-Web-App)

**Before starts**

- Angular CLI loads its configuration from `angular-cli.json`
- Angular CLI runs Webpack to build and bundle all JavaScript and CSS code
- Angular CLI starts **webpack dev server** to preview the result on `localhost:4200`

常用命令选项

```shell
ng new PROJECT_NAME
ng new PROJECT_NAME --style less   # --style to choose less as preprocessor
ng g c componentName --flat --inline-template --inline-styles
ng g c componentName --flat -it -is   #简写

``` 

<h2 id="setup-by-using-angular-cli">1. setup by using [angular-cli](https://cli.angular.io/)</h2>

[The Ultimate Angular CLI Reference Guide](https://www.sitepoint.com/ultimate-angular-cli-reference/)

<h3 id="创建新的Angular应用程序">1.1.1 创建新的 Angular 应用程序</h3>

```shell
npm install -g typescript@2.2.0   #npm install -g typescript
npm install -g @angular/cli
ng -version
#创建新的Angular应用程序
ng new PROJECT_NAME   #ng new PROJECT_NAME
ng init PROJECT_NAME  #ng new 与ng init的功能是相似的，只是ng new会创建新的目录
```

`ng new`命令选项

选项|默认值|类型|说明
---|---|---|---
--dry-run|boolean|default false|perform dry-run so no changes are written to filesystem,不会创建任何文件
--verbose| boolean|default false|
--link-cli|boolean|default false|automatically link the @angular/cli package
--skip-install|boolean|default false|skip npm install
--skip-git|boolean|default false|don’t initialize git repository,表示该目录不初始化为 git仓库
--skip-tests|boolean|default false|skip creating tests
--skip-commit|boolean|default false|skip committing the first git commit
--directory|string, name of directory to create|by default this is the same as the application name
--source-dir|string, default 'src'|name of source directory
--style|string|default 'css'|the style language to use ('css', 'less' or 'scss')
--prefix|string|default 'app'| the prefix to use when generating new components
--mobile|boolean|default false|generate a Progressive Web App application (see section on upcoming features)
--routing|boolean|default false|add module with routing information and import it in main app module
--inline-style, --is|boolean|default false|use inline styles when generating the new application
--inline-template, --it|boolean|default false| use inline templates when generating the new application

[back to top](#top)

<h3 id="添加功能到现有的Angular应用程序">1.1.2 添加功能到现有的 Angular 应用程序</h3>

Scaffold|Usage|short usage
---|---|---
Component|ng g component my-new-component|ng g c my-new-component
Directive|ng g directive my-new-directive|ng g d my-new-directive
Pipe|ng g pipe my-new-pipe|ng g p my-new-pipe
Service|ng g service my-new-service|ng g s my-new-service
Class|ng g class my-new-class|ng g cl my-new-class
Guard|ng g guard my-new-guard|
Interface|ng g interface my-new-interface|ng g i my-new-interface
Enum|ng g enum my-new-enum|ng g e my-new-enum
Module|ng g module my-module|ng g m my-module
destroy|`ng destroy my-new-component`|delete component, class...

options|function
---|---
--flat|Don't create the code in it's own directory. Just add all files to the current directory.
--route=<route>|Specify the parent route. Only used for generating components and routes.
--skip-router-generation|Don't create the route config. Only used for generating routes.
--default|The generated route should be a default route.
--lazy|Specify if route is lazy. default true

**create an component that has no own directory, no seperate html file and style file**

```shell
ng g c componentName --flat --inline-template --inline-styles
ng g c componentName --flat -it -is   #简写
``` 

```shell
$ ng generate class user-profile       # Generate class 'UserProfile'
$ ng generate class user-profile --spec   # Generate class 'UserProfile' with unit test
```

[back to top](#top)

<h3 id="运行应用程序*">1.1.3 运行应用程序&构建应用程序</h3>

**运行应用程序**

```shell
cd PROJECT_NAME
ng serve    #lite-server
# configure the default HTTP port and the one used by the LiveReload server
ng serve --host 0.0.0.0 --port 4201 --live-reload-port 49153ng build   #generate build artifacts will be stored in the dist/ directory, building Your Application for Production
"environments": {
  "source": "environments/environment.ts",
  "dev": "environments/environment.ts",
  "prod": "environments/environment.prod.ts"
}
ng build --target=production --environment=prod
ng build --prod --env=prod
ng build --prod
# and so are these
ng build --target=development --environment=dev
ng build --dev --e=dev
ng build --dev
ng build    #default to dev
#3 running unit tests
ng test    #executed via Karma, and it will automatically watch your files for changes.
ng test --watch=false  #tests a single time
ng test --single-run   #tests a single time, 同上
ng e2e  #Running end-to-end tests, run via Protractor.
#more commands
ng get   #Gets values for project
ng set   #Sets values for project
ng lint     #Run codelyzer to analyze code
ng format 
ng doc
ng version    #Get the version of the CLI
```

当运行`ng serve`后，将发生以下事情

- Angular CLI 从 .angular-cli.json 文件中加载配置信息
- Angular CLI 运行 Webpack 打包相关 JavaScript 和 CSS 文件
- Angular CLI 启动 webpack dev server 本地开发服务器，默认的地址是 localhost:4200

**构建应用程序**

```shell
ng build   #generate build artifacts will be stored in the dist/ directory, building Your Application for Production
ng build --target=production --environment=prod
ng build --prod --env=prod
ng build --prod
# and so are these
ng build --target=development --environment=dev
ng build --dev --e=dev
ng build --dev
ng build    #default to dev
#3 running unit tests
ng test    #executed via Karma, and it will automatically watch your files for changes.
ng test --watch=false  #tests a single time
ng test --single-run   #tests a single time, 同上
ng e2e  #Running end-to-end tests, run via Protractor.
#more commands
ng get   #Gets values for project
ng set   #Sets values for project
ng lint     #Run codelyzer to analyze code
ng format 
ng doc
ng version    #Get the version of the CLI
```

当运行`ng build`后，将发生以下事情

- Angular CLI 从 .angular-cli.json 文件中加载配置信息
- Angular CLI 运行 Webpack 打包项目相关的 JavaScript 与 CSS 文件
- 打包后的资源，将被输出到配置文件中 outDir 所指定的目录，默认是输出到 dist 目录

`ng build`可用选项

- `--aot`: 开启 ahead-of-time 编译
- `--base-href`: string, 设置 index.html 文件中 <base> 元素的链接地址
- `--environment`: string, 设置所使用的环境，默认为 dev
- `--output-path`: string, 设置输出的路径
- `--target: string`, 设置所使用的环境，默认为development, 它的可选值
  - development: 默认的模式，意味着不进行代码压缩或混淆
  - production: 压缩和混淆代码
- `--watch: boolean`, 默认为 false, 开启 watch 模式，监听文件异动并自动重新构建

**Environments**

可以在angular-cli.json 文件中定义自己的environments文件

```javascript
//angular-cli.json
"environments": {
  "source": "environments/environment.ts",
  "dev": "environments/environment.ts",
  "prod": "environments/environment.prod.ts"
}
//dev: environments/environment.ts
export const environment = {
  production: false
};
//prod: environments/environment.prod.ts
export const environment = {
  production: true
};
```

在 src/main.ts文件中通过导入 ./environments/environment 文件，就可访问到 environment 相关的配置信息

```javascript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
```

[back to top](#top)

<h4 id="eject">1.1.4 eject and undo eject- 自定义构建流程</h4>

1. 执行 `ng eject` : will generate `webpack.config.js` file, can not use ng command
2. `undo eject` :  modify angular-cli.json file in root directory, delete `"ejected": true`, also `webpack.config.js` file can be deleted

```javascript
"project": {
  "name": "YOUR PROJECT NAME",
  "ejected": true
},
```

运行`ng eject`命令后，在幕后将发生以下事情：

- ejected: true 的属性被添加到 .angular-cli.json 文件中
- 在应用程序的根目录下将生成独立的 webpack.config.js 文件，因此你可以在没有使用 Angular CLI 的环境下构建项目
- package.json 中的构建脚本会被更新，因此你可以运行 npm run build 来构建项目
- package.json 中的测试脚本会被更新，因此你可以运行 npm run test 来运行单元测试
- package.json 中的启动脚本会被更新，因此你可以运行 npm run start或npm start来启动开发服务器
- package.json 中的 e2e 脚本会被更新，因此你可以运行 npm run e2e 来运行End-to-End 测试

[back to top](#top)

<h4 id="Updating-Angular-CLI">1.1.5 Updating Angular CLI</h4>

```shell
npm uninstall -g angular-cli
npm uninstall --save-dev angular-cli
#global package:
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@latest
#Local project package:
rm -rf node_modules dist # use rmdir /S/Q node_modules dist in Windows Command Prompt; use rm -r -fo node_modules,dist in Windows PowerShell
npm install --save-dev @angular/cli@latest
npm install
```

[back to top](#top)

<h4 id="less">1.1.6 using LESS/SASS preprocessor</h4>

- New Project:  `ng new my-app --style less`
- Existing PROJECT
  - edit `.angular-cli.json` file and set `"defaults": { "styleExt": "less",`. Or can simply use: `ng set defaults.styleExt less`
  - Rename all component's CSS file from xxx/xxx.component.css -> xxx/xxx.component.less
  - Update styleUrls in xxx/xxxx.component.ts, e.g. styleUrls: ['./xxx.component.css'] -> styleUrls: ['./xxx.component.less']

[back to top](#top))

<h4 id="Proxy-To-Backend">1.2 Proxy To Backend</h4>

- create a `proxy.conf.json` file

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

- edit the `package.json` file:  `"start": "ng serve --proxy-config proxy.conf.json",`


<h4 id="Deploying-the-app-via-GitHub-Pages">1.3 Deploying the app via GitHub Pages</h4>

`ng github-pages:deploy --message "Optional commit message"`

<h4 id="Library-Installation">1.4 Library Installation</h4>

- 3rd Party Library Installation 

```shell
#1) the library does not include typings
npm install d3 --save
npm install @types/d3 --save-dev
#2) the library doesn't have typings available at @types/
# create a typings.d.ts file in your src/ folder
# in src/typings.d.ts, add the following code
declare module 'typeless-package';
# in the component or file that uses the library, add the following code
import * as typelessPackage from 'typeless-package';
typelessPackage.method();
```

- Global Library Installation

##Paths in angular-cli.json are relative to the src directory##

```shell
#1) install bootstrap 4
npm install bootstrap@next
#add the needed script files in angular-cli.json file in root directory
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/tether/dist/js/tether.js",
  "../node_modules/bootstrap/dist/js/bootstrap.js"
],
#add the Bootstrap CSS to the apps[0].styles array
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.css",
  "styles.css"
],
#2) add font-awesome(https://www.npmjs.com/package/angular2-fontawesome)
npm install font-awesome --save
#modify and add in angular-cli.json file in root directory
{
  "apps": [
    {
      "styles": [
        "../node_modules/font-awesome/css/font-awesome.css"
      ]
    }
  ],
  "addons": [
    "../node_modules/font-awesome/fonts/*.+(otf|eot|svg|ttf|woff|woff2)"
  ]
}
# 3) add underscore
npm install -g typescript@next
npm install underscore --save
npm install @types/underscore --save-dev
#in tsconfig.app.json, add underscore to array 'types'
"types": [
  "underscore"
]
#modify and add in angular-cli.json file in root directory
"scripts": [
        "../node_modules/jquery/dist/jquery.js",
        "../node_modules/underscore/underscore.js"
      ],
#add in polyfills.js
import 'underscore/underscore';
#use in components
import * as _ from 'underscore';
...
var res = underscore.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); });
console.log(res);
# 4) d3
npm install d3 --save
npm install @types/d3 --save-dev
#use in components
import * as d3 from 'd3';
# Restart ng serve
```

-- [how-to-add-bootstrap-to-an-angular-cli-project](http://stackoverflow.com/questions/37649164/how-to-add-bootstrap-to-an-angular-cli-project)

> 注意： 最新的angular-cli new去除了jquery

1.  `npm install bootstrap ngx-bootstrap --save`
2. Importing the CSS
	- configure `.angular-cli.json`
	- import directly in src/style.css, `@import '~bootstrap/dist/css/bootstrap.min.css';`
3. Bootstrap JavaScript Components with ngx-bootstrap

`npm install ngx-bootstrap --save   #ng2-bootstrap and ngx-bootstrap are the same package`

Adding the required Bootstrap modules in app.module.ts

```javascript
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  // ...
})
export class AppBootstrapModule {}
```

或

```javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppBootstrapModule {}
```

将AppBootstrapModule引入app.module.ts

```javascript
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';

@NgModule({
  imports: [BrowserModule, AppBootstrapModule],
  // ...
})
export class AppModule {}
```

4. Bootstrap 4 JavaScript Components with ng-bootstrap (Option 2)

```
npm install --save @ng-bootstrap/ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [ NgbModule.forRoot(), ... ],  
  // ...
})
export class AppModule {}
```

[back to top](#top)

<h4 id="less">1.5 less</h4>

1) `ng new project_name --style less`   when create a new project

2) 'npm install less --save`

[back to top](#top)

```
1) install(https://material.angular.io/guide/getting-started)
npm install --save @angular/material
2) Import the component modules
import {MdListModule} from '@angular/material';
@NgModule({
  ...
  imports: [MdListModule],
  ...
})
//alternatively, can create a separate NgModule
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
@NgModule({
  imports: [MdButtonModule, MdCheckboxModule],
  exports: [MdButtonModule, MdCheckboxModule],
})
export class MyOwnCustomMaterialModule { }
3) using themes, include the following in your app's index.html:
<link href="../node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
4) using material icon, include the following in your app's index.html:
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
using md-icon in component html
<md-icon md-list-icon class="material-icons">folder</md-icon>
5) using material Animations: some Material components depend on the Angular animations module in order to be able to do more advanced transitions
npm install --save @angular/animations
in components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class PizzaPartyAppModule { }
6) Gesture Support: Some components (md-slide-toggle, md-slider, mdTooltip) rely on HammerJS for gestures
npm install --save hammerjs
import it on your app's root module.
import 'hammerjs';
```

> Note: update angular 2 to 4 if failed

```shell
npm cache clean
npm install @angular/common@latest @angular/compiler@latest @angular/compiler-cli@latest @angular/core@latest @angular/forms@latest @angular/http@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/platform-server@latest @angular/router@latest @angular/animations@latest typescript@latest --save
npm i @angular/compiler-cli@next --D -E
```

<h4 id="angular-material">1.5 [using Angular Material](https://material.angular.io/)</h4>

[back to top](#top)

<h3 id="project-struture">2. project struture the Angular CLI setup</h3>

![](http://i.imgur.com/0TEd7d8.png)

```
// configuration files
|- config/
|----- environment.dev.ts
|----- environment.js
|----- environment.prod.ts
|----- karma-test-shim.js
|----- karma.conf.js
|----- protractor.conf.js
// end-to-end-tests
|- e2e/
|----- app.e2e.ts
|----- app.po.ts
|----- tsconfig.json
|----- typings.d.ts
// npm dependencies
|- node_modules/
// public facing app. built things go here
|- public/

// where most of the work will be done
|- src/
|----- app/
            |----- shared/
                        |----- index.ts
            |----- environment.ts
            |----- index.ts

            // our first generated component
            |----- scotchy-scotch.component.css|html|spec.ts|ts
|----- favicon.ico
|----- icon.png
|----- index.html
|----- main.ts
|----- manifest.webapp
|----- system-config.ts
|----- tsconfig.json
|----- typings.d.ts
// overall configuration
|- typings/
|- .clang-format
|- .editorconfig
|- .gitignore
|- angular-cli-build.js
|- angular-cli.json
|- package.json
|- tslint.json
|- typings.json
```

[back to top](#top)

<h3 id="add-express">3. Adding an Express server to an Angular CLI project</h3>

https://github.com/Matt-Dionis/tweet-dashboard

3.1  build a new folder and new js file - /node_server/server.js

```javascript
var express = require('express');
var http = require('http');
var path = require('path');
const twit = require('twitter');
var app = express();
const mapData = require('./us-states.json');
var port = process.env.PORT || 3000;
var router = express.Router();
var staticRoot = __dirname;
const twitter = new twit({
  consumer_key: "IiexMcElOxcLYtnySucToE6MY",
  consumer_secret: "U7UgS1roZMcV7j8SQuUAx8jvKzFZAyxVbpZizwkluUqtDzg87Q",
  access_token: "2364992047-cOFtCwYx7AItAY2OoB07DcA9XINFJZ4rU4hsXWZ",
  access_token_secret: "lPGnTFfNTuhJ3lYtiiau3DwEkVw2CjZLTG9dwV4k3ignH"
});
app.set('port', (port));
app.use(express.static(staticRoot));
app.get('/', function(req, res) {
  res.sendFile('index.html');
});
var server = http.createServer(app).listen(port, function() {
  console.log('Server listening on port ' + port);
});
var io = require('socket.io').listen(server);
app.get('/stream/:searchTerm', function(req, res, next) {
  const searchTerm = req.params.searchTerm;
  twitter.stream('statuses/filter', {track: searchTerm}, (stream) => {
    stream.on('data', (data) => {
      data.location = data.geo ? data.geo.coordinates : [];
      //console.log(data);
      const tweet = {
        created_at: data.created_at,
        text: data.text,
        username: data.user ? data.user.screen_name : '',
        followers_count: data.user ? data.user.followers_count : '',
        following_count: data.user ? data.user.friends_count : '',
        statuses_count: data.user ? data.user.statuses_count : '',
        profile_image_url: data.user ? data.user.profile_image_url : '',
        coordinates: data.location
      };
    });
  
    stream.on('error', (error) => {
      throw error;
    });
  });  
});  
app.get('/mapData', (req, res) => {
  res.status(200).json({data: mapData});
});
```

3.2 modifing package.json and adding code

```json
"scripts": {
    "ng": "ng",
    ...
    "build:nodeserver": "ng build && cp node_server/* dist",
    "build:nodeserver-prod": "ng build -prod && cp node_server/* dist",
    "serve-build": "npm run build:nodeserver && cd dist && node server.js",
    "serve-build-prod": "npm run build:nodeserver-prod && cd dist && node server.js"
  },
```

[back to top](#top)

<h3 id="add-java">4. Adding an Angular CLI project to JAVA Web Project</h3>

1. create new angular project in frontend directory

![](http://i.imgur.com/wacWLf3.png)

2. modify angular-cli.json in root directory, change outDir to Java Web project directory, such as java springboot

```
"outDir": "../src/main/webapp",
```

3. using Http Service in Angular project to call backend api

4. If using proxy

 modify package.json in root directory
 
 ```json
 "scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy-conf.json",
    "build": "ng build -prod",
	  "postbuild": "npm run deploy",
	  "predeploy": "rimraf ../resources/static/ && mkdirp ../resources/static",
	  "deploy": "copyfiles -f dist/** ../resources/static",
    "test": "ng test",
	  "pree2e": "webdriver-manager update --standalone false --gecko false",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
 ```
 
 create proxy-conf.json in root directory
 
 ```json
 {
  "/api": {
    "target": "http://127.0.0.1:8080",
    "secure": false
  }
}
 ```

[back to top](#top)

<h3 id="Progressive-Web-App">5.Create a Progressive Web App with Angular CLI</h3>

https://github.com/angular/mobile-toolkit/blob/master/guides/cli-setup.md

```shell
ng new hello-mobile --mobile
cd hello-mobile
```

- A Web Application Manifest to give browsers information to properly install your app to the home screen
- A build step to generate an App Shell from your app's root component
- A Service Worker script to automatically cache your app for fast loading, with or without an internet connection
  - Note: the Service Worker is only installed in production mode, i.e. via `ng serve --prod` or `ng build --prod`
- Deploying a manifest:  `<link rel="manifest" href="/manifest.json">`

**Manifest Further Reading**

- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) (Mozilla Developer Network)
- [Installable Web Apps with the Web App Manifest in Chrome for Android](https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android?hl=en) (Google Developers)
- [Installable Web Apps and Add to Home screen](https://dev.opera.com/articles/installable-web-apps/) (Dev.Opera)

[back to top](#top)

> Reference

- https://github.com/angular/angular-cli
- https://www.sitepoint.com/ultimate-angular-cli-reference/
- [Angular CLI 终极指南](https://segmentfault.com/a/1190000009771946)
