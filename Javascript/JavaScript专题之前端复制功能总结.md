[Javascript前端复制功能实现](#top)

  - [1. HTML5 Clipboard(Copy, cut, paste)Event事件](#Event)
    - [1.1 基础说明](#基础说明)
    - [1.2 注意事项](#注意事项)
  - [2. Clipboard API- clipboardData对象](#对象方法)
    - [2.1 Clipboard API介绍](#API介绍)
    - [2.2 Clipboard API应用案例](#应用案例)
  - [3. document.execCommand()](#execCommand)
    - [3.1 execCommand指令集](#execCommand指令集)
    - [3.2 document.execCommand('copy') for multi-browser](#execCommandcopy)
      - 使用`document.execCommand('copy')`的一般步骤
      - 结合`document.createRange()`使用- 可不动态添加input元素，直接copy的指定DOM元素
      - 案例1： Copy to clipboard without displaying input- 动态添加后删除
      - 案例2： jquery的tooltip
  - [4. 其他library之Clipboard.js](#其他library)
  - [5. 复制输出到excel](#复制输出到excel)
    - [5.2 Export HTML table to excel with text and images - JavaScript](#JavaScript)
    - [5.2 Export HTML table to excel with text and images - jquery](#jquery)
    - Reference: VBA- Convert The Image URLs To Actual Images
    
------

目前copy主流有四种方式：execCommand，HTML5 Clipboard API，Clipboard.js，ZeroClipboard

------

<h2 id="Event">1. HTML5 Clipboard(Copy, cut, paste)Event事件</h2>

<h3 id="基础说明">1.1 基础说明</h3>

- Clipboard Events
  - copy:在发生复制操作时触发
  - cut:在发生剪切操作时触发
  - paste:在发生粘贴操作时触发
- Clipboard event limit(for security issues): 
  - 只要是在上下文菜单(右键菜单)中选择了相应选项，或者使用了相应的键盘组合键如(ctrl+v)，所有浏览器都会触发copy、cut和paste事件
  - IE浏览器只有在文本中选定字符时，copy和cut事件才会发生。且在非文本框中(如div元素)只能发生copy事件
  - firfox浏览器只有焦点在文本框中才会发生paste事件
- 其他相关事件
  - beforecopy:在发生复制操作前触发: 
  - beforecut:在发生剪切操作前触发
  - beforepaste:在发生粘贴操作前触发
  - 在Firefox、Chrome和Safari中，beforecopy、beforecut和beforepaste事件只会在显示针对文本框的上下文菜单(预期将发生剪贴板事件)的情况下触发。但是IE则会在触发copy、cut和paste事件之前先触发这些事件
  - 在实际的事件发生之前，通过beforecopy、beforecut和beforepaste事件可以在向剪贴板发送数据，或者从剪贴板取得数据之前修改数据。不过，取消这些事件并不会取消对剪贴板的操作，只有取消copy、cut和paste事件，才能阻止相应的操作发生

```javascript
//Solution for clipboard event limit- consistently Getting Clipboard Events: add an hidden text area
//hidden text area that is always set to have some text selected, then cut, copy, and paste events are always fired in any browser
var hiddenInput = $('#hidden-input');  
var focusHiddenArea = function() {
    hiddenInput.val(' ');
	hiddenInput.focus().select();
};
$(document).mouseup(focusHiddenArea);
['cut', 'copy', 'paste'].forEach(function(event) {
    document.addEventListener(event, function(e) {
        console.log(event);
        focusHiddenArea();
        e.preventDefault();
    });
});
```

<h3 id="注意事项">1.2 注意事项</h3>

1. 在copy、paste时候，先在页面添加一个可编辑div(hidden contenteditable div)，也可动态添加后删除, 并使其off screen或不可见
  1. 该可编辑div不能使用`display: none;` ，会导致其内容无法被选中
2. 将预拷贝的内容赋给该可编辑div，并选中该div
3. 当执行copy事件时候，系统将该div的放到系统的剪切板（system clipboard）中
4. 当执行paste事件时候，系统将剪切板（system clipboard）中内容粘贴到其他区域

[back to top](#top)

<h2 id="对象方法">2. Clipboard API- clipboardData对象</h2>

剪贴板中的数据存储在clipboardData对象中

<h3 id="API介绍">2.1 Clipboard API介绍</h3>

- clipboardData对象的兼容性
  - 对于IE浏览器来说，这个对象是window对象的属性
  - 对于Chrome、Safari和Firefox 4+中来说，这个对象是相应的事件对象的属性
  - 为了确保跨浏览器兼容，最好只在发生剪贴板事件期间使用这个对象
    - 对于IE浏览器来说, 可以随时访问clipboardData对象
    - 对于Chrome、Safari和Firefox 4+中来说，只有在处理剪贴板事件期间，clipboardData对象才有效，这是为了防止对剪贴板的未授权访问
- 这个对象有三个方法：
  - getData(): 用于从剪贴板中取得数据，它接受一个参数，即要取得的数据的格式
    - 在IE中，有两种数据格式："text" 和 "URL"。在Chrome、Safari和Firefox 4+中，这个参数是一种MIME类型；不过，可以用"text"代表"text/plain"
    - 在IE浏览器中，cut和copy事件中的getData()方法始终返回null；而其他浏览器始终返回空字符串''。但如果和setDada()方法配合，就可以正常使用
  - setData(): 第一个参数也是数据类型，第二个参数是要放在剪贴板中的文本
    - 第一个参数的规则与getData()相同
    - 在IE浏览器中，该方法在成功将文本放到剪贴板中后，返回true，否则返回false；而其他浏览器中，该方法无返回值
    - 在paste事件中，只有IE浏览器可以正常使用setData()方法，chrome浏览器会静默失败，而firefox浏览器会报错
    - 在Chrome、Safari中的setData()方法不能识别”text”类型, 这两个浏览器在成功将文本放到剪贴板中后，都会返回true;否则返回false
  - clearData(): 用于从剪贴板中删除数据，它接受一个参数，即要取得的数据的格式。在IE中，有两种数据格式："text"和"URL"。在其他浏览器中，这个参数是一种MIME类型；不过，可以用"text"代表
    - 在IE浏览器中，该方法在成功将文本放到剪贴板中后，返回true，否则返回false；而其他浏览器该方法的返回值为undefined

**setData()的数据格式**

```javascript
clipboard.setData('text/plain', selection.getText());
clipboard.setData('application/officeObj', selection.serialize());
clipboard.setData('image/bmp', draw(selection));
clipboard.setData('text/html', ...);
```

- Chrome and Safari: They support any content type on the clipboardData, including custom types. So, we can call `clipboardData.setData('application/lucidObjects', serializedObjects)` for pasting, and then call `var serialized = clipboardData.getData('application/lucidObjects')`
- Firefox: It currently only allows access to the data types described above. You can set custom types on copy, but when pasting, only the white-listed types are passed through.
- Internet Explorer: In true IE fashion, it supports just two data types: Text and URL. Oh, and if you set one, you can’t set the other (it gets nulled out). There is a hack, however, that also allows us to indirectly get and set HTML.
    
Internet Explorer doesn’t expose text/html via JavaScript. It does, however, support copying and pasting HTML into contenteditable elements. We can leverage this if we let the browser perform its default copy and paste, but ‘hijack’ the events to get/put the HTML data we want. 
    
```javascript
//clipboardData对象的兼容性
e = e || event;
var clipboardData = e.clipboardData || window.clipboardData;
// for ie compatibility
var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1 || navigator.userAgent.toLowerCase().indexOf("trident") != -1);
document.addEventListener('copy', function(e) {
    var textToPutOnClipboard = "This is some text";
    if (isIe) {
        window.clipboardData.setData('Text', textToPutOnClipboard);    
    } else {
        e.clipboardData.setData('text/plain', textToPutOnClipboard);
    }
    e.preventDefault();
});
//  Data Formats in different browser
if (isIe) {
    document.addEventListener('beforepaste', function() {
        if (hiddenInput.is(':focus')) {
            focusIeClipboardDiv();
        }
    }, true);
}
var ieClipboardEvent = function(clipboardEvent) {
    var clipboardData = window.clipboardData;
    if (clipboardEvent == 'cut' || clipboardEvent == 'copy') {
        clipboardData.setData('Text', textToCopy);
        ieClipboardDiv.html(htmlToCopy);
        focusIeClipboardDiv();
        setTimeout(function() {
            focusHiddenArea();
            ieClipboardDiv.empty();
        }, 0);
    }
    if (clipboardEvent == 'paste') {
        var clipboardText = clipboardData.getData('Text');
        ieClipboardDiv.empty();
        setTimeout(function() {
            console.log('Clipboard Plain Text: ' + clipboardText);
            console.log('Clipboard HTML: ' + ieClipboardDiv.html());
            ieClipboardDiv.empty();
            focusHiddenArea();
        }, 0);
    }
};
```

**较为完整的示例**

```html
<style>
/*使可编辑div不可见*/
.hidden {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  display: block;
  font-size: 1;
  z-index: -1;
  color: transparent;
  background: transparent;
  overflow: hidden;
  border: none;
  padding: 0;
  resize: none;
  outline: none;
  -webkit-user-select: text;
  user-select: text;
  /* Because for user-select:none, Safari won't allow input */
}
/*使可编辑div off screen*/
.hidden {
  position: absolute;
  left: -9999px;
}
</style>
<!-- a hidden contenteditable div on the page just for copy and paste -->
<div id="ie-clipboard-contenteditable" class="hidden" contenteditable="true" aria-hidden="true"></div>
<input id="hidden-input" class="hidden" type="text" value="" aria-hidden="true" />
<script>
var isSafari = navigator.appVersion.search('Safari') != -1 && navigator.appVersion.search('Chrome') == -1 && navigator.appVersion.search('CrMo') == -1 && navigator.appVersion.search('CriOS') == -1;
var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1 || navigator.userAgent.toLowerCase().indexOf("trident") != -1);
//sample text for copying
var textToCopy = 'Lucidchart: Diagrams Done Right';
var htmlToCopy = '<div hiddenContent="This is a great place to put whatever you want">Lucidchart: Diagrams Done Right</div>';

var ieClipboardDiv = $('#ie-clipboard-contenteditable');
var hiddenInput = $("#hidden-input");

var userInput = "";
var hiddenInputListener = function(text) {};

var focusHiddenArea = function() {
 // In order to ensure that the browser will fire clipboard events, we always need to have something selected
 hiddenInput.val(' ');
 hiddenInput.focus().select();
};
// Focuses an element to be ready for copy/paste (used exclusively for IE)
var focusIeClipboardDiv = function() {
 ieClipboardDiv.focus();
 var range = document.createRange();
 range.selectNodeContents((ieClipboardDiv.get(0)));
 var selection = window.getSelection();
 selection.removeAllRanges();
 selection.addRange(range);
};
// For IE, we can get/set Text or URL just as we normally would, but to get HTML, we need to let the browser perform the copy or paste in a contenteditable div.
var ieClipboardEvent = function(clipboardEvent) {
 var clipboardData = window.clipboardData;
 if (clipboardEvent == 'cut' || clipboardEvent == 'copy') {
     clipboardData.setData('Text', textToCopy);
     ieClipboardDiv.html(htmlToCopy);
     focusIeClipboardDiv();
     setTimeout(function() {
         focusHiddenArea();
         ieClipboardDiv.empty();
     }, 0);
 }
 if (clipboardEvent == 'paste') {
     var clipboardText = clipboardData.getData('Text');
     ieClipboardDiv.empty();
     setTimeout(function() {
         console.log('Clipboard Plain Text: ' + clipboardText);
         console.log('Clipboard HTML: ' + ieClipboardDiv.html());
         ieClipboardDiv.empty();
         focusHiddenArea();
     }, 0);
 }
};
// For every broswer except IE, we can easily get and set data on the clipboard
var standardClipboardEvent = function(clipboardEvent, event) {
 var clipboardData = event.clipboardData;
 if (clipboardEvent == 'cut' || clipboardEvent == 'copy') {
     clipboardData.setData('text/plain', textToCopy);
     clipboardData.setData('text/html', htmlToCopy);
 }
 if (clipboardEvent == 'paste') {
     console.log('Clipboard Plain Text: ' + clipboardData.getData('text/plain'));
     console.log('Clipboard HTML: ' + clipboardData.getData('text/html'));
 }
};
// For IE, the broswer will only paste HTML if a contenteditable div is selected before paste. Luckily, the browser fires 
// a before paste event which lets us switch the focuse to the appropraite element
if (isIe) {
 document.addEventListener('beforepaste', function() {
     if (hiddenInput.is(':focus')) {
         focusIeClipboardDiv();
     }
 }, true);
}
// We need the hidden input to constantly be selected in case there is a copy or paste event. It also recieves and dispatches input events
hiddenInput.on('input', function(e) {
 var value = hiddenInput.val();
 userInput += value;
 hiddenInputListener(userInput);
 // There is a bug (sometimes) with Safari and the input area can't be updated during
 // the input event, so we update the input area after the event is done being processed
 if (isSafari) {
     hiddenInput.focus();
     setTimeout(focusHiddenArea, 0);
 } else {
     focusHiddenArea();
 }
});
// Set clipboard event listeners on the document. 
['cut', 'copy', 'paste'].forEach(function(event) {
 document.addEventListener(event, function(e) {
     console.log(event);
     if (isIe) {
         ieClipboardEvent(event);
     } else {
         standardClipboardEvent(event, e);
         focusHiddenArea();
         e.preventDefault();
     }
 });
});
// Keep the hidden text area selected
$(document).mouseup(focusHiddenArea);
</script>
```

![](https://i.imgur.com/f23c9GF.png)

[back to top](#top)

<h3 id="应用案例">2.2 应用案例</h3>

```javascript
//屏蔽剪贴板
<input value="text">
<button id="test">屏蔽剪贴板</button>
<script>
test.onclick = function(){
    document.oncopy=document.oncut = document.onpaste = function(e){
        e = e || event;
        alert('该文档不允许复制剪贴操作，谢谢配合')
        return false;
    }    
}
</script>
//过滤字符: 如果确保粘贴到文本框中的文本中包含某些字符，或者符合某种形式时，可以使用剪贴板事件。比如只允许粘贴数字
<input id="test">
<script>
test.onpaste = function(e){
    e = e || event;
    var clipboardData = e.clipboardData || window.clipboardData;
    if(!/^\d+$/.test(clipboardData.getData('text')))
        return false;
    }    
}
</script> 
```

<h2 id="execCommand">3. document.execCommand()</h2>

- execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令, https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
- execCommand compatibility:  
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility
  - https://www.quirksmode.org/dom/execCommand.html
- test demo
  - copy/cut/paste:  https://whatwebcando.today/clipboard.html
  - offical test demo: https://codepen.io/netsi1964/full/QbLLGW

`document.execCommand(sCommand[,交互方式,动态参数])`

- 一个 DOMString ，命令的名称。可用命令列表请参阅下表
- 交互方式: Boolean 是否展示用户界面，如果是true的话将显示对话框，如果为false的话，则不显示对话框, 一般为false。Mozilla没有实现
- 动态参数一般为一可用值或属性值（如"true"）

```JavaScript
//创建一个超链接
function fn_creatlink(){   
    document.execCommand('CreateLink',true,'true');//弹出一个对话框输入URL   
    //document.execCommand('CreateLink',false,'http://www.51js.com');   
}   
//指定字颜
document.execCommand('ForeColor',false,'#BBDDCC'); //true或false都可以  
//使用一个不展示的input标签,来实现复制想要复制的内容
var domNode = '<input id='copyText'>';
domNode.value='copyContent' 
/*创造一个domNode,并且将text内容放到节点上, domNode放到body里面,class{ display:absolute;left:-200px;bottom:-100px},让该节点不在可视区域内.
为什么不用display:none? 因为display none 会让这个节点不出现在body中.后面也没办法被选择....所以用定位的方式,让这个节点看不到,但是还在body里.*/
domNode.select();          //让node被选中
try{
  document.execCommand('copy');
  destroy(domNode);//销毁节点
}catch(exception e){
  //当这个excCommand方法不被兼容时,会被捕捉到异常.
}
```

[back to top](#top)

<h3 id="execCommand指令集">3.1 execCommand指令集</h3>

```html
<HTML>
<HEAD>
<TITLE>JavaScript--execCommand指令集</TITLE>
<SCRIPT LANGUAGE="javascript">
// 该function执行copy指令
function fn_doufucopy(){
  edit.select();
  document.execCommand('Copy');
}
//该function执行paste指令
function fn_doufupaste() { 
  tt.focus();
  document.execCommand('paste');
} 
// 该function用来将选中的区块设为指定的前景色,改变选中区块的字体大小,改变字体,字体变粗变斜

function fn_change_forecolor(){
  document.execCommand('ForeColor',false,'#BBDDCC');////指定前景色, true或false都可以  
  document.execCommand('FontSize',false,7);  //指定背景色, true或false都可以
  document.execCommand('FontName',false,'标楷体');   ////字体必须是系统支持的字体, true或false都可以
  document.execCommand('Bold');  //字体变粗
  document.execCommand('Italic');  //变斜体
}
// 该function用来将选中的区块加上不同的线条
function fn_change_selection(){
  document.execCommand('Underline');   //将选中的文字加下划线
  document.execCommand('StrikeThrough');  //在选中的文字上划粗线
  document.execCommand('SuperScript');   //将选中的部分文字变细
  document.execCommand('Underline');   //将选中区块的下划线取消掉
}
// 该function用来将选中的区块排成不同的格式
function fn_format(){
  document.execCommand('InsertOrderedList');  //有序列排列
  document.execCommand('InsertUnorderedList');  //实心无序列排列
  document.execCommand('Indent');  //空心无序列排列
}
// 该function用来将选中的区块剪下或是删除掉
function fn_CutOrDel(){
  //document.execCommand('Delete');  //删除选中的区块
  document.execCommand('Cut');  //剪下选中的区块
}
// 该function用来将选中的区块重设为一个相应的物件
function fn_InsObj(){
/*
  * 以下指令都是为选中的区块重设一个object;
  * 如没有特殊说明,第二个参数true或false是一样的;
  * 参数三表示为该object的id;
  * 可以用在javascript中通过其指定的id来控制它
*/
/*重设为一个button(InsertButton和InsertInputButtong一样,
只不前者是button,后者是input)*/
/*document.execCommand('InsertButton',false,"aa"); //true或false无效
document.all.aa.value="风舞九天";*/
//重设为一个fieldset
/*document.execCommand('InsertFieldSet',true,"aa");
document.all.aa.innerText="刀剑如梦";*/
//document.execCommand('InsertHorizontalRule',true,"aa");  //插入一个水平线
//document.execCommand('InsertIFrame',true,"aa");  //插入一个iframe
//插入一个InsertImage,设为true时需要图片,false时不需图片
//document.execCommand('InsertImage',false,"aa");
//插入一个checkbox
//document.execCommand('InsertInputCheckbox',true,"aa");
//插入一个file类型的object
//document.execCommand('InsertInputFileUpload',false,"aa");
//插入一个hidden
/*document.execCommand('InsertInputHidden',false,"aa");
alert(document.all.aa.id);*/
//插入一个InputImage
/*document.execCommand('InsertInputImage',false,"aa");
document.all.aa.src="F-a10.gif";*/
//插入一个Password
//document.execCommand('InsertInputPassword',true,"aa");
//插入一个Radio
//document.execCommand('InsertInputRadio',false,"aa");
//插入一个Reset
//document.execCommand('InsertInputReset',true,"aa");
//插入一个Submit
//document.execCommand('InsertInputSubmit',false,"aa");
//插入一个input text
//document.execCommand('InsertInputText',false,"aa");
//插入一个textarea
//document.execCommand('InsertTextArea',true,"aa");
//插入一个 select list box
//document.execCommand('InsertSelectListbox',false,"aa");
//插入一个single select
document.execCommand('InsertSelectDropdown',true,"aa");
//插入一个line break(硬回车??)
//document.execCommand('InsertParagraph');
//插入一个marquee
/*document.execCommand('InsertMarquee',true,"aa");
document.all.aa.innerText="bbbbb";*/
//用于取消选中的阴影部分
//document.execCommand('Unselect');
//选中页面上的所有元素
//document.execCommand('SelectAll');
} 
// 该function用来将页面保存为一个文件
function fn_save(){
  document.execCommand('SaveAs','mycodes.txt');  //第二个参数为欲保存的文件名
  //打印整个页面
  //document.execCommand('print');
}
--> 
</SCRIPT>
</HEAD>
<body>
<input id="edit" value="范例" NAME="edit"><br>
<button onclick="fn_doufucopy()" ID="Button1">Copy</button> <button onclick="fn_doufupaste()" ID="Button2">paste</button><br>
<textarea id="tt" rows="10" cols="50" NAME="tt"></textarea>
<hr><br>
浮沉聚散变化又再,但是总可卷土重来.<br>
 天若有情天亦老,人间正道是沧桑.<br>
都怪我,太执着,却也等不到花开叶落.<br><br>
Please select above letters, then click following buttons:<br>
<hr>
<input type="button" value="创建CreateLink" onclick="fn_creatlink()" ID="Button3" NAME="Button3"><br>
<input type="button" value="改变文字背景色" onclick="fn_change_backcolor()" ID="Button4" NAME="Button4"><br>
<input type="button" value="改变文字前景色" onclick="fn_change_forecolor()" ID="Button5" NAME="Button5"><br>
<input type="button" value="给文字加线条" onclick="fn_change_selection()" ID="Button6" NAME="Button6"><br>
<input type="button" value="改变文字的排列" onclick="fn_format()" ID="Button7" NAME="Button7"><br>
<input type="button" value="删除或剪下选中的部分" onclick="fn_CutOrDel()" ID="Button8" NAME="Button8"><br>
<input type="button" value="插入Object" onclick="fn_InsObj()" ID="Button9" NAME="Button9"><br>
<input type="button" value="保存或打印文件" onclick="fn_save()" ID="Button10" NAME="Button10"><br>
<input type="button" value="测试Refresh属性" onclick="document.execCommand('Refresh')" ID="Button11"  NAME="Button11">
</body>
</HTML>
```

指令参数|意义
------------- | ------------- 
2D-Position |允许通过拖曳移动绝对定位的对象
AbsolutePosition| 设定元素的 position 属性为“absolute”(绝对)
BackColor |设置或获取当前选中区的背景颜色
BlockDirLTR| 目前尚未支持
BlockDirRTL |目前尚未支持
Bold |切换当前选中区的粗体显示与否
BrowseMode |目前尚未支持
Copy |将当前选中区复制到剪贴板
CreateBookmark |创建一个书签锚或获取当前选中区或插入点的书签锚的名称
CreateLink| 在当前选中区上插入超级链接，或显示一个对话框允许用户指定要为当前选中区插入的超级链接的 URL
Cut| 将当前选中区复制到剪贴板并删除之
Delete |删除当前选中区
DirLTR |目前尚未支持
DirRTL |目前尚未支持
EditMode |目前尚未支持
FontName |设置或获取当前选中区的字体
FontSize |设置或获取当前选中区的字体大小
ForeColor |设置或获取当前选中区的前景(文本)颜色
FormatBlock| 设置当前块格式化标签
Indent |增加选中文本的缩进
InlineDirLTR |目前尚未支持
InlineDirRTL |目前尚未支持
InsertButton |用按钮控件覆盖当前选中区
InsertFieldset |用方框覆盖当前选中区
InsertHorizontalRule| 用水平线覆盖当前选中区
InsertIFrame |用内嵌框架覆盖当前选中区
InsertImage |用图像覆盖当前选中区
InsertInputButton |用按钮控件覆盖当前选中区
InsertInputCheckbox |用复选框控件覆盖当前选中区
InsertInputFileUpload |用文件上载控件覆盖当前选中区
InsertInputHidden |插入隐藏控件覆盖当前选中区
InsertInputImage |用图像控件覆盖当前选中区
InsertInputPassword |用密码控件覆盖当前选中区
InsertInputRadio| 用单选钮控件覆盖当前选中区
InsertInputReset |用重置控件覆盖当前选中区
InsertInputSubmit| 用提交控件覆盖当前选中区
InsertInputText| 用文本控件覆盖当前选中区
InsertMarquee |用空字幕覆盖当前选中区
InsertOrderedList |切换当前选中区是编号列表还是常规格式化块
InsertParagraph| 用换行覆盖当前选中区
InsertSelectDropdown| 用下拉框控件覆盖当前选中区
InsertSelectListbox| 用列表框控件覆盖当前选中区
InsertTextArea |用多行文本输入控件覆盖当前选中区
InsertUnorderedList |切换当前选中区是项目符号列表还是常规格式化块
Italic |切换当前选中区斜体显示与否
JustifyCenter |将当前选中区在所在格式化块置中
JustifyFull |目前尚未支持
JustifyLeft |将当前选中区所在格式化块左对齐
JustifyNone |目前尚未支持
JustifyRight| 将当前选中区所在格式化块右对齐
LiveResize |迫使 MSHTML 编辑器在缩放或移动过程中持续更新元素外观，而不是只在移动或缩放完成后更新
MultipleSelection |允许当用户按住 Shift 或 Ctrl 键时一次选中多于一个站点可选元素
Open| 目前尚未支持
Outdent |减少选中区所在格式化块的缩进
OverWrite|切换文本状态的插入和覆盖
Paste |用剪贴板内容覆盖当前选中区
PlayImage |目前尚未支持
Print |打开打印对话框以便用户可以打印当前页
Redo |目前尚未支持
Refresh |刷新当前文档
RemoveFormat |从当前选中区中删除格式化标签
RemoveParaFormat |目前尚未支持
SaveAs |将当前 Web 页面保存为文件
SelectAll |选中整个文档
SizeToControl |目前尚未支持
SizeToControlHeight| 目前尚未支持
SizeToControlWidth |目前尚未支持
Stop |目前尚未支持
StopImage |目前尚未支持
StrikeThrough |目前尚未支持
Subscript |目前尚未支持
Superscript |目前尚未支持
UnBookmark |从当前选中区中删除全部书签
Underline| 切换当前选中区的下划线显示与否
Undo 目前尚未支持
Unlink| 从当前选中区中删除全部超级链接
Unselect |清除当前选中区的选中状态

[back to top](#top)

<h3 id="execCommandcopy">3.2 document.execCommand('copy') for multi-browser</h3>

https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility

**使用`document.execCommand('copy')`的一般步骤**

1. add an element to the page: such as `<input class='copyfrom' tabindex='-1' aria-hidden='true'>`，也可动态添加后删除
2. make the element invisible by putting it off screen (do not use `display: none;` because it will not be selected)
3. copy the value to the input/textarea field, select it and copy it, 

```html
<!-- sample of using input -->
<style>
    .copyfrom { position: absolute; left: -9999px; }
</style>
<input class='copyfrom' tabindex='-1' aria-hidden='true'>
<script type="text/javascript">
var input = document.querySelector("input.copyfrom"); // select the input field
function showpropval(val) {
  var selectedValues = getSelectValues(this); // get selected values
  input.value = test.join(','); // join them in a comma separated list
  input.select(); // select offscreen inputs text
  document.execCommand("copy"); // copy it
  this.focus(); // focus back on original, so we don't see any glitches
} 
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;
  for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
  }
return result;
}
</script>
<!-- sample of using textarea -->
<p>
  <button class="js-textareacopybtn" style="vertical-align:top;">Copy Textarea</button>
  <textarea class="js-copytextarea">Hello I'm some text</textarea>
</p>
<script type="text/javascript">
var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-copytextarea');
  copyTextarea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});
</script>
```

**结合`document.createRange()`使用- 可不动态添加input元素，直接copy的指定DOM元素** 

- `document.createRange()`: 用来创建选中容器。返回一个range Object。 该API的兼容性，也是挺好的， 手机端和PC端都支持
- `selectNode(DOM)`: 返回range Object上挂载的方法。用来添加选中元素。只能添加一个
- `window.getSelection().addRange(range)`: 这个方法是挂载到getSelection()方法下的，用来执行元素的选中- **可不动态添加input元素，直接copy的指定DOM元素**。（！很重要）

```html
<p id="selector">今操已拥百万之众，挟天子以令诸侯，此诚不可与争锋。孙权据有江东，已历三世，国险而民附，此可用为援而不可图也<br></p>
<button id="copy">Copy</button>
<script type="text/javascript">
function copyToClipboard(copyDOM, range) {
  range.selectNode(copyDOM);                        // 选中需要复制的节点  
  window.getSelection().addRange(range);            // 执行选中元素  
  var successful = document.execCommand('copy');    // 执行 copy 操作  
    try {    
      var msg = successful ? 'successful' : 'unsuccessful';    
      console.log('copy is' + msg);    
    } catch(err) {    
      console.log('Oops, unable to copy');    
    }  
  // 移除选中的元素  
  window.getSelection().removeAllRanges(); 
}
document.querySelector("#copy").onclick = function() {
  var copyDOM = document.querySelector('#selector');    
  var range = document.createRange();
  copyToClipboard(copyDOM, range);
}; 
//cut
var cutTextareaBtn = document.querySelector('.js-textareacutbtn');
cutTextareaBtn.addEventListener('click', function(event) {
  var cutTextarea = document.querySelector('.js-cuttextarea');
  cutTextarea.select();
  try {
    var successful = document.execCommand('cut');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Cutting text command was ' + msg);
  } catch(err) {
    console.log('Oops, unable to cut');
  }
});
</script>
```

**案例1： Copy to clipboard without displaying input - 动态添加后删除**

```html
<div style="display:inline-block; vertical-align:top;">
  <button class="js-copy-bob-btn">Set clipboard to BOB</button>
</div>
<div style="display:inline-block;">
  <textarea class="js-test-textarea" cols="35" rows="4">Try pasting into here to see what you have on your clipboard:
  </textarea>
</div>
<script type="text/javascript">
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //
  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;
  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();      
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);      //动态添加后删除
}
var copyBobBtn = document.querySelector('.js-copy-bob-btn');
copyBobBtn.addEventListener('click', function(event) {
  copyTextToClipboard('Bob');
});
</script>
```

**案例2： jquery的tooltip**

```javascript
function copy(copytargetid,copybtnid){
    var cpt = document.getElementById(copytargetid);
    var cpb = document.getElementById(copybtnid);
    $(cpt).focus();
    $(cpt).select();
    try{
        if(document.execCommand('copy', false, null)){
            $(cpb).tooltip({title:"copied!", placement: "bottom", trigger: "manual"});
            $(cpb).tooltip('show');
            cpb.onmouseout=function(){$(cpb).tooltip('destroy')};
        } else{
            $(cpb).tooltip({title:"failed!", placement: "bottom", trigger: "manual"});
            $(cpb).tooltip('show');
            cpb.onmouseout=function(){$(cpb).tooltip('destroy')};
        }
    } catch(err){
        $(cpb).tooltip({title:"failed!", placement: "bottom", trigger: "manual"});
        $(cpb).tooltip('show');
        cpb.onmouseout=function(){$(cpb).tooltip('destroy')};
    }
}
```

[back to top](#top)
    
<h2 id="应用案例">4. 其他library之Clipboard.js</h2>

- ZeroClipboard 就是常说的Flash法，通过加载一个Flash，让其访问系统剪贴板来绕过绝大多数系统的权限限制，然而体积稍微庞大些
- Clipboard.js 近几年使用较多，体积相对小， Clipboard.js和execCommand兼容性相似，兼容chrome/ FF/ IE>9/ Safari新版，使用还比较方便
  - https://github.com/lgarron/clipboard-polyfill

```javascript
//Clipboard.js的使用
var clipboard = new Clipboard('.btn');
//可以自己加些处理
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
});
clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
//another demo
<button id='markup-copy'>Copy Button</button>
<script>
document.getElementById('markup-copy').addEventListener('click', function() {
  clipboard.copy({
    'text/plain': 'Markup text. Paste me into a rich text editor.',
    'text/html': '<i>here</i> is some <b>rich text</b>'
  }).then(
    function(){console.log('success'); },
    function(err){console.log('failure', err);
  });

});
</script>
```

[back to top](#top)

<h2 id="复制输出到excel">5. 复制输出到excel</h2>

<h3 id="JavaScript">5.1 Export HTML table to excel with text and images - JavaScript</h3>

```javascript
$("#btnExport").click(function(e) {
  let file = new Blob([$('.divclass').html()], {type:"application/vnd.ms-excel"});
  let url = URL.createObjectURL(file);
  let a = $("<a />", {
    href: url,
    download: "filename.xls"
  }).appendTo("body").get(0).click();
  e.preventDefault();
});
```


```javascript
if (isIe) {
    document.addEventListener('beforepaste', function() {
        if (hiddenInput.is(':focus')) {
            focusIeClipboardDiv();
        }
    }, true);
}
var ieClipboardEvent = function(clipboardEvent) {
    var clipboardData = window.clipboardData;
    if (clipboardEvent == 'cut' || clipboardEvent == 'copy') {
        clipboardData.setData('Text', textToCopy);
        ieClipboardDiv.html(htmlToCopy);
        focusIeClipboardDiv();
        setTimeout(function() {
            focusHiddenArea();
            ieClipboardDiv.empty();
        }, 0);
    }
    if (clipboardEvent == 'paste') {
        var clipboardText = clipboardData.getData('Text');
        ieClipboardDiv.empty();
        setTimeout(function() {
            console.log('Clipboard Plain Text: ' + clipboardText);
            console.log('Clipboard HTML: ' + ieClipboardDiv.html());
            ieClipboardDiv.empty();
            focusHiddenArea();
        }, 0);
    }
};
```

[back to top](#top)

<h3 id="jquery">5.2 Export HTML table to excel with text and images - jquery</h3>

```html
<button id="myButtonControlID">Export Table data into Excel</button>
  <div id="divTableDataHolder">
      <title>Demo for huge data</title>
      <table>
          <thead>
              <tr><th colspan="5">Demoe By <a href="http://codePattern.net/blog">CodePattern.net</a></th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Anil Kumar</td><td>2012</td><td>Delhi</td><td>India</td><td><img src='http://codepattern.net/Blog/pics/CodepatternLogoN.png' alt=''/></td>
            </tr>
            <tr><td>abc</td><td>12</td><td>Delhi</td><td>India</td><td>Earth</td></tr>
            <tr><td>abc</td><td>12</td><td>Delhi</td><td>India</td><td>Earth</td></tr>
            <tr><td>abc</td><td>12</td><td>Delhi</td><td>India</td><td>Earth</td></tr>
            <tr><td>abc</td><td>12</td><td>Delhi</td><td>India</td><td>Earth</td></tr>
          </tbody>
      </table>
  </div>
<script type="text/javascript">
$("[id$=myButtonControlID]").click(function(e) {
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=divTableDataHolder]').html()));
    e.preventDefault();
});
</script>
```

> Reference: VBA- Convert The Image URLs To Actual Images

1. Hold down the ALT + F11 keys to open the Microsoft Visual Basic for Applications window.
2. Click Insert > Module, and paste the following code in the Module Window.
3. press Alt + F8 to run

```vb
Sub URLPictureInsert()
'Updateby Extendoffice 20161116
    Dim Pshp As Shape
    Dim xRg As Range
    Dim xCol As Long
    On Error Resume Next
    Application.ScreenUpdating = False
    Set Rng = ActiveSheet.Range("A2:A6")
    For Each cell In Rng
        filenam = cell
        ActiveSheet.Pictures.Insert(filenam).Select
        Set Pshp = Selection.ShapeRange.Item(1)
        If Pshp Is Nothing Then GoTo lab
        xCol = cell.Column + 1
        Set xRg = Cells(cell.Row, xCol)
        With Pshp
            .LockAspectRatio = msoFalse
            .Width = 100
           .Height = 100
            .Top = xRg.Top + (xRg.Height - .Height) / 2
            .Left = xRg.Left + (xRg.Width - .Width) / 2
        End With
lab:
    Set Pshp = Nothing
    Range("A2").Select
    Next
    Application.ScreenUpdating = True
End Sub
```

https://www.extendoffice.com/documents/excel/4212-excel-insert-image-from-url.html

> Reference
- https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
- [THE DEFINITIVE GUIDE TO COPYING AND PASTING IN JAVASCRIPT](https://www.lucidchart.com/techblog/2014/12/02/definitive-guide-copying-pasting-javascript/)
- http://jsfiddle.net/fpm1nn85/
- [How do I copy to the clipboard in JavaScript?](https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript)
- [Clipboard (Copy & Paste) - What Web Can Do Today](https://whatwebcando.today/clipboard.html)
- [H5 的复制操作](http://blog.csdn.net/hj7jay/article/details/53389203)
- [前端复制功能的若干 -- document.execCommand()](https://www.cnblogs.com/xhyu/p/5370111.html)

