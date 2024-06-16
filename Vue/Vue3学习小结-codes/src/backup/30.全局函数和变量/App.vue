<template>
  <div>{{ $env}}</div>
  <div>{{$filters.format(' plane')}}</div>
</template>

<script lang="ts" setup name="App">
  import { ref,  getCurrentInstance } from 'vue'

  const app = getCurrentInstance()
  console.log(app.proxy.$filters.format('ts'))
  
</script>

<style scoped lang="less">
</style>

