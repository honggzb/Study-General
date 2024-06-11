<template>
  <div class="child">
    <h3>Child component</h3>
    <h4>子组件内的值： {{ toy }}</h4>
    <!-- 调用自定义事件 -->
    <button @click="emit('send-toy', toy)">传递数据</button>
  </div>
</template>

<script lang="ts" setup name="Child">
  import { ref } from 'vue'
  let toy = ref('玩具熊')
  // 声明事件
  const emit = defineEmits(['send-toy'])
</script> 

<style scoped>
  .child {
    background-color: skyblue;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
  }
</style>