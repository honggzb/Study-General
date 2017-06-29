[Service Workers- HTML5 Web push notifications桌面通知](#top)

- [1. Notification API](#Notification-API)
  - [1.1 Notification 对象](#Notification-对象)
  - [1.2 NotificationCenter 接口](#Notification-接口)
- [2. 检查浏览器是否支持 Notification](#检查浏览器是否支持Notification)

<h3 id="Notification-API">1. Notification API</h3>

- notification 对象
- NotificationCenter 接口

<h4 id="Notification-对象">1.1 Notification 对象</h4>

```javascript
interface Notification : EventTarget {  
 // display methods  
 void show();  
 void cancel();  
 // event handler attributes  
 attribute Function ondisplay;  
 attribute Function onerror;  
 attribute Function onclose;  
 attribute Function onclick;  
}  
```

**Notification 方法** -- 用来显示和隐藏提示框的方法：

- Show - 该方法用来显示一个提醒
- Cancel - 该方法用来移除提醒，如果提醒当前被现实则会被隐藏，如果还未被显示，则将被阻止显示

**Notification 属性** -- 通知属性用作事件监听器，监听提醒中的不同事件：

- ondisplay - 当 notification 被显示时调用
- onerror - 当 notification 出现错误时调用
- onclose - 当 notification 关闭时调用
- onclick - 当提示框被点击时调用

<h4 id="Notification-接口">1.2 NotificationCenter 接口</h4>

用来创建 notification 对象，并检查当前页面是否有显示该对象的权限。使用 Notification center 时需要用到4个方法：

- createNotification - 如果 notification 有权限被显示，呢么该方法将会创建一个 notification 对象，并为其填充相关的内容。如果页面没有允许 notification ，那么将抛出一个安全异常。
- createHTMLNotification - 该方法类似于 createNotification ，若页面有权限显示 notification 它会返回一个相关的对象。该方法使用了一个 URL 参数来加载要显示的 HTML 内容。
- checkPermission - 该方法返回该页面使用 notification 的整形权限值。PERMISSION_ALLOWED = 0, PERMISSION_NOT_ALLOWED = 1, 或者 PERMISSION_DENIED = 2
- requestPermission - 该方法将向用户请求询问显示提示框的权限

```javascript
interface NotificationCenter {  
 // Notification factory methods.  
 Notification createNotification(in DOMString iconUrl, in DOMString title, in DOMString body) throws(Exception);  
 optional Notification createHTMLNotification(in DOMString url) throws(Exception);  
 // Permission values  
 const unsigned int PERMISSION_ALLOWED = 0;  
 const unsigned int PERMISSION_NOT_ALLOWED = 1;  
 const unsigned int PERMISSION_DENIED = 2;  
 // Permission methods  
 int checkPermission();  
 void requestPermission(in Function callback);  
}  
interface Window {  
...  
 attribute NotificationCenter webkitNotifications;  
...  
} 
```

[back to top](#top)

<h3 id="检查浏览器是否支持Notification">2. 检查浏览器是否支持 Notification</h3>

```javascript
/**
 * Check if the browser supports notifications
 * @return true if browser does support notifications
 */
 function browser_support_notification(){
     return window.webkitNotifications;
 }
 function request_permission()  
{  
    // 0 means we have permission to display notifications  
    if (window.webkitNotifications.checkPermission() == 0) {  
        window.webkitNotifications.createNotification();  
        } else {  
        window.webkitNotifications.requestPermission();  
    }  
} 
/**  
* Create a plain text notification box  
*/  
function plain_text_notification(image, title, content){  
        if (window.webkitNotifications.checkPermission() == 0) {  
            return window.webkitNotifications.createNotification(image, title, content);  
        }  
}  
/**  
 * Create a notification box with html inside  
 */  
function html_notification(url)  {  
        if (window.webkitNotifications.checkPermission() == 0) {  
            return window.webkitNotifications.createHTMLNotification(url);  
        }  
 } 
//一个完整的案例
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Notifications API</title>
</head>
<body>
	<input id="fire" type="button" value="fire Notification">
	<script>
	var btn = document.getElementById("fire");
	if(window.Notification && Notification.permission !== "denied") {
		Notification.requestPermission(function(status) {
			if(status === 'granted') {
				//弹出一个通知
				btn.addEventListener('click', function() {
					var n = new Notification('Title', {//标题
						body : 'I am a Notification' //显示内容
						//以下是可选参数
						//icon : 
						//lang :
						//onclick:
						//onclose:
						//onerror:
						//onshow:
						//tag:
					});
					//两秒后关闭通知
					setTimeout(function() {
						n.close();
					}, 2000);
				});
			}
		});
	}
	</script>
</body>
</html>
```


```javascript
//完整的案例
function showMsgNotification(title, msg){
  var Notification = window.Notification || window.mozNotification || window.webkitNotification;
  if (Notification && Notification.permission === "granted") {
    var instance = new Notification(
      title, {
        body: msg,
        icon: "image_url"
      }
    );
    instance.onclick = function () {
      // Something to do
    };
    instance.onerror = function () {
      // Something to do
    };
    instance.onshow = function () {
      // Something to do
      // console.log(instance.close);
      setTimeout(instance.close, 3000);
    };
    instance.onclose = function () {
      // Something to do
    };
  }else if (Notification && Notification.permission !== "denied") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
      // If the user said okay
      if (status === "granted") {
        var instance = new Notification(
          title, {
            body: msg,
            icon: "image_url"
          }
        );
       instance.onclick = function () {
          // Something to do
       };
       instance.onerror = function () {
          // Something to do
        };
       instance.onshow = function () {
          // Something to do
          setTimeout(instance.close, 3000);
        };
        instance.onclose = function () {  
          // Something to do
        };  
      }else {  
        return false
      }
    });
  }else{
    return false;
  }
}
```

[back to top](#top)

- [Service Worker 入门](https://www.w3ctech.com/topic/866)
- [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
- [Service Worker API - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
- [Web push notifications](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
- [html5桌面通知(Web Notifications)实例解析](http://blog.csdn.net/caichang8/article/details/49796469)



