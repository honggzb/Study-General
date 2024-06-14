<template>
  <div class="content">
    <button @click="flag = !flag">Switch</button>
    <br><br>
    <!-- appear属性 -->
    <transition
      appear
      appear-active-class="animate__animated animate__bounceOut"
      appear-from-class="from"
      appear-to-class="to">
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
  .from {
    width: 0px;
    height: 0px;
  }
  .active {
    transition: all 2s ease;
  }
  .to {
    width: 200px;
    height: 200px;
  }
</style>

