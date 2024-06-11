<template>
  <div class="category">
    <slot name="s1">default content</slot>
    <slot name="s2">default content</slot>
  </div>
</template>

<script lang="ts" setup name="Category">
  defineProps(['title'])
</script> 

<style scoped>
  .category {
    background-color: skyblue;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
    width: 200px;
    height: 300px;
  }
  h5 {
    background-color: orange;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
  }
</style>