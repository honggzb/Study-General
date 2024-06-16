<template>
  <main>
    <el-input placeholder="test codes" class="ipt"></el-input>
  </main>
</template>

<script lang="ts" setup name="App">
  import { ref } from 'vue'
</script>

<style scoped lang="less">
  .ipt {
    width: 300px;
    margin: 100px 400px;
    :deep(.el-input__inner) {
      background: red;
    }
  }
</style>

