[Accessibility应用之focus篇](#top)

- [一、设置焦点focus](#设置焦点focus)
- [二、限制焦点(Trapping focus)](#限制置焦点focus)
- [三、恢复焦点(Restoring focus)](#恢复置焦点focus)
- [四、退出焦点（对话框）](#退出置焦点focus)
- [五、补充：Delegating the focus and blur events](#补充)

最近项目中需要应用accessibility，大量使用了focus和blur，总结如下

<h3 id="设置焦点focus">一、设置焦点focus</h3>

如创建无障碍对话框：当一个对话框出现时，焦点应在对话框内，这样用户才可以使用键盘继续浏览。焦点设置在对话框内的确切位置，在很大程度上取决于对话框本身的目的。如果确认对话框（confirmation dialog ）内有一个“继续”按钮和一个“取消”按钮，那么你可以将焦点默认设置在“取消”按钮上。如果对话框是用来让用户输入文字的，那么你可以将焦点默认设置在文本输入框内。如果你实在不知道将焦点设在何处，将焦点设置在能代表对话框的元素上是个不错的选择。

由于多数情况下，我们使用<div>元素来表示一个对话框，那么可以将焦点默认设置在该<div>上。你需要将该元素的tabIndex属性设置为-1，这样这个元素才能获得焦点。这个属性值允许你使用JavaScript将焦点设置到该元素，但不会将该元素插入到正常的Tab键顺序中。也就是说用户将无法按TAB键将焦点设置在对话框上。直接在HTML中设置或通过JavaScript设置都可以。在HTML中设置：

```html
<div id="my-dialog" role="dialog" tabindex="-1" aria-labelledby="dialog-title">
    <h3 id="dialog-title">New Message</h3>
    <-- Your dialog code here -->
</div>
```

**通过JavaScript设置：**

```javascript
var div = document.getElementById("my-dialog");
div.tabIndex = -1;
div.focus();
```

一旦将tabIndex设置为-1，元素就可以调用focus()，就像任何其他的可聚焦元素一样。这样用户就可以按Tab键在对话框中导航了。

> 说明：tabIndex在不同的元素上对focus有不同表现，具体参见 http://test.cita.illinois.edu/aria/focus-tests/index.php

[back to top](#top)

<h3 id="限制焦点focus">二、限制焦点(Trapping focus)</h3>

对话框的另一个可访问性问题是要确保焦点不能跳出对话框。一般来说，如果对话框是模态的，其焦点应无法逃脱对话框。当对话框打开时，如果按tab键将焦点设置到对话框背后的页面元素中，那么对于键盘用户来说将焦点重新返回到对话框内是相当困难的。因此，最好使用一些JavaScript以避免这种情况发生。

基本思路是使用事件捕获（event capturing）侦听focus事件，这种方法由Peter-Paul Koch[2]推广，如今已在JavaScript库中广泛使用。由于focus不冒泡（bubble），你无法在事件流的冒泡阶段捕捉到它。相反，你可以通过使用事件捕获方法捕获页面上的所有focus事件。之后，你只需确定获得焦点的元素是否在对话框中。如果没有，则将焦点设置在对话框上。代码是非常简单的：

```javascript
document.addEventListener("focus", function(event) {
    var dialog = document.getElementById("my-dialog");
    if (dialogOpen && !dialog.contains(event.target)) {
        event.stopPropagation();
        dialog.focus();
    }
}, true);
```

如果你使用JavaScript库的话，focus事件委托的方法也可以实现同样的效果。如果不使用JavaScript库，同时需要支持Internet Explorer 8及更早的版本，可以使用focusin事件代替(译者注：focusin和focusout支持事件冒泡)。

[back to top](#top)

<h3 id="恢复焦点focus">三、恢复焦点(Restoring focus)</h3>

对话框的最后一个焦点难题：当对话框关闭时，将焦点返回至页面的主体部分。思路很简单：为了打开对话框，用户可能激活了一个链接或一个按钮。此时焦点转移到对话框中，用户完成一些任务后，然后退出对话框。焦点应该重新设回至为了打开对话框而点击的链接或按钮上，以便可以继续浏览网页。在Web应用程序中经常忽视这个问题，但效果是天壤之别。

与其他部分一样，少量代码即可实现效果。所有浏览器都支持document.activeElement ，返回当前具有焦点的元素。你只需获得这个值，然后显示对话框，关闭对话框时，将焦点返回到该元素。例如:

```javascript
var lastFocus = document.activeElement, dialog = document.getElementById("my-dialog");
dialog.className = "show";
dialog.focus();
```

这段代码的重点是它记录了最后的焦点元素。这样一来，对话框被关闭时，将焦点设置在它上面：`lastFocus.focus()`

[back to top](#top)

<h3 id="退出焦点focus">四、退出焦点（对话框）</h3>

最后一个问题是要为用户提供一个快速简便的方法来退出对话框。最好的办法是使用Esc键关闭对话框。这是对话框在桌面应用程序中的退出方式，所以用户非常熟悉这种方式。只需监听Esc键是否被按下，然后退出对话框，如：

```javascript
document.addEventListener("keydown", function(event) {
    if (dialogOpen && event.keyCode == 27) {
        // close the dialog
    }
}, true);
```

[back to top](#top)

<h3 id="补充">五 补充：Delegating the focus and blur events</h3>

少数事件，如focus, blur, 和change不支持事件冒泡，如以下代码

```
<p id="testParagraph">
    Some text.
    <input id="testInput" />
</p>
$('testParagraph').onfocus = handleEventPar;
$('testInput').onfocus = handleEventInput;
```

当用户聚焦在input时候handleEventInput可以执行，但由于focus事件不支持冒泡，所以handleEventPar并不执行。唯一例外的是p标签定义tabIndex属性，否则handleEventPar永远不会被执行

让我们将转为到事件捕捉（Event capture），代码如下

```
<p id="testParagraph">
    Some text.
    <input id="testInput" />
</p>
$('testParagraph').onfocus = handleEventPar;
$('testInput').onfocus = handleEventInput;
$('testParagraph').addEventListener('focus',handleEventPar,true);
$('testInput').addEventListener('focus',handleEventInput,true);
```

使用addEventListener，并设置第二个参数为true，这样如果用户聚焦在input的时候handleEventPar和handleEventInput均能被执行

**兼容IE**

但IE并不支持事件捕捉，它支持focusin和focusout事件，不同于focus和blur，这两个事件支持事件冒泡。如要兼容IE，需要修改代码如下：

```javascript
<ol id="dropdown">
    <li><a href="#">List item 1</a>
        <ol>
            <li><a href="#">List item 1.1</a></li>
            <li><a href="#">List item 1.2</a></li>
            <li><a href="#">List item 1.3</a></li>
        </ol>
    </li>
    [etc.]
</ol>
$('dropdown').onmouseover = handleMouseOver;
$('dropdown').onmouseout = handleMouseOut;
$('dropdown').onfocusin = handleMouseOver;
$('dropdown').onfocusout = handleMouseOut;
$('dropdown').addEventListener('focus',handleMouseOver,true);
$('dropdown').addEventListener('blur',handleMouseOut,true);
```

[back to top](#top)

> 参考：

- http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
- http://www.topcss.org/?p=590
- http://www.cnblogs.com/JoannaQ/p/4355072.html
