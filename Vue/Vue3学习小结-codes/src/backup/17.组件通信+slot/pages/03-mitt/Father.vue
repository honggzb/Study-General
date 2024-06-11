<template>
  <div class="father">
    <h4>Father component</h4>
    <Child1/>
    <Child2/>
  </div>
</template>

<script lang="ts" setup name="Father">
  import Child1 from './Child1.vue'
  import Child2 from './Child2.vue'

</script> 

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
    padding: 30px;
  }
</style>