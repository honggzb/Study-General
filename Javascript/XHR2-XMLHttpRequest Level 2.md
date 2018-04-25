[XHR2（XMLHttpRequest Level 2）](#top)

- [XMLHttpRequest复习](#XMLHttpRequest复习)
- [XMLHttpRequest 2新增属性](#XMLHttpRequest2新增属性)
  - [1. 接收数据 - 下载处理](#下载处理)
  - [2. 发送数据 - 上传处理](#上传处理)
  - [3. 超时设定](#超时设定)
  - [4. 跨域资源共享（CORS）](#跨域资源共享)
  - [5. 进度事件](#进度事件)
- [实际示例](#实际示例)
  - [下载文件并保存到HTML5文件系统](#下载文件并保存到)
  - [分割文件并上传各个部分](#分割文件并上传各个部分)
  - [ajax无刷新上传](#ajax无刷新上传)
  - [模拟登陆实现](#模拟登陆实现)

-----------------------------------

<h2 id="XMLHttpRequest复习">XMLHttpRequest复习</h2>

```javascript
 var xhr = new XMLHttpRequest();
    // ...
    // do stuff with xhr
    // ...
  xhr.upload.addEventListener('loadstart', function(e) {
      // When the request starts.
    });
    xhr.upload.addEventListener('progress', function(e) {
      // While sending and loading data.
    });
    xhr.upload.addEventListener('load', function(e) {
      // When the request has *successfully* completed.
      // Even if the server hasn't responded that it finished.
    });
    xhr.upload.addEventListener('loadend', function(e) {
      // When the request has completed (either in success or failure).
      // Just like 'load', even if the server hasn't 
      // responded that it finished processing the request.
    });
    xhr.upload.addEventListener('error', function(e) {
      // When the request has failed.
    });
    xhr.upload.addEventListener('abort', function(e) {
      // When the request has been aborted. 
      // For instance, by invoking the abort() method.
    });
    xhr.upload.addEventListener('timeout', function(e) {
      // When the author specified timeout has passed 
      // before the request could complete.
    });
    // notice that the event handler is on xhr and not xhr.upload
    xhr.addEventListener('readystatechange', function(e) {
      if( this.readyState === 4 ) {
        // the transfer has completed and the server closed the connection.
      }
    });
xhr.send(form);
```

----------------------------------

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

-----------------------------------------------

<h2 id="XMLHttpRequest2新增属性">XMLHttpRequest 2新增属性</h2>

- `xhr.responseType`: 在发送请求前设置, text、arraybuffer、blob或document。请注意，设置（或忽略）xhr.responseType = '' 会默认将响应设为“text”。
- `xhr.response`:  成功发送请求后xhr的响应属性, DOMString、ArrayBuffer、Blob或Document形式（具体取决于responseTyp的设置）的请求数据
- `FormData对象`: XMLHttpRequest 2级定义了FormData类型，这为序列化表单以及创建与表单格式相同的数据提供了便利, 参见下面的“2) 提交表单”案例
  - 使用FormData的方便之处在于：不必明确在xhr对象上设置请求头部，xhr对象能够识别传入的数据类型是FormData的实例，并配置适当的头部信息

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

- XMLHttpRequest 2经过修改的send()方法，可接受以下任何类型：DOMString、Document、FormData、Blob、File、ArrayBuffer

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
//2) 提交表单：xhr.send(FormData), 使用FormData对象, FormData对象也可以用来获取网页表单的值
/*
<form id="myform" name="myform" action="/server">
  <input type="text" name="username" value="johndoe">
  <input type="number" name="id" value="123456">
  <input type="submit" onclick="return sendForm(this.form);">
</form>
*/
function sendForm(form) {
  var formData = new FormData(form);             //1) 新建FormData对象, 利用HTML5的FormData API
  formData.append('secret_token', '1234567890'); //2) 添加表单项, Append extra data before send
  var xhr = new XMLHttpRequest();
  xhr.open('POST', form.action, true);
  xhr.onload = function(e) { ... };
  xhr.send(formData);                           //3) 直接传送这个FormData对象, 这与提交网页表单的效果，完全一样
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
  xhr.upload.onprogress = function(e) {     // XMLHttpRequest.upload对象
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

<h3 id="超时设定">3. 超时设定</h3>

新版本的XMLHttpRequest 2对象，增加了timeout属性，可以设置HTTP请求的时限，表示请求在等待响应多少毫秒之后就停止。在给timeout属性属性设置一个数值后，如果在规定的时间内浏览器还没有接收到响应，那么就会触发timeout事件，进而会调用ontimeout事件处理程序

```javascript
function createXHR(){
                    if(typeof XMLHttpRequest){
                        return new XMLHttpRequest();
                    }else if(typeof ActiveXObject){
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    }
}
var xhr = createXHR();
xhr.onreadystatechange = function(event){
            try {
                if (xhr.readyState == 4){
                    if (xhr.status == 200){
                        alert(xhr.responseText);
                    } else {
                        alert("Request was unsuccessful: " + xhr.status);
                    }
                }
            } catch (ex){
                //assume handled by ontimeout
            }
};
xhr.open("get", "timeout.php", true);
xhr.timeout = 1000;    //给xhr对象设置了timeout属性，表示请求在等待响应1000毫秒之后停止
xhr.ontimeout = function(){
  alert("Request did not return in a second.");
};
xhr.send(null);
```

[back to top](#top)

<h3 id="跨域资源共享">4. 跨域资源共享（CORS）</h3>

XMLHttpRequest 2对象，可以向不同域名的服务器发出HTTP请求, 但使用”跨域资源共享”的前提，是浏览器必须支持这个功能，而且服务器端必须同意这种”跨域”。如果能够满足上面的条件，则代码的写法与不跨域的请求完全一样, `xhr.open('post', 'http://localhost/test.php',true);`

- 坑1：[有些ajax类库中的代码会影响服务器跨域设置](http://www.cnblogs.com/daishuguang/p/3971989.html), 可以检查一下AJAX类库的代码，注释掉影响跨域设置的代码, 如tangram-ajax-1.5.2.js中 `headers['X-requested-With'] = 'XMLHttpRequest'`
- 坑2：如果Content-Type为application/json类型，那么服务端需要设置`res.header("Access-Control-Allow-Headers", "Content-Type");`, 并且请求会发送两次，因为在跨域的时候，除了contentType为application/x-www-form-urlencoded, multipart/form-data或者text/plain外，都会触发浏览器先发送方法为OPTIONS的请求。比如说，你原来的请求是方法方法POST，如果第一个请求返回的结果Header中的Allow属性并没有POST方法，那么第二个请求是不会发送的，此时浏览器控制台会报错，告诉POST方法并不被服务器支持

```javascript
//前端代码
var xhr=new XMLHttpRequest();
xhr.open('POST','http://127.0.0.1:8081/ceshi',true);
xhr.onreadystatechange=function(){
    if(xhr.readyState==4){    //响应完毕后
        if(xhr.status==200){    //http状态码为200时
            var result=xhr.responseText;//获取ajax请求的文本内容
            console.log(result);
        }
    }
}
xhr.setRequestHeader("Content-Type","application/json")
var a={name:123,data:"sss"};
var b=JSON.stringify(a);
xhr.send(b)
//如nodeJS
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods","POST,PUT,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}))
app.get('/', function (req, res) {
    console.log("你好啊")
   res.send('Hello World');
})
app.post('/ceshi',function(req,res){
    console.log(req.body)
    res.send("nihao")
})
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("服务器启动成功", host, port)
})
```

[back to top](#top)

<h3 id="进度事件">5. 进度事件</h3>

XMLHttpRequest 2对象，传送数据的时候，有一个progress事件，用来返回进度信息 , 它分成上传和下载两种情况

- 1.下载的progress事件属于<b>XMLHttpRequest对象</b>
- 2.上传的progress事件属于<b>XMLHttpRequest.upload对象</b>
  - XMLHttpRequest.upload对象有以下6个进度事件： 每个请求都是从触发loadstart事件开始，接下来是一或多个progress事件，然后触发error、abort或load事件中的一个，最后以触发loadend事件结束
  - loadstart:在接收到响应数据的第一个字节时触发
  - progress:在接收响应期间持续不断地触发
  - error:在请求发生错误时触发
  - abort:在因为调用abort()方法而终止连续时触发
  - load:在接收到完整的响应数据时触发
  - loadend:在通信完成或者触发error、abort或load事件后触发

progress事件会在浏览器接收新数据期间周期性地触发。onprogress事件处理程序会接收到一个event对象，其target属性是XHR对象，包含三个额外的属性：利用这些信息，我们可以创建一个进度指示器
  - lengthComputable:表示进度信息是否可用的布尔值
  - position:表示已经接收的字节数
  - totalSize:表示根据Content-Length响应头部确定的预期字节数 

**结合HTML的attr和max属性显示load进度**

```javascript
xhr.upload.addEventListener("progress", function (e) {
    if (e.lengthComputable && e) {
        p = (e.loaded / e.total);
        if (p==1) {
            $("#uploadprogress").attr("value", false);
            $("#uploadprogress").attr("max", false);
            $("#progress").text("Checking file...");
        } else {
            var percent = Math.ceil(p * 1000) / 10;
            $("#uploadprogress").val(e.loaded);
            $("#uploadprogress").attr("max", e.total);
            $("#progress").text("Uploading... " + percent + "%");
        }
   }
}
});
// YOUR (SIMPLE) JAVASCRIPT FILE
var form = new FormData(), xhr = new XMLHttpRequest();
form.append('inputname', YOURFILE);

xhr.open('POST', 'http://oneserver/onephpfile', true);
xhr.setRequestHeader('X-CSRF-Token', 'somestring');
xhr.onreadystatechange = function () {
    if ((xhr.readyState === 4) && (xhr.status === 200))
        // do other thing with xhr.responseText.trim()
};

xhr.upload.addEventListener('loadstart', showProgressBarFunction, false);
xhr.upload.addEventListener('progress',  updateProgressBarFunction, false);
xhr.upload.addEventListener('load',      updateProgressBarFunction, false);
xhr.send(form);

// YOUR FIRST (SIMPLE) PHP FILE
header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

sleep(20);
echo 'file processing ended';
// YOUR SECOND (SIMPLE) PHP FILE
header('Content-Encoding: chunked', true);
header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');
ini_set('output_buffering', false);
ini_set('implicit_flush', true);
ob_implicit_flush(true);
for ($i = 0; $i < ob_get_level(); $i++)
    ob_end_clean();
echo ' ';

sleep(20);
echo 'file processing ended';
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

<h3 id="ajax无刷新上传">ajax无刷新上传</h3>

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ajax无刷新上传</title>
    <style type="text/css">
    #div1{
        width: 300px;
        height: 30px;
        border:1px solid #000;
        position: relative;
    }
    #div2{
        width: 0;
        height: 30px;
        background: #CCC;
    }
    #div3{
        width: 300px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
    }
    </style>
</head>
<body>
<input type="file" id="myFile" name="" value="" placeholder="">
<input type="button" id="btn" name="" value="上传">
<div id="div1">
    <div id="div2"></div>
    <div id="div3">0%</div>
</div>
<script type="text/javascript">
var oBtn = document.getElementById("btn");//获取上传按钮
var myFile = document.getElementById("myFile");
var oDiv2 = document.getElementById("div2");
var oDiv3 = document.getElementById("div3");
oBtn.onclick = function(){
    //alert(myFile.value);//获取到的是file控件的value值，这个内容是显示给你看的文字，不是我们选择的文件
    //myFile.files 是file控件中选择的文件列表对象
    //alert(myFile.files);//[object FileList]
    //我们是要通过ajax把myFile.files[0]数据发送给后端
    //for (var attr in myFile.files[0]) {
    //console.log( attr + ' : ' + myFile.files[0][attr] );
    // }
    var xhr = new XMLHttpRequest();
    //监听上传完成事件
    //load事件在接收到完整的响应数据时触发
    xhr.onload = function(){
        alert("上传完成");
    }
    // 监听上传进度
    var oUpload = xhr.upload;
    oUpload.onprogress = function(e){
            //e.total：待发送的总量
            //e.loaded：已经发送的总量
            //oUpload.onprogress：上传
            //onprogress：下载
            console.log(e.total + ':' + e.loaded);
        var iScale = e.loaded / e.total;//获取已经上传的比例
            //上传进度条
            //根据上传的比例改变进度条div的宽度(初始宽度为0)
            oDiv2.style.width = 300 * iScale + 'px';
            //上传进度的百分比显示
            oDiv3.innerHTML = 100 * iScale + '%';
    };
    xhr.open('post','post_file.php',true);//post请求
    var oFormData = new FormData();
    //append方法接收两个参数：分别对象表单字段名称和表单字段值
    oFormData.append('file',myFile.files[0]);
    xhr.send(oFormData);
};
</script>
</body>
</html>
```

post_file.php

```php
<?php
header('Content-type:text/html; charset="utf-8"');
//uploads--用来存放上传成功的文件
$upload_dir = 'uploads/';
//strtolower把所有字符转换为小写
//如果发送客户端发送的不是post请求，则给出相应的错误信息并退出
if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
    exit_status(array('code'=>1,'msg'=>'错误提交方式'));
}
//检查键名是否存在于数组中
//array_key_exists(key,array)，存在则返回true
//$_FILES['myFile']['error'] 和该文件上传相关的错误代码
if(array_key_exists('file',$_FILES) && $_FILES['file']['error'] == 0 ){
    $pic = $_FILES['file'];
    //move_uploaded_file() 函数将上传的文件移动到新位置
    //第一个参数表示要移动的文件，第二个参数为文件的新位置
    //若成功，则返回 true，否则返回 false
    if(move_uploaded_file($pic['tmp_name'], $upload_dir.$pic['name'])){
        exit_status(array('code'=>0,'msg'=>'上传成功','url'=>$upload_dir.$pic['name']));
    }
}
echo $_FILES['file']['error'];
exit_status(array('code'=>1,'msg'=>'出现了一些错误'));
//将关联数组转为json字符串，并退出
function exit_status($str){
    echo json_encode($str);
    exit;
}
?>
```

[back to top](#top)

<h3 id="模拟登陆实现">模拟登陆实现</h3>

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ajax_form</title>
</head>
<body>
<form id="myform">
<label for="name">用户名：</label>
<input type="text" name="user-name" id="user-name" placeholder="请输入你的用户名">
<label for="age">密码：</label>
<input type="password" name="user-password" id="user-password" placeholder="请输入你的年龄">
<input type="submit" value="登录" id="subBtn">
</form>
<script type="text/javascript">
var subBtn = document.getElementById("subBtn");
var form = document.getElementById("myform");
function ajax(method,url,data,bool){
    var promise = new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.open(method,url,bool);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(xhr.responseText);
                }else{
                    reject(new Error(xhr.statusText));
                }
            }
        };
        xhr.send(data);
    });
    return promise;
}
subBtn.onclick = function(){
    ajax("post","http://localhost/mywork/promise/post.php",new FormData(form),false)
    .then(function(data){
        if(data == "ok"){
            alert("登录成功");
        }else{
            alert("用户名或者密码不正确");
        }
    },function(){
        console.error("出错了:"+error);
    });
};
</script>
</body>
</html>
```

post.php

```php
<?php
 header("Content-Type: text/plain");
 $name = $_POST["user-name"];
 $pwd = $_POST["user-password"];
 if($name == "admin" && $pwd == "123"){
    echo "ok";
 }else{
    echo "no";
 }
 ?>
```

[back to top](#top)

> Reference
- [XMLHttpRequest2 新技巧](https://www.html5rocks.com/zh/tutorials/file/xhr2/)
- [XMLHttpRequest Level 2 使用指南](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)
- [XMLHttpRequest 2级学习](http://blog.csdn.net/liujie19901217/article/details/51137263)
- [前端跨域之html5 XMLHttpRequest Level2](https://www.cnblogs.com/hangaoke/p/6260702.html)
