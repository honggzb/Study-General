[Remote Debugging iOS Safari](#top)

- [1. Remote Debugging iOS Safari on Windows and Linux](#Windows)
  - [1.1 SConsole](#SConsole)
  - [1.2 Telerik AppBuilder](#Telerik)
- [2. Remote Debugging iOS Safari on OS X](#Safari)

<h2 id="Windows">1. Remote Debugging iOS Safari on Windows and Linux</h2>

<h3 id="SConsole">1.1 SConsole</h3>

JSConsole works by inserting a script tag into your web page that overrides the console behavior

`https://jsconsole.com/:listen`

![](https://i.imgur.com/3GKMbNf.png)

need access to 

<h3 id="Telerik">1.2 Telerik AppBuilder</h3>

[iOS Web Inspector on Windows with Telerik AppBuilder](https://blog.falafel.com/ios-web-inspector-on-windows-with-telerik-appbuilder/)

- Modify Windows Firewall
- Enable Web Inspector in iOS: **Settings > Safari > Advanced**, and toggling Web Inspector so that it is enabled
- Install [Telerik AppBuilder Windows Client](https://platform.telerik.com/#downloads/appbuilder)
  - create a blank project(I reuse a project I named “iPad Debugging”). Connect iOS device via USB cable to your computer and you will see it connected in the Devices tab
  - Open Safari on your iOS device and you will see your open tabs listed under Web Inspector > Safari in the AppBuilder Devices tab.  Click the “bug” icon to open the Deverloper Tools window

![](https://i.imgur.com/G6xvXcV.png)

[back to top](#top)

<h2 id="Safari">2. Remote Debugging iOS Safari on OS X</h2>

- an iPad or an iPhone that can connect by USB to a Mac computer with Safari version 6 onwards installed
- enable ‘Web Inspector’ on iOS device: **Settings > Safari > Advanced**, and toggling Web Inspector so that it is enabled
- enable the Develop menu in Safari on your Mac computer: **Safari > Preferences > Advanced**, and ticking the check box for 'Show Develop menu in menu bar'
- Open desktop Safari on Mac: **Develop > iOS Device Name**, and click on the page you wish to debug

![](https://i.imgur.com/hhfiY1i.png)

[back to top](#top)

> References
> - [Remote debugging iOS Safari on OS X, Windows and Linux](https://blog.idrsolutions.com/2015/02/remote-debugging-ios-safari-on-os-x-windows-and-linux/)
> - [iOS Web Inspector on Windows with Telerik AppBuilder](https://blog.falafel.com/ios-web-inspector-on-windows-with-telerik-appbuilder/)
