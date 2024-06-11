<template>
  <div class="outer">
    <h3>App component</h3>
    <br>
    <Suspense>
      <!-- 插槽的形式： default默认是展示要显示的组件内容 -->
      <!-- <template #default> -->
        <Child />
      <!-- </template> -->
      <!-- fallback表示发送请求过程中展示的内容 -->
      <template #fallback>
        <h2>loading...</h2>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts" setup name="App">
  import { Suspense } from 'vue'
  import Child from './Child.vue'
</script>
  
<style scoped>
  .outer {
    background-color: #ddd;
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0 0 10px;
    width: 400px;
    height: 400px;
    margin: 0 auto;
    margin-top: 30px;
  }
</style>