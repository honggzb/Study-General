[**【编程过程中遇到的问题】**](#top)

- [Angular 2+](#angular)
  - [1. No base href set](#no-base-href-set)
  - [2. Can't bind to 'formGroup' since it isn't a known property of 'form'](#Cannot-bind-to-formGroup)
  - [3. angular2路由与express路由冲突的问题](#angular2路由与express路由冲突的问题)
  - [4. “Port 4200 is already in use” when running the ng serve command](#port4200)
  - [5. JavaScript heap out of memory](#JavaScript)
  - [6. Can't bind to 'ngModel' since it isn't a known property of 'input'](#input)
  - [7. ‘ANGULAR.JSON’ COULD NOT BE FOUND](#COULD-NOT-BE-FOUND)
  - [8. angular cli - install stuck when extract rxjs](#install-stuck-when-extract-rxjs)
  - [9. IE-嵌入iframe时候内容无法居中或变形(pop-up screen frozen)](#嵌入iframe时候内容无法居中或变形)
- [Angular MATERIAL](#angularM)
  - [1. Type 'ElementRef' is not generic](#ElementRef)
  - [2. unable to call a controller function from inside a custom-template with ui-typeahead](#ui-typeahead)
  - [3. Sub-menu items is not closing even after clicking outside the menu list](#Sub-menu)

<h2 id="angular">Angular 2+</h2>

<h3 id="no-base-href-set">1. no base href set -Angular 2 router no base href set</h3>

[angular io-routing](https://angular.io/docs/ts/latest/guide/router.html)

```html
<!-- Setting the base href  -->
 <head>
  <base href="/">
  <!-- 或 --> 
  <script>document.write('<base href="' + document.location + '" />');</script>
</head>
<javascript>
// alternative add  -http://stackoverflow.com/questions/34535163/angular-2-router-no-base-href-set
import {APP_BASE_HREF} from '@angular/common';
@NgModule({
  declarations: [AppComponent],
  imports: [routing /* or RouterModule */], 
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
]); 
</javascript>
```
 
 [back to top](#top)
 
<h3 id="Cannot-bind-to-formGroup">2. Can't bind to 'formGroup' since it isn't a known property of 'form'</h3>

http://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form

```javascript
//RC6/RC7/Final release FIX
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//...
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    //...
})
```

 [back to top](#top)
 
 <h3 id="angular2路由与express路由冲突的问题">3. angular2路由与express路由冲突的问题</h3>
 
 http://www.cnblogs.com/dh-dh/p/6405454.html
 
 ```javascript
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/*',function(req,res,next){
  console.log("index");
  res.sendFile(path.join(__dirname,'index.html'));
});
```
 
简单的方式就是把ng2定义的所有路由都转到index, static里面是ng2的各种js和style，然后剩下的除了ajax都转向index，这里express处理完了路由就会不往下处理，除非调用next（）。记得通配路由写在最后。
 
[back to top](#top)
 
<h3 id="port4200">3.“Port 4200 is already in use” when running the ng serve command</h3>

- 原因： 在运行ng serve时候使用CTRL+Z结束，其进程只是suspend而没有end
- 解决方法： 打开command line

```shell
cd c:\windows\system32
netstat -ano | findstr :4200   #查找在4200端口的进程PID，显示如下
#  TCP 127.0.0.1:4200 0.0.0.0:0  LISTENING 7488
taskkill /PID 7488 /F
```

https://stackoverflow.com/questions/39091735/port-4200-is-already-in-use-when-running-the-ng-serve-command

[back to top](#top)

<h3 id="JavaScript">4. JavaScript heap out of memory</h3>

**解决核心思路** - 运用v8引擎的旧属性: `--max_old_space_size` 来修改内存上线

`node xxx.js --max_old_space_size=8192`

**Webpack**

使用局部/本地的webpack，而不是全局安装的webpack来打包。通过给nodejs添加“--max_old_space_size=8192”来扩大内存来解决内存溢出问题

`set NODE_ENV=production && node --max_old_space_size=8192 node_modules/webpack/bin/webpack.js --config webpack.production.config.js`

Angular 4在`build --prod`的时候， 可能的原因有如下:

1. angular4 在编译的时候,对CPU和内存的需求比较大,当文件数量很多的时候,可能会出现内存不足的情况(有可能)
2. 当代码出现大量大数据的循环或者死循环(sever阶段并没有出现溢出,这个概率应该不大)
3. angular订阅的数据在 ngOnDestroy 阶段没有被销毁,造成大量数据占用内存(有可能)

```shell
# 修改:  my-project/node_modules/.bin  找到 ng.cmd 
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" --max_old_space_size=8192  "%~dp0\..\._@angular_cli@1.0.0@@angular\cli\bin\ng" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node --max_old_space_size=8192  "%~dp0\..\._@angular_cli@1.0.0@@angular\cli\bin\ng" %*
)
# 修改: my-project/node_modules/.bin  找到 ngc.cmd 
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" --max_old_space_size=8192  "%~dp0\..\._@angular_compiler-cli@4.0.1@@angular\compiler-cli\src\main.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node --max_old_space_size=8192  "%~dp0\..\._@angular_compiler-cli@4.0.1@@angular\compiler-cli\src\main.js" %*
)
# 把当前目录切换到 my-project/node_modules/.bin 然后再执行
ng build --prod
```

- [angular4 JavaScript内存溢出问题 (FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory)
](https://www.cnblogs.com/liugang-vip/p/6857595.html)
- [Node.js heap out of memory](https://stackoverflow.com/questions/38558989/node-js-heap-out-of-memory)

<h3 id="input">6. Can't bind to 'ngModel' since it isn't a known property of 'input'</h3>

`import { FormsModule } from '@angular/forms';`


<h3 id="COULD-NOT-BE-FOUND">7. ‘ANGULAR.JSON’ COULD NOT BE FOUND</h3>

**ERROR**: LOCAL WORKSPACE FILE (‘ANGULAR.JSON’) COULD NOT BE FOUND

**Reason**: your global @angular/cli , project @angular/cli version or @angular/compiler-cli doesn’t match

**Solution**:

```shell
ng -v    #check cli global version
#check cli project version in package.json
"@angular/cli": "6.0.0-rc.3",
"@angular/compiler-cli": "^5.2.0",
#solution
npm uninstall -D @angular/cli      #-D or -save-dev: uninstall project package
npm install -D @angular/cli@5.2.0  #-D or -save-dev: install project package
# upgrade global run @angular/cli
npm install -g @angular/cli@latest
```

<h3 id="install-stuck-when-extract-rxjs">8. angular cli - install stuck when extract rxjs</h3>

`npm i --unsafe-perm -g @angular/cli`

https://github.com/angular/angular-cli/issues/9942

<h3 id="嵌入iframe时候内容无法居中或变形">9. IE-嵌入iframe时候内容无法居中或变形(pop-up screen frozen)</h3>

- 同时导致： On IE browser, once this pop-up appears the screen is frozen and doesn't allow user to proceed further(WPM-21462)
- 前提： 使用了ts
- 解决方案： using [mdn-polyfills](https://github.com/msn0/mdn-polyfills) libraty

```javascript
//To support document's parentNode.children in IE, copied from -> https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children
(function (constructor) {
  'use strict';
  if (constructor &&
    constructor.prototype &&
    constructor.prototype.children == null) {
    Object.defineProperty(constructor.prototype, 'children', {
      get: function () {
        var i = 0,
        node,
        nodes = this.childNodes,
        children = [];
        //iterate all childNodes
        while (node = nodes[i++]) {
          //remenber those, that are Node.ELEMENT_NODE (1)
          if (node.nodeType === 1) {
            children.push(node);
          }
        }
        return children;
      }
    });
  }
  //apply the fix to all HTMLElements (window.Element) and to SVG/XML (window.Node)
})(window.Node || window.Element);
```

[back to top](#top)

<h2 id="angularM">Angular MATERIAL</h2>

<h3 id="ElementRef">2. Type 'ElementRef' is not generic</h3>

- **Reason**: the version of angular and angular material did not match
- **Solution**: change package.json, and delete node_modules directorty, and `npm install`

```
"dependencies": {
   "@angular/core": "^5.2.0",
   "@angular/cdk": "^5.2.0",
   "@angular/material": "^5.2.0"    
 },
```

<h3 id="ui-typeahead">2. unable to call a controller function from inside a custom-template with ui-typeahead</h3>

https://stackoverflow.com/questions/18441928/access-controller-scope-from-bootstrap-ui-typeahead-template

<h3 id="Sub-menu">3. Sub-menu items is not closing even after clicking outside the menu list</h3>

using `popover-trigger="outsideClick"` instead of `popover-trigger="focus"`

```html
<button uib-popover-template popover-trigger="outsideClick" ...>
<button uib-popover-template popover-trigger="focus" ...>
```

[back to top](#top)
