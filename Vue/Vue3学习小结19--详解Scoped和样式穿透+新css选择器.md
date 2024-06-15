[Vue3学习小结19--详解Scoped和样式穿透+新css选择器](#top)

- [使用less](#使用less)
- [css样式穿透（深度选择器）](#css样式穿透深度选择器)
- [scoped的原理](#scoped的原理)
- [新css选择器](#新css选择器)
  - [插槽选择器slotted](#插槽选择器slotted)
  - [全局选择器global](#全局选择器global)
  - [动态 CSS](#动态-css)
  - [CSS Modules](#css-modules)

-------------------------------------

## 使用less

1. `npm i less --save`
2. `<style scoped lang="less"> ... </style>`

## css样式穿透（深度选择器）

- 什么情况下使用样式穿透
  - 引入第三方组件库（如element-ui、element-plus），修改第三方组件库的样式
  - 样式文件中使用了 `scoped` 属性，但是为了确保每个组件之间不存在相互影响所以不能去除
- 样式穿透的三种办法

|办法|适用|语法|
|---|---|---|
|`>>>`|适用与 css、stylus，不太推荐，可能会有问题<br>选中子组件|·`外层类 >>> 想要修改类名 { 修改样式 }`|
|`/deep/`|适用于 scss、less<br>向下递归地选中所有子组件内的元素，从而实现样式的传递|`外层类 /deep/ 想要修改类名 { 修改样式 }`|
|`::v-deep`|通用，据说可以加快编译速度|·`:deep(想要修改类名) { 修改样式 }`|

```css
.ipt {
    width: 300px;
    :deep(.el-input__inner) {
      background: red;
    }
}
```

[⬆ back to top](#top)

## scoped的原理

- vue中的scoped 通过在DOM结构以及css样式上加唯一不重复的标记:data-v-hash的方式，以保证唯一（而这个工作是由过PostCSS转译实现的），达到**样式私有化模块化**的目的。
- 总结一下`scoped`三条渲染规则：
  - 给HTML的DOM节点加一个不重复data属性(形如：`data-v-123`)来表示唯一性
  - 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如`[data-v-123]`）来私有化样式
  - 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的`data`属性
- PostCSS会给一个组件中的所有dom添加了一个独一无二的动态属性`data-v-xxxx`，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom, 从而达到了'样式模块化'的效果.

[⬆ back to top](#top)

## 新css选择器

### 插槽选择器slotted

- `:slotted` 伪类以明确地将插槽内容作为选择器的目标

```ts
<style scoped lang="less">
 :slotted(.aa) {
  color: red;
 }
</style>
```

### 全局选择器global

- `:global` 伪类让一个样式规则应用到全局
- 混合使用局部与全局样式

```ts
<style> /* 全局样式 */ </style>
<style scoped> /* 局部样式 */ </style>
```

[⬆ back to top](#top)

### 动态 CSS

- 通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上

```ts
<template>
  <div class="dongtai">
    动态 CSS
  </div>
</template>
<script lang="ts" setup name="App">
  import { ref } from 'vue'
  const style = ref({
    color: 'red'
  })
  setTimeout(() => {
    style.value.color = 'blue'
  }, 3000)
</script>
<style scoped lang="less">
  .dongtai {
    color: v-bind('style.color');
  }
</style>
```

[⬆ back to top](#top)

### CSS Modules

- `<style module>` 标签会被编译为 CSS Modules 并且将生成的 CSS 类作为 $style 对象的键暴露给组件
- 自定义注入名称: `<style module="name">`
- 注入的类可以通过`useCssModule` API 在 `setup()` 和 `<script setup>` 中使用。对于使用了自定义注入名称的 `<style module>` 模块，useCssModule 接收一个对应的 module attribute 值作为第一个参数

```vue
<!--  --------  --> 
<template>
    <div :class="[$style.div, $style.border]">小满是个弟弟</div>
</template>
<style module>
  .red { color: red;}
  .border{border: 1px solid #ccc;}
</style>
<!--  --------  --> 
<template>
    <div :class="[zs.red,zs.border]">自定义注入名称</div>
</template>
<script lang="ts" setup name="App">
  import { useCssModule } from 'vue'
  const css = useCssModule('zs')
  console.log('css', css)
</script>
<style module="zs">
  .red { color: red;}
  .border{border: 1px solid #ccc;}
</style>
```

[⬆ back to top](#top)

> References
- [单文件组件 CSS 功能-official](https://cn.vuejs.org/api/sfc-css-features.html#scoped-css)
- [小满zs-csdn博客](https://blog.csdn.net/qq1195566313/category_11618172.html)
- [学习Vue3 第三十三章（css Style完整新特性））](https://xiaoman.blog.csdn.net/article/details/124754590)
