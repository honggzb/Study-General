<template>
  <div class="child">
    <h3>Child component</h3>
    <GrandChild />
  </div>
</template>

<script lang="ts" setup name="Child">
  import GrandChild from './GrandChild.vue'
</script> 

<style scoped>
  .child {
    background-color: skyblue;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
  }
</style>