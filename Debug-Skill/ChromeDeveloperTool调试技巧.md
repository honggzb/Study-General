## [chrome developer tool 调试技巧](#top)

- 1. Beautify Javascript
- [2. 查看元素绑定了哪些事件](#查看元素绑定了哪些事件)
- [3. Ajax时中断](#Ajax时中断)
- [4. 页面事件中断](#页面事件中断)
- [5. Javascript 异常时中断](#Javascript 异常时中断)
- [6. DOM Level 3 Event 事件中断](#Event事件中断)
- [7. 所有 js 文件中搜索&查找 js 函数定义](#文件中搜索)
- [8. command line api](#command-line-api)  --**非常有用  `$0等`**
- [9. Edit Mode: Edit any text on the page](#Edit-Mode)  --**非常有用  `document.designMode = "on"`**
- [10. console中执行的代码可断点](#console中执行的代码可断点)

<h3 id="查看元素绑定了哪些事件">2. 查看元素绑定了哪些事件</h3>

- 在 Elements 面板, 选中一个元素, 然后在右侧的 Event Listeners 下面会按类型出这个元素相关的事件, 也就是在事件捕获和冒泡阶段会经过的这个节点的事件.
- 在 Event Listeners 右侧下拉按钮中可以选择 Selected Node Only 只列出这个节点上的事件
- 展开事件后会显示出这个事件是在哪个文件中绑定的, 点击文件名会直接跳到绑定事件处理函数所在行, 如果 js 是压缩了的, 可以先 Pretty print 下, 然后再查看绑定的事件.

<h3 id="Ajax时中断">3. Ajax 时中断</h3>

在 Scripts 面板右侧有个 XHR Breakpoints, 点右侧的 + 会添加一个 xhr 断点, 断点是根据 xhr 的 url 匹配中断的, 如果不写匹配规则会在所有 ajax, 这个匹配只是简单的字符串查找, 发送前中断, 在中断后再在 Call Stack 中查看时那个地方发起的 ajax 请求

<h3 id="页面事件中断">4. 页面事件中断</h3>

除了给设定常规断点外, 还可以在某一特定事件发生时中断(不针对元素) , 在Scripts面板右侧, 有个 Event Listener Breakpoints, 这里列出了支持的所有事件, 不仅 click, keyup 等事件, 还支持 Timer(在 setTimeout setInterval 处理函数开始执行时中断), onload, scroll 等事件.

<h3 id="Javascript 异常时中断">5. Javascript 异常时中断</h3>

Pretty print 左侧的按钮是开启 js 抛异常时中断的开关, 有两种模式：在所有异常处中断, 在未捕获的异常处中断. 在异常处中断后就可以查看为什么抛出异常了

<h3 id="Event事件中断">6. DOM Level 3 Event 事件中断</h3>

在 Elements 面板, 选中一个元素右键, 有两个选项：Break on subtree modifications, Break on attributes modifications, 这两个对应 DOM Level 3 Event 中的DOMSubtreeModified , DOMSubtreeModified 事件 在 Scripts 面板 DOM Breakpoints 处会列出所有 level3 的 event 中断

<h3 id="文件中搜索">7. 所有 js 文件中搜索&查找 js 函数定义</h3>

在 chrome developer tool 打开的情况下, 按 ctrl + shift + F, 在通过 js 钩子查找代码位置时很有用, 查找支持正则表达式

- 查找函数定义: ctrl + shift + 0 (在 Scripts panel 下)
- 查找文件: ctrl + o (在 Scripts panel 下)
- 更多快捷键: 在 chrome developer tool 中按 ? 查看帮助

<h3 id="command-line-api">8. command line api</h3>

- $(id_selector) 这个与页面是否有 jQuery 无关
- $$(css_selector)
- $0, $1, $2, $3, $4
  - Elements 面板中最近选中的 5 个元素, 最后选择的是 $0， 这个5个变量时先进先出的
- `$r` is a reference to the react component
- copy(str) 复制 str 到剪切板, 在断点时复制变量时有用
- monitorEvents(object[, types])/unmonitorEvents(object[, types])
  - 当 object 上 types 事件发生时在 console 中输出 event 对象
- 更多 console api 请 console.log(console) 或 [【点击】](http://getfirebug.com/wiki/index.php/Console_API#console.trace.28.29)
- 更多 command line api  [【点击】](http://getfirebug.com/wiki/index.php/Command_Line_API)

<h3 id="Edit-Mode">9. Edit Mode: Edit any text on the page</h3>

- type `document.designMode = "on"` in console to turn on design mode, then click and type any text on the page

<h3 id="console中执行的代码可断点">10. console中执行的代码可断点</h3>

在 console 中输入代码的最后一行加上 //@ sourceURL=filename.js, 会在 Scripts 面板中有个叫 filename.js 的文件, 然后他就和外部 js 文件一样了

### 5. Snippet code

- [Run snippets of code from any page
](https://developers.google.com/web/tools/chrome-devtools/debug/snippets/?hl=en) - `Source -> Snippets`
- the snippet code will behave the same as your application code with regards to DOM access, relative URLs, cookies, and CORSs stuff

> Reference

- https://developers.google.com/web/tools/chrome-devtools/
- [Twelve Fancy Chrome DevTools Tips](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
- http://www.cnblogs.com/suizhikuo/archive/2012/06/05/2537290.html
