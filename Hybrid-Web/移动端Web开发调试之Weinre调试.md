## 移动端Web开发调试之Weinre调试

Weinre的本意是Web Inspector Remote，它是一种远程调试工具。功能与Firebug、Webkit, inspector类似，可以帮助我们即时更改页面元素、样式，调试JS等

### 1 安装服务

`npm -g install weinre  //安装weinre`

安装Java版本的weinre需要有Java开发环境。首先安装JDK，并设置环境变量。新建系统变量JAVA_HOME，设为安装目录

### 2 运行服务

- Debug Server： HTTP server that you run from the weinre-node distribution. It's the HTTP server that's used by the Debug Client and Debug Target.
- Debug Client： Web Inspector user interface; the web page which displays the Elements and Console panels, for instance.
- Debug Target： your web page that you want to debug. This name (Debug Target) is also used to refer to the machine running the browser displaying the web page. Since a design point of weinre is to allow debugging applications on mobile devices, the debug target, when speaking of the machine, is your mobile device

![](Weinre1.jpg)
![](Weinre2.jpg)

1) 打开cmd，输入 `weinre.jar --httpPort 8910 --boundHost -all-`

或在weinre所在文件夹的地址栏 `java -jar weinre.jar --httpPort 8081 --boundHost -all-`

2) 打开浏览器，输入 `http://localhost:Port`， 或 http://192.8.104.20:8910/

3) 添加Debug Target, 在需要调试的页面,如index.html文件的尾部加入 `<script src="http://192.8.104.20:8910/target/target-script-min.js#anonymous"></script>`，可以开始修改html和CSS代码，无须刷新页面

### 3 说明

- 客户端桌面环境和移动设备处于同一个局域网网段，尤其是WiFi方式上网的情况，一定要防止Wifi自动连接到其他网络中
- Target Bookmarklet方法： 方法是将一段js保存到移动设备的书签中, 使用此方法可以将标签中的代码注入到目标页面代码中。以下是JavaScript代码段(可以在 http://localhost:8081/ 找到这段js)：

```javascript
javascript:(function(e){e.setAttribute("src","http://192.8.104.20::8910/target/target-script-min.js#anonymous");document.getElementsByTagName("body")[0].appendChild(e);})(document.createElement("script"));void(0);
```

将这段js保存到名为Debug书签(设备书签)中，然后使用移动设备访问我想要调试的页面。需要调试页面，打开页面后，点击Debug书签就可以在桌面环境开始调试了。

- PhoneGapWebApp调试: PhoneGap WebApp也就是运行在移动设备Webview之内（Android:webview，iOS:uiwebview）的移动应用，因此weinre调试只需要在要调试的目标页面中加入weinre脚本代码即可。

另外可以安装使用GapDebug应用，GapDebug是一款跨平台的移动设备调试工具，支持拖拽式一键安装，支持重启App后Debug状态恢复，支持断点调试，支持Windows和Mac OS系统，官方地址

https://www.genuitec.com/products/gapdebug/


java -jar weinre.jar --httpPort 8910--boundHost -all-

> reference

- http://blog.csdn.net/freshlover/article/details/42640253
- http://www.cnblogs.com/duanhuajian/archive/2012/10/28/2743832.html
- http://people.apache.org/~pmuellr/weinre/docs/latest/Home.html
