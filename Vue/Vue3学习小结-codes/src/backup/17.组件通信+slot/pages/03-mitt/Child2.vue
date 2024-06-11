<template>
  <div class="child">
    <h4>Child component 2</h4>
    <h5> 子组件2内的值： {{ computer }} </h5>
    <h5>哥哥给的玩具：{{ toy }}</h5>
  </div>
</template>

<script lang="ts" setup name="Child2">
 import { ref, onUnmounted } from 'vue'
 import emitter from '../../utils/emitter.ts'
 // 数据
 let computer = ref('联想')
 let toy = ref('')
 //
 emitter.on('send-toy', (val: string) => {
  console.log('send-toy')
  toy.value = val
 })
  onUnmounted(()=>{
      emitter.off('send-toy')
  })
</script> 

<style scoped>
  .child {
    background-color: orange;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
  }
</style>