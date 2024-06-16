<template>
  <div class="dongtai">
    动态 CSS
  </div>
</template>

<script lang="ts" setup name="App">
  import { ref } from 'vue'
  const style = ref({
    color: 'red'
  })

  setTimeout(() => {
    style.value.color = 'blue'
  }, 3000)
  
</script>

<style scoped lang="less">
  .dongtai {
    color: v-bind('style.color');
  }
</style>

