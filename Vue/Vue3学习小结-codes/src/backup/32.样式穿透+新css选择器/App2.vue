<template>
  <div>
    <A>
      <div class="aa">私人定制div</div>
    </A>
  </div>
</template>

<script lang="ts" setup name="App">
  import A from './A.vue'
</script>

<style scoped lang="less">
  :global(.aa) {
    color: red;
  }
</style>

