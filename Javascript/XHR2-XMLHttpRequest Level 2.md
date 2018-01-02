[XHR2（XMLHttpRequest Level 2）](#top)

- [XMLHttpRequest 2新增属性](#XMLHttpRequest2新增属性)
  - [1. 接收数据 - 下载处理](#下载处理)
  - [2. 发送数据 - 上传处理](#上传处理)
- [实际示例](#实际示例)
  - [下载文件并保存到HTML5文件系统](#下载文件并保存到)
  - [分割文件并上传各个部分](#分割文件并上传各个部分)

[2 级 XMLHttpRequest](https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html) 引入了大量的新功能（例如跨源请求、上传进度事件以及对上传/下载二进制数据的支持等），一举封杀了我们网络应用中的疯狂黑客。这使得 AJAX 可以与很多尖端的 HTML5 API 结合使用，例如 File System API、Web Audio API 和 WebGL

"XMLHttpRequest Level 1"相对于新版本"XMLHttpRequest Level 2"来说有一些不足

- 只支持文本数据的传送，无法用来读取和上传二进制文件
- 传送和接收数据时，没有进度信息，只能提示有没有完成
- 受到"同域限制"（Same Origin Policy），只能向同一域名的服务器请求数据

"XMLHttpRequest Level 2"对象的一些新功能

- 可以设置HTTP请求的时限
- 可以使用FormData对象管理表单数据
- 可以上传文件
- 可以请求不同域名下的数据（跨域资源共享，Cross-origin resource sharing，简称 CORS）
- 可以获取服务器端的二进制数据
- 可以获得数据传输的进度信息

<h2 id="XMLHttpRequest2新增属性">XMLHttpRequest 2新增属性</h2>

- `xhr.responseType`: 在发送请求前设置, text、arraybuffer、blob或document。请注意，设置（或忽略）xhr.responseType = '' 会默认将响应设为“text”。
- `xhr.response`:  成功发送请求后xhr的响应属性, DOMString、ArrayBuffer、Blob或Document形式（具体取决于responseTyp的设置）的请求数据

<h3 id="下载处理">1. 接收数据 - 下载处理</h3>

如图片处理，可利用xhr.responseType属性告知浏览器希望返回什么格式的数据

```javascript
BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'arraybuffer';     //以ArrayBuffer而非字符串的形式抓取图片
xhr.onload = function(e) {
  if (this.status == 200) {
    var bb = new BlobBuilder();      //将缓冲区移交给 BlobBuilder API创建 Blob
    bb.append(this.response);        // Note: not xhr.responseText
    var blob = bb.getBlob('image/png');
    //...
  }
};
xhr.send();
```

如果要直接处理Blob且/或不需要操作任何文件的字节，可使用xhr.responseType='blob'：

```javascript
window.URL = window.URL || window.webkitURL;  // Take care of vendor prefixes.
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = this.response;
    var img = document.createElement('img');
    img.onload = function(e) {
      window.URL.revokeObjectURL(img.src);    // Clean up after yourself.
    };
    img.src = window.URL.createObjectURL(blob);
    document.body.appendChild(img);
    //...
  }
};

xhr.send();
```

opentext Media management项目

```javascript
//<img src="" />
//for IE octet-stream bug
renditionimg.onerror = function() {
  xtag.addClass(self, "norendition"); 
  if(self.fallback && self.fallback.img)
  {
    this.src = self.fallback.img;
    _size.call(self);
    //for IE octet-stream bug
    if (otui.Browser.isIE){
      window.URL = window.URL || window.webkitURL; 
      xtag.removeClass(self, "norendition");
      var ieURL = getOctetStreamImgUrl(this, self);
      window.URL.revokeObjectURL(this.src);
      this.src = window.URL.createObjectURL(ieURL);
    }
  }
  else
  {
    this.remove(); 
  }
}
//for IE octet-stream bug
function getOctetStreamImgUrl(renditionimg, renditionElm){
		var renditionimgSrc;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', renditionElm.src, false);
		xhr.responseType = 'blob'; 
		xhr.onload = function(e) { 
		   if (this.status == 200) { 
		     renditionimgSrc = this.response;
		   } 
		}; 
		xhr.send();
		return renditionimgSrc;
}
```

[back to top](#top)

<h3 id="上传处理">2. 发送数据 - 上传处理</h3>

经过修改的 send() 方法，可接受以下任何类型：DOMString、Document、FormData、Blob、File、ArrayBuffer

```javascript
//1) 发送字符串数据：xhr.send(DOMString)
sendText('test string');
function sendTextNew(txt) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.responseType = 'text';
  xhr.onload = function(e) {
    if (this.status == 200) {
      console.log(this.response);
    }
  };
  xhr.send(txt);
}
sendText2('test string');
//2) 提交表单：xhr.send(FormData)
/*
<form id="myform" name="myform" action="/server">
  <input type="text" name="username" value="johndoe">
  <input type="number" name="id" value="123456">
  <input type="submit" onclick="return sendForm(this.form);">
</form>
*/
function sendForm(form) {
  var formData = new FormData(form);             //利用HTML5的FormData API
  formData.append('secret_token', '1234567890'); // Append extra data before send.
  var xhr = new XMLHttpRequest();
  xhr.open('POST', form.action, true);
  xhr.onload = function(e) { ... };
  xhr.send(formData);
  return false; // Prevent page from submitting.
}
// 3) 文件上传
/*
<input type="file">
*/
function uploadFiles(url, files) {
  var formData = new FormData();
  for (var i = 0, file; file = files[i]; ++i) {
    formData.append(file.name, file);
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.onload = function(e) { ... };
  xhr.send(formData);                     // multipart/form-data, 浏览器就会在调用send()时构建 multipart/form-data 请求
}
document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  uploadFiles('/server', this.files);
}, false);
// 4) 上传文件或 blob：xhr.send(Blob)
/* <progress min="0" max="100" value="0">0% complete</progress> */
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  // Listen to the upload progress.
  var progressBar = document.querySelector('progress');
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      progressBar.value = (e.loaded / e.total) * 100;
      progressBar.textContent = progressBar.value;   // Fallback for unsupported browsers.
    }
  };
  xhr.send(blobOrFile);
}
// Take care of vendor prefixes.
BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
var bb = new BlobBuilder();
bb.append('hello world');
upload(bb.getBlob('text/plain'));
```

[back to top](#top)

<h2 id="实际示例">实际示例</h2>

<h3 id="下载文件并保存到">下载文件并保存到HTML5文件系统</h3>

提取一些图片，然后使用 HTML5 文件系统本地保存这些图片。一种方法是以 ArrayBuffer 形式请求图片，通过数据构建 Blob，并使用 FileWriter 写入 blob

```javascript
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
function onError(e) {
  console.log('Error', e);
}
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
  window.requestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
    fs.root.getFile('image.png', {create: true}, function(fileEntry) {
      fileEntry.createWriter(function(writer) {
        writer.onwrite = function(e) { ... };
        writer.onerror = function(e) { ... };
        var bb = new BlobBuilder();
        bb.append(xhr.response);

        writer.write(bb.getBlob('image/png'));
      }, onError);
    }, onError);
  }, onError);
};
xhr.send();
```

[back to top](#top)

<h3 id="分割文件并上传各个部分">分割文件并上传各个部分</h3>

使用 File API，可以将操作简化为上传大文件。我们采用的技术是：将要上传的文件分割成多个部分，为每个部分生成一个 XHR，然后在服务器上将各部分组合成文件。这类似于 Gmail 快速上传大附件的方法。使用这种技术还可以规避 Google 应用引擎对 http 请求的 32 MB 限制

```html
<div class="example">
    #bytes/chunk: <input type="number" min="1048576" value="1048576" id="numChunks">
    <input type="file" id="afile" class="button">
    <div id="bars"></div>
</div>
<script>
window.BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(blobOrFile);
}
document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  var blob = this.files[0];
  const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
  const SIZE = blob.size;
  var start = 0;
  var end = BYTES_PER_CHUNK;
  while(start < SIZE) {
    // Note: blob.slice has changed semantics and been prefixed. See http://goo.gl/U9mE5.
    if ('mozSlice' in blob) {
      var chunk = blob.mozSlice(start, end);
    } else {
      var chunk = blob.webkitSlice(start, end);
    }
    upload(chunk);
    start = end;
    end = start + BYTES_PER_CHUNK;
  }
}, false);
</script>
```

[back to top](#top)

> Reference
- [XMLHttpRequest2 新技巧](https://www.html5rocks.com/zh/tutorials/file/xhr2/)
- [XMLHttpRequest Level 2 使用指南](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)
- [XMLHttpRequest 2级学习](http://blog.csdn.net/liujie19901217/article/details/51137263)
