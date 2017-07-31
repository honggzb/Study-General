[Chrome DevTools new features](#top)

- [快捷键](#快捷键)
- [1. 在控制台(Console)中获取DOM元素- $0 in console](#在控制台)
- [2. Selector selecting](#快捷键)
- [3. Edit any text on the page](#Edit)
- [4. Filmstrip mode on the Network tab - capture screenshots during a page load](#Filmstrip)
- [5. Snippet code](#Snippet)
- [6. 利用Chrome的工作空间，编辑本地文件](#利用Chrome的工作空间)
- [7. Search, Find and Edit with Chrome DevTools](#Search)

<h3 id="快捷键">快捷键</h3>

快捷键|功能
---|---
Ctrl+P|快速查找文件
Ctrl+Shift+F|在源代码中搜索(该搜索也支持正则表达式)
Ctrl+G -> :num|跳到指定行
鼠标点击+Ctrl|多光标
Ctrl+D|选中下一个匹配项
Shift+鼠标点击|在颜色预览中，可在rgba,hsl和hexadecimal三种格式中，来回切换
Ctrl+F, 在filter中输入GC|在Timeline的Summary中，查看Garbage collection

<h3 id="在控制台">1. 在控制台(Console)中获取DOM元素- $0 in console</h3>

gives you a reference to the currently selected DOM node in the Elements panel - DOM-style representation of the object

- `$r` is a reference to the react component
- $()—就是document.querySelector()原生方法的映射。功能嘛，就是获取并返回第一个与填写的CSS属性匹配的DOM元素，如$(‘div’)就会返回第一个出现在页面中的div元素。
- $$()—就是document.querySelectorAll()原生方法的映射。功能嘛，就是获取并返回一个数组，数组中包含了所有与你填写的CSS属性匹配的DOM元素。
- $0--$4—代表你在Chrome调试器中操作不同DOM元素的历史记录，且最多记录5次，故而只有$0-$4这五个变量。$0代表最近一次，依次类推。

[back to top](#top)

<h3 id="Selector">2. Selector selecting</h3>

- `.section-inner p:nth-of-type(2)`

<h3 id="Edit">3. Edit any text on the page</h3>

- type `document.designMode = "on"` in console to turn on design mode, then click and type any text on the page

<h3 id="Filmstrip">4. Filmstrip mode on the Network tab - capture screenshots during a page load</h3>

- Click on the camera icon to enable the Filmstrip
- Reload the page to capture the screenshots. The screenshots are displayed above the Overview

<h3 id="Snippet">5. Snippet code</h3>

- [Run snippets of code from any page
](https://developers.google.com/web/tools/chrome-devtools/debug/snippets/?hl=en) - `Source -> Snippets`
- the snippet code will behave the same as your application code with regards to DOM access, relative URLs, cookies, and CORSs stuff

[back to top](#top)

<h3 id="利用Chrome的工作空间">6. 利用Chrome的工作空间，编辑本地文件</h3>

Chrome的工作空间，也是非常强大的，它可以直接编辑和保存你的本地文件，无需额外的操作，例如复制、粘贴。怎么配置它呢？

- F12打开Chrome调试器
- 找到Sources栏，出现在左侧的控制面板，点击鼠标右键，选择Add Folder To Workspace。或者，直接将你整个工程文件夹，拖拽到调试器中。

这样操作后，不管你打开哪个页面，都会出现刚才你操作的文件。为了更加有用，你可以将页面中用到的文件映射到相应的文件夹，允许在线编辑和简单的保存。

[back to top](#top)

<h3 id="Search">7. Search, Find and Edit with Chrome DevTools</h3>

Search, Find and Edit|From Panel|keyboard shortcut
---|---|---
Searching within all sources|any panel| win: Ctrl+Shift+f, mac: Cmd+Opt+f
Searching a source|source panel|win: Ctrl+f, mac: Cmd+f
Searching source file names and paths|source panel|win: Ctrl+p, mac: Cmd+p, 
Searching console input/output|console panel|win: Ctrl+f, mac: Cmd+f
Searching file names and URL search values|network panel|win: Ctrl+f, mac: Cmd+f
Searching a .css file for specific selector|source panel|Shift+Ctrl+o, mac: Shift+Cmd+o
Searching a .js file for specific function|source panel|Shift+Ctrl+o, mac: Shift+Cmd+o
Finding a DOM node using a selector - 1|elements panel|win: Ctrl+f, mac: Cmd+f -> Enter a CSS selector, such as `.km.content`
Finding a DOM node using a selector - 2|console panel| Enter:[`$$('selector')`](https://developers.google.com/web/tools/chrome-devtools/console/command-line-reference#selector)

http://developer.telerik.com/featured/16-ways-to-search-find-and-edit-with-chrome-devtools/

[back to top](#top)

> Reference

- https://developers.google.com/web/tools/chrome-devtools/
- [Twelve Fancy Chrome DevTools Tips](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
- [15个关于Chrome的开发必备小技巧[译]](http://www.cnblogs.com/giggle/p/5966991.html)
