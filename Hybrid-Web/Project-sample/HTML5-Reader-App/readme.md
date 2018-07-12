[HTML5移动Web APP阅读器-慕课网](#top)

- [1. 准备知识](#准备知识)
- [2. 项目分析&技术分析](#项目分析)
- [3. 项目基础框架](#项目基础框架)
- [4. 开发tip](#开发tip)
  - 多个DOM集合
  - 添加window滚动事件 --> 滚动的时候，上下边栏不显示
- [补充知识： zepto.js](#补充知识)

<h2 id ="准备知识">1. 准备知识</h2>

- 单例模式

```javascript
var single = {
  attr_1: '1',
  func: function(){
    console.log(1);
  }
};
```

- 类和实例化

```javascript
function classA(param){
  this.attr_1 = param;
  this.func_1 = function(){
    console.log(this.attr_1);
  }
}
var instance_1 = new classA('1');
var instance_2 = new classA('2');
console.log(instance_1.attr_1);    // 1
console.log(instance_2.attr_1);    // 2
```

[back to top](#top)

<h2 id ="项目分析">2. 项目分析&技术分析</h2>

- 核心功能
  - 标签更换（根据后台数据）
  - 翻页
- [HTML5 API](https://developer.mozilla.org/zh-CN/docs/web/guide/html/html5)
  - window.localStorage存储用户偏好，如字体、字号、背景等
  - window.performance.timing， 在console输入
  - Web Workers API- 相当于后台的计算线程，所有UI相关的线程均不使用Web Workers
  - HTML tag contenteditable属性: `<section id="" contenteditable="true">`
  - ajax跨域- XMLHttpRequest Level 2(后台设置header：`Access-Control-Allow-Origin: *` )
- icon
  - 使用base64格式图片制作icon
    - 减少请求
    - 加快首屏数据的显示速度
    - tool
      - http://www.pjhome.net/web/html5/encodeDataUrl.htm
      - 在 chrome下新建一个窗口，然后把要转化的图片直接拖入浏览器，打开控制台，点 Source，点击图片，右侧就会显示该图片的base64编码
  - css3 icon
- [触屏事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events): touchstart,touchmove, touchend
  - 而每个触摸事件都包括了三个**触摸列表**，每个列表里包含了对应的一系列触摸点（用来实现多点触控）：
    - touches：当前位于屏幕上的所有手指的列表
    - targetTouches：位于当前DOM元素上手指的列表
    - changedTouches：涉及当前事件手指的列表
  - 每个触摸点由包含了如下触摸信息（常用）：
    - identifier：一个数值，唯一标识触摸会话（touch session）中的当前手指。一般为从0开始的流水号（android4.1，uc）
    - target：DOM元素，是动作所针对的目标
    - pageX/pageX/clientX/clientY/screenX/screenY：一个数值，动作在屏幕上发生的位置（page包含滚动距离,client不包含滚动距离，screen则以屏幕为基准）　
    - radiusX/radiusY/rotationAngle：画出大约相当于手指形状的椭圆形，分别为椭圆形的两个半径和旋转角度。初步测试浏览器不支持

```javascript
var obj = document.getElementById('id');
obj.addEventListener('touchmove', function(event) {
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
　　　　 event.preventDefault();// 阻止浏览器默认事件，重要 
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        obj.style.left = touch.pageX-50 + 'px';
        obj.style.top = touch.pageY-50 + 'px';
        }
}, false);
```

- 移动前端性能陷阱和硬件加速
  - 减少或避免repaint, reflow(相当于减少对DOM元素的操作)
  - 尽量缓存所有跨域缓存的数据： localStorage, sessionStorage, indexedDB, manifest
  - 尽量使用CSS3 tranform代替DOM操作实现元素的动画和位移
    - 不用给非static定位元素增加CSS3动画(如非static定位: absolute和relative)
    - 适当使用硬件加速: 触发硬件加速--> 使用canvas、`transform:translate3d(0,0,0);`
    
[back to top](#top)
    
<h2 id ="项目基础框架">3. 项目基础框架</h2>

```javascript
(function(){
  /* Utitilty */
  var Util =(function(){
    var prefix = 'html5_reader_';
    var StorageGetter = function(key){
      return localStorage.getItem(prefix+key);
    }
    var StorageSetter = function(key, val){
      return localStorage.setItem(prefix+key, val);
    }
    return {
      StorageGetter: StorageGetter,
      StorageSetter: StorageSetter
    }
  })();
  
  /* 项目的入口函数 */
  function main(){
    
  }
  
  /* interfaces*/
  function ReaderModel(){
    //todo 实现和阅读器相关的是数据交互的方法
  }
  function ReaderBaseFrame(){
    //todo 渲染基本的UI结构
  }
  function EventHandle(){
    
  }
  
  main();
  
})();
```

[back to top](#top)

<h2 id ="开发tip">4. 开发tip</h2>

**zepto cross Origin问题**

- 解决方案1： "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files --disable-web-security"
- 解决方案2： 使用第三方server，如http-server, express
- 解决方案3：由于一些老版本的浏览器是按照 2012 年之前的规范来实现的，所以这一部分浏览器中，open() 方法要在设置 withCredentials 属性之前调用。因此为了兼容，正确的做法应该是在 open() 方法之后再设置 withCredentials 属性。      正确代码如下：

```javascript
var async = 'async' in settings ? settings.async : true
xhr.open(settings.type, settings.url, async, settings.username, settings.password)      //1
if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]  //2
```

**使用多个DOM集合**

```javascript
var Dom ={
  top_nav: $('#top_nav'),
  bottom_nav: $('#bottom_nav'),
  font_container: $('#font_container')
};
var Win = $(window);
var Doc = $(document);
```

**添加window滚动事件 --> 滚动的时候，上下边栏不显示**

```javascript
//window滚动事件 --> 滚动的时候，上下边栏不显示
Win.scroll(function(){
  Dom.bottom_nav.hide();
  Dom.top_nav.hide();
})
```

[back to top](#top)

<h2 id ="补充知识">补充知识： zepto.js</h2>

**Zepto.js的modules全表格**

module | default | description
------- | ------- | -------
zepto | ✔ | 核心模块；包含许多方法
event | ✔ | 通过on()& off()处理事件
ajax | ✔ | XMLHttpRequest 和 JSONP 实用功能
form | ✔ | 序列化 & 提交web表单
ie | ✔ | 增加支持桌面的Internet Explorer 10+和Windows Phone 8。
detect |   | 提供 $.os和 $.browser消息
fx |   | The animate()方法
fx_methods |   | 以动画形式的 show, hide, toggle, 和 fade*()方法.
assets |   | 实验性支持从DOM中移除image元素后清理iOS的内存。
data |   | 一个全面的 data()方法, 能够在内存中存储任意对象。
deferred |   | 提供 $.Deferredpromises API. 依赖"callbacks" 模块. 当包含这个模块时候, $.ajax() 支持promise接口链式的回调。
callbacks |   | 为"deferred"模块提供 $.Callbacks。
selector |   | 实验性的支持 jQuery CSS 表达式 实用功能，比如 $('div:first')和el.is(':visible')。
touch |   | 在触摸设备上触发tap– 和 swipe– 相关事件。这适用于所有的touch(iOS, Android)和pointer事件(Windows Phone)。
gesture |   | 在触摸设备上触发 pinch 手势事件。
stack |   | 提供 andSelf& end()链式调用方法
ios3 |   | String.prototype.trim 和 Array.prototype.reduce 方法 (如果他们不存在) ，以兼容 iOS 3.x.


**自定义打包集成其他模块构建流程**

1. 下载zeptojs源码：源码
2. 解压源码，并打开命令行进入源码根目录
3. 修改make编译文件的依赖模块
4. 编译最终的zeptojs

```shell
$ cd zepto-master
# 安装npm包依赖
$ npm install
# 修改make编译文件的依赖模块: 找到make文件，打开
modules = (env['MODULES'] || 'zepto event ajax form ie').split(' ')
## 在后面加上你要增加的模块：增加 touch gesture fx fx_methods等模块 ## 
modules = (env['MODULES'] || 'zepto event ajax form ie detect fx fx_methods data selector touch').split(' ')
# 构建： 编译最终的zeptojs
$ npm run-script dist
```

zepto注意事项

- 注意某些模块必须打包进zeptojs文件才能用，比如：fx_methods模块的方法：hide() show()等动画方法
- Zepto只设置全局变量$指向它本身。 没有Zepto.noConflict方法。
- 不支持jQuery CSS 扩展， 然而，可选的“selector”模块有限提供了支持几个最常用的伪选择器
- Zepto.js: 无法获取隐藏元素宽高
- Zepto 的选择器表达式: [name=value] 中value 必须用 双引号 " or 单引号 ' 括起来
- 移动端端点透需要阻止默认行为来规避

[back to top](#top)

> Reference
> - [Web Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)
> - [11-移动端开发教程-zepto.js入门教程](http://www.cnblogs.com/fly_dragon/p/8663619.html)
> - [Zepto.js 使用中的一些注意点(转)](https://blog.csdn.net/Mclikey/article/details/54950651)