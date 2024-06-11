<template>
  <div class="person">
    <h2>Name: {{name}}</h2>
    <h2>Age: {{age}}</h2>
    <!-- <button @click="showTel">Check out Tel</button> -->
    <button @click="showName">Check out Name</button>
  </div>
</template>

<!-- <script lang="ts">
  export default {
    name: 'Person', 
  }
</script> -->

<script lang="ts" setup name="Person">
  // setup中的this是undefined
  let name = 'zhang san';   //此时的数据不是响应式的
  let age = 18;
  let tel = '111111111';
  function showName() {
    name = '张三'
    alert(name);
  }
</script> 

<style scoped>
  .person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
  }
</style>