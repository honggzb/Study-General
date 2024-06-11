<template>
  <div class="child">
    <h3>Child component 2</h3>
    <h4>Data in Child component 2</h4>
    <h5>电脑：{{ computer }}</h5>
    <h5>书籍：{{ book }} 本</h5>
  </div>
</template>

<script lang="ts" setup name="Child2">
  import { ref } from 'vue';
  let computer = ref('联想')
  let book = ref(6)
  defineExpose({computer, book})
</script> 

<style scoped>
  .child {
    background-color: orange;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
  }
</style>