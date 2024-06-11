<template>
  <div class="app">
    <Count/>
    <LoveTalk/>
  </div>
</template>

<script lang="ts" setup name="App">
  import Count from './components/Count.vue'
  import LoveTalk from './components/LoveTalk.vue'
</script>
  
<style scoped>
  .app {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
    width: 90%;
    border: 1px solid;
  }
</style>