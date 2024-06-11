<template>
  <div class="app">
    <h4>Message: {{ msg }}</h4>
    <input type="text" v-model="msg">
  </div>
</template>

<script lang="ts" setup name="App">
  import useMsgRef from './useMsgRef.ts'
  // let msg = ref('')
  let msg = useMsgRef('', 1000)
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