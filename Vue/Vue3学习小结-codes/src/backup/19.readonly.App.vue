<template>
  <div class="app">
    <h4>Sum1: {{ sum1 }}</h4>
    <h4>Sum2: {{ sum2 }}</h4>
     <button @click="changeSum1">改变sum1总和</button>
      <button @click="changeSum2">改变sum2总和</button>
  </div>
</template>

<script lang="ts" setup name="App">
  import { ref, readonly } from 'vue'

  let sum1 = ref(0)
  let sum2 = readonly(sum1)

  function changeSum1() {
    sum1.value += 1
  }
  function changeSum2() {
    sum2.value += 1
  }
</script>
  
<style scoped>
  .app {
    background-color: skyblue;
    margin: 0 auto;
    margin-top: 30px;
    width: 90%;
    padding: 10px;
  }
  button {
    margin: 3px;
  }
</style>