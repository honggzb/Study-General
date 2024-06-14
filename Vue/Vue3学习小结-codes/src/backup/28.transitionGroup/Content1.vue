<template>
    <button @click="add">Add</button>
    <button @click="pop">Delete</button>
  <div class="content">
    <TransitionGroup
      leave-active-class="animate__animated animate__hinge" 
      enter-active-class="animate__animated animate__bounceIn">
      <div class="item" v-for="item in list">{{item}}</div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup name="Content">
  import { ref, reactive } from 'vue'
  import 'animate.css'

  const list = reactive<number[]>([1,2,3,4,5])
  const add = () => {
    list.push(list.length+1)
  }
  const pop = () => {
    list.pop()
  }
</script>
  
<style scoped>
  .item {
    margin: 10px;
    font-size: 30px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    word-break: break-all;
    border: 1px solid #ccc;
  }
</style>

