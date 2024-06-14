<template>
  <div>
    <img id="img" width="300" height="300" src="./assets/images/piNxLo4.jpg" />
  </div>
</template>

<script lang="ts" setup name="App">
  import { ref } from 'vue'
  import useBase64 from './useBase64.ts'

  useBase64({ el: '#img' }).then(res => {
    console.log(res.Baseurl)
  })
</script>

<style scoped lang="less">
</style>

