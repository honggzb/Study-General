<template>
  <!-- <div :class="[zs.div, zs.border]"> -->
  <div :class="[$style.div, $style.border]">
    CSS Modules
  </div>
</template>

<script lang="ts" setup name="App">
  import { ref, useCssModule } from 'vue'
  const css = useCssModule('zs')
  console.log('css', css)
</script>

<!-- <style module="zs">
  .div {
    color: red;
  }
  .border {
    border: 1px solid #ccc;
  }
</style> -->

<style module>
  .div {
    color: red;
  }
  .border {
    border: 1px solid #ccc;
  }
</style>

