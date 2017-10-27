## [chrome developer tool 调试技巧](#top)

- [1. Beautify Javascript](#)
- [2. 查看元素绑定了哪些事件](#查看元素绑定了哪些事件)
- [3. Ajax时中断](#Ajax时中断)
- [4. 页面事件中断](#页面事件中断)
- [5. Javascript 异常时中断](#Javascript异常时中断)
- [6. DOM Level 3 Event 事件中断](#Event事件中断)
- [7. 所有 js 文件中搜索&查找 js 函数定义](#文件中搜索)
- [8. command line api](#command-line-api)  --**非常有用  `$0等`**
- [9. Edit Mode: Edit any text on the page](#Edit-Mode)  --**非常有用  `document.designMode = "on"`**
- [10. console中执行的代码可断点](#console中执行的代码可断点)
- [11. Run snippets of code from any page](#snippets)
- [12. paint profiler in Chrome DevTools](#paint-profiler)
- [13. Layers Panel](#Layers-Panel)
- [14. memory Panel](#memory-Panel)
- [15. Save as HDR in network Panel](#HDR)
- [16. using the console](#console)
  - [16.1 console.assert(expression, object)](#consolelog)
  - [16.2 console.table- quick way to see data](#consoletable)
  - [16.3 占位符](#占位符)
  - [16.4 分组显示-console.group()和console.groupEnd](#分组显示)
  - [16.5 查看对象的信息-console.dir](#查看对象的信息)
  - [16.6 显示某个节点的内容-console.dirxml](#显示某个节点的内容)
  - [16.7 追踪函数的调用轨迹-console.trace](#追踪函数的调用轨迹)
  - [16.8 显示代码的运行时间-console.time和console.timeEnd](显示代码的运行时间)
  - [16.9 性能分析-console.profile](#性能分析)
  - [16.10 Quick-find a function to debug](#Quick-find)
- [17. debug nodeJS](#nodeJS)

<h3 id="查看元素绑定了哪些事件">2. 查看元素绑定了哪些事件</h3>

- 在 Elements 面板, 选中一个元素, 然后在右侧的 Event Listeners 下面会按类型出这个元素相关的事件, 也就是在事件捕获和冒泡阶段会经过的这个节点的事件.
- 在 Event Listeners 右侧下拉按钮中可以选择 Selected Node Only 只列出这个节点上的事件
- 展开事件后会显示出这个事件是在哪个文件中绑定的, 点击文件名会直接跳到绑定事件处理函数所在行, 如果 js 是压缩了的, 可以先 Pretty print 下, 然后再查看绑定的事件.

<h3 id="Ajax时中断">3. Ajax 时中断</h3>

在 Scripts 面板右侧有个 XHR Breakpoints, 点右侧的 + 会添加一个 xhr 断点, 断点是根据 xhr 的 url 匹配中断的, 如果不写匹配规则会在所有 ajax, 这个匹配只是简单的字符串查找, 发送前中断, 在中断后再在 Call Stack 中查看时那个地方发起的 ajax 请求

<h3 id="页面事件中断">4. 页面事件中断</h3>

除了给设定常规断点外, 还可以在某一特定事件发生时中断(不针对元素) , 在Scripts面板右侧, 有个 Event Listener Breakpoints, 这里列出了支持的所有事件, 不仅 click, keyup 等事件, 还支持 Timer(在 setTimeout setInterval 处理函数开始执行时中断), onload, scroll 等事件.

<h3 id="Javascript异常时中断">5. Javascript 异常时中断</h3>

Pretty print 左侧的按钮是开启 js 抛异常时中断的开关, 有两种模式：在所有异常处中断, 在未捕获的异常处中断. 在异常处中断后就可以查看为什么抛出异常了

<h3 id="Event事件中断">6. DOM Level 3 Event 事件中断</h3>

在 Elements 面板, 选中一个元素右键, 有两个选项：Break on subtree modifications, Break on attributes modifications, 这两个对应 DOM Level 3 Event 中的DOMSubtreeModified , DOMSubtreeModified 事件 在 Scripts 面板 DOM Breakpoints 处会列出所有 level3 的 event 中断

<h3 id="文件中搜索">7. 所有 js 文件中搜索&查找 js 函数定义</h3>

在 chrome developer tool 打开的情况下, 按 ctrl + shift + F, 在通过 js 钩子查找代码位置时很有用, 查找支持正则表达式

- 查找函数定义: ctrl + shift + 0 (在 Scripts panel 下)
- 查找文件: ctrl + o (在 Scripts panel 下)
- 更多快捷键: 在 chrome developer tool 中按 ? 查看帮助

<h3 id="command-line-api">8. command line api</h3>

- $(id_selector) 这个与页面是否有 jQuery 无关
- $$(css_selector)
- $0, $1, $2, $3, $4
  - Elements 面板中最近选中的 5 个元素, 最后选择的是 $0， 这个5个变量时先进先出的
- `$r` is a reference to the react component
- copy(str) 复制 str 到剪切板, 在断点时复制变量时有用
- monitorEvents(object[, types])/unmonitorEvents(object[, types])
  - 当 object 上 types 事件发生时在 console 中输出 event 对象
- 更多 console api 请 console.log(console) 或 [【点击】](http://getfirebug.com/wiki/index.php/Console_API#console.trace.28.29)
- 更多 command line api  [【点击】](http://getfirebug.com/wiki/index.php/Command_Line_API)

[back to top](#top)

<h3 id="Edit-Mode">9. Edit Mode: Edit any text on the page</h3>

- type `document.designMode = "on"` in console to turn on design mode, then click and type any text on the page

<h3 id="console中执行的代码可断点">10. console中执行的代码可断点</h3>

在 console 中输入代码的最后一行加上 //@ sourceURL=filename.js, 会在 Scripts 面板中有个叫 filename.js 的文件, 然后他就和外部 js 文件一样了

<h3 id="snippets">11. Run snippets of code from any page</h3>

- [Run snippets of code from any page
](https://developers.google.com/web/tools/chrome-devtools/debug/snippets/?hl=en) - `Source -> Snippets`
- the snippet code will behave the same as your application code with regards to DOM access, relative URLs, cookies, and CORSs stuff

<h3 id="paint-profiler">12. paint profiler in Chrome DevTools</h3>

need to click on the Paint event in the Event Log tab first. On the right-hand side, you will then see a Preview section with a Paint Profiler link

![](http://i.imgur.com/5aLaA9f.png)

[back to top](#top)

<h3 id="Layers-Panel">13. Layers Panel</h3>

1. Go to chrome://flags and enable “Enable Developer Tools experiments.”
2. Restart Chrome
3. Open Chrome DevTools
4. Click “Settings” (the gear icon in the upper right corner)
5. Click on “Experiments” in the left menu
6. Check the “Layers panel” option
7. Close, then re-open Chrome DevTools

Now you should see the “Layers” tab (https://www.sencha.com/blog/hidden-gems-in-chrome-developer-tools/)

[back to top](#top)

<h3 id="memory-Panel">14. memory Panel</h3>

- Snapshot, save, import heap profile
- use comparison view to identify potential memory leaks
- use summary view to identify DOM leaks

[back to top](#top)

<h3 id="console">16. using the console</h3>

[Console命令详解,让调试js代码变得更简单](http://www.cnblogs.com/kiter/p/3943342.html)

```javascript
console.info("这是info");
console.debug("这是debug");
console.warn("这是warn");
console.error("这是error");
console.clear();
```

<h4 id="consolelog">16.1 console.assert(expression, object)</h4>

console.assert()用来判断一个表达式或变量是否为真。如果结果为否，则在控制台输出一条相应信息，并且抛出一个异常

```javascript
var myArray = [];
console.assert(myArray.length>=1, 'myArray length was not greater than 1.')
```

<h4 id="consoletable">16.2 console.table()- quick way to see data</h4>

```javascript
function fourthFunction(){
  totalFunctionCalled++;
  $.getJson('data/data.json', function(data){
    var items=[], className='';
    $.each(data, function (i) {
      className = ( i===4) ? 'highlight' : '';
      items.push('<li id="obj" + data[i].index +'" class="'+'</li>)
    });
    $('<ul/>', {
      'class': 'person-list', html: items.join('')
    }).appendTo('.list-container');
    console.clear();
    console.table(data, ['name','gender','email']);
  })
}
```

<h4 id="占位符">16.3 占位符</h4>

支持的占位符有：字符（`%s`）、整数（`%d`或`%i`）、浮点数（`%f`）和对象（`%o`）

```javascript
console.log("%d年%d月%d日",2011,3,26);
console.log("圆周率是%f",3.1415926);
//%o占位符，可以用来查看一个对象内部情况
var dog = {} ;
dog.name = "大毛" ;
dog.color = "黄色";
console.log("%o",dog);
```

<h4 id="分组显示">16.4 分组显示-console.group()和console.groupEnd()</h4>

```javascript
console.group("第一组信息");
  console.log("第一组第一条");
  console.log("第一组第二条");
console.groupEnd();
console.group("第二组信息");
  console.log("第二组第一条");
  console.log("第二组第二条");
console.groupEnd();
```

<h4 id="查看对象的信息">16.5 查看对象的信息-console.dir()</h4>

console.dir()可以显示一个对象所有的属性和方法。

```javascript
var info = {
  blog:"http://www.jb51.net",
  QQGroup:80535344,
  message:"程序爱好者欢迎你的加入"
};
console.dir(info);
```

<h4 id="显示某个节点的内容">16.6 显示某个节点的内容-console.dirxml()</h4>

console.dir()可以显示一个对象所有的属性和方法。

```javascript
var info = document.getElementById('info');
console.dirxml(info);    //将显示节点id为info的html内容
```

<h4 id="追踪函数的调用轨迹">16.7 追踪函数的调用轨迹-console.trace()</h4>

```javascript
function add(a,b){
  console.trace();
　return a+b;
}
var x = add3(1,1);
function add3(a,b){return add2(a,b);}
function add2(a,b){return add1(a,b);}
function add1(a,b){return add(a,b);}
```

<h4 id="显示代码的运行时间">16.8 显示代码的运行时间-console.time()和console.timeEnd()</h4>

```javascript
console.time("控制台计时器一");
for(var i=0;i<1000;i++){
　　for(var j=0;j<1000;j++){}
}
console.timeEnd("控制台计时器一");   //输出‘控制台计时器一: 4.0439453125ms’
```

<h4 id="显示代码的运行时间">16.9 性能分析-console.profile()</h4>

```javascript
function All(){
  alert(11);
　for(var i=0;i<10;i++){
    funcA(1000);
  }
  funcB(10000);
}
function funcA(count){
  for(var i=0;i<count;i++){}
}
function funcB(count){
　for(var i=0;i<count;i++){}
}
console.profile('性能分析器');
All();
console.profileEnd();
```

[back to top](#top)

<h4 id="Quick-find">16.10 Quick-find a function to debug</h4>

the most common way is

1. Find the line in your inspector and add a breakpoint
2. Add a debugger in your script

**Quick way**

```javascript
var func1 = function() {
	func2();
};
var Car = function() {
	this.funcX = function() {
		this.funcY();
	}
	this.funcY = function() {
		this.funcZ();
	}
}
var car = new Car();
```

type `debug(car.funcY)` in the console, it will stop in debug mode when it gets a function call to car.funcY

[back to top](#top)

<h3 id="nodeJS">17. debug nodeJS</h3>

`node2 --inspect backend/app.js`

will generate a url, copy it to browser url, you will see the backend node js file and debug it

[back to top](#top)

> Reference

- https://developers.google.com/web/tools/chrome-devtools/
- [Twelve Fancy Chrome DevTools Tips](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
- http://www.cnblogs.com/suizhikuo/archive/2012/06/05/2537290.html
- [Console命令详解,让调试js代码变得更简单](http://www.cnblogs.com/kiter/p/3943342.html)
