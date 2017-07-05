[Service Workers- HTML5 Web push notifications桌面通知](#top)

- [1. Service Worker](#Service-Worker)
  - [1.1 Service Worker的生命周期](#生命周期)
  - [1.2 chaches polyfill+HTTPS的支持 - 写码之前](#chaches-polyfill)
- [2. Notification API](#Notification-API)
  - [2.1 Notification 对象](#Notification-对象)
  - [2.2 NotificationCenter 接口](#Notification-接口)
- [2. 检查浏览器是否支持 Notification](#检查浏览器是否支持Notification)
- [3. 使用Service Worker](#使用Service-Worker)

<h3 id="Service-Worker">1. Service Worker</h3>

<h4 id="生命周期">1.1 Service Worker的生命周期</h4>

Service worker拥有一个完全独立于Web页面的生命周期。

- 要让一个service worker在网站上生效，需先在你的网页中注册它。注册一个service worker之后，浏览器会在后台默默启动一个service worker的安装过程。
- 在安装过程中，浏览器会加载并缓存一些静态资源。如果所有的文件被缓存成功，service worker就安装成功了。如果有任何文件加载或缓存失败，那么安装过程就会失败，service worker就不能被激活（也即没能安装成功）。如果发生这样的问题，别担心，它会在下次再尝试安装。
- 当安装完成后，service worker的下一步是激活，在这一阶段，你还可以升级一个service worker的版本
- 在激活之后，service worker将接管所有在自己管辖域范围内的页面，但是如果一个页面是刚刚注册了service worker，那么它这一次不会被接管，到下一次加载页面的时候，service worker才会生效。
- 当service worker接管了页面之后，它可能有两种状态：要么被终止以节省内存，要么会处理fetch和message事件，这两个事件分别产生于一个网络请求出现或者页面上发送了一个消息。

下图是一个简化了的service worker初次安装的生命周期：

![](http://i.imgur.com/GNZidTA.png)

[back to top](#top)

<h4 id="chaches-polyfill">1.2 chaches polyfill+HTTPS的支持 - 写码之前</h4>

**[chaches polyfill项目地址](https://github.com/coonsta/cache-polyfill)**, 这个polyfill支持CacheStorate.match，Cache.add和Cache.addAll，而现在Chrome M40实现的Cache API还没有支持这些方法

`importScripts('serviceworker-cache-polyfill.js');`

**HTTPS的支持**

service worker权限很大，所以要防止它本身被坏人篡改利用, 阅读帮助文档并通过[Mozilla's SSL config generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)了解最佳实践。

[back to top](#top)

<h3 id="Notification-API">2. Notification API</h3>

- notification 对象
- NotificationCenter 接口

<h4 id="Notification-对象">2.1 Notification 对象</h4>

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
	- default 用户没有接收或拒绝授权请求 不能显示通知  
	- granted 用户接受授权请求 允许显示通知  
	- denied  用户拒绝授权请求 不允许显示通知 

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

<h3 id="检查浏览器是否支持Notification">3. 检查浏览器是否支持 Notification</h3>

```javascript
/**
 * Check if the browser supports notifications
 * @return true if browser does support notifications
 */
 function browser_support_notification(){
     return window.webkitNotifications;
 }
 function request_permission(){  
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

[back to top](#top)

<h3 id="使用Service-Worker">3. 使用Service Worker</h3>

3.1 注册和安装service worker

```javascript
//检查service worker API是否可用，如果可用，service worker /sw.js 被注册
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
```

- 如果这个service worker已经被注册过，浏览器会自动忽略上面的代码
- 有一个需要特别说明的是service worker文件的路径，你一定注意到了在这个例子中，service worker文件被放在这个域的根目录下，这意味着service worker和网站同源。换句话说，这个service work将会收到这个域下的所有fetch事件。如果我将service worker文件注册为/example/sw.js，那么，service worker只能收到/example/路径下的fetch事件（例如： /example/page1/, /example/page2/）
- 查看:  `chrome://inspect/#service-workers`


```javascript
//sw.js完整的案例
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
- [使用 Web Notifications](https://developer.mozilla.org/zh-CN/docs/Web/API/notification/Using_Web_Notifications)
- [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
- [Service Worker API - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
- [Web push notifications](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
- [html5桌面通知(Web Notifications)实例解析](http://blog.csdn.net/caichang8/article/details/49796469)
