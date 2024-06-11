<template>
  <button @click="isShow = true">点击弹窗</button>
  <teleport to='body'>
    <div class="container" v-show="isShow">
      <h4>显示内容</h4>
      <button @click="isShow = false">关闭弹窗</button>
    </div>
  </teleport>
</template>

<script lang="ts" setup name="Modal">
  import { ref } from 'vue'
  let isShow = ref(false)
</script>
  
<style scoped>
  .container {
    background-color: skyblue;
    border-radius: 10px;
    width: 200px;
    height: 200px;
    padding: 5px;
    box-shadow: 0 0 10px;
    position: fixed;
    right: 30px;
    top: 30px;
  }
</style>
