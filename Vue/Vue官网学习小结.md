[Vue官网学习小结](#top)

- [基础知识](#基础知识)
    - [指令](#指令)
    - [组件化](#组件化)
    - [Vue实例](#Vue实例)
        - 实例生命周期钩子
   - [模板语法](#模板语法)
- [计算属性和侦听属性](#计算属性和侦听属性)
    - 计算属性缓存 vs 调用方法
    - 侦听属性
    - 自定义的侦听器
- [Class与Style绑定](#Class与Style绑定)
    - 数组语法
    - 绑定内联样式style
- [条件渲染](#条件渲染)
    - v-if,v-else, v-else-if(vue 2.1.0+)
    - v-show
    - v-if vs. v-show
    - 列表渲染和v-for指令
- [事件处理](#事件处理)
    - v-on指令
    - 事件修饰符
    - 按键修饰符
    - 系统修饰键
    - 鼠标按钮修饰符
- [表单输入绑定](#表单输入绑定)
    - [基础用法: v-model指令](#基础用法: v-model指令)
    - [值绑定](#值绑定)
    - 修饰符: .lazy, .number, .trim
- [组件](https://github.com/honggzb/Study-General/blob/master/Vue/Vue%E5%AE%98%E7%BD%91%E5%AD%A6%E4%B9%A0%E5%B0%8F%E7%BB%93%E4%B9%8B%E7%BB%84%E4%BB%B6.md)


## 基础知识

### 指令

指令|说明|缩写
---|---|---
`<p v-bind:title="message"`>||`<p :title="message">`
`v-if="seen"`||
`v-for="todo in todos"`||
`<button v-on:click="reverseMessage">`|事件监听器，通过它调用在 Vue 实例中定义的方法|`<button @click="reverseMessage">`
`<input v-model="message">`|表单输入和应用状态之间的双向绑定|

- 一些指令能够接收一个“参数”，在指令名称之后以冒号表示, 如v-bind,v-on
- 在v-on,v-for中，修饰符 (Modifiers) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定
    - `<form v-on:submit.prevent="onSubmit">...</form>`, `.prevent`修饰符告诉`v-on`指令对于触发的事件调用`event.preventDefault()`

### 组件化

```javascript
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>这是个待办项</li>'
})
```

### Vue实例

```javascript
var data = { a: 1 };   // 数据对象
var obj = {foo: 'bar'};   //阻止修改现有的属性，也意味着响应系统无法再追踪变化
Object.freeze(obj)
var vm = new Vue({    //一个 Vue 实例中
    el: '#app',
    data: data
    //data: obj 
})
//实例属性与方法
vm.a == data.a  //true
vm.$data === data //true
vm.$el === document.getElementById('app')   //true
vm.$watch('a', function(newValue, oldValue){

})
```

- Vue实例的data中存在的属性是响应式的，当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值
- 添加一个新的属性，如`vm.b='hi'`将不会触发任何视图的更新
- `Object.freeze()`，会阻止修改现有的属性，也意味着响应系统无法再追踪变化
- Vue实例的属性与方法。它们都有前缀$，以便与用户定义的属性区分开来

**实例生命周期钩子**

```javascript
new Vue({
  data: { a: 1 },
  created: function () {
    console.log('a is: ' + this.a)  // `this` 指向 vm 实例
  }
})
```

- 不要在选项属性或回调上使用箭头函数，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例，经常导致 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误

### 模板语法

模板语法|说明
---|---
`{{ msg }}`|文本插值
`<span v-once>这个将不会改变: {{ msg }}</span>`|一次性地文本插值
`<p>Using v-html directive: <span v-html="rawHtml"></span></p>`|原始HTML, span将会被替换成为属性值rawHtml,显示为html的渲染内容

- 站点上动态渲染的任意HTML可能会非常危险，因为它很容易导致XSS攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值

[back to top](#top)

## 计算属性和侦听属性

**计算属性**: 对于任何复杂逻辑，都应当使用计算属性

```HTML
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
<script>
var vm = new Vue({
  el: '#example',
  data: { message: 'Hello' },         // 一般用在初始化
  computed: {                         //使用关键字computed
    reversedMessage: function () {      //计算属性: reversedMessage
      return this.message.split('').reverse().join('')
    }
  }
})   
</script>
```

计算属性默认只有getter，不过在需要时你也可以提供一个setter 

```javascript
computed: {
  fullName: {
    get: function () {   // getter
      return this.firstName + ' ' + this.lastName
    },
    set: function (newValue) {   // setter
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

- 运行`vm.fullName = 'John Doe'`, `setter`会被调用，`vm.firstName`和`vm.lastName`也会相应地被更新

**计算属性缓存 vs 调用方法**

```HTML
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage() }}"</p>
</div>
<script>
var vm = new Vue({
  el: '#example',
  data: { message: 'Hello' },
  methods: {                         //使用关键字methods,
    reversedMessage: function () {      //调用方法: reversedMessage()
      return this.message.split('').reverse().join('')
    }
  }
})   
</script>
```

- 计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值。这就意味着只要message还没有发生改变，多次访问reversedMessage计算属性会立即返回之前的计算结果，而不必再次执行函数
- 相比之下，每当触发重新渲染时，调用方法将总会再次执行函数

**侦听属性**

Vue提供了一种更通用的方式来观察和响应Vue实例上的数据变动：**侦听属性**

```HTML
<div id="demo">{{ fullName }}</div>
<script>
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {      //使用关键字watch
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
</script>
```

**自定义的侦听器**: 对于非常复杂逻辑， Vue通过watch选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行**异步或开销较大的操作**时，这个方式是最有用的

```HTML
<div id="watch-example">
  <p>Ask a yes/no question:<input v-model="question"></p>
  <p>{{ answer }}</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    question: function (newQuestion, oldQuestion) {    // 如果 `question` 发生改变，这个函数就会运行
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于 `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识， 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>
```

- 除了watch选项之外，还可以使用命令式的vm.$watch API

[back to top](#top)

## Class与Style绑定

- 绑定class: 如isActive=true和hasError=true, 该div加入active, text-danger两个class

```html
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
<!-- 绑定的数据对象不必内联定义在模板 -->
<div v-bind:class="classObject"></div>
<script>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {    //绑定一个返回对象的计算属性
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
</script>
```

- 数组语法: 把一个数组传给v-bind:class，以应用一个class列表

```html
<!-- 始终添加errorClass，但是只有在isActive是true时才添加activeClass -->
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<!-- 也可在数组语法中也可以使用对象语法 -->
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
<script>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
</script>
```

- 绑定内联样式style

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<script>
data: {
  activeClass: 'red',
  fontSize: 30
}
</script>
<!-- 直接绑定到一个样式对象通常更好 -->
<div v-bind:style="styleObject"></div>
<script>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
</script>
<!-- 也可使用数组 -->
<div v-bind:style="[baseStyles, overridingStyles]"></div>
<!-- 自动添加前缀 -->
<!--v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀-->
<!-- 自动分辨前缀 ， vue 2.3.0+ -->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

[back to top](#top)

## 条件渲染

- v-if,v-else, v-else-if(vue 2.1.0+)

```html
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>
<!-- 在模板上使用 -->
<!-- 添加一个具有唯一值的key属性, 两个input元素是完全独立的，不复用它们,否则input不会被替换掉——仅仅是替换了它的placeholder -->
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

- v-show

- `<h1 v-show="ok">Hello!</h1>`
- 带有v-show的元素始终会被渲染并保留在DOM中。v-show只是简单地切换元素的CSS属性display
- v-show不支持<template>元素，也不支持v-else

**v-if vs v-show**

- v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建
- v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块
- v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换
- 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用v-show较好；如果在运行时条件很少改变，则使用 v-if 较好

**列表渲染和v-for指令**

- v-for具有比v-if更高的优先级
- `<div v-for="(value, key, index) in object">{{ index }}. {{ key }}: {{ value }}</div>`
- 每项的唯一key属性: `<div v-for="item in items" :key="item.id"><!-- 内容 --></div>`, key是Vue识别节点的一个通用机制，key并不与v-for特别关联
- **数组更新检测**
    - mutation method(变异方法): Vue包含一组观察数组的变异方法，它们将会触发视图更新。如: push(), pop(), shift(), unshift(), splice(), sort(), reverse()
    - non-mutating method(非变异方法): 可以用新数组替换旧数组。如: filter(), concat() 和 slice()
    - 由于JavaScript 的限制，Vue不能检测以下变动的数组：
        - 当利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
        - 当修改数组的长度时，例如：`vm.items.length = newLength`
        - Vue不能检测对象属性的添加或删除

[back to top](#top)

## 事件处理

- `v-on`指令监听DOM事件
- 特殊变量`$event`访问原生事件对象

```html
<div id="example-2">
  <button v-on:click="greet">Greet</button>
</div>
<script>
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  methods: {   // 在 `methods` 对象中定义方法
    greet: function (event) {
      alert('Hello ' + this.name + '!')
      if (event) {    // `event` 是原生 DOM 事件
        alert(event.target.tagName) 
      }
    }
  }
})
// 也可以用 JavaScript 直接调用方法
example2.greet() // => 'Hello Vue.js!'
</script>

<!-- 特殊变量$event -->
<button v-on:click="warn('Form cannot be submitted yet.', $event)">Submit</button>
<script>
methods: {
  warn: function (message, event) {
    if (event) event.preventDefault()    // 现在我们可以访问原生事件对象
    alert(message)
  }
}
</script>
```

**事件修饰符**: `.stop`, `.prevent`, `.capture`, `.self`, `.once`, `.passive`

- 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。
    - 用 `v-on:click.prevent.self` 会阻止所有的点击，
    - 而` v-on:click.self.prevent` 只会阻止对元素自身的点击。

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
<!-- 2.1.4 新增 -->
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
<!-- 2.3.0 新增 -->
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>   <!-- 尤其能够提升移动端的性能 -->
<!-- 不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为 -->
```

**按键修饰符**

```html
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit">
<!-- 按键别名 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
<!-- 对象自定义按键修饰符别名` -->
Vue.config.keyCodes.f1 = 112
```

按键别名：

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left

**系统修饰键**:  2.1.0 新增

- .ctrl
- .alt
- .shift
- .meta

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

**鼠标按钮修饰符**: 2.2.0 新增

[back to top](#top)

## 表单输入绑定

### 基础用法: v-model指令

- 双向数据绑定
- v-model会忽略所有表单元素的value、checked、selected特性的初始值而总是将Vue实例的数据作为数据来源。应该通过JavaScript在组件的data选项中声明初始值
- v-model不会在输入法组合文字过程中得到更新。如果想处理这个过程，使用input事件

```html
<input v-model="message" placeholder="edit me">
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
<!-- 多个复选框，绑定到同一个数组 -->
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>
<script>
new Vue({
  el: '#example-3',
  data: {
    checkedNames: []
  }
})
</script>
<!-- 选择框- 单选框 -->
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
<script>
new Vue({
  el: '#example-3',
  data: {
    selected: ''       
    //v-model表达式的初始值未能匹配任何选项，<select> 元素将被渲染为“未选中”状态。在 iOS中，这会使用户无法选择第一个选项。因为这样的情况下，iOS不会触发 change 事件。因此，更推荐提供一个值为空的禁用选项, 如果是多选框，selected: []
  }
})
</script>
<!-- 选择框- 多选框 -->
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
<script>
new Vue({
  el: '#example-3',
  data: {
    selected: []
  }
})
</script>
<!-- 选择框- 用 v-for 渲染的动态选项 -->
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
<script>
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
</script>
```

### 值绑定

值绑定|说明
---|---
复选框| `<input type="checkbox" v-model="toggle" true-value="yes" false-value="no">`
单选按钮|`<input type="radio" v-model="pick" v-bind:value="a">`
选择框的选项|`<select v-model="selected"><option v-bind:value="{ number: 123 }">123</option></select>`

### 修饰符

- `.lazy`: 在默认情况下，v-model在每次input事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。lazy修饰符，从而转变为使用change事件进行同步： `<input v-model.lazy="msg" >`
- `.number`: 自动将用户的输入值转为数值类型：`<input v-model.number="age" type="number">`
- `.trim`: 自动过滤用户输入的首尾空白字符：`<input v-model.trim="msg">`

[back to top](#top)
