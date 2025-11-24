##利用html5的api navigator.getUserMedia来开启电脑或手机上的摄像头

- 一个Video标签，并调用getUserMedia获得用户的摄像头视频流
- 用Canvas捕获Video标签的内容并显示，做到了拍照的效果

```html
<video id="video" width="640" height="480" autoplay></video>
<button id="snap">Snap Photo</button>
<canvas id="canvas" width="640" height="480"></canvas>
```

```javascript
var video = document.getElementById("video"),
         canvas = document.getElementById("canvas"), context = canvas.getContext('2d'),
				 video = document.getElementById("video"),
				 videoObj = { "video": true },
				 errBack = function(error) {
					 console.log("Video capture error: ", error.code); 
				 };

     if (navigator.getUserMedia) { // 标准的API
          navigator.getUserMedia({ "video": true }, function (stream) {
              video.src = stream;
              video.play();
          }, errBack);
     } else if (navigator.webkitGetUserMedia) { // WebKit 核心的API
          navigator.webkitGetUserMedia({ "video": true }, function (stream) {
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
          }, errBack);
      }else if(navigator.mozGetUserMedia) {    // Firefox-prefixed
          navigator.mozGetUserMedia({ "video": true }, function(stream){
              video.src = window.URL.createObjectURL(stream);
              video.play();
          }, errBack);
      }
      
     //把Video标签中当前的图像显示到canvas中
     document.getElementById("snap").addEventListener('click', function(){  // 触发拍照动作
       context.drawImage(video,0,0,640,480);   
     }, false);
     
     //上传到服务器
     /*
     *把图片转为base64，通过ajax，毫无新意的保存到了服务器上。
     需要注意的是，HTML5中toDataURL方法是转为的PNG格式，发送到服务端后会很大一张：
     320*240的照片要190kb，所以需要在服务器端转格式为jpg，变为10kb一张
     */
     function uploadPhoto()//上传拍照的图片
            {
                showImgCode();
                request = createRequest();
                if (request == null) {
                    alert("Unable to create request");
                }
                else {
                    //alert("request.OK");
                    var base64Data = document.getElementById('textB64').value.replace(/\+/g, "%2B"); //对参数中的+号编码，防止丢失
                    var url = "AJAX/UploadPic.aspx";
                    request.open("POST", url, true);
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    request.onreadystatechange = responses;
                    request.send("&img=" + base64Data);
                    //alert("send.OK");
                }
            }
            function responses() {
                if (request.readyState == 4)//服务器处理结束
                {
                    if (request.status == 200)//一切正常
                    {
                        if (request.responseText == "OK") {
                            alert("上传成功！");
                        }
                        else {
                            alert("上传失败！");
                            alert(request.responseText);
                        }
                    }
                }
            }
```

- http://www.open-open.com/lib/view/open1338995506281.html
- [Capturing Audio & Video in HTML5](#https://www.html5rocks.com/en/tutorials/getusermedia/intro/)
