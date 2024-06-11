<template>
  <div class="outer">
    <h3>App component</h3>
    <br>
    <Modal/>
  </div>
</template>

<script lang="ts" setup name="App">
  import Modal from './Modal.vue'
</script>
  
<style scoped>
  .outer {
    background-color: #ddd;
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0 0 10px;
    width: 400px;
    height: 400px;
    margin: 0 auto;
    margin-top: 30px;
    filter: saturate(0%); /*此样式就导致position:fixed不会以浏览器窗口为基准了 */
  }
</style>