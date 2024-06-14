<template>
  <div class="content">
    <button @click="flag = !flag">Switch</button>
    <br><br>
    <!-- 自定义过渡class类名 -->
    <transition 
      :duration="{enter: 50, leave: 500}" 
      leave-active-class="animate__animated animate__bounce" 
      enter-active-class="animate__animated animate__flash">
      <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<script lang="ts" setup name="Content">
  import { ref, reactive } from 'vue'
  import 'animate.css'
  let flag = ref<boolean>(true)
</script>
  
<style scoped>
  .box {
    width: 200px;
    height: 200px;
    background: red;
  }
  .content {
    border: 1px solid #ddd;
    height: 500px;
    margin: 10px;
    padding: 10px;
  }
</style>

