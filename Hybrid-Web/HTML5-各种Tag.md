  -- [top](#top)
  
  - [1. html5调用手机摄像头)](#html5调用手机摄像头)
  - [2. input只能输入数字或小数点后几位](#input只能输入数字或小数点后几位)
  - [3. 文本框不许输入数字以外的字符](#文本框不许输入数字以外的字符)
  - [4. html5背景音乐不自动播放解密(bug)](#html5背景音乐不自动播放解密)
  - [5. ios不支持fixed属性解决](#ios不支持fixed属性解决)
  - [6. input输入手机号之间间隔  例如：xxx--xxxx--xxxx](#input输入手机号之间间隔)

<h3 id="html5调用手机摄像头">1. html5调用手机摄像头</h3>

```html
<input type="file" accept="image/*" capture="camera" multiple>
<input type="file" accept="video/*" capture="camcorder">
<input type="file" accept="audio/*" capture="microphone">
```

- capture: 可以捕获到系统默认的设备，比如：camera--照相机；camcorder--摄像机；microphone--录音
- accept: 直接打开系统文件目录

[back to top](#top)

<h3 id="input只能输入数字或小数点后几位">2. input只能输入数字或小数点后几位</h3>

`<input id="fe3" type="number" step="0.01" placeholder="请输入充值金额" name="" id="" value="" />`

- type=number （原生h5自带）: 控制手机端默认弹出 数字输入键盘
- step=0.01 （原生 h5 自带）: 控制输入框的数字跨度，0.01 代表可以输入 数字和小数点后俩位

```javascript
//补充： jquery控制只输入数字或小数点后几位
$(function(){
        // JavaScript Document
        $.fn.decimalinput = function(num) {
            $(this).css("ime-mode", "disabled");
            this.bind("keypress", function(e) {
                if (e.charCode === 0) return true;  //非字符键 for firefox
                var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
                if (code >= 48 && code <= 57) {
                    var pos = getCurPosition(this);
                    var selText = getSelectedText(this);
                    var dotPos = this.value.indexOf(".");
                    if (dotPos > 0 && pos > dotPos) {
                        if (pos > dotPos + 2) return false;
                        if (selText.length > 0 || this.value.substr(dotPos + 1).length < num)
                            return true;
                        else
                            return false;
                    }
                    return true;
                }
                //输入"."
                if (code == 46) {
                    var selText = getSelectedText(this);
                    if (selText.indexOf(".") > 0) return true; //选中文本包含"."
                    else if (/^[0-9]+\.$/.test(this.value + String.fromCharCode(code)))
                        return true;
                }
                return false;
            });
            this.bind("blur", function() {
                if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
                    this.value = this.value.substr(0, this.value.length - 1);
                } else if (isNaN(this.value)) {
                    this.value = "";
                }
                if (this.value)
                    this.value = parseFloat(this.value).toFixed(2);
                $(this).trigger("input");
            });
            this.bind("paste", function() {
                if (window.clipboardData) {
                    var s = clipboardData.getData('text');
                    if (!isNaN(s)) {
                        value = parseFloat(s);
                        return true;
                    }
                }
                return false;
            });
            this.bind("dragenter", function() {
                return false;
            });
            this.bind("keyup", function() {
            });
            this.bind("propertychange", function(e) {
                if (isNaN(this.value))
                    this.value = this.value.replace(/[^0-9\.]/g, "");
            });
            this.bind("input", function(e) {
                if (isNaN(this.value))
                    this.value = this.value.replace(/[^0-9\.]/g, "");
            });
        };
         
        //获取当前光标在文本框的位置
        function getCurPosition(domObj) {
            var position = 0;
            if (domObj.selectionStart || domObj.selectionStart == '0') {
                position = domObj.selectionStart;
            }
            else if (document.selection) { //for IE
                domObj.focus();
                var currentRange = document.selection.createRange();
                var workRange = currentRange.duplicate();
                domObj.select();
                var allRange = document.selection.createRange();
                while (workRange.compareEndPoints("StartToStart", allRange) > 0) {
                    workRange.moveStart("character", -1);
                    position++;
                }
                currentRange.select();
            }
            return position;
        }
        //获取当前文本框选中的文本
        function getSelectedText(domObj) {
            if (domObj.selectionStart || domObj.selectionStart == '0') {
                return domObj.value.substring(domObj.selectionStart, domObj.selectionEnd);
            }
            else if (document.selection) { //for IE
                domObj.focus();
                var sel = document.selection.createRange();
                return sel.text;
            }
            else return '';
        }
       
        //$('#fe3').decimalinput(2);  
})
```

[back to top](#top)

<h3 id="文本框不许输入数字以外的字符">3. 文本框不许输入数字以外的字符</h3>

```javascript
/*文本框只能输入文字*/
var just_num = function(obj){
       obj.val(obj.val().replace(/\D|^0/g,''));
}
//用法
$('.test').keyup(function(){
    just_num($(this));
})
//在手机下存在一个bug，就是不能在中间插入数字，（原因也很简单，因为keyup的时候，文本执行了一次替换，所以光标就不在原来位置了）
var just_num2 = function(event){
      if(!$.browser.mozilla) {   // IE
           if (event.keyCode && (event.keyCode < 48 || event.keyCode > 57))  /如果keyCode不是数字，直接event.preventDefault(); 禁用js原生事件
                 event.preventDefault();   /
            }else{     //firefox
                if(event.charCode && (event.charCode < 48 || event.charCode > 57))
                 event.preventDefault();
             }
        }
}
//拒绝输入数字以外的字符
$('input[type=number]').keypress(function(event){
   just_num2(event);
})
```

[back to top](#top)

<h3 id="html5背景音乐不自动播放解密">4. html5背景音乐不自动播放解密(bug)</h3>

为了防止不必要的自动播放浪费流量，手机网页访问带有audio的页面是不会自动播放的。 Safari屏蔽了autoplay，必须由用户交互事件触发，因为autoplay在移动网络环境下可能会造成用户流量费剧增

> 引自Safari Reference:  In Safari on iPhone OS (for all devices, including iPad), where the user may be on a cellular network and be charged per data unit, autobuffering and autoplay are disabled. No data is loaded until the user initiates it. This means the JavaScript play() and load() methods
 are also inactive until the user initiates playback, unless the play() method is triggered by user action. 

[back to top](#top)

<h3 id="ios不支持fixed属性解决笔记">5. ios不支持fixed属性解决</h3>

特别是当页面中有input ，当这个input获取焦点的时候，问题特别明显， 这个问题也称之为  “ input focus ios fixed 无效”。

```javascript
//ios不支持fixed解决方案: 可以解决部分问题，但是不彻底
            var u = navigator.userAgent, app = navigator.appVersion;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //ios终端
            if (isiOS) {
                $('textarea,input[type=text]').focus(function () {
                    window.setTimeout('scrollBottom()', 500);
                });
            }
            function scrollBottom() {
                window.scrollTo(0, $('body').height());
            }
```

[back to top](#top)

<h3 id="input输入手机号之间间隔">6. input输入手机号之间间隔  例如：xxx--xxxx--xxxx</h3>

`<input id="ph-no" oninput="this.value = this.value.replace(/((^\d{3})(?=\d)|(\d{4})(?=\d))/g, '$1 ')" autocomplete="off" placeholder="支持移动、联通、电信" maxlength="13" type="tel">`

[back to top](#top)

> Reference

- [（亲测可用）input只能输入数字或小数点后几位](#http://www.qdfuns.com/notes/26716/6ada0d47a845cc2f581bd85d28d270c9.html)
