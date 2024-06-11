<template>
  <div class="person">
    <h2>Name: {{name}}</h2>
    <h2>Age: {{age}}</h2>
    <button @click="changeName">change Name</button>
    <button @click="showTel">Check out Tel</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref } from 'vue';
  // setup中的this是undefined
  let name = ref('zhang san');   //此时的数据不是响应式的
  let age = ref(18);
  let tel = '111111111';

  console.log('name', name);

  function changeName() {
    name.value = 'Li Si'
    console.log(name.value)
  }
  function showTel() {
    alert(tel);
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