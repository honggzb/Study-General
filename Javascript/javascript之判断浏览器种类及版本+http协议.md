[javascript之判断浏览器种类及版本](#top)

- [1. JS获取浏览器的信息](#JS获取浏览器的信息)
- [2. js判断IE浏览器的四种方法](#js判断IE浏览器的四种方法)
- [3. 判断浏览器综合案例)](#判断浏览器综合案例)
  - [3.1 判断操作系统](#判断操作系统)
  - [3.2 判断浏览器的内核](#判断浏览器的内核)
- [4. 判断http协议](#判断http协议)

<h3 id="JS获取浏览器的信息">1. JS获取浏览器的信息</h3>

- 浏览器代码名称：navigator.appCodeName
- 浏览器名称：navigator.appName
- 浏览器版本号：navigator.appVersion
- 对Java的支持：navigator.javaEnabled()
- MIME类型（数组）：navigator.mimeTypes
- 系统平台：navigator.platform
- 插件（数组）：navigator.plugins
- 用户代理：navigator.userAgent

<h3 id="js判断IE浏览器的四种方法">2. js判断IE浏览器的四种方法</h3>

```javascript
//1)
if(window.addEventListener){ 
  alert("not ie"); 
}else if(window.attachEvent){ 
  alert("is ie"); 
}else{ 
  alert("这种情况发生在不支持DHTML的老版本浏览器（现在一般都支持）") 
}
//该方法在IE9及以上IE版本会弹出not ie结果
//2)
if(document.all){ 
  alert("IE"); 
}else{ 
  alert("not ie"); 
}
//3)
var navigatorName = "Microsoft Internet Explorer"; 
if( navigator.appName == navigatorName ){ 
  alert("ie") 
}else{
  alert("not ie") 
}
//4)利用了IE与标准浏览器在处理数组的toString方法的差异.对于标准游览器，如果数组里面最后一个字符为逗号，JS引擎会自动剔除它
if(!+[1,])  alert("这是ie浏览器"); 
else alert("这不是ie浏览器");
// 注释：IE9及以上版本会弹出“这不是IE浏览器”
```

[back to top](#top)

<h3 id="判断浏览器综合案例">3. 判断浏览器综合案例</h3>

JavaScript判断浏览器类型一般有两种办法

- 一种是根据各种浏览器独有的属性来分辨，
- 一种是通过分析浏览器的userAgent属性来判断的

下面对浏览器各自的userAgent特点做一分析，并给出判断方法： 

```javascript
function myBrowser(){
    var userAgent = navigator.userAgent;     //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;  //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;   //判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    if (isIE) {    // ie10-ie11的版本问题，不再支持document.all判断
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");  
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
    }  //isIE end
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
}  
```

**Windows操作系统浏览器系列**

浏览器|特征表现|判断方法
---|---|---
IE浏览器系列|均以 "mozilla/" 开头，"msie x.0;" 中的x表示其版本|粗略判断可以只检索 "msie x.0;" 字符串即可，严格判断可检索 "mozilla/x.0 (compatibal; msie x.0; windows nt"，不过一般没有这个必要 
Windows版Firefox|以"mozilla/x.0"开头，包含"windows nt","gecko/"和"firefox/" |粗略判断可以只检索 "firefox/"和"windows nt" 字符串，严格判断可以检索"mozilla/" ,"windows nt","gecko/"和"firefox/" 四个字符串； 
Windows版Chrome|以"mozilla/x.0"开头，包含"windows nt","chrome/"，同时包含"applewebkit/","safari/"|粗略判断可以只检索 "windows nt"和"chrome/"字符串，严格判断可以同时检索 "mozilla/" ,"windows nt","applewebkit/","safari/","chrome/" 五个字符串； 
Windows版Opera|以"opera/"开头，含有"windows nt","presto/" 字符串|粗略判断只检索 "windows nt"和"opera/"字符串，严格判断同时检索 "opera/","windows nt" 和 "presto/"； 
Windows版Safari：|以"mozilla/"开头，同时含有"windows nt","applewebkit/","safari/"|粗略判断可以检索含有 "windows nt","safari/" 同时不包含 "chrome/"，严格判断需要同时含有"mozilla/","windows nt","applewebkit/","safari/"但是不包含"chrome/"； 

小结：Windows操作系统上的浏览器userAgent均包含"windows nt"字符串来表征windows操作系统。 

**iPhone平台浏览器系列** 

浏览器|特征表现|判断方法
---|---|---
iPhone自带safari|以"mozilla/"开头，含有"iphone"字符串，同时含有 "mobile/","safari/"字符串|粗略判断只检索 "iphone"和"safari/"字符串，严格判断则要同时包含 "mozilla/","iphone","mobile/","safari/"四个字符串 
iPhone版Opera Mobile|以"opera/"开头，含有"iphone"字符串，同时含有 "opera mini/","presto/"字符串|粗略判断只检索 "iphone"和"opera/"字符串，严格判断则要同时包含 "opera/","iphone","opera mini/","presto/"四个字符串 

小结：iPhone手机上的浏览器userAgent均包含"iphone"字符串 

**Android平台浏览器系列** 

浏览器|特征表现|判断方法
---|---|---
Android自带浏览器（有人说其实是就chrome，但google自己未做表示，且还在开发一个Android上运行的Chrome to Phone）|以"mozilla/"开头，含有"android"和"linux" 字符串，同时含有 "applewebkit/","mobile safari/"字符串|因为还不知道Android上未来会不会有独立的safari（估计不会了），所以建议直接严格判断，检索 "mozilla/","android","linux","applewebkit/","mobile safari/"五个字符串 
Android版Opera Mobile|以"opera/"开头，含有"android"和"linux" 字符串，同时含有 "opera mobi/","presto/"字符串|粗略判断只检索 "android"和"opera/"，严格判断则要同时包含"opera/","android","linux","opera mobi/","presto/"五个字符串 
Android版Firefox|以"mozilla/"开头，含有"android"和"linux" 字符串，同时含有 "firefox/","gecko/","fennec/"字符串|粗略判断只检索 "android"和"firefox/"，严格判断则要同时包含"mozilla/","android","linux","firefox/","gecko/","fennec/"六个字符串 

小结：Android平台上的浏览器userAgent均包含"android"和"linux"字符串 

以上对windows、iphone、android三大平台的主流浏览器解析就基本结束了，其他平台的linux估计至少与android平台应该类似，而采用了Mac OS的iPad和麦金塔应该与iphone平台类似，故而暂时先不做解析，也因为手头没有那么多设备和操作系统来测试，希望日后能够补上。 

**小结**

<h4 id="判断操作系统">3.1 如果需要判断操作系统，方法比较简单，在userAgent里面检索以下字符串</h4>

- 含有"windows nt"：显而易见了，windows操作系统，nt后面的版本号可以判断OS版本； 
- 含有"mac"：苹果的Mac OS X或者其他Mac OS内核的系统； 
- 含有"iphone"：苹果iphone手机专有的，一般情况下也应该含有"mac"； 
- 含有"ipad"：苹果iPad平板电脑（资料表明iPad的浏览器userAgent同时含有"mac","iphone","ipad"）； 
- 含有"linux"：Linux操作系统或者其他以linux作为内核的操作系统； 
- 含有"android"：谷歌的Android操作系统，有可能是智能手机，也有可能是安卓版的平板电脑哦，一般情况下android平台上的userAgent也应该包含"linux"； 
- 含有"unix","sunos","bsd"三者之一：Unix系统，其实对这个系统的用户体验问题，目前几乎可以不用考虑了； 
- 含有"ubuntu"：ubuntu定制版的linux 

<h4 id="判断浏览器的内核">3.2 判断浏览器的内核，方法也不困难，我自己琢磨出来的，不一定都对啊</h4>

- IE（Trident）内核（IE for Mac, IEs4Linux之类的就不用说了，只考虑windows下的）：以"mozilla/"开头，含有"windows nt"和"msie"字符串； 
- Firefox（Gecko）内核：以"mozilla/"开头，含有"firefox/"和"gecko/"字符串的就是啦，其中Android版的还带有"fennec/"字符串； 
- Opera（）内核：以"opera/"开头，含有"presto/"字符串，其中iphone版还带有"opera mini/"，Android版也带有"opera mobi/"； 
- Webkit内核：以"mozilla/"开头，含有"applewebkit/"和"safari/"字符串，其中带有"chrome/"的就是Chrome浏览器，不带的就是Safari或其他； 

浏览器内核才是解决兼容性的关键问题所在，然而，这个兼容性问题已经有jQuery和Extjs等框架帮你解决了，因此这个判断只针对个别页面的CSS样式在不同内核渲染效果不同的情况下使用，当然了，同样的内核在智能手机和电脑等不同设备上渲染结果也不同，这一点也需要注意。

[back to top](#top)

<h3 id="判断http协议">4. 判断http协议</h3>

```javascript
if (!location.protocol.match('https')) {
  showErrorMsg('You may need to run this app from https.');
}
if (!(navigator.userAgent.match('Chrome') &&
      parseInt(navigator.userAgent.match(/Chrome\/(.*) /)[1]) >= 26)) {
  showErrorMsg('You need Chrome 26+ to run this demo properly.');
}
if (e.code == e.PERMISSION_DENIED) {
      showErrorMsg('PERMISSION_DENIED. Are you no SSL? Have you enabled the --enable-usermedia-screen-capture flag?');
}
```

[back to top](#top)

- [JS通过分析userAgent属性来判断浏览器的类型及版本](http://www.jb51.net/article/48532.htm)
