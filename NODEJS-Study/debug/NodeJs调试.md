[NodeJs调试](#top)

- [1. 基于Nodejs内建的调试器- debugger](#debugger)
- [2. 基于Chrome浏览器的调试器Node inspector- server side debug](#基于Chrome浏览器的调试器)
- [3. debugging with Chrome Devtool](#Devtool)

<h2 id="debugger">1. 基于Nodejs内建的调试器- debugger</h2>

```JavaScript
var path = url.parse(req.url).pathname;
debugger;
res.writeHead(200, {'Content-Type': 'text/plain'});
```

![](https://i.imgur.com/HVNwuhk.png)

- 在程序中添加断点：在行中添加`debugger;`
- 运行程序的方式是：在执行命令中添加debug:例如：`node debug debug.js;`, 就可以进入调试模式
	- 首先执行`cont`，进入第一个断点，然后运行命令`repl`，后就可以对变量的值进行查询
	- 然后可使用`ctrl+c`, 退出此次的查询，然后在用`cont`，进入下一个断点，输入`repl`，依然可以查询第二个断点之前的变量的值，然后依次类推，进入到程序结束

| 命令 | 功能 |
| :------------- | :------------- |
| run |执行脚本，在第一行暂停 |
|rstart   |重新执行脚本   |
|cont, c   |继续执行，直到遇到下一个断点   |
|next, n   |单步执行   |
|step, s   |单步执行并进入函数   |
|out, o   | 从函数中步出  |
|setBreakpoint(), sb()   |在当前行设置断点   |
|setBreakpoint('f()'), sb(...)   |在函数f的第一行设置断点   |
|setBreakpoint('script.js', 20), sb(...)   |在script.js的第20行设置断点   |
|clearBreakpoint, cb(...)   |清除所有断点   |
|backtrace, bt   |显示当前的调试栈   |
|list(5)   |显示当前执行到的前后5行代码   |
|watch(expression)   |把表达式加入监视列表   |
|unwatch(expression)   |把表达式移出监视列表   |
|watches   |显示监视列表中使用表达式和值   |
|repl   |在当前上下文打开即时求值环境   |
|kill   |终止当前执行的脚本   |
|scripts   |显示当前已加载的所有脚本   |
|version   |显示v8的版本   |

[back to top](#top)

<h2 id="基于Chrome浏览器的调试器">2. 基于Chrome浏览器的调试器- server side debug</h2>

- Node Inspector这个第三方工具是由dannycoates （Danny Coates）所创建
- 所需要的测试条件为：Webkit内核的浏览器(如：Chrome或者Safari)
- 作用：Node Inspector让我们可以使用Webkit Javascript调试器来按步来执行代码.
- 功能：
  - 浏览应用程序的源代码
  - 使用终端来与应用程序交互
  - 添加或移除断点
  - 按步执行代码中的函数调用
  - 步入，步出函数
  - 设置观察表达式
  - 查看代码中不同点上的堆栈踪迹
  - 查看作用域变量

**在计算机上安装Node Inspector**

`npm install -g node-inspector`

**启动Node Inspector的过程分为两部分**

1. node-inspector是通过websocket方式来转向debug输入输出的。因此，在调试前要先启动node-inspector来监听Nodejs的debug调试端口, 在启动node-inpspector之后，可以通过`--debug`或`--debug-brk`来启动nodejs程序

`node --debug-brk debug.js`

2. 在另外的一个cmd窗口运行 `node-inspector`, 默认情况下node-inspector的端口是8080，可以通过参数`--web-port=[port]`来设置端口
3. 在浏览器输入`http://[ip address]:8080/debug?port=5858`，会得到调试窗口

![](2012011521141853.png)

4. 使用Grunt可实现automation

编辑package.json, 加入：

```javascript
"scripts": {
  "predebug":"grunt",
  "debug": "open http://localhost:3000 & open http://localhost:8080/debug?port=5858",
  "postdebug":"node-inspector & node --debug app",
},
```

在命令行直接执行： `npm run debug`

[back to top](#top)

<h2 id="Devtool">3. debugging with Chrome Devtool</h2>

### Needs

- Node.js 6.3+
- Chrome 55+ [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html)

### Enable Nodejs debugging in Chrome

1. Method 1:

- `node --inspect --debug-brk build/auction_server.js`
- it will print -->  copy URL in Chrome

```
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector
.html?experiments=true&v8only=true&ws=127.0.0.1:9229/e7893dfd-d183-4de0-bb5c-df9f81ded041
Debugger attached.
```

**or make it easiler** - https://hackernoon.com/debug-node-js-with-chrome-devtools-aca7cf83af6b

```
npm install -g inspect-process 
inspect --debug-brk build/auction_server.js
```

![](https://i.imgur.com/5iopeXl.png)

[Debugging Node.js with Google Chrome](https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4)
	
2. Mehtod 2:
	- Open the `chrome://flags/#enable-devtools-experiments` URL
	- Enable the Developer Tools experiments flag
	- Relaunch Chrome
	- Open DevTools Setting -> Experiments tab (it started being visible after the reload)
	- Press "SHIFT" 6 times ( enjoy it  ~~~~(>_<)~~~~  to show the hidden experiments
	- Check the "Node debugging" checkbox
	- Open/close DevTools

![](https://i.imgur.com/HMpw21w.png)

### debug

`node --inspect node.js`

https://blog.hospodarets.com/nodejs-debugging-in-chrome-devtools?utm_source=nodeweekly&utm_medium=email#enable-a-new-way-of-nodejs-debugging-in-chrome

[back to top](#top)

> reference: 
- [欲善其功，必先利其器--Nodejs调试技术总结](http://www.cnblogs.com/moonz-wu/archive/2012/01/15/2322120.html)
- [node程序的debug调试方式详细步骤](https://www.cnblogs.com/zhushunli/p/6278417.html)

