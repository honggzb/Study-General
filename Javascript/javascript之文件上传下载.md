[目录](#top)

- [1. 非HTML5之文件上传](#非HTML5之文件上传)
  - [1.1 一般上传 - 获得文件属性](#一般上传)
  - [1.2 拖动上传/Drag and drop - 获得文件属性](#拖动上传)
  - [1.3 使用 Ajax 上传](#使用Ajax上传)
- [2. URL对象之文件上传](#URL对象之文件上传)
- [3. 文件读写操作](#文件读写操作)

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

<h4 id="FileReader">3.1 HTML5 File API之FileReader接口</h4>

FileReader接口用于读取文件数据并且将其存储在 javascript 变量中，此 API 专门被设计成模拟（类似） XMLHttpRequest 操作，因为它们两个都是从外部资源加载数据（不包括浏览器）。并且此 API 被设计成异步的(asynchronously)，所以不会引起浏览器的锁死。

FileReader 可以将数据读取成各种格式，而且在读取数据的时候，必须要求使用这几种格式，这几种格式如下，必须通过调用这几种格式才能读取数据。

FileReader对象的方法

方法名|参数|返回|描述
---|---|---|---
abort|none||中断读取
readAsText|file, [encoding]|文本数据(text/plain)|将文件读取为文本, 第二个参数是文本的编码方式，默认值为 UTF-8
readAsBinaryString|file|返回此文件被编码的二进制数据 (已弃用– 使用 readAsArrayBuffer() 代替)|将文件读取为二进制码
readAsArrayBuffer()||返回此文件的一个ArrayBuffer（二进制数据缓冲）（适合二进制数据，例如图像文件)数据
readAsDataURL|file|返回此文件的`<a href="http://en.wikipedia.org/wiki/Data_URI_scheme" title="Data URI scheme" target="_blank">data URL</a>`|将文件读取为DataURL, 即将文件读取为一段以 data: 开头的字符串(Data URL)，Data URL是一种将小文件直接嵌入文档的方案。这里的小文件通常是指图像与 html 等格式的文件

FileReader对象的处理事件

事件|描述
---|---
onabort|	中断时触发
onerror|	出错时触发
onload|	文件读取成功完成时触发
onloadend|	读取完成触发，无论成功或失败
onloadstart|	读取开始时触发
onprogress	|读取中

文件一旦开始读取，无论成功或失败，实例的 result 属性都会被填充。如果读取失败，则 result 的值为 null ，否则即是读取的结果，绝大多数的程序都会在成功读取文件的时候，抓取这个值。



[back to top](#top)

- [用javascript 上传文件](http://blog.csdn.net/jianyi7659/article/details/8708857)
- [前端文件上传专题](http://www.jb51.net/Special/567.htm)
- [Javascript URL对象的createObjectURL与revokeObjectURL使用](https://my.oschina.net/ososchina/blog/505408)


