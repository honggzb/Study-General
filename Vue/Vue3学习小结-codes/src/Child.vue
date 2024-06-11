<template>
  <div class="container">
    <h4>Child component {{x}}</h4>
    <h4 v-beauty="sum">hahahha</h4>
    <Hello />
  </div>
</template>

<script lang="ts" setup name="Child">

</script>
  
<style scoped>
  .container {
    background-color: skyblue;
    border-radius: 10px;
    width: 90%;
    padding: 5px;
    box-shadow: 0 0 10px;
  }
</style>
