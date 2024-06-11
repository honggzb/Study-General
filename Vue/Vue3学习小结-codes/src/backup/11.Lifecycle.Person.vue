<template>
  <div class="person">
    <h2>当前值为{{ num }}</h2>
    <button @click="changeSum">点击加1</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue'
  let num = ref(0)
  function changeSum() {
    num.value += 1
  }
  console.log('创建 setup')

  onBeforeMount(() => {
    console.log('挂载之前 BeforeMount')
  })
  onMounted(() => {
    console.log('子-挂载完毕 Mounted')
  })
  onBeforeUpdate(() => {
    console.log('更新之前 BeforeUpdate')
  })
  onUpdated(() => {
    console.log('更新完毕 Updated')
  })
  onBeforeUnmount(() => {
    console.log('卸载之前 BeforeUnmount')
  })
  onUnmounted(() => {
    console.log('卸载完毕 Unmounted')
  })
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