<template>
  <div class="child">
    <h3>Child component 1</h3>
    <h4>Data in Child component 1</h4>
    <h5>玩具：{{ toy }}</h5>
    <h5>书籍：{{ book }} 本</h5>
     <!-- $parent直接获取父组件实例对象 -->
    <button @click="editNum($parent)">修改父组件内的num</button>
  </div>
</template>

<script lang="ts" setup name="Child1">
  import { ref } from 'vue';
  let toy = ref('奥特曼')
  let book = ref(3)
  function editNum(par: any) {
    par.num += 1
  }
  // 把数据交给外部
  defineExpose({toy, book})
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