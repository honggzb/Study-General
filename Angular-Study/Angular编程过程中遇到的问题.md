**【编程过程中遇到的问题】**[**](#top)

1. [No base href set](#no-base-href-set)
2. [Can't bind to 'formGroup' since it isn't a known property of 'form'](#Cannot-bind-to-formGroup)
3. [angular2路由与express路由冲突的问题](#angular2路由与express路由冲突的问题)
4. [“Port 4200 is already in use” when running the ng serve command](#port4200)

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
