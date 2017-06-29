[Service Workers- HTML5 Web push notifications桌面通知](#top)

- [方法1：table-cell](#table-cell)

<h3 id="table-cell">方法1：table-cell</h3>

```javascript
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



