  -- [HTML5-各种Tag](#top)
  
  - [Touch Keyboard Types Cheat Sheet](#sheet)
  - [Remove inner controls in input field: `<input type="number">`](#remove)
  - [1. html5调用手机摄像头](#html5调用手机摄像头)
  - [2. input只能输入数字或小数点后几位](#input只能输入数字或小数点后几位)
  - [3. 文本框不许输入数字以外的字符](#文本框不许输入数字以外的字符)
  - [4. html5背景音乐不自动播放解密(bug)](#html5背景音乐不自动播放解密)
  - [5. ios不支持fixed属性解决](#ios不支持fixed属性解决)
  - [6. input输入手机号之间间隔  例如：xxx--xxxx--xxxx](#input输入手机号之间间隔)

------

## HTML5-各种Tag

| HTML input tag | feature  |
| :------------- | :------------- |
|`<input type="email" value="">`<br>`<input type="tel" value="">`<br>`<input type="url" value="">`<br>`<input type="password" value="">`|![](https://i.imgur.com/tO7JNaj.jpg)|
|`<input type="time" value="">`<br>`<input type="datetime-local" value="">`<br>`<input type="month" value="">`|![](https://i.imgur.com/QvRMAfG.jpg)|
|`<input type="text" pattern="\d*" value="">`, note: patterns which do not work on the Android side for now|![](https://i.imgur.com/dVZUDTB.jpg)|

http://www.myflashlabs.com/how-to-control-the-the-virtual-keyboard-layout-in-ios-and-android-using-javascript-and-html/

------

<h2 id="sheet">Touch Keyboard Types Cheat Sheet</h2>

|category|code |function|
| :------------- | :------------- |:------------- |
| E-mail field |`<input type="email" autocapitalize="off" autocorrect="off" autocomplete="email">`|Disable auto-correct and disable auto-capitalization. Invoke special @ keyboard|
|URL field|`<input type="url" />`|   |
|Phone field |`<input type="tel" autocorrect="off" autocomplete="tel">`|Invoke special phone keyboard. (Note: iOS doesn't allow input of special characters such as parenthesis and dash with the phone keyboard. Thus, never require phone numbers to be formatted with such characters.)|
|Name field|`<input type="text" autocorrect="off" autocomplete="name">`|Disable auto-correct. (Note: while it is recommended to use a single name field, if you split it across multiple fields, be sure to assign the appropriate autocomplete values.)|
|Address line fields|`<input type="text" autocorrect="off" autocomplete="address-line1">` |Disable auto-correct. (Note: be sure to update the autocomplete attribute accordingly if using multiple address line fields.)|
|City|`<input type="text" autocorrect="off" autocomplete="address-level2">`| Disable auto-correct |
|State|`<input type="text" autocorrect="off" autocomplete="address-level2">`|Disable auto-correct|
|Numeric field|`<input type="text" pattern="[0-9]*" />`| Refer to following explaination|
|ZIP code field<br>(Numeric field 1) |`<input type="text" inputmode="numeric" pattern="[0-9]*" novalidate autocorrect="off" autocomplete="postal-code">`|Set input pattern to numeric input. (Note: Argentina, Canada, Netherlands, and UK, may use letters in their postal code. To support these, dynamically change the input pattern depending on selected country. Also, for the numeric keyboard to be invoked on all Android devices, the field type must be changed to type=number, however, this may cause issues with leading zeroes in some browser versions – therefore if changing to type=number, make absolutely sure to handle these exceptions.) |
|Credit card number field<br>(Numeric field 2)|`<input type="text" inputmode="numeric" pattern="[0-9]*" novalidate autocorrect="off" autocomplete="cc-number">`| Numeric keyboard. (Note: for the numeric keyboard to be invoked on all Android devices, the field type must be changed to type=number, however, this may cause issues with leading zeroes in some browser versions – therefore if changing to type=number, make absolutely sure to handle these exceptions.)|
|Credit card security code field<br>(Numeric field 3)|`<input type="text" inputmode="numeric" pattern="[0-9]*" novalidate autocorrect="off" autocomplete="cc-csc">`|Numeric keyboard. (Note: for the numeric keyboard to be invoked on all Android devices, the field type must be changed to type=number, however, this may cause issues with leading zeroes in some browser versions – therefore if changing to type=number, make absolutely sure to handle these exceptions.)|
|Date field|`<input type="date">`|Date picker keyboard. (Note: you may want to implement an actual calendar date picker.)|

**Problem: `type="number"` isn’t appropriate for all numbers**

- With auto-correction disabled, allows the user to enter their address without ‘dictionary intervention’
- e-mail by invoking the e-mail keyboard layout with ‘@’ and ‘.’ keys
- ![](https://i.imgur.com/qZ1lywC.png)

```javascript
// A Better iOS Solution: using `inputmode` and type="number"
<label for="creditcard">credit card number:</label> <input inputmode="numeric" pattern="[0-9]*" type="text" name="creditcard">
var numberinput = document.querySelector('input')
if (numberInput.validity.valueMissing && !numberInput.validity.badInput) {
  errorMessage.textContent = "field must not be empty"
}
```

<h2 id="remove">Remove inner controls in input field: `<input type="number">`</h2>

![](https://i.imgur.com/ICXI2WR.png)

```css
/* Remove controls from Firefox*/
input[type=number] {
  -moz-appearance: textfield;
}
/* Remove controls from Safari and Chrome */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  margin: 0; /* Removes leftover margin */
}
/* Adds a box around the numeric value in Safari and Chrome */
input[type=number]::-webkit-textfield-decoration-container {
  border: 1px #ccc solid;
  background: #efefef;
}
/* Re-applies the controls on :hover and :focus from Chrome*/
input[type="number"]:hover,
input[type="number"]:focus {
  -moz-appearance: number-input;
}
```

**Note**: I also detailed data about [HTML5 input attributes/types/elements](http://www.wufoo.com/html5/). It's getting a smidge old, but still useful

> Reference
> - [Touch Keyboard Types](https://baymard.com/labs/touch-keyboard-types)
> - [Numeric Inputs – A Comparison of Browser Defaults](https://css-tricks.com/numeric-inputs-a-comparison-of-browser-defaults/)
> - [Finger-friendly numerical inputs with `inputmode`](https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/?utm_source=mobiledevweekly&utm_medium=email)
> - [E-Commerce Checkout Usability](https://baymard.com/checkout-usability)
> - [M-Commerce Usability](https://baymard.com/mcommerce-usability)

[back to top](#top)

<h2 id="html5调用手机摄像头">1. html5调用手机摄像头</h2>

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
           if (event.keyCode && (event.keyCode < 48 || event.keyCode > 57))
                 event.preventDefault();   //如果keyCode不是数字，直接event.preventDefault(); 禁用js原生事件
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

<h3 id="ios不支持fixed属性解决">5. ios不支持fixed属性解决</h3>

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
