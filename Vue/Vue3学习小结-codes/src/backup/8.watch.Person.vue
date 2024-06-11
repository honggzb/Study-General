<template>
  <div class="person">
    <h2>当温度高于60或者高度高于20，调取接口</h2>
    <h3>温度：{{ temp }}</h3>
    <h3>高度：{{ height }}</h3>
    <button @click="changeTemp">修改温度</button>
    <button @click="changeHeight">修改高度</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref, watchEffect } from 'vue';
  let temp = ref(0)
  let height = ref(0)
  function changeTemp(){
    temp.value += 10
  }
  function changeHeight(){
    height.value += 10
  }
  // 使用watch，需要指定监视谁
  // watch([temp, height], (nv)=>{
  //   const [temp, height] = nv
  //   if(temp >= 60 || height>=80){
  //     console.log('调取接口')
  //   }
  // })

  // 用watchEffect实现，不用
  //打开页面时候立刻监视
  // watchEffect(() => {
  //   console.log('打开页面时候立刻监视')
  // })
  const stopWatch = watchEffect(()=>{
    if(temp.value >= 60 || height.value >= 20){
      console.log('调取接口', temp.value, height.value )
    }
    if(temp.value === 100 || height.value === 50){
      console.log('停止监视', temp.value, height.value )
      stopWatch()
    }
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