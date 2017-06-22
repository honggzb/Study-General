[移动端触屏框架iscroll.js的使用](#top)

- [1. 版本](#版本)
- [2. 使用和初始化](#使用)
- [3. 参数配置](#参数配置)
- [4. 各种效果的实现](#各种效果的实现)
  - [4.1 pull to refresh（下拉刷新）](#下拉刷新)
  - [4.2 pull to load（上拉加载）](#上拉加载)
- [5. bug](#bug)

<h3 id="Events事件">1. 版本</h3>

- iscroll.js，这个版本是常规应用的脚本。它包含大多数常用的功能，有很高的性能和很小的体积
- iscroll-lite.js，精简版本。它不支持快速跳跃，滚动条，鼠标滚轮，快捷键绑定。但如果你所需要的是滚动(特别是在移动平台) iScroll 精简版 是又小又快的解决方案
- iscroll-probe.js，探查当前滚动位置是一个要求很高的任务,这就是为什么我决定建立一个专门的版本。如果你需要知道滚动位置在任何给定的时间,这是iScroll给你的。（我正在做更多的测试,这可能最终在常规iscroll.js脚本，请留意）
- iscroll-zoom.js，在标准滚动功能上增加缩放功能
- iscroll-infinite.js，可以做无限缓存的滚动。处理很长的列表的元素为移动设备并非易事。 iScroll infinite版本使用缓存机制,允许你滚动一个潜在的无限数量的元素

[back to top](#top)

<h3 id="使用">2. 使用和初始化</h3>

- IScroll是一个类，每个需要使用滚动功能的区域均要进行初始化。每个页面上的iScroll实例数目在设备的CPU和内存能承受的范围内是没有限制的。
- 尽可能保持DOM结构的简洁。iScroll使用硬件合成层但是有一个限制硬件可以处理的元素
- iScroll作用于滚动区域的外层
- iScroll使用的是querySelector 而不是querySelectorAll，所以iScroll只会作用到选择器选中元素的第一个。如需要对多个对象使用iScroll，要构建自己的循环机制

```html
<div id="wrapper">  
    <ul>
        <li>...</li>
        <li>...</li>
    </ul>
</div>
<script type="text/javascript">
//iScroll作用于滚动区域的外层, 所以UL元素能进行滚动。只有容器元素的第一个子元素能进行滚动，其他子元素完全被忽略
var myScroll = new IScroll('#wrapper');
//var wrapper = document.getElementById(‘wrapper‘);
//var myScroll = new IScroll(wrapper);
</script>
```

**初始化**

- 当DOM准备完成后iScroll需要被初始化。最保险的方式是在window的onload事件中启动它。
- 在DOMContentLoaded事件中或者inline initialization中做也可以，需要记住的是脚本需要知道滚动区域的高度和宽度。如有一些图片在滚动区域导致不能立马获取区域的高度和宽度，iScroll的滚动尺寸有可能会错误。
- 为滚动起容器增加`position:relative`或者`absolute`样式。这将解决大多数滚动器容器大小计算不正确的问题
- 如有一个复杂的DOM结构，最好在onload事件之后适当的延迟，再去初始化iScroll。最好给浏览器100或者200毫秒的间隙再去初始化iScroll

综上所述，最小的iScroll配置如下：

```javascript
var myScroll;
function loaded() {
  myScroll = new IScroll(‘#wrapper‘);   //在初始化后可通过options对象访问标准化值。例如console.dir(myScroll.options);
}
//html
<body onload="loaded()">
```

[back to top](#top)

<h3 id="参数配置">3. 参数配置</h3>

[back to top](#top)

<h3 id="各种效果的实现">4. 各种效果的实现</h3>

https://github.com/cubiq/iscroll/tree/master/demos

<h4 id="下拉刷新">4.1 pull to refresh（下拉刷新）</h4>

<h4 id="下拉加载">4.2 pull to load（上拉加载）</h4>


[back to top](#top)

<h3 id="bug">5. bug</h3>

- https://github.com/cubiq/iscroll/issues/270   tap fire tiwce (tap调用两次)
- http://www.52html5.com/?p=2618  click事件兼容问题

**tap调用两次**

不明确bug的原因，后来是用click事件代替的

```javascript
li.removeEventListener('click', clickLi);  
li.addEventListener('click', clickLi, false);  
```

- 一个pull to refresh 和pull to load的例子，http://pnc.co.il/dev/iscroll-5-pull-to-refresh-and-infinite-demo.html
- 个人demo源码：http://download.csdn.net/detail/tiw163/8414059

[back to top](#top)

> Reference

- [iScroll5 API速查随记](http://www.mamicode.com/info-detail-331827.html)
- [iScroll 5 API 中文版](https://iiunknown.gitbooks.io/iscroll-5-api-cn/content/)
- [移动设备web开发插件iScroll的使用详解](http://blog.nnnv.cn/index.php/archives/65)
- [iscroll5的demo,pull to refresh ,pull to load（下拉刷新，上拉加载）](http://blog.csdn.net/tiw163/article/details/43341759)
- http://cubiq.org/iscroll-5 （官网）
- http://blog.csdn.net/gcz564539969/article/details/9156141 (isroll4 升级到iscroll5使用的问题)
- http://blog.csdn.net/ihetqxl/article/details/36538665（iscroll5 部分api）
- http://www.ghugo.com/iscroll-5-source/ (iscroll5源码注解)
- http://www.cnblogs.com/duanhuajian/archive/2013/04/08/3008323.html  (使用方法)
- https://github.com/iiunknown/iscroll5.doc.cn  中文api
- http://pnc.co.il/dev/iscroll-5-pull-to-refresh-and-infinite-demo.html  (pull to refresh, pull to load 完整demo)
