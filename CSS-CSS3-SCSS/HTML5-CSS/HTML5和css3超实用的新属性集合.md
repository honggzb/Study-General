[HTML5和css3超实用的新属性集合](#top)

- [1. HTML5里autofocus属性](#HTML5里autofocus属性)
- [2. HTML5的hidden属性](#HTML5的hidden属性)
- [3. 使用HTML5中的element.dataset操作自定义data-*数据](#dataset操作自定义data)
- [4.元素内容是否可被编辑contenteditable](#元素内容是否可被编辑)
- [5.video可在页面中播放，而不是全屏播放webkit-playsinline](#而不是全屏播放)

<h2 id="HTML5里autofocus属性">1. HTML5里autofocus属性</h2>

一个简单的HTML5功能是当页面加载完成时让输入焦点自动落到某个元素上

```html
<!-- These all work! -->
<input autofocus="autofocus" />
<button autofocus="autofocus">Hi!</button>
<textarea autofocus="autofocus"></textarea>
```

[back to top](#top)

<h2 id="HTML5的hidden属性">2. HTML5的hidden属性</h2>

当一个网页元素有了hidden属性后，它的表现跟CSS的display: none;作用非常相似，元素将会消失，而且不占用任何页面空间

`<div hidden>You can't see me!</div>`

如果你使用的是老式浏览器，不支持这个属性，你可以在CSS里添加下面的代码来支持它

`*[hidden] { display: none; }`

[back to top](#top)

<h2 id="dataset操作自定义data">3. 使用HTML5中的element.dataset操作自定义data-*数据</h2>

`<div id="myDiv" data-name="myDiv" data-id="myId" data-my-custom-key="This is the value"></div>`

要想获取这个data-id属性，你的代码应该写成这样

```javascript
// Get the element
var element = document.getElementById("myDiv");
// Get the id
var id = element.dataset.id;
//jquery 写法
$("#myDiv").data("id")
```

[back to top](#top)

<h2 id="元素内容是否可被编辑">4. 元素内容是否可被编辑contenteditable</h2>

`<div id="example-one" contenteditable="true">`

<h2 id="而不是全屏播放">5. video可在页面中播放，而不是全屏播放webkit-playsinline</h2>

`<video id="myvideo" src="test.mp4" webkit-playsinline="true"></video>`

[back to top](#top)
