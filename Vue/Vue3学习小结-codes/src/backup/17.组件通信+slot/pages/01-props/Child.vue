<template>
  <div class="child">
    <h4>Child component</h4>
    <h5> 子组件内的值： {{ toy }} </h5>
    <h5> 父亲传过来的值：{{ car }} </h5>
    <button @click="sendToy(toy)">将子组件的值传给父组件, 把toy交给父亲</button>
  </div>
</template>

<script lang="ts" setup name="Child">
 import { ref } from 'vue'
 let toy = ref('玩具熊')
 // recevie props
 defineProps(['car', 'sendToy'])
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