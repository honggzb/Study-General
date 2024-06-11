<template>
  <div class="ground-child">
    <h3>GuandChild component</h3>
    <h5>come from Guand father a: {{a}}</h5>
    <button @click="updateA(6)">点我将爷爷那的a更新</button>
  </div>
</template>

<script lang="ts" setup name="GuandChild">
  defineProps(['a', 'b', 'c', 'updateA'])
</script> 

<style scoped>
  .ground-child {
    background-color: orange;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
  }
</style>