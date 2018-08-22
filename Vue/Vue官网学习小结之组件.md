[Vue官网学习小结之组件](#top)

- [组件定义](#组件定义)
- [组件的组织-组件注册](#组件的组织-组件注册)
- [传递数据](#[传递数据])
    - 父组件通过Prop向子组件传递数据
    - 子组件通过事件向父级组件发送消息
    - 通过插槽分发内容
    - 动态组件

## 组件

### 组件定义

```javascript
//全局注册
Vue.component('button-counter', {
    data: function(){
        return { count: 0}
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

> data必须是一个函数, 故每个实例可以维护一份被返回对象的独立的拷贝

### 组件的组织-组件注册

- 全局注册: 通过`Vue.component`全局注册
- 局部注册: 通过一个普通的 JavaScript对象(components)来定义组件

**局部注册**

```javascript
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }
//Vue根实例 
new Vue({
  el: '#app'
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
//可以组件之间进行嵌套
var ComponentA = { /* ... */ }
var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

**在模块系统中局部注册**

```javascript
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'
export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```

**基础组件的自动化全局注册**

当基础组件非常长时候，使用webpack的`require.context`t只全局注册这些非常通用的基础组件(https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/src/components/_globals.js)

```javascript
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components',             // 其组件目录的相对路径
  false,                      // 是否查询其子目录
  /Base[A-Z]\w+\.(vue|js)$/   // 匹配基础组件文件名的正则表达式
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

[back to top](#top)

### 传递数据

- 父组件通过Prop向子组件传递数据
- 子组件通过事件向父级组件发送消息
- 通过插槽分发内容
- 动态组件

**父组件通过Prop向子组件传递数据**

```javascript
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
//父组件, 使用变量
<blog-post title="My journey with Vue"></blog-post>
//父组件, 使用data，v-bind来动态传递 prop
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
<blog-post v-for="post in posts" v-bind:key="post.id" v-bind:title="post.title"></blog-post>
```

**子组件通过事件向父级组件发送消息**

````html
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3> 
      <!-- 第二个参数是子组件抛出的值 -->
      <button v-on:click="$emit('enlarge-text', 0.1)"> Enlarge text </button>
      <div v-html="post.content"></div>
    </div>
  `
})
<!--父组件-->
<script>
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [
          { id: 1, title: 'My journey with Vue' },
          { id: 2, title: 'Blogging with Vue' },
          { id: 3, title: 'Why Vue is so fun' }
        ],
    postFontSize: 1
  }
})
</script>
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
      v-on:enlarge-text="postFontSize += $event"    //通过$event访问到被子组件抛出的这个值
    ></blog-post>
  </div>
</div>
```

如事件处理函数是一个方法

````html
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3> 
      <button v-on:click="$emit('enlarge-text', 0.1)"> Enlarge text </button>
      <div v-html="post.content"></div>
    </div>
  `
})
<!--父组件-->
<script>
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [
          { id: 1, title: 'My journey with Vue' },
          { id: 2, title: 'Blogging with Vue' },
          { id: 3, title: 'Why Vue is so fun' }
        ],
    postFontSize: 1
  },
  methods: {
        onEnlargeText: function (enlargeAmount) {
            this.postFontSize += enlargeAmount
          } 
    }
})
</script>
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
      v-on:enlarge-text="onEnlargeText"    //事件处理函数是一个方法, 子组件抛出的值将会作为第一个参数
    ></blog-post>
  </div>
</div>
```

**组件上使用v-model**

```html
<custom-input v-model="searchText">
<!-- 等价-- >
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
<!--子组件中必须定义v-bind,v-on -->
<script>
Vue.component('custom-input', {
  props: ['value'],
  template: `<input v-bind:value="value" v-on:input="$emit('input', $event.target.value)">`
})
</script>
<!--父组件才能使用v-model -->
<custom-input v-model="searchText"></custom-input>
````

**通过插槽分发内容**

```html
<script>
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
</script>
<!--父组件, 将父组件的内容传递到子组件的slot中 -->
<alert-box>Something bad happened.</alert-box> 
````

**动态组件**

在不同组件之间进行动态切换是非常有用的，比如在一个tab的切换: 加一个特殊的 `is` 特性来实现(https://jsfiddle.net/chrisvfritz/o3nycadu/)

```html
<script>
Vue.component('tab-home', { 
	template: '<div>Home component</div>' 
})
Vue.component('tab-posts', { 
	template: '<div>Posts component</div>' 
})
Vue.component('tab-archive', { 
	template: '<div>Archive component</div>' 
})
new Vue({
  el: '#dynamic-component-demo',
  data: {
    currentTab: 'Home',
    tabs: ['Home', 'Posts', 'Archive']
  },
  computed: {    //计算属性
    currentTabComponent: function () {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  }
})
</script>
<!--父组件 -->
<div id="dynamic-component-demo" class="demo">
     <button v-for="tab in tabs"
             v-bind:key="tab"
             v-bind:class="['tab-button', { active: currentTab === tab }]"
             v-on:click="currentTab = tab"
     >{{ tab }}</button>
     <component v-bind:is="currentTabComponent"
                class="tab"
     ></component>
</div>
```

[back to top](#top)
