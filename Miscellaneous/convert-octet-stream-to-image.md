[Convert octet-stream to image](#top)

- [sample 1 - Blob 响应](#Blob响应)
- [sample 2 - ArrayBuffer 响应 `xhr.responseType = 'arraybuffer';`](#ArrayBuffer响应)
- [Another Example:  Using object URLs to display images](#Another-Example)
- [返回各种格式的数据给服务器](#返回各种格式的数据给服务器)
- [跨源资源共享 (CORS)](#CORS)

IE ignores octet-stream sometimes, it might caused network low speed. XMLHttpRequest2引入了大量的新功能（例如跨源请求、上传进度事件以及对上传/下载二进制数据的支持等）, 尤其是可用于处理文件的功能

这里利用XMLHttpRequest2来抓取二进制 blob 形式的文件，还可以利用XMLHttpRequest2新增的 responseType 和 response 属性，告知浏览器我们希望返回什么格式的数据。

- xhr.responseType：  在发送请求前，根据您的数据需要，将 xhr.responseType 设置为“text”、“arraybuffer”、“blob”或“document”。请注意，设置（或忽略）xhr.responseType = '' 会默认将响应设为“text”
- xhr.response：  成功发送请求后，xhr 的响应属性会包含 DOMString、ArrayBuffer、Blob 或 Document 形式（具体取决于 responseTyp 的设置）的请求数据

<h3 id="Blob响应">sample 1 - Blob 响应: `xhr.responseType = 'blob';` (直接处理 Blob 且/或不需要操作任何文件的字节)</h3>

```javascript
//change response Type to 'blob'
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
//use
if (otui.Browser.isIE){
  window.URL = window.URL || window.webkitURL;   // Take care of vendor prefixes.
  var tmpURL = getOctetStreamImgUrl(this, self);
  window.URL.revokeObjectURL(this.src);   // Clean up after yourself
  this.src = window.URL.createObjectURL(tmpURL);
}
```

A Blob can be used in a number of places, including saving it to indexedDB, writing it to the [HTML5 File System](https://www.html5rocks.com/tutorials/file/filesystem/), or [creating an Blob URL](https://www.html5rocks.com/tutorials/workers/basics/#toc-inlineworkers-bloburis)

[back to top](#top)

<h3 id="ArrayBuffer响应">sample 2 - ArrayBuffer 响应 `xhr.responseType = 'arraybuffer';`</h3>

ArrayBuffer 是二进制数据通用的固定长度容器。如果您需要原始数据的通用缓冲区，ArrayBuffer 就非常好用，但是它真正强大的功能是让您使用 JavaScript 类型数组创建底层数据的“视图”。实际上，可以通过单个 ArrayBuffer 来源创建多个视图。例如，您可以创建一个 8 位整数数组，与来自相同数据的现有 32 位整数数组共享同一个 ArrayBuffer。底层数据保持不变，我们只是创建其不同的表示方法。

```javascript
BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
  if (this.status == 200) {
    var bb = new BlobBuilder();
    bb.append(this.response); // Note: not xhr.responseText
    var blob = bb.getBlob('image/png');
    //...
  }
};
xhr.send();
```

[back to top](#top)

<h3 id="Another-Example">Another Example:  Using object URLs to display images</h3>

```html
<input type="file" id="fileElem" multiple accept="image/*" style="display:none" onchange="handleFiles(this.files)">
<a href="#" id="fileSelect">Select some files</a> 
<div id="fileList">
  <p>No files selected!</p>
</div>
```

handleFiles function: 

```javascript
window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

function handleFiles(files) {
  if (!files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    fileList.innerHTML = "";
    var list = document.createElement("ul");
    fileList.appendChild(list);
    for (var i = 0; i < files.length; i++) {
      var li = document.createElement("li");
      list.appendChild(li);
      
      var img = document.createElement("img");
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;
      img.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      var info = document.createElement("span");
      info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
      li.appendChild(info);
    }
  }
}
```

[back to top](#top)

<h3 id="返回各种格式的数据给服务器">返回各种格式的数据给服务器</h3>

XMLHttpRequest2可接受以下任何类型： `DOMString、Document、FormData、Blob、File、ArrayBuffer`

`xhr.send(类型)`

```javascript
//发送字符串数据：xhr.send(DOMString)
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
//提交表单：xhr.send(FormData)
function sendForm() {
  var formData = new FormData();
  formData.append('username', 'johndoe');
  formData.append('id', 123456);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(formData);
}
//or
<form id="myform" name="myform" action="/server">
  <input type="text" name="username" value="johndoe">
  <input type="number" name="id" value="123456">
  <input type="submit" onclick="return sendForm(this.form);">
</form>
function sendForm(form) {
  var formData = new FormData(form);
  formData.append('secret_token', '1234567890'); // Append extra data before send.
  var xhr = new XMLHttpRequest();
  xhr.open('POST', form.action, true);
  xhr.onload = function(e) { ... };
  xhr.send(formData);
  return false; // Prevent page from submitting.
}
//上传文件或 blob：xhr.send(Blob)
<progress min="0" max="100" value="0">0% complete</progress>
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  // Listen to the upload progress.
  var progressBar = document.querySelector('progress');
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      progressBar.value = (e.loaded / e.total) * 100;
      progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
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

<h3 id="CORS">跨源资源共享 (CORS)</h3>

服务器端应先启用[CORS](https://enable-cors.org/)

```javascript
//下载文件并保存到 HTML5 文件系统
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
        bb.append(xhr.response);分割文件并上传各个部分: 
        writer.write(bb.getBlob('image/png'));
      }, onError);
    }, onError);
  }, onError);
};
xhr.send();
//分割文件并上传各个部分: 将要上传的文件(big files)分割成多个部分，为每个部分生成一个 XHR，然后在服务器上将各部分组合成文件
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
})();
//用于在服务器上重组文件的代码并未在此显示
```

[back to top](#top)

- [Convert octet-stream to image](http://stackoverflow.com/questions/37510801/convert-octet-stream-to-image)
- [New Tricks in XMLHttpRequest2](https://www.html5rocks.com/en/tutorials/file/xhr2/)
- [Using files from web applications](https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications#Example_Using_object_URLs_to_display_images)

