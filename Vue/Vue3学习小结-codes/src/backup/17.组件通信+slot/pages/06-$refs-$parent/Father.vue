<template>
  <div class="father">
    <h3>Father component</h3>
    <h5>父组件内的数字：{{ num }}</h5>
    <button @click="editToy">修改child1的玩具</button>
    <button @click="editComputer">修改child2的电脑</button>
    <button @click="editBook1">子组件内书加几本方法一</button>
    <button @click="getAllChild($refs)">子组件内书加几本方法二: 获取所有子组件的实例对象, 更改所有子组件的书籍数量</button>
    <!-- <button @click="editBook2($refs)">子组件内书加几本方法二（假如多个组件内的值修改一致）</button> -->
    <Child1 ref="c1"/>
    <Child2 ref="c2"/>
  </div>
</template>

<script lang="ts" setup name="Father">
  import { ref } from 'vue';
  import Child1 from './Child1.vue'
  import Child2 from './Child2.vue'
  let num = ref(1)
  let c1 = ref()
  let c2 = ref()
  function editToy() {
    // 响应读取组件的值，必须在组件内暴露， 父读子需要暴露，子读父也需要暴露
    c1.value.toy = '小猪佩奇'
  }
  function editComputer(){
    c2.value.computer = '华为'
  }
  function editBook1(){
    c1.value.book += 3
    c2.value.book += 3
  }
  function getAllChild(refs: object) {
    for(let key in refs) {
      console.log(refs[key])
      refs[key].book += 3
    }
  }
  // 暴露数据
  defineExpose({num})
</script> 

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
    padding: 30px;
  }
  button {
    margin: 2px;
  }
</style>