<template>
  <div>
    <h3>我是A组件 插槽</h3>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="A">
  import { reactive } from 'vue'
</script>
  
<!-- <style scoped lang="less">
 :slotted(.aa) {
  color: red;
 }
</style> -->

