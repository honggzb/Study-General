<template>
  <Suspense>
    <template #default> <SyncVue/> </template>
    <template #fallback> <Skeleton/> </template>
  </Suspense>
</template>

<script lang="ts" setup name="App">
  import { ref, reactive } from 'vue' 
  import Skeleton from './Skeleton.vue'
  import SyncVue from './Sync.vue'
  //const SyncVue = defineAsyncComponent(() => import('./Sync.vue'))
</script>

<style scoped>
  .container {
    display: flex;
  }
</style>
