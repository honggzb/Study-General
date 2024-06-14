<template>
  <div class="content">
    <button @click="flag = !flag">Switch</button>
    <br><br>
    <!-- JavaScript 钩子 -->
    <transition 
      @before-enter="EnterFrom"
      @enter="EnterActive"
      @after-enter="EnterTo"
      @enter-cancelled="EnterCancel"
      :css="false">
        <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<script lang="ts" setup name="Content">
  import { ref, reactive } from 'vue'
  let flag = ref<boolean>(true)
  const EnterFrom = (el: Element) => {
    console.log('进入之前')
  }
  const EnterActive = (el: Element, done: Function) => {
    console.log('过渡曲线')
    setTimeout(() => {
      done()
    }, 3000)
  }
  const EnterTo = (el: Element) => {
    console.log('过渡完成')
  }
  const EnterCancel = (el: Element) => {
    console.log('过度效果被打断')
  }
</script>
  
<style scoped>
  .box {
    width: 200px;
    height: 200px;
    background: red;
  }
  .content {
    border: 1px solid #ddd;
    height: 500px;
    margin: 10px;
    padding: 10px;
  }
</style>

