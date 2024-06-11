<template>
  <div class="person">
    <h1>情况三：监视【reactive】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>第一量车：{{ person.car.c1 }}</h2>
    <h2>第二量车：{{ person.car.c2 }}</h2>
    <h2>车信息：{{ person.car.c1 }} - {{ person.car.c2 }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一量车</button>
    <button @click="changeC2">修改第二量车</button>
    <button @click="changeCar">修改车</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { reactive, watch } from 'vue';
  let person = reactive({
    name: '张三',
    age: 19,
    car: {
      c1: '奔驰',
      c2: '宝马'
    }
  })

  function changeName(){
    person.name+= '~'
  }
  function changeAge(){
    person.age += 1
  }
  function changeC1(){
    person.car.c1 = '吉利'
  }
  function changeC2(){
    person.car.c2 = '奇瑞'
  }
  function changeCar(){
    person.car = {c1: '哈佛', c2: '长安'}
  }
  // 情况五: 监视多个数据
  // watch([()=>person.name, ()=>person.car], (newv)=>{
  //   console.log('车变了', newv)
  // },{ deep: true})
  // 或者
  watch([()=>person.name, person.car], (newv)=>{
    console.log('车变了', newv)
  },{ deep: true})
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