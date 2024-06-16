<template>
  <div></div>
</template>

<script lang="ts" setup name="App">
  import { ref,  getCurrentInstance } from 'vue'

  const instance = getCurrentInstance()
  console.log(instance.proxy.$loading)
  instance?.proxy?.$loading.show()
  setTimeout(() => {
    instance?.proxy?.$loading.hide()
  }, 5000)
</script>

<style scoped lang="less">
</style>

