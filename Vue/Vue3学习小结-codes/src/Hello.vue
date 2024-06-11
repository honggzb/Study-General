<template>
  <div class="container">
    <h4>Hello component {{x}}</h4>
  </div>
</template>

<script lang="ts" setup name="Hello">
</script>
  
<style scoped>
  .container {
    background-color: orange;
    border-radius: 10px;
    width: 90%;
    padding: 5px;
    box-shadow: 0 0 10px;
  }
</style>
