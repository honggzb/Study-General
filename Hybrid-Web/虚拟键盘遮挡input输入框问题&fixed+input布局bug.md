[虚拟键盘遮挡input输入框问题&fixed+input布局bug](#top)

- [ios](#top)
    - [1. 移动端web页面input+fixed布局bug - 软键盘唤起的情况下](#移动端web页面input+fixed布局)
    - [2. IOS Safari浏览器下固定定位position:fixed带来的问题与解决方案](#Safari浏览器下固定定位)
    - [3. 微信中虚拟键盘遮挡input输入框问题解决方案](#微信中虚拟键盘遮挡input输入框问题解决方案)
    - [4. 2016-11-04完美解决方案](#完美解决方案)
    - [5. ios对于fixed属性不兼容的解决方案- use classList](#ios对于fixed属性不兼容的解决方案)
 - [android](#top)
    - [1. window.top.document.body.scrollTop not working in Chrome or FireFox](#chrome)
    - [2. Textbox hidden below keyboard in Android webview](#Textbox)
    - [3. 移动端android浏览器中input框被软键盘遮住的问题解决方案](#移动端android浏览器)
- [相关文章推荐](#相关文章推荐)


**常见的需求**

- 在屏幕底部定位一个div，然后里面有个的input的，此时的安卓出现的软键盘的会把这个定位的div推到上面去，但是得ios的情况吧fixed的效果失效的，或产生很大的间隔,  而且在没有focus的时候的，这个div的属性不发生改变的，当focus的让这个div的fixed变成的absoluted(需在body修改)，blur的时候的又变成大fixed的bug
- 有fixed元素和输入框(input元素)同时存在的情况。 但是fixed元素在底部输入框软键盘被唤起以后，再次滑动页面，会出现许多莫名其妙的问题

<h2 id="ios">IOS</h2>

<h3 id="移动端web页面input+fixed布局">1. 移动端web页面input+fixed布局bug - 软键盘唤起的情况下</h3>

移动端业务开发，iOS下经常会有fixed元素和输入框(input元素)同时存在的情况。 但是fixed元素在底部输入框软键盘被唤起以后，再次滑动页面，会出现许多莫名其妙的问题

简单解释下： **> 软键盘唤起后，页面的fixed元素将失效（即无法浮动，也可以理解为变成了absolute定位），所以当页面超过一屏且滚动时，失效的fixed 元素就会跟随滚动了**

**解决思路**: 不依赖第三方库的方案

既然在 iOS下由于软键盘唤出后，页面fixed元素会失效，导致跟随页面一起滚动，**那么假如——页面不会过长出现滚动，那么即便fixed元素失效，也无法跟随页面滚动，也就不会出现上面的问题了**

那么按照这个思路，**如果使fixed元素的父级不出现滚动，而将原body滚动的区域域移到main内部，而 header和footer的样式不变**，代码如下：

```html
<body class="layout-scroll-fixed">
    <!-- fixed定位的头部 (absolute绝对定位也可以) -->
    <header> </header>
    <!-- 可以滚动的区域 -->
    <main>
        <div class="content"> <!-- 内容在这里... -->  </div>
    </main>
    <!-- fixed定位的底部 -->
    <footer>
        <input type="text" placeholder="Footer..."/>
        <button class="submit">提交</button>
    </footer>
</body>
```

```css
header, footer, main {
    display: block;
}
header {
    position: fixed;   /*或者写成absolute,如果考虑到更老一些的iOS统不支持fixed元素*/
    height: 50px;
    left: 0;
    right: 0;
    top: 0;
}
footer {
    position: fixed;  /*或者写成absolute, 如果考虑到更老一些的iOS统不支持fixed元素*/
    height: 34px;
    left: 0;
    right: 0;
    bottom: 0;
}
main {
    /* main绝对定位，进行内部滚动 */
    position: absolute;
    top: 50px;
    bottom: 34px;
    overflow-y: scroll;   /* 使之可以滚动 */
    -webkit-overflow-scrolling: touch;   /* 增加该属性，可以增加弹性, 是滑动更加顺畅 */
}
main .content { height: 2000px; }
```

[示例](http://resource.haorooms.com/softshow-16-151-1.html)

- 如果需要考虑Android2.3以下系统，因为不支持fixed元素，所以依然要需要考虑使用 isScroll.js 来实现内部滚动

**其他的一些细节处理**

在细节处理上，其实还有很多要注意的，挑几个实际遇到比较大的问题来说一下：

- 有时候输入框focus以后，会出现软键盘遮挡输入框的情况，这时候可以尝试input元素的scrollIntoView进行修复
- 在iOS下使用第三方输入法时，输入法在唤起经常会盖住输入框，只有在输入了一条文字后，输入框才会浮出, 参加下面的解决方法
- 有些第三方浏览器底部的工具栏是浮在页面之上的，因此底部 fixed 定位会被工具栏遮挡。解决办法也比较简单粗暴——适配不同的浏览器，调整 fixed 元素距离底部的距离。
- 最好将 header 和 footer 元素的 touchmove 事件禁止，以防止滚动在上面触发了部分浏览器全屏模式切换，而导致顶部地址栏和底部工具栏遮挡住 header 和 footer 元素。
- 在页面滚动到上下边缘的时候，如果继续拖拽会将整个 View 一起拖拽走，导致页面的“露底”， 为了防止页面露底，可以在页面拖拽到边缘的时候，通过判断拖拽方向以及是否为边缘来阻止touchmove事件，防止页面继续拖拽

```javascript
// 防止内容区域滚到底后引起页面整体的滚动
var content = document.querySelector('main');
var startY;
content.addEventListener('touchstart', function (e) {
    startY = e.touches[0].clientY;
});
content.addEventListener('touchmove', function (e) {
    // 高位表示向上滚动
    // 底位表示向下滚动
    // 1容许 0禁止
    var status = '11';
    var ele = this;
    var currentY = e.touches[0].clientY;
    if (ele.scrollTop === 0) {
        // 如果内容小于容器则同时禁止上下滚动
        status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
    } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
        // 已经滚到底部了只能向上滚动
        status = '10';
    }
    if (status != '11') {
        // 判断当前的滚动方向
        var direction = currentY - startY > 0 ? '10' : '01';
        // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
        if (!(parseInt(status, 2) & parseInt(direction, 2))) {
            stopEvent(e);
        }
    }
});
```

[back to top](#top)

<h3 id="Safari浏览器下固定定位">2. IOS Safari浏览器下固定定位position:fixed带来的问题与解决方案</h3>

移动端页面时使用固定定位position:fixed时会发现，在IOS的safari浏览器或原生APP下运行会出现几个**问题**:

1. 页面滑动失去惯性，即当我们滑动页面后松开手指，页面会立即停止 
2. 使用fixed定位的元素会随着页面的滑动而抖动的像是犯病了一样


Quick jQuery hack to fix position:fixed toolbars in iPhone/iPad/iPod Touch, 在IPhone,IPad页面使用position: static;，如果用了jQuery，上面的文章提供了代码

```javascript
//stick the footer at the bottom of the page if we're on an iPad/iPhone due to viewport/page bugs in mobile webkit 
if(navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') { 
     $("#footer").css("position", "static"); 
};
```

**解决方案1:** ： `-webkit-overflow-scroll:touch`解决滑动无惯性 

- 哪个元素/页面使用了fixed定位，就给哪个元素添加该属性。 
- 注意：添加完后一定要在真机上测试，不要在浏览器如谷歌浏览器提供的移动端调试模式下测试…… 
- 但有时候使用fixed定位的元素是某个事件触发后而动态在当前页面上生成的一个页面，如果此时给该弹出层加上这个样式后，可能会引发其他冲突BUG等，所以在实际开发过程中，最好会使用事件来动态添加更改该样式

```javascript
//驱动弹窗显示的事件
$('.btnShow').on('click',function(){
    $('.iosWeb').show();        //弹窗显示
    $('.iosWeb').css('-webkit-overflow-scroll','touch');   //给该弹窗添加ios safari专用润滑剂
})
//隐藏弹窗的事件
$('.btnHide').on('click',function(){
    $('.iosWeb').hide();    //弹窗隐藏
    $('.iosWeb').css('-webkit-overflow-scroll','auto');  //去掉ios safari专用润滑剂
})
```

**解决方案2:** ： 使用fixed以外的定位方式重新布局 

如果一个使用了该样式的页面有某个使用了fixed定位的吸顶/吸底的头部/尾部，会发现页面虽然滑动无阻但fixed定位的头部和尾部也跟着起飞了，这我们就很不开心了，所以通常可以这样写该页面的布局：

```html
<div class="header"> <!--写点啥吧--> </div>
<div class="main">   <!--写点啥吧--> </div>
<div class="footer"> <!--写点啥吧--> </div>
<style>
/*我是吸顶头部*/
.header{
    width:100%;
    height:50px;
    position:fixed;
    top:0px;
}
/*我是中间要滑动的部分*/
.main{
    width:100%;
    height:auto;
    position:absolute;
    top:50px;/*top值为header的高*/
    bottom:50px;/*bottom值为footer的高*/
    overflow-y:scroll;
}
/*我是吸底尾部*/
.footer{
    width:100%;
    height:50px;
    position:fixed;
    bottom:0px;
}
</style>
```

[back to top](#top)

<h3 id="微信中虚拟键盘遮挡input输入框问题解决方案">3. 微信中虚拟键盘遮挡input输入框问题解决方案</h3>

基本HTML结构

```html
<div class="nav"></div>
<div class="content"></div>
<div id="returnframe">
   <input type="text" name="inputframe" class='inputframe'>
   <div class="returnframe_button">发送</div>
</div>
```

```css
/*聊天窗口_顶部*/
.nav{
    display:block;
    position:absolute;
    top:0;
    width:100%;
    height:50px;
    font-size:2rem;
    background-color:#393a3f;
    z-index:99;
}
/*聊天窗口_内容*/
.content{
    display:block;
    position:absolute;
    top:50px;
    bottom:50px;
    width:100%;
    height:auto;
    background-color:#ebebeb;
    overflow-y:scroll;
    -webkit-overflow-scrolling:touch;
}
/*聊天窗口_底部*/
#returnframe{
    display:block;
    position:absolute;
    bottom:0;
    width:100%;
    height:50px;
    background-color:#f4f4f4;
    border-top:1px solid #d8d8d8;
    z-index:99;
}
```

在第三方软键盘被唤起时，浏览器内所有内容高度发生了改变，将他赋给浏览器滚动部分高度，从而使页面改变，同时始终能在键盘唤起的相近时间内正确对应到相应位置，从而使输入框在视觉上能仅仅贴住被唤起的软键盘+toolbar顶端，解决了输入框被遮挡和或顶部栏消失问题

```javascript
//解决第三方软键盘唤起时底部input输入框被遮挡问题
var bfscrolltop = document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
$("input.inputframe").focus(function(){//在这里‘input.inputframe’是我的底部输入栏的输入框，当它获取焦点时触发事件
    interval = setInterval(function(){//设置一个计时器，时间设置与软键盘弹出所需时间相近
      document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
    },100)
}).blur(function(){//设定输入框失去焦点时的事件
    clearInterval(interval);//清除计时器
    document.body.scrollTop = bfscrolltop;将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
});
```

[back to top](#top)

<h3 id="完美解决方案">4. 2016-11-04完美解决方案</h3>

```
// CSS
.scrollWrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
}
bottomInput {
    position: absolute;
    bottom:0;
    left:0;
    right: 0;
}
// HTML
<body>
    <div class="scrollWrapper">
        <div class="bottomInput">
            <input type="text" placeholder="input"/>
        </div>
    </div>
</body>
// javascript  // 在输入框获取焦点, 键盘弹起后, 真的是一行代码
var interval = setInterval(function() {
    document.body.scrollTop = document.body.scrollHeight
}, 100)
```

```javascript
<!-- Android Viewport height fix-->
<script type="text/javascript">
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
if(isAndroid) {
    document.write('<meta name="viewport" content="width=device-width,height='+window.innerHeight+', initial-scale=1.0">');
}
</script> 
```

部分低端android机, 键盘收起后, 键盘区域显示空白, 需重新设置height

```javascript
// android, 键盘弹起/收回会触发resize事件
    window.onresize = function () {
        // Height: 键盘没有弹出时window.innerHeight
        if (Height == window.innerHeight) {
            $(this.scrollWrapper).css('height', window.innerHeight + 'px')
        }
    }
```

[back to top](#top)

<h3 id="ios对于fixed属性不兼容的解决方案">5. ios对于fixed属性不兼容的解决方案- use classList</h3>

```html
<footer class='footer' id='footerFixed'>
    <input @focus='addBodyClass' @blur='removeBodyClass'>
</div>
<style>
#footerFixed{
    position:fixed;
    height:1rem;
    width:100%；
    bottom：0；
    left:0;
}
</style>
<!-- js -->
<script>
addBodyClass(){
  console.info('add')
  document.body.classList.add('full-body');//原生的写法, 注意classList的兼容性
  console.info(document.body.classList)  
},
removeBodyClass(){
  console.info('remove')
  document.body.classList.remove('full-body')
},
</script>
<style>
//css
body {
    &.full-body{
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: hidden !important;
      #footerFixed{
        position: absolute;
      }
    }
  }
</style>
```

[back to top](#top)

<h2 id="Android">Android</h2>

for INPUT and TEXTAREA tag

```javascript
$(this.contentArea()).css("position", "absolute");  // 1) css
$('html').css({ "width": "100%", "height": "100%", "overflow": "hidden" });    // 1) css
$('body').css({ "width": "100%", "height": "100%", "overflow": "hidden" });    // 1) css
$(commentInput).focus(function(event){     // 2)
  window.setTimeout(function() {           //3) 
    event.currentTarget.parentElement.scrollIntoView(true);     //4)
    event.currentTarget.parentElement.scrollIntoViewIfNeeded();  //4)
  },0);
}).blur(function(event) {
  window.setTimeout(function() {
    document.querySelector(".ot-modal-dialog-header").scrollIntoView(true);
  	document.querySelector(".ot-modal-dialog-header").scrollIntoViewIfNeeded();
  },0);
});
```

> 补充： 不能设置`width: 100%;`和`height: 4rem;`

[scroll in to focused textbox in android + phonegap?](https://stackoverflow.com/questions/16810233/how-to-scroll-in-to-focused-textbox-in-android-phonegap?noredirect=1&lq=1):  not sure belowing code is necessary: some android device did not trigger resize

```javascript
if(/Android [4-6]/.test(navigator.appVersion)) {
   window.addEventListener("resize", function() {
      if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
         window.setTimeout(function() {
            document.activeElement.scrollIntoViewIfNeeded();
         },0);
      }
   })
}
```

<h3 id="chrome">1. window.top.document.body.scrollTop not working in Chrome or FireFox</h3>

```javascript
var scrollTop = (document.documentElement || document.body.parentNode || document.body).scrollTop;
// or use jQuery
$('#yourFineElement').offset({ top: X, left Y)});
jQuery(document).ready(function($) {
  $(".scroll").click(function(event){     
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1500);
  });
});
<a href="#top" class="scroll"></a>
//
$("body").animate({ scrollTop: 50 },  800,  function(){
    $("body").clearQueue();
});
```

<h3 id="Textbox">2. Textbox hidden below keyboard in Android webview</h3>

```javascript
$("body").on("click", ".jstree-search-input", function () {  
    setTimeout(function(){ 
        androidScroll(); 
    }, 500);
});
function androidScroll() {
    // Webview focus call (pushes the modal over keyboard)
  $('.control-sidebar-open ').scrollTop($('.control-sidebar-open ')[0].scrollHeight);
}
```

[back to top](#top)

<h3 id="移动端android浏览器">3. 移动端android浏览器中input框被软键盘遮住的问题解决方案</h3>

安卓浏览器在软键盘弹出后不会像ios浏览器那样重新计算window的高度，所以导致安卓浏览器window的高度在软键盘弹出的时候为“软键盘的高度＋（window的高度－软键盘的高度）”；而其实，此时，合理的高度应该是页面的高度＋软键盘弹出的高度；就此解决方案为如下：

```javascript
var winHeight = $(window).height(); //获取当前页面高度
$(window).resize(function() {
      var thisHeight = $(this).height();
      if (winHeight - thisHeight > 50) {
          $('body').css('height', winHeight + 'px');   //当软键盘弹出，在这里面操作
      } else {
          $('body').css('height', '100%');  //当软键盘收起，在此处操作
      }
});
```

[back to top](#top)

- Remove both width=device-width, height=device-height from the viewport meta tag.
- Use this CSS: `html, body { width: 100%; height: 100%; overflow: hidden; }`
- Use `position:absolute` in you footer instead of `position: fixed`

[back to top](#top)

<h2 id="相关文章推荐">相关文章推荐</h2>

- [Cordova PhonegapCordova iOS 应用在第三方输入法的键盘弹出（点击输入框）时，页面不上移，导致输入框被键盘遮挡 的解决办法](http://blog.csdn.net/lovelyelfpop/article/details/52033045)
- [Ionic Cordova实现软键盘的监听以及操作大全](http://blog.csdn.net/sean_css/article/details/70243893)
- [在cordova中处理原生键盘相关问题的总结，mark供参考](http://blog.csdn.net/openglnewbee/article/details/70014521)
- [Cordova 混合应用处理输入法相关事件](http://blog.csdn.net/jiangbo_phd/article/details/48654695)
- [IONIC键盘弹出防止页面Header（title位置）自动上移位置（消失）](http://blog.csdn.net/jiangbo_phd/article/details/52438418)
- [iOS解决键盘弹出遮挡输入框问题](http://blog.csdn.net/winer888/article/details/51084756)
- [关于手机端IOS系统微信中虚拟键盘遮挡input输入框问题的解决方案](http://blog.csdn.net/github_37533433/article/details/66471962)
- [h5键盘遮挡输入框问题 、模仿微信输入框失去焦点时隐藏iphone的软键盘和聚焦时出现输入框](http://blog.csdn.net/github_35549695/article/details/53232144)
- [H5 ios input获取焦点挂起软键盘 输入框被遮盖 页面被顶起](http://blog.csdn.net/song_song666/article/details/70914905)
- [iOS下Html页面中input获取焦点弹出键盘时挡住input解决方案](http://blog.csdn.net/s3590024/article/details/53203695)
- [js解决软键盘遮挡输入框问题](http://blog.csdn.net/s3590024/article/details/53203695)
- [Phonegap+Sencha Touch 移动开发24 打包wp8.1的App，运行时输入框聚焦弹出软键盘之后，界面上移而不恢复原位的解决办法](http://blog.csdn.net/lovelyelfpop/article/details/30992497)
- [iOS TextField 弹出键盘时实现view整体上移下移：防止弹出键盘遮挡输入框](http://blog.csdn.net/doubleface999/article/details/73771950)
- [移动端web开发之坑--IOS8下 上传图片点击取消后，弹出了软键盘遮挡输入框](http://blog.csdn.net/screaming_color/article/details/54945592)
- [IOS中输入框被软键盘遮挡的解决办法](http://blog.csdn.net/u011005737/article/details/45200233)
- [IOS中输入框被软键盘遮挡的解决办法](http://blog.csdn.net/it_zgc/article/details/51120466)
- [IOS中输入框被软键盘遮挡的解决办法](http://blog.csdn.net/qq_17007915/article/details/50216797)
- [IOS中输入框被软键盘遮挡的解决办法](http://blog.csdn.net/enuola/article/details/7917221)
- [键盘弹出后输入框上移的解决方案](http://blog.csdn.net/tcthek/article/details/42522319)
- [隐藏状态栏设置全屏时,点击输入框弹出软键盘使状态栏处于隐藏状态](http://blog.csdn.net/andy_l1/article/details/71449763)
- [输入框被键盘遮挡时 让整个view上移](http://blog.csdn.net/shenhaifeiniao/article/details/52192638)
- [ios输入框被键盘挡住的解决办法](http://blog.csdn.net/u010843544/article/details/38775627)
- [ios输入框被键盘挡住的解决办法](http://blog.csdn.net/yangchen9931/article/details/46697551)
- [弹出键盘 输入框上移](http://blog.csdn.net/iridescent_amazing/article/details/48860023)
- [scrollview,键盘遮挡输入框，上移](http://blog.csdn.net/yyyyccll/article/details/75640098)
- [iOS 隐藏键盘，输入法，防止遮挡输入框](http://blog.csdn.net/hherima/article/details/8662997)
- [iOS键盘弹出遮挡输入框问题](http://blog.csdn.net/u012701023/article/details/50535757)
- [Android各种键盘挡住输入框解决办法](http://blog.csdn.net/cishaohui/article/details/71403036)
- [android全屏／沉浸式状态栏下，各种键盘挡住输入框解决办法](http://blog.csdn.net/smileiam/article/details/69055963)
- [android全屏／沉浸式状态栏下，各种键盘挡住输入框解决办法](http://blog.csdn.net/wanghao940101/article/details/72409784)
- [H5移动端弹出键盘时遮挡输入框](http://blog.csdn.net/qq_37231097/article/details/76614702)
- [IOS TextField弹出键盘挡住输入框的问题(续)](http://blog.csdn.net/dexin5195/article/details/38844463)
- [swift实现ios类似微信输入框跟随键盘弹出的效果](http://blog.csdn.net/walkerwqp/article/details/51325643)
- [Swift 实现 iOS 类似微信输入框跟随键盘弹出的效果](http://blog.csdn.net/magic_castle/article/details/50438029)
- [解决android软键盘弹出有时会遮住EditText输入框的一种方法](http://blog.csdn.net/chzjy/article/details/73162671)
- [仿QQ空间登录UI,解决软键盘弹出挡住输入框的问题](http://blog.csdn.net/u011404611/article/details/43153757)
- [封装弹窗输入框PopupWindow，并解决输入法弹出将其遮挡解决方法](http://blog.csdn.net/qq944639839/article/details/54667547)
- [解决 android 输入法弹出输入框被遮挡的问题](http://blog.csdn.net/dmh594820/article/details/51525464)
- [移动端虚拟键盘遮挡页面输入框等元素的解决方案](http://blog.csdn.net/deeplies/article/details/74388061)
- [ios解决软键盘遮挡输入框问题](http://blog.csdn.net/leochang130731/article/details/10011875)
- [Android WebView 输入框键盘不弹出](http://blog.csdn.net/tu_bingbing/article/details/41810473)
- [EditText弹出软键盘遮住输入框问题](http://blog.csdn.net/u012523122/article/details/52101303)
- [Viewpager+Fragment+webview中的输入框不弹出软键盘的坑](http://blog.csdn.net/wcsandlili/article/details/53611504)
- [UITextField输入框响应键盘的弹出做高度的自适应](http://blog.csdn.net/qq_22026331/article/details/51787867)
- [Android 输入框第一次弹出数字键盘, 后面可以随意切换](http://blog.csdn.net/wufeng55/article/details/70184209)
- [Android如何避免输入法弹出时遮挡住按钮或输入框](http://blog.csdn.net/yuge8930/article/details/51886255)
- [键盘和输入框上移](http://blog.csdn.net/c_ios/article/details/50508135) 动画和键盘一起向上平移定义两个属性
- [iOS中输入框被软键盘遮挡了怎么办？](http://blog.csdn.net/zhangyuanlaifen/article/details/45115611)
- [EditText 软键盘弹出方式探究 以及手动解决浸入式布局软键盘不顶起输入框或者顶掉整个UI的问题](http://blog.csdn.net/qq_34247200/article/details/62418653)
- [长按输入框跳出select all，cut，input method等菜单，点击input method跳出所有得到的输入法列表](http://blog.csdn.net/happy_6678/article/details/6292283)
- [解决键盘遮挡输入框（UITextField）问题](http://blog.csdn.net/intheair100/article/details/38639043)
- [LinearLayout详解四:彻底解决软键盘遮挡输入框的问题](http://blog.csdn.net/zjh171/article/details/26062301)
- [一招解决全局键盘遮挡输入框问题](http://blog.csdn.net/l_nna/article/details/51199210)

> Reference

- [移动端web页面input+fixed布局bug总结](http://blog.csdn.net/ly2983068126/article/details/49306427)
- [踩坑路上——IOS Safari浏览器下固定定位position:fixed带来的问题与解决方案](http://blog.csdn.net/grsghh/article/details/61416953)
- [手机端IOS系统微信中虚拟键盘遮挡input输入框问题解决方案](http://blog.csdn.net/github_37533433/article/details/66471962)
- [(2016-11-04完美解决)移动端iOS第三方输入法遮挡底部input及android键盘回落后留白问题](https://segmentfault.com/a/1190000006243816)
- [如何用js获取虚拟键盘高度？（适用所有平台）](https://segmentfault.com/a/1190000010693229)
- https://stackoverflow.com/questions/8556933/screen-styling-when-virtual-keyboard-is-active
- [Web移动端Css Fixed方式的布局方案](http://efe.baidu.com/blog/mobile-fixed-layout/?utm_source=tuicool&utm_medium=referral)
- [苹果全系列fixed定位bug检测报告](#http://blog.csdn.net/cdnight/article/details/51693951)
- [ios对于fixed属性不兼容的解决方案](http://blog.csdn.net/zhooson/article/details/75789659)
