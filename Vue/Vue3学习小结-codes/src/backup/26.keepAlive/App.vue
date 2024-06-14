<template>
  <el-button type="primary" @click="flag = !flag">切换组件</el-button>
  <!-- 只缓存A -->
  <!-- <KeepAlive :include="[A]"> -->
  <KeepAlive>
    <A v-if="flag"> </A>
    <B v-else> </B>
  </KeepAlive>
</template>

<script lang="ts" setup name="App">
  import { ref } from 'vue' 
  import A from './A.vue'
  import B from './B.vue'

  const flag = ref<boolean>(true)
</script>

<style scoped>
</style>
