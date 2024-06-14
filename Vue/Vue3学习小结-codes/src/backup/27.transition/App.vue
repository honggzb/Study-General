<template>
  <Header/>
  <Content/>
</template>

<script lang="ts" setup name="App">
  import { ref } from 'vue' 
  import Header from './Header.vue'
  import Content from './Content.vue'

  const flag = ref<boolean>(true)
</script>

<style scoped>
</style>
