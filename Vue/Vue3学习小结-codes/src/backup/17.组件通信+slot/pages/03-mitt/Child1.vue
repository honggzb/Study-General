<template>
  <div class="child">
    <h4>Child component 1</h4>
    <h5> 子组件1内的值： {{ toy }} </h5>
    <button @click="emitter.emit('send-toy', toy)">传递数据</button>
  </div>
</template>

<script lang="ts" setup name="Child1">
 import { ref } from 'vue'
 import emitter from '../../utils/emitter.ts'

 let toy = ref('玩具熊')
</script> 

<style scoped>
  .child {
    background-color: skyblue;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
  }
</style>