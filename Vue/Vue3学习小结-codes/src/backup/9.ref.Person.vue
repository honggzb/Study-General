<template>
  <div class="person">
    <h3>哈哈</h3>
    <h3 ref="test">呵呵呵呵</h3>
    <button @click="showLog">修改高度</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref, defineExpose } from 'vue';
  let test = ref();
  function showLog() {
    console.log(test.value)    //<h3 rdata-v-4cadc14e>呵呵呵呵</h3>
  }
  let a = ref(0)
  let b = ref(2)
  let c = ref(3)
  // 要想父组件访问子组件的数据，必须使用defineExpose 导出想要被访问的数据
  defineExpose({a, b, c})
</script> 

<style scoped>
  .person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
  }
  button {
    margin: 0 5px;
  }
  ul {

  }
</style>