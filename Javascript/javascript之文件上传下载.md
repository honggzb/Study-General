[目录](#top)

- [1. 非HTML5之文件上传](#非HTML5之文件上传)
  - [1.1 一般上传 - 获得文件属性](#一般上传)
  - [1.2 拖动上传/Drag and drop - 获得文件属性](#拖动上传)
  - [1.3 使用 Ajax 上传](#使用Ajax上传)
- [2. URL对象之文件上传](#URL对象之文件上传)
- [3. 文件读写操作](#文件读写操作)
  - [3.1 HTML5 File API之FileReader接口](#FileReader接口)
    - [FileReader对象的方法](#FileReader对象的方法)
    - [FileReader对象的处理事件](#FileReader对象的处理事件)
    - [案例1： 读取本地图片文件并显示](#读取本地图片文件并显示)
    - [以 ArrayBuffers 方式读取](#以ArrayBuffers方式读取)
    - [Progress events （进度事件）](#进度事件)
    - [File API定义了四种错误类型](#四种错误类型)
  - [3.2 Blob 对象](#Blob对象)
- [4. URL对象之文件下载](#URL对象之文件下载)
- [5. NodeJs中的文件上传](#NodeJs中的文件上传)

使用 javascript 来操作文件，是严格被禁止的，因为你不想一打开网页，硬盘灯就狂闪，然后把你硬盘的文件/列表都慢慢的上传上去，那么你就危险了。所以一般情况下，javascript 操作文件，都是在网页中提供文件上传控件。此时，需要允许，才会使此网页获得相应的文件的信息。

对象|说明
---|---
File对象|就是一个文件,比如用input type="file"标签来上传文件,那么里面的每个文件都是一个File对象.
Blob对象|就是二进制数据,比如通过new Blob()创建的对象就是Blob对象.又比如,在XMLHttpRequest里,如果指定responseType为blob,那么得到的返回值也是一个blob对象

<h3 id="非HTML5之文件上传">1. 非HTML5之文件上传</h3>

<h4 id="一般上传">1.1 一般上传 - 获得文件属性</h4>

`<input type="file" id="your-files" multiple>`

```javascript
//获得文件属性
var control = document.getElementById("your-files");
control.addEventListener("change", function(event) {
    var i = 0,
        files = control.files,
        len = files.length;
    for (; i < len; i++) {
        console.log("Filename: " + files[i].name);
        console.log("Type: " + files[i].type);
        console.log("Size: " + files[i].size + " bytes");
    }
}, false);
```

[back to top](#top)

<h4 id="拖动上传">1.2 拖动上传/Drag and drop - 获得文件属性</h4>

`<div id="your-files">&lt;/div>`

```javascript
var target = document.getElementById("your-files");
target.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);
target.addEventListener("drop", function(event) {
    event.preventDefault();  // 阻止浏览器默认动作
    var i = 0,
        files = event.dataTransfer.files,
        len = files.length;
    //获得文件属性
    for (; i < len; i++) {
        console.log("Filename: " + files[i].name);
        console.log("Type: " + files[i].type);
        console.log("Size: " + files[i].size + " bytes");
    }
}, false);
```

style的改进，另写一个input显示选中的文件

```html
<p class="text_area2">
  <input type="text" class="input_text input_text1" name="textfield" id="textfield"/> 
  <a href="javascript:;" class="upload_btn2" title="上传">
    <input type="file" id="file1" class="file1" size="0.1" onchange="document.getElementById('textfield').value=this.value" >
  </a>
</p>
```

[back to top](#top)

<h4 id="使用Ajax上传">1.3 使用 Ajax 上传</h4>

- 使用定义在XMLHttpRequest Level 2中的`FormData`对象，可以表示一个 HTML表单，并且使用“属性：值” 这样的方式，使用`append()`方法来提交表单
- `FormData`对象的好处就是可以直接的获取文件内容。并且可以十分有效的模拟一个表单，而你只需要增加一些特别的信息，例如文件名等，其他的浏览器都会自己去做。

```javascript
var form = new FormData();
form.append("name", "Nicholas");
// 创建一个有多个数据的表单
var form = new FormData();
form.append("name", "Nicholas");
form.append("photo", control.files[0]);
// 通过 XHR 传送，没有传送 header!
var xhr = new XMLHttpRequest();
xhr.onload = function() {
    console.log("Upload complete.");
};
xhr.open("post", "/entrypoint", true);
xhr.send(form);
```

图片文件上传

```html
<form id="uploadForm" enctype="multipart/form-data" method="post" action="XXXXXX">
  <input type="file" name="imageFile" id="imageFile" onchange="fileSelected()" />
</form>
<script>
  var iMaxFilesize = 2097152;     //2M
  window.fileSelected = function() {
   var oFile = document.getElementById('imageFile').files[0]; //读取文件
   var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
   if (!rFilter.test(oFile.type)) {
    alert("文件格式必须为图片");
    return;
   }
   if (oFile.size > iMaxFilesize) {
    alert("图片大小不能超过2M");
    return;
   }
   var vFD = new FormData(document.getElementById('uploadForm')), //建立请求和数据
    oXHR = new XMLHttpRequest();
   oXHR.addEventListener('load', function(resUpload) {
    //成功
   }, false);
   oXHR.addEventListener('error', function() {
    //失败
   }, false);
   oXHR.addEventListener('abort', function() {
    //上传中断
   }, false);
   oXHR.open('POST', actionUrl);
   oXHR.send(vFD);
  };
```

也可在html中指定文件类型

```html
<input type="file" accept="application/msword" />我只想要word<br>
<input type="file" name="pic" id="pic" accept="image/gif, image/x-ms-bmp, image/bmp" />
```

[back to top](#top)

<h3 id="URL对象之文件上传">2. File API的URL对象之文件上传</h3>

File API全局的URL对象就是一个指向磁盘上文件的url，例如，想要在浏览器中显示一个文件，而这个文件存在与用户的电脑上，通常的办法是先上传到服务器，然后在现实，但这里却不需要服务器的干预，只需要加载图片即可。 使用URL对象的话，那么就可以直接将硬盘里的文件。

**URL对象的两个方法**

- createObjectURL() ， 根据传入的指向文件的参数的参数创建一个指向该参数对象的URL, 然后返回URL对象，这个URL的生命仅存在于它被创建的这个文档里. 新的对象URL指向执行的File对象或者是Blob对象, 这就使得浏览器能够创建和管理一个指向本地文的URL
- revokeObjectURL() ， 释放一个通过URL.createObjectURL()创建的对象URL, 使得浏览器可以销毁传递给它的URL对象，以释放内存，并且页面一旦关闭，所有的 url 对象都会被销毁。不过这样做的好处就是不需要他们的时候，浏览器可以及时释放内存


在图像加载完成之后就销毁次数据呢，因为此数据在这里只会被使用一次，所以手动的释放它以节省内存占用，但是如果还有其他用处的话，就不应该手动销毁它。

**安全问题和其他注意事项**

- 初一看，此功能有点恐怖，因为竟然可以直接加载用户的磁盘文件。当然了，这样有一些安全隐患，不过 URL 本身并没有多大的问题，因为它都是动态分配，并且在其他计算机上无法访问
- URL 对象的储存时间很短，只在文档创建他们的期间存在，一旦页面被关闭，则他们都会被销毁。所以他们不会被存储在客户端。因为页面一关闭，他们都是无用的数据了。


```javascript
//预览图像
var URL = window.URL || window.webkitURL, imageUrl, image;    //URL: 一个本地 URL 变量
if (URL) {
    imageUrl = URL.createObjectURL(file);
    image = document.createElement("img");
    //URL对象存储在imageUrl中，然后后创建一个img对象，给img对象一个事件，等img对象加载完成之后，销毁imageUrl ，然后将此imageUrl付给img对象的src属性
    image.onload = function() {      
        URL.revokeObjectURL(imageUrl);   
    };
    image.src = imageUrl;
    document.body.appendChild(image);   //插入到页面
} 
```

**上传图片完整案例**

`<div id="forAppend" class="demo"></div>`

```javascript
var eleAppend = document.getElementById("forAppend");
window.URL = window.URL || window.webkitURL;
if (typeof history.pushState == "function") {
    var xhr = new XMLHttpRequest();    
    xhr.open("get", "/image/study/s/s256/mm1.jpg", true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (this.status == 200) {
            var blob = this.response;
            //URL对象存储在imageUrl中，然后后创建一个img对象，给img对象一个事件，等img对象加载完成之后，销毁imageUrl ，然后将此imageUrl付给img对象的src属性
            var img = document.createElement("img"); 
            img.onload = function(e) {
              window.URL.revokeObjectURL(img.src); // 清除释放
            };
            img.src = window.URL.createObjectURL(blob);
            eleAppend.appendChild(img);      //插入到页面
        }
    }
    xhr.send();
} else {
    eleAppend.innerHTML = '<p style="color:#cd0000;">浏览器不给力，还是早点回去给孩子喂奶吧~</p>';    
}
```

[back to top](#top)

<h3 id="文件读写操作">3. 文件读写操作</h3>

<h4 id="FileReader接口">3.1 HTML5 File API之FileReader接口</h4>

FileReader接口用于读取文件数据并且将其存储在 javascript 变量中，此 API 专门被设计成模拟（类似） XMLHttpRequest 操作，因为它们两个都是从外部资源加载数据（不包括浏览器）。并且此 API 被设计成异步的(asynchronously)，所以不会引起浏览器的锁死。

FileReader 可以将数据读取成各种格式，而且在读取数据的时候，必须要求使用这几种格式，这几种格式如下，必须通过调用这几种格式才能读取数据。

<h4 id="FileReader对象的方法">FileReader对象的方法</h4>

方法名|参数|返回|描述
---|---|---|---
abort|none||中断读取
readAsText|file, [encoding]|文本数据(text/plain)|将文件读取为文本, 第二个参数是文本的编码方式，默认值为 UTF-8
readAsBinaryString|file|返回此文件被编码的二进制数据 (已弃用– 使用 readAsArrayBuffer() 代替)|将文件读取为二进制码
readAsArrayBuffer()|file|返回此文件的一个ArrayBuffer（二进制数据缓冲）（适合二进制数据，例如图像文件)数据|
readAsDataURL|file|返回此文件的`<a href="http://en.wikipedia.org/wiki/Data_URI_scheme" title="Data URI scheme" target="_blank">data URL</a>`|将文件读取为DataURL, 即将文件读取为一段以 data: 开头的字符串(Data URL)，Data URL是一种将小文件直接嵌入文档的方案。这里的小文件通常是指图像与 html 等格式的文件

<h4 id="FileReader对象的处理事件">FileReader对象的处理事件</h4>

事件|描述
---|---
onabort|	中断时触发, 当数据加载被abort()方法取消的时候，（在 FileReader 和 XMLHttpRequest 都可用）
onerror|	出错时触发, 当数据加载失败的时候
onload|	文件读取成功完成时触发, 当所有数据都被成功加载的时候
onloadend|	读取完成触发，无论成功或失败,只要过程完成就好
onloadstart|	读取开始时触发
onprogress	|读取中

文件一旦开始读取，无论成功或失败，实例的 result 属性都会被填充。如果读取失败，则 result 的值为 null ，否则即是读取的结果，绝大多数的程序都会在成功读取文件的时候，抓取这个值。

```javascript
//从本地读取比较小的图片，读取并且在浏览器中显示, 可以实现使用data URIs/data URLs 读取数据
var reader = new FileReader();
reader.onload = function(event) {  //文件读取完成, 成功读取
    var dataUri = event.target.result,       //数据内容
        img = document.createElement("img"); //创建一个 img 对象
    img.src = dataUri;                  //设置 img 对象的 src 属性值为 dataUri
    document.body.appendChild(img);     //将 img 插入到 body 中
}; 
reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
};   //文件读取错误
// 如将此图片放到页面上进行处理，要使用<canvas> 才行
var reader = new FileReader();
reader.onload = function(event) {
    var dataUri = event.target.result,
        context = document.getElementById("mycanvas").getContext("2d"),
    img = new Image();
    img.onload = function() {// 等待图像文件被加载完
        canvas.drawImage(img, 100, 100);
    };
    img.src = dataUri;
};
reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
};
```

<h4 id="读取本地图片文件并显示">案例1： 读取本地图片文件并显示</h4>

```html
<label>请选择一个图像文件：</label> 
<input type="file" name="file" id="file_input" />  
<img id="portrait" src="" width="70" height="75">
<script type="text/javascript">
var input = document.getElementById("file_input"); 
if(typeof FileReader==='undefined'){ 
    result.innerHTML = "抱歉，你的浏览器不支持 FileReader"; 
    input.setAttribute('disabled','disabled'); 
}else{ 
    input.addEventListener('change',readFile,false); 
} 
function readFile(){  
  var file = input.files[0]; 
  var iMaxFilesize = 2097152; //2M
  if(!/image\/\w+/.test(file.type)){  
      alert("请确保文件为图像类型");  
      return false;  
  }  
  if (file.size > iMaxFilesize) {
    alert("图片大小不能超过2M");
    return;
 }
 if(window.FileReader) {  
        var fr = new FileReader();  
        fr.onloadend = function(e) {  
              document.getElementById("portrait").src = e.target.result;  
        };  
        fr.readAsDataURL(file);  
 }  
}  
</script>  
```

[back to top](#top)

<h4 id="以ArrayBuffers方式读取">以 ArrayBuffers 方式读取<h4>

ArrayBuffer 最初是作为 WebGL 的一部分的，ArrayBuffer 代表一个可以存储任意任意大小的数字的一个有限的区域，此种方式读取的数据，必须使用特殊的方式访问，例如 Int8Array ，将此底层的数据视为 8 位的符号整数。或者 Float32Array 将其视为 32 位的浮点数，这些都被叫做类型化数组/格式化数组，都被强制的使用某种数据格式来使用，而不像普通格式的数据那样。

ArrayBuffer 主要用来处理二进制数据文件，已能够对数据具有更细粒度的控制，并且远远超出此篇文章解释的范围。反正在使用的时候，只要记住，你可以很简单的将一个文件读取为二进制缓冲，并且可以简单地将此数据通过 XHR 的 send() 方法发送给后端服务器（当然了，你必须从服务器上接受此二进制缓冲，并且重建此文件），但是浏览器还必须完整的支持 XMLHttpRequest Level 2，不过可惜的是，只有 IE10 以上的现代浏览器才支持。

[back to top](#top)

<h4 id="进度事件">Progress events （进度事件）</h4>

onprogress事件对象包含了三个属性，来表示文件开始传输之后的状态。

- lengthComputable ─ true或者false，表示请求数据的大小是否已知
- loaded ─ 目前接收到的字节数
- total ─ 整个请求中期望传输的字节数

注意：
- 当lengthComputable为false时，total属性值为0
- loadstart事件只会被激发一次。在loadstart之后，进度事件可能被激发0次或多次

这些数据的作用是可以使进度条(progress Html5)使用progress事件的信息进行进度展示。例如使用Html5的progress标签来展示数据读取进度。

```javascript
var reader = new FileReader(), progressNode = document.getElementById("my-progress");
reader.onprogress = function(event) {
    if (event.lengthComputable) {
        progressNode.max = event.total;
        progressNode.value = event.loaded;
    }
};
reader.onloadend = function(event) {
    var contents = event.target.result, error = event.target.error; 
    if (error != null) {
        console.error("File could not be read! Code " + error.code);
    } else {
        progressNode.max = 1;
        progressNode.value = 1;
        console.log("Contents: " + contents);
    }
};
```

上传图片预览和带进度条上传案例

```html
<form>  
    <fieldset>  
        <legend>分度读取文件：</legend>  
        <input type="file" id="File" />  
        <input type="button" value="中断" id="Abort" />  
        <p><label>读取进度：</label><progress id="Progress" value="0" max="100"></progress></p>  
        <p id="Status"></p>  
    </fieldset>  
</form>  
```

```javascript
var h = {  
    init: function() {  
        var me = this;  
        document.getElementById('File').onchange = me.fileHandler;  
        document.getElementById('Abort').onclick = me.abortHandler;  
        me.status = document.getElementById('Status');  
        me.progress = document.getElementById('Progress');  
        me.percent = document.getElementById('Percent');  
        me.loaded = 0;  
        me.step = 1024 * 1024;     //每次读取1M
        me.times = 0;  
    },  
    fileHandler: function(e) {  
        var me = h;            
        var file = me.file = this.files[0];   
        var reader = me.reader = new FileReader();   
        me.total = file.size;  
           
        reader.onloadstart = me.onLoadStart;  
        reader.onprogress = me.onProgress;  
        reader.onabort = me.onAbort;  
        reader.onerror = me.onerror;  
        reader.onload = me.onLoad;  
        reader.onloadend = me.onLoadEnd;  
        me.readBlob(file, 0);    //读取第一块  
    },  
    onLoadStart: function() {  
        var me = h;  
    },  
    onProgress: function(e) {  
        var me = h;    
        me.loaded += e.loaded;  
        me.progress.value = (me.loaded / me.total) * 100;     //更新进度条 
    },  
    onAbort: function() {  
        var me = h;  
    },  
    onError: function() {  
        var me = h;     
    },  
    onLoad: function() {  
        var me = h;  
        if(me.loaded < me.total) {  
            me.readBlob(me.loaded);  
        } else {  
            me.loaded = me.total;  
        }  
    },  
    onLoadEnd: function() {  
        var me = h;    
    },  
    readBlob: function(start) {  
        var me = h;     
        var blob,  file = me.file;  
        me.times += 1;    
        if(file.webkitSlice) {  
            blob = file.webkitSlice(start, start + me.step + 1);  
        } else if(file.mozSlice) {  
            blob = file.mozSlice(start, start + me.step + 1);  
        }  
        me.reader.readAsText(blob);  
    },  
    abortHandler: function() {  
        var me = h;  
        if(me.reader) {  
            me.reader.abort();  
        }  
    }  
};  
h.init(); 
```

[back to top](#top)

<h4 id="四种错误类型">File API定义了四种错误类型</h4>

事件|描述
---|---
NotFoundError|找不到文件
SecurityError|文件本身或者读取存在危险，一般情况下，如果读取此文件是危险的或者已经读取了太多次此文件，就会出现该错误
NotReadableError|文件存在，但是没有权限读取
EncodingError| 编码错误，只要是作为 data URI 读取的时候，读取结果的长度超过了浏览器支持的最大长度

```javascript
reader.onloadend = function(event) {
    var contents = event.target.result, error = event.target.error;
    if (error != null) {
        switch (error.code) {
            case error.ENCODING_ERR:
                console.error("Encoding error!");
                break;
            case error.NOT_FOUND_ERR:
                console.error("File not found!");
                break;
            case error.NOT_READABLE_ERR:
                console.error("File could not be read!");
                break;
            case error.SECURITY_ERR:
                console.error("Security issue with file!");
                break;
            default:
                console.error("I have no idea what's wrong!");
        }
    } else {
        progressNode.max = 1;
        progressNode.value = 1;
        console.log("Contents: " + contents);
    }
};
```

[back to top](#top)

<h4 id="Blob对象">3.2 Blob 对象</h4>

file 对象只是 blob 对象的一个更具体的版本，blob 存储着大量的二进制数据，并且 blob 的 size 和 type 属性，都会被 file 对象所继承。

可以说，在大多数情况下，blob 对象和 file 对象可以用在同一个地方，例如，可以使用 FileReader 借口从 blob 读取数据，也可以使用 URL.createObjectURL() 从 blob 创建一个新的 URL 对象

```javascript
//旧方法创建 Blob 对象
var builder = new BlobBuilder();   //创建一个新实例
builder.append("Hello world!");    //将字符串（或者 ArrayBuffer 或者 Blob，此处用 string 举例）插入
var blob = builder.getBlob("text/plain");   //
//新方法创建 Blob 对象, 使用Blob 构造函数。 此Blob构造函数还没有被一些浏览器实现，目前只有某些版本的 Chrome 和 Firefox 实现了
var blob = new Blob(["Hello world!"], { type: "text/plain" });
```

**Slicing （分割）**

通过 Blob 对象可以做的一件有趣的事情就是可以创建一个子 Blob 对象，其实就是可以将其分割（file 对象也可以）。由于每个 Blob 对象都是通过指针指向数据的而不是指向数据本身，因此可以快速的创建指向其他子部分的新的 Blob 对象，这里就需要使用 slice() 方法了。是不是和 JavaScript 的 slice() 方法很象，其实差不多。

此方法接受三个参数，起始偏移量，结束偏移量，还有可选的 mime 类型。如果 mime 类型，没有设置，那么新的 Blob 对象的 mime 类型和父级一样。

不过目前浏览器实现此方法还没有统一，火狐使用的是 mozSlice() ，Chrome 使用的是 webkitSlice() ，其他浏览器则正常的方式 slice() 。重写的兼容各个浏览器的例子如下：

```javascript
function sliceBlob(blob, start, end, type) {
    type = type || blob.type;
    if (blob.mozSlice) {
        return blob.mozSlice(start, end, type);
    } else if (blob.webkitSlice) {
        return blob.webkitSlice(start, end type);
    } else {
        throw new Error("This doesn't work!");
    }
}
```

上传大文件的时候，此方法非常有用，可以将大文件分割分段，然后各自上传，因为分割之后的 Blob 对象和原始的是独立存在的。例如，Flickr 的工程师就使用此方法将照片中的需要使用的 exif 信息截取出来，而不是等到其传到服务器上之后，才处理的，并且一旦选择要上传照片，则同时传输文件数据和 Exif 数据，这样几乎就可以在上传照片的时候同时显示照片的信息了。

[back to top](#top)

<h3 id="URL对象之文件下载">4. URL对象之文件下载</h3>

```html
<a class="ot-button ot-admin-download" download="db-translation-template.pot">Download</a>
<script>
var file = new Blob([output.join("\n\n")], {'type' : "text/x-gettext-translation"});
var downloadEl = $(".ot-admin-download");
if (Browser.isIE){
	downloadEl.addEventListener("click", function() {
		var name = this.getAttribute("download");
		window.navigator.msSaveBlob(file, name); 
	}, false);
}else{
	var url = (window.URL || window.webkitURL).createObjectURL(file);
	downloadEl.setAttribute("href", url);
	self.internalProperty("generate-db-url", url);
}
</script>
```

"另存为"实现

```html
<a href=# onclick="window.open('temp.html');return(false);">下载文件</a>
<button onclick="javascript:document.execCommand('SaveAs');">保存本页面</button>
<script>
if (typeof(window.opener) != 'undefined'){   //判断打开方式，若去掉后打开文件就弹出下载框
	document.execCommand('SaveAs');
	window.close();
}
</script>
```

<h3 id="NodeJs中的文件上传">5. NodeJs中的文件上传</h3>

`<input name="img" type="file">`

```javascript
// koa-body模块支持文件上传，body-parser不支持文件上传
// server.js
const bodyParser = require('koa-body');
app.use(bodyParser({
  multipart: true
}));
//controllers/site.js  处理上传的文件
exports.addComment = async function(ctx, next){
  //...
  var data;
  if(ctx.request.method.toLowerCase() === 'post'){
    data = ctx.request.body;
  }else{
    data = ctx.request.query;    //csrf attack, 对应于router.get('/ajax/addComment', site.addComment);
  }
  //...
  if(data.files){   //如果有文件
    let file = data.files.img;
    let ext = path.extname(file.name);
    let filename = Date.now() + ext;
    fs.renameSync(file.path, './static/upload'+filename);  //将文件名标准化，去除不规范的文件名
    data.fields.content += '<img src="/uploadfile/'+filename+'"/>';   //将图像文件加入到comment中
    data = data.fields;
  }
}
```

data的格式

![bb](assets/markdown-img-paste-20171108152712263.png)

- [用javascript 上传文件](http://blog.csdn.net/jianyi7659/article/details/8708857)
- [前端文件上传专题](http://www.jb51.net/Special/567.htm)
- [Javascript URL对象的createObjectURL与revokeObjectURL使用](https://my.oschina.net/ososchina/blog/505408)


