<template>
  <div class="father">
    <h3>Father component</h3>
    <h5>a：{{a}}</h5>
    <h5>b：{{b}}</h5>
    <Child :a="a" :b="b" :c="c" :updateA="updateA"/>
  </div>
</template>

<script lang="ts" setup name="Father">
  import Child from './Child.vue'
  import { ref } from 'vue'

  let a = ref(1)
  let b = ref(2)
  let c = ref(3)

  function updateA(val: string) {
    a.value += val
  }
</script> 

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
    padding: 30px;
  }
</style>