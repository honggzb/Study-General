<template>
  <div class="container">
    <h4>Child component</h4>
    <h5>Sum: {{sum}}</h5>
  </div>
</template>

<script lang="ts" setup name="Child">
  import { ref } from 'vue'
  import axios from 'axios'

  let sum = ref(0)
  // 子组件内使用可以直接使用await, setup()的组件支持async，返回一个Promise, 但是async setup()的组件的呈现必须要使用Suspense包裹
  const {data:{content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
  console.log(content, 'content')
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
