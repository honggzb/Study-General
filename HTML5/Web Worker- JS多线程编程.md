## [Web Worker- JS多线程编程](#top)

- [1. Web Worker的限制](#Web-Worker的限制)
- [2. Web Worker的种类](#Web-Worker的种类)
- [3. webWorker之常用ＡＰＩ](#webWorker之常用ＡＰＩ)
- [4. Web Worker上下文](#WebWorker上下文)
- [5. Web Worker使用XMLHttpRequest与服务端通信](#WebWorker使用XMLHttpRequest与服务端通信)
- [6. webWorker之chrome运行](#webWorker之chrome运行)

HTML5引入了一个工作线程（webWorker）的概念。它允许开发人员编写能够长时间运行而不被用户所中断的后台程序，去执行事务或者逻辑，并同时保证页面对用户的响应。

简而言之，就是允许JavaScript创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。 从而，可以用webWorker来处理一些比较耗时的计算。

![](http://i.imgur.com/BPM2Bwq.png)

- 可以加载一个JS进行大量的复杂计算而不挂起主进程，并通过postMessage，onmessage进行通信
- 可以在worker中通过importScripts(url)加载另外的脚本文件
- 可以使用 setTimeout(), clearTimeout(), setInterval(), and clearInterval()
- 可以使用XMLHttpRequest来发送请求
- 可以访问navigator的部分属性

<h3 id="Web-Worker的限制">1. Web Worker的限制</h3>

### 1.1 Web Worker的限制

- 不能跨域加载JS
- Web Worker无法访问DOM节点
- Web Worker无法访问全局变量或是全局函数
- Web Worker无法调用alert()或者confirm之类的函数
- Web Worker无法访问window、document之类的浏览器全局变量
- Web Worker中的Javascript依然可以使用setTimeout(),setInterval()之类的函数，也可以使用XMLHttpRequest对象来做Ajax通信
- 各个浏览器对Web Worker的实现不大一致

[back to top](#top)

<h3 id="Web-Worker的种类">2. Web Worker的种类</h3>

- 专用线程dedicated web worker： 随当前页面的关闭而结束；这意味着Dedicated web worker只能被创建它的页面访问
- 共享线程shared web worker： 可以被多个页面访问。在Javascript代码中，“Work”类型代表Dedicated web worker，而“SharedWorker”类型代表Shared web worker，只有当所有关联的的页面都关闭的时候，该Shared web worker才会结束。相对Dedicated web worker，shared web worker稍微复杂些。

[back to top](#top)

<h3 id="webWorker之常用ＡＰＩ">3. webWorker之常用ＡＰＩ</h3>

API|说明
---|---
postMessage(data)|子线程与主线程之间互相通信使用方法，传递的data为任意值
worker.terminate()|主线程中终止worker，此后无法再利用其进行消息传递。注意：一旦terminate后，无法重新启用，只能另外创建
`worker.onmessage = function(){ ... }`|当有消息发送时，触发该事件。且，消息发送是双向的，消息内容可通过data来获取
error|出错处理。且错误消息可以通过e.message来获取

```Javascript
// 1) Dedicated Web Worker
//在后台监听message：在message事件被触发之后，把结果（sum）传给页面
function init(){
  $(document).ready(function(){  
    if(!Modernizr.webworker){    //使用Modernizr.js检测当前浏览器是否支持Web Worker
      alert("This browser doesn't support Web Worker!");  
      return;  
    } 
    //创建一个Worker对象，并向它传递将在新线程中执行的脚本url
    var worker = new Worker('worker.js');
    //接收worker传递过来的数据
    worker.onmessage = function(event){
        document.getElementById('result').innerHTML+=event.data+"<br/>" ;
    };
    worker.onerror = function(e){
      console.log(e.message);   //打印出错消息
      worker.terminate();       //中断与子线程的联系
    };
};
//worker.js代码
function worker_function(){
  var i = 0;
  function timedCount(){
      for(var j = 0, sum = 0; j < 100; j++){
          for(var i = 0; i < 100000000; i++){
              sum+=i;
          };
      };
      //将得到的sum发送回主线程
      postMessage(sum);
  };
  //将执行timedCount前的时间，通过postMessage发送回主线程
  postMessage('Before computing, '+new Date());
  timedCount();
  //结束timedCount后，将结束时间发送回主线程
  postMessage('After computing, ' +new Date());
}
worker_function();
//2) Shared Web Worker
<form> <input type="button" id="btnStart" value="Start Processing"/></form>
<script type="text/javascript" src="./worker.js"></script>
<script type="text/javascript">
  document.getElementById("btnStart").onclick = function(){
          var worker = new Worker('worker.js');
          worker.addEventListener("message", function(evt){  
            alert(evt.data);  
          }, false);
         worker.postMessage(10000);
   };
</script>
//worker.js代码: 创建了一个SharedWorker对象，并把message事件绑定在shared worker的port对象上；同样由port对象发起postMessage， 开始执行后台代码worker.js
function worker_function(){
  var port;  
  addEventListener("connect", function(evt){  
    port = evt.ports[0];  
    port.addEventListener("message", function(evt){  
      var date = new Date();  
      var currentDate = null;  
      do {  
        currentDate = new Date();  
      }while(currentDate - date < evt.data);  
      port.postMessage(currentDate);  
    }, false);  
    port.start();  
  }, false);  
}
worker_function();
```

[back to top](#top)

<h3 id="webWorker上下文">4. Web Worker上下文</h3>

woker.js执行的全局上下文，是个叫做WorkerGlobalScope的东东，所以无法访问window、与window相关的DOM API，但是可以与setTimeout、setInterval等协作。WorkerGlobalScope作用域下的常用属性、方法如下：

常用属性、方法|说明
---|---
self|self属性: webWorker对象本身的引用
location|location属性: 返回当线程被创建出来的时候与之关联的 WorkerLocation 对象，它表示用于初始化这个工作线程的脚步资源的绝对 URL，即使页面被多次重定向后，这个 URL 资源位置也不会改变
close|方法: 关闭当前线程，与terminate作用类似
importScripts|可以通过importScripts()方法通过url在worker中加载库函数
XMLHttpRequest|发出Ajax请求
`setTimeout/setInterval以及addEventListener/postMessage`|other

[back to top](#top)

<h3 id="webWorker使用XMLHttpRequest与服务端通信">5. Web Worker使用XMLHttpRequest与服务端通信</h3>

```javascript
addEventListener("message", function(evt){  
  var xhr = new XMLHttpRequest();  
  xhr.open("GET", "lengthytaskhandler.ashx");  
  xhr.onload = function(){  
    postMessage(xhr.responseText);  
  };  
  xhr.send();  
},false); 

```

[back to top](#top)

<h3 id="webWorker之chrome运行">6. [webWorker之chrome运行](http://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker)</h3>

Chrome and Firefox doesn't let you load web workers when running scripts from a local file. Try Safari. :)

```Javascript
//1) worker.js代码
function worker_function() {
    // all code here
}
// This is in case of normal worker start
if(window!=self)
  worker_function();
//2) main.html代码
<script type="text/javascript" src="./worker.js"></script>
//...
var worker = new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));
```

[back to top](#top)

> Reference

- [Web Worker Documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [Web Workers on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/workers/basics/)
- [关于Web Worker你必须知道的7件事](http://blog.csdn.net/dojotoolkit/article/details/25030289)
- [浅谈webWorker](http://www.cnblogs.com/giggle/p/5350288.html)

