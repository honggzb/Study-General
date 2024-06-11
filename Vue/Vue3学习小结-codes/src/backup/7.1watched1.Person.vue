<template>
  <div class="person">
    <h2>情况一：监视【ref】定义的【基本类型】数据</h2>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref, watch } from 'vue';
  let name = ref('张三')
  let age = ref(0)

  function changeName(){
    name.value += '~'
  }

  function changeAge(){
    age.value += 1
  }

  // watch(name, (newv, oldv) => {
  //   console.log('名字变了', newv, oldv)
  // })
  // 监视两个数据
  watch([name, age], (newv, oldv)=>{
    console.log('数据变了', newv, oldv)
  })
  // 停止监视 stopWatch(), 注意：数值还会继续变化
  // 返回一个函数，当年龄等于5以后，停止监视，即调用返回函数即可
  const stopWatch = watch(age, (newv, oldv)=>{
    console.log('年龄变了', newv, oldv)
    if(newv === 5){
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