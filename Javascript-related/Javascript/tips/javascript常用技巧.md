[javascript常用技巧](#top)

- [HTML](#html)
  - [1. 屏蔽右键](#屏蔽右键)
  - [2. 防止选取，防止复制，防止粘贴](#防止选取)
  - [3. 在收藏夹中显示你的图标](#在收藏夹中显示你的图标)
  - [4. 关闭输入法](#关闭输入法)
  - [5. 网页不能另存-可以使JS广告失效](#网页不能另存)
  - [6. 自动跳转 -3秒刷新到URL](#自动跳转)
- [pure JavaScript](#js) 
  - [1. 手机类型判断](#手机类型判断)
  - [2. 字符串长度](#字符串长度)
  - [3. 获取url中的参数](#获取url中的参数)
  - [4. js绑定事件](#js绑定事件)
  - [5. 当前浏览器JS的版本](#当前浏览器JS的版本)
  - [6. 获取当前点击事件的Object对象](#获取当前点击事件的Object对象)
  - [7. js 判断浏览器](#js判断浏览器)
  - [8. 回车提交](#回车提交)
  - [9. 按Ctrl+Enter 直接提交表单](#按Ctrl+Enter直接提交表单)
  - [10. JS 替换非法字符主要用在密码验证上出现的特殊字符](#替换非法字符主要用在密码验证上出现的特殊字符)
  - [11. Js 去掉空格方法](#去掉空格方法)
  - [12. 获取当前时间](#获取当前时间)
  - [13. 获取字符串最后和第一位方法](#获取字符串最后和第一位方法)
- [JavaScript+HTML](#jh)
  - [1. select跳转](#select跳转)
  
<h2 id="html">HTML</h2>

<h3 id="屏蔽右键">1. 屏蔽右键</h3>

```html
<body oncontextmenu=window.event.returnvalue=false>
<!-- 也可用在table -->
<table border oncontextmenu=return(false)>
```

<h3 id="防止选取">2. 防止选取，防止复制，防止粘贴</h3>

```html
<body onselectstart=return false>
<body onpaste=return false>
<body oncopy=return false;oncut=return false;>
```

<h3 id="在收藏夹中显示你的图标">3. 在收藏夹中显示你的图标</h3>

`<link rel=Bookmark href=favicon.ico>`

<h3 id="关闭输入法">4. 关闭输入法</h3>

`<input style=ime-mode:disabled>`

在提交表格时用到，在输入数据时不可以使用其他输入法

<h3 id="网页不能另存">5. 网页不能另存-可以使JS广告失效</h3>

`<noscript><iframe src=*.html></iframe></noscript>`

<h3 id="自动跳转">6. 自动跳转 -3秒刷新到URL</h3>

`<meta http-equiv=refreshcontent=3;URL=http://www.google.ca;charset=utf-8>`

[back to top](#top)

<h2 id="js">pure JavaScript</h2>

<h3 id="手机类型判断">1. 手机类型判断</h3>

```javascript
var BrowserInfo = {
    userAgent: navigator.userAgent.toLowerCase()
    isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
    isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
    isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
    isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
}
```

[back to top](#top)

<h3 id="字符串长度">2. 字符串长度</h3>

```javascript
function strLength(str) {
      var a = 0;
      for(var i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 255)
              a+=2;    //汉字计数为2
          else
              a++;
        }
        return a;
}
```

[back to top](#top)

<h3 id="获取url中的参数">3. 获取url中的参数</h3>

```javascript
function GetQueryStringRegExp(name,url) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(url)) return decodeURIComponent(RegExp.$2.replace(/\+/g, " ")); return "";
}
```

[back to top](#top)

<h3 id="js绑定事件">4. js 绑定事件</h3>

```javascript
/* js 绑定事件 适用于任何浏览器的元素绑定 */
function eventBind(obj, eventType, callBack) {
        if (obj.addEventListener) {
            obj.addEventListener(eventType, callBack, false);
        }
        else if (window.attachEvent) {
            obj.attachEvent('on' + eventType, callBack);
        }
        else {
            obj['on' + eventType] = callBack;
        }
    };
eventBind(document, 'click', bodyClick);
```

[back to top](#top)

<h3 id="当前浏览器JS的版本">5. 当前浏览器JS的版本</h3>

```javascript
function getjsversion(){
    var n = navigator;
    var u = n.userAgent;
    var apn = n.appName;
    var v = n.appVersion;
    var ie = v.indexOf('MSIE ');
    if (ie > 0){
        apv = parseInt(i = v.substring(ie + 5));
        if (apv > 3) {
            apv = parseFloat(i);
        }
    } else {
        apv = parseFloat(v);
    }
    var isie = (apn == 'Microsoft Internet Explorer');
    var ismac = (u.indexOf('Mac') >= 0);
    var javascriptVersion = "1.0";
    if (String && String.prototype) {
        javascriptVersion = '1.1';
        if (javascriptVersion.match) {
            javascriptVersion = '1.2';
            var tm = new Date;
            if (tm.setUTCDate) {
                javascriptVersion = '1.3';
                if (isie && ismac && apv >= 5) javascriptVersion = '1.4';
                var pn = 0;
                if (pn.toPrecision) {
                    javascriptVersion = '1.5';
                    a = new Array;
                    if (a.forEach) {
                        javascriptVersion = '1.6';
                        i = 0;
                        o = new Object;
                        tcf = new Function('o', 'var e,i=0;try{i=new Iterator(o)}catch(e){}return i');
                        i = tcf(o);
                        if (i && i.next) {
                            javascriptVersion = '1.7';
                        }
                    }
                }
            }
        }
    }
    return javascriptVersion;
}
```

[back to top](#top)

<h3 id="获取当前点击事件的Object对象">6. 获取当前点击事件的Object对象</h3>

```javascript
function getEvent() {
    if (document.all) {
        return window.event; //如果是ie
    }
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
};
```

[back to top](#top)

<h3 id="js判断浏览器">7. js 判断浏览器</h3>

```javascript
function getOs() {
    if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
        return "MSIE8";
    }
    else if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        return "MSIE6";
    }
    else if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        return "MSIE7";
    }
    else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox";
    }
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        return "Chrome";
    }
    else {
        return "Other";
    }
}
//判断是否是 IE 浏览器
if (document.all){ 
        alert("IE浏览器"); 
    }else{ 
        alert("非IE浏览器"); 
    } 
    if (!!window.ActiveXObject){ 
        alert("IE浏览器"); 
    }else{ 
        alert("非IE浏览器"); 
  } 
//判断是IE几
var isIE=!!window.ActiveXObject; 
var isIE6=isIE&&!window.XMLHttpRequest; 
var isIE8=isIE&&!!document.documentMode; 
var isIE7=isIE&&!isIE6&&!isIE8; 
if (isIE){ 
    if (isIE6){ 
        alert("ie6"); 
    }else if (isIE8){ 
        alert("ie8"); 
    }else if (isIE7){ 
        alert("ie7"); 
    } 
}
```

[back to top](#top)

<h3 id="回车提交">8. 回车提交</h3>

```javascript
$("id").onkeypress = function (event) {
    event = (event) ? event : ((window.event) ? window.event : "")
    keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
    if (keyCode == 13) {
        $("SubmitLogin").onclick();
    }
}
```

[back to top](#top)

<h3 id="按Ctrl+Enter直接提交表单">9. 按Ctrl+Enter 直接提交表单</h3>

```javascript
document.body.onkeydown = function (evt) {
        evt = evt ? evt : (window.event ? window.event : null);
        if (13 == evt.keyCode && evt.ctrlKey) {
            evt.returnValue = false;
            evt.cancel = true;
            PostData();
        }
};
```

[back to top](#top)

<h3 id="替换非法字符主要用在密码验证上出现的特殊字符">10. JS 替换非法字符主要用在密码验证上出现的特殊字符</h3>

```javascript
function URLencode(sStr) {
  return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');
};
```

[back to top](#top)

<h3 id="去掉空格方法">11. Js 去掉空格方法</h3>

```javascript
String.prototype.Trim = function(){ return this.replace(/(^\s*)|(\s*$)/g, ""); }
String.prototype.LTrim = function(){return this.replace(/(^\s*)/g, "");}
String.prototype.RTrim = function(){return this.replace(/(\s*$)/g, "");}
```

[back to top](#top)

<h3 id="获取当前时间">12. 获取当前时间</h3>

```javascript
function GetCurrentDate() {
        var d = new Date();
        var y = d.getYear()+1900;
        month = add_zero(d.getMonth() + 1),
        days = add_zero(d.getDate()),
        hours = add_zero(d.getHours());
        minutes = add_zero(d.getMinutes()),
        seconds = add_zero(d.getSeconds());
        var str = y + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
        return str;
};
function add_zero(temp) {
    if (temp < 10) return "0" + temp;
    else return temp;
}
```

[back to top](#top)
  
<h3 id="获取字符串最后和第一位方法">12.13. 获取字符串最后和第一位方法</h3>

```javascript
//最后一位
str.charAt(str.length – 1);
str.substr(str.length-1,1);
//第一位
"abcdef".charAt(0);     // 'a'
//去除第一位的剩余字符串
"abcdef".substr(1);    //"bcdef"
```

[back to top](#top)

<h2 id="jh">JavaScript+HTML</h2>

<h3 id="select跳转">1. select跳转</h3>

```javascript
//1) select加链接
function mbar(sobj) {
  var docurl =sobj.options[sobj.selectedIndex].value;
  if (docurl != "") {
     open(docurl,'_blank');
     sobj.selectedIndex=0;
     sobj.blur();
  }
}
<Select onchange=mbar(this) name="select">
  <OPTION selected>=== 合作伙伴 ===</OPTION>
  <OPTION value="http://www.baidu.com">百度</OPTION>
  <OPTION value="http://www.163.com">网易</OPTION>
</Select>
//2) location.href
<select name="pageselect" onchange="self.location.href=options[selectedIndex].value" >
  <OPTION value="http://www.baidu.com">百度</OPTION>
  <OPTION value="http://www.163.com">网易</OPTION>
</select>
//3) select选择-按钮跳转
function setsubmit(){
  if(mylink.value == 0)
   window.location='http://www.baidu.com';
  if(mylink.value == 1)
    window.location='http://www.163.com';
}
<select name="mylink" id="mylink">
  <OPTION value="0">百度</OPTION>
  <OPTION value="1">网易</OPTION>
</select>
<input type="button" id="btn" value="提交" onclick="setsubmit(this)" />
```

[back to top](#top)

> Reference

- [JavaScript常用代码总结](http://www.open-open.com/lib/view/open1492571264227.html)
- [45个实用的JavaScript技巧、窍门和最佳实践](http://blog.jobbole.com/54495/)
