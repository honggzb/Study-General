<template>
  <div class="content">A component</div>
</template>

<script lang="ts" setup name="A">
  import { useAttrs } from 'vue'
  let attr = useAttrs()
  console.log(attr)
</script>

<style scoped>
  .content {
    height: 200px;
    width: 200px;
    border: 1px solid #ddd;
  }
</style>

