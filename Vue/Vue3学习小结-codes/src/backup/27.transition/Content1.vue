<template>
  <div class="content">
    <button @click="flag = !flag">Switch</button>
    <br><br>
    <transition name="fade">
      <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<script lang="ts" setup name="Content">
  import { ref, reactive } from 'vue'
  let flag = ref<boolean>(true)
</script>
  
<style scoped>
  .box {
    width: 200px;
    height: 200px;
    background: red;
  }
  .fade-enter-from {
    width: 0;
    height: 0;
    transform: rotate(360deg);
  }
  .fade-enter-active {
    transition: all 1.5s ease;
  }
  .fade-enter-to {
    width: 200px;
    height: 200px;
  }
  .fade-leave-from {
    width: 200px;
    height: 200px;
  }
  .fade-leave-active {
    transition: all 5s ease;
  }
  .fade-leave-to {
    width: 0;
    height: 0;
    transform: rotate(360deg);
  }
  .content {
    border: 1px solid #ddd;
    height: 500px;
    margin: 10px;
    padding: 10px;
  }
</style>

