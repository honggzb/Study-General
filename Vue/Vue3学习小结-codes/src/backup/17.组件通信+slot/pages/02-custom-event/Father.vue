<template>
  <div class="father">
    <h3>Father component</h3>
    <!-- <h4>{{ str }}</h4> 
    <button @click="test(6)"> Click me</button> -->
    <h5 v-show="toy">子传给父的值： {{ toy }}</h5>
    <!-- 给子组件绑定自定义事件 -->
    <Child @send-toy="saveToy"/>
  </div>
</template>

<script lang="ts" setup name="Father">
  import Child from './Child.vue'
  import { ref } from 'vue'
  //let str = ref('Hello')
  // function test(value: number) {
  //   console.log('test', value)
  //   str.value = 'haha'
  // }
  let toy = ref('')
  function saveToy(val: string) {
    toy.value = val
    console.log(val)
  }
</script> 

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
    padding: 30px;
  }
</style>