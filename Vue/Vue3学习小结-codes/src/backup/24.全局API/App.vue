<template>
  <div class="outer">
    <h3>App component {{x}}</h3>
    <br>
    <Hello />
    <Child/>
  </div>
</template>

<script lang="ts" setup name="App">
  import Child from './Child.vue'
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
  }
</style>