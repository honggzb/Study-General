[让web app更快的HTML5最佳实践](#top)

- [1. 使用web storage代替cookie](#使用web-storage代替cookie)
- [2. 使用CSS Transition代替JavaScript动画](#使用CSS-Transition代替JavaScript动画)
- [3. 使用客户端数据库代替服务器请求](#使用客户端数据库代替服务器请求)
- [4. 使用JavaScript原生API](#使用JavaScript原生API)
- [5. 不仅仅为离线app使用cache manifest,在线网站网站也可以适当使用](#不仅仅为离线app使用cache-manifest)
- [6. enable硬件加速来增强视觉体验](#enable硬件加速来增强视觉体验)
- [7. 使用web worker执行需要大量CPU资源的操作](#使用web-worker执行需要大量CPU资源的操作)
- [8. HTML5 表单属性和input类型](#HTML5表单属性和input类型)
- [9. 使用CSS3减少图片的使用](#使用CSS3减少图片的使用)
- [10. 使用WebSocket代替XHR提供更快交互和更少的带宽](#使用WebSocket代替XHR提供更快交互和更少的带宽)

<h3 id="使用web-storage代替cookie">1. 使用web storage代替cookie</h3>

cookie最大的缺陷是在每一次HTTP请求中都会携带所有符合规则的cookie数据.这会增加请求响应时间,特别是XHR请求. 在HTML5中使用sessionStorage和localStorage代替cookie可以将数据永久或者以session时间存储在用户本地.数据不会随着HTTP请求传递.

```javascript
// if localStorage is present, use that
if (('localStorage' in window) && window.localStorage !== null) {
  // easy object property API
  localStorage.wishlist = '["unicorn", "Narwhal", "deathbear"]';
} else {
  // without sessionStorage we'll have to use a far-future cookie
  // with document.cookie's awkward API
  var date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  var expires = date.toGMTString();
  var cookiestr = 'wishlist=["unicorn", "Narwhal", "deathbear"];' +
                  ' expires=' + expires + '; path=/';
  document.cookie = cookiestr;
}
```

[back to top](#top)

<h3 id="使用CSS-Transition代替JavaScript动画">2. 使用CSS Transition代替JavaScript动画</h3>

CSS Transition能带来更高的性能,更少的代码,更容易维护和理解.

[back to top](#top)

<h3 id="使用客户端数据库代替服务器请求">3. 使用客户端数据库代替服务器请求</h3>

[Web SQL Database](http://dev.w3.org/html5/webdatabase/)和[IndexedDB](http://www.w3.org/TR/IndexedDB/)让浏览器有了数据库存储能力.很多应用场景可以迁移到客户端数据库以减少服务器的请求次数.

localStorage和sessionStorage在简单数据存储时比客户端数据库更快,可以用来实现一些简单的状态,进度保存.

当一个组件需要管理上百条数据(如好友列表),同时支持用户搜索, 过滤, 排序时, 客户端数据库存储一份数据可以有效减少HTTP请求次数. 查看[Web SQL Database tutorial](https://www.html5rocks.com/en/tutorials/webdatabase/todo/)获取详细指导.

[back to top](#top)

<h3 id="使用JavaScript原生API">4. 使用JavaScript原生API</h3>

[Array prototype](https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Objects/Array#Methods)新增了很多API都可以在大多数浏览器中直接使用，通常情况下这些原生方法比手动编写循环要快

```JavaScript
// give me a new array of all values multiplied by 10
[5, 6, 7, 8, 900].map(function (value) {  
  return value * 10;
});
// create links to specs and drop them into #links.
var linksList = document.querySelector('#links');
var links = [];
['html5', 'css3', 'webgl'].forEach(function (value) {
  links.push(value.link('http://google.com/search?btnI=1&q=' + value + ' spec'));
});
linksList.innerHTML = links.join('');
// return a new array of all mathematical constants under 2
[3.14, 2.718, 1.618].filter(function (number) {
  return number < 2;
});
// you can also use these extras on other collections link nodeLists
[].forEach.call(document.querySelectorAll('section[data-bucket]'),
  function (elem, i) {
    localStorage['bucket' + i] = elem.getAttribute('data-bucket');
});
```

使用原生`JSON.parse()`比`json2.js`更加高效,安全.

原生的`String.prototype.trim`也是一个很好的例子, 这些功能不是HTML5中的,也应该得到广泛的应用.

[back to top](#top)

<h3 id="不仅仅为离线app使用cache-manifest">5. 不仅仅为离线app使用cache manifest,在线网站网站也可以适当使用</h3>

- 后台管理系统这样的站点使用缓存可以极大提高性能.
- cache manifest比设置Expires有一些优势:明确地声明需要缓存的文件,浏览器可以进行优化,可能在你使用之前就已经提前下载到本地了.
- 可以将页面基本结构看做模板, 显示的内容随着数据变化, 将可模板化的HTML结构通过cache.manifest进行缓存, 从服务器端获取JSON数据之后更新内容.

查看[application cache tutorial](http://www.html5rocks.com/tutorials/appcache/beginner/)获取详细指导.

[back to top](#top)

<h3 id="enable硬件加速来增强视觉体验">6. enable硬件加速来增强视觉体验</h3>

某些浏览器可能使用GPU加速让高速动画更加平滑.Firefox Minefield, IE9, Safari已经宣称实现了硬件加速. Chromium也增加了window平台的3D transform加速.各个浏览器对硬件加速的支持肯定会越来越好.

在支持并启动了硬件加速的情况下, 动画, rotation, scaling, opacity肯定会更加平滑. 所有实际操作都发生在GPU而不需要内容的重绘. 然而需要注意的是,任何影响页面布局的操作都会降低速度.

[back to top](#top)

<h3 id="使用web-worker执行需要大量CPU资源的操作">7. 使用web worker执行需要大量CPU资源的操作</h3>

web worker有两个好处: 1) 快速 2) 不阻塞浏览器响应. 点击[web worker slide](http://slides.html5rocks.com/#web-workers)查看更多信息.

web worker的一些可能的使用场景:

- 长文本格式化
- 语法高亮
- 图片处理
- 图片合成
- 大数组处理

[back to top](#top)

<h3 id="HTML5表单属性和input类型">8. HTML5 表单属性和input类型</h3>

- HTML5增加了一系列input type,包括search, tel, url, email, datetime, date, month, week, time, number, range, color等. 在支持这些功能的浏览器中使用原生功能, js插件作为补充.
- placeholder, required, pattern都能极大提高页面的可用性,和性能.

点击[HTML5 form](http://cubiq.org/dropbox/cssgrad.html)资料查看更多信息.

[back to top](#top)

<h3 id="使用CSS3减少图片的使用">9. 使用CSS3减少图片的使用</h3>

减少图片能减少HTTP请求,同时减少页面大小,更容易维护,常用的属性如下:

- linear and radial gradients
- border-radius
- box-shadow
- rgba
- transform
- css mask

常见的使用场景有: [polished buttons via gradients](http://cubiq.org/dropbox/cssgrad.html), replicate many other effects(http://www.phpied.com/css-performance-ui-with-fewer-images/)

[back to top](#top)

<h3 id="使用WebSocket代替XHR提供更快交互和更少的带宽">10. 使用WebSocket代替XHR提供更快交互和更少的带宽</h3>

[WebSockets](http://dev.w3.org/html5/websockets/)是为了Comet而设计的. 使用它实现Comet比XHR确实带来更多的好处.

> Reference

- [让web app更快的HTML5最佳实践](https://segmentfault.com/a/1190000002884052)
- http://www.html5rocks.com/en/features/performance
- http://developer.yahoo.com/performance/rules.html
- http://code.google.com/speed/page-speed/docs/rules_intro.html
- http://code.google.com/speed/index.html
