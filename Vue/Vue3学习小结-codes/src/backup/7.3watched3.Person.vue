<template>
  <div class="person">
    <h1>情况三：监视【reactive】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改人</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { reactive, watch } from 'vue';
  let person = reactive({
    name: '张三',
    age: 19
  })

  function changeName(){
    person.name+= '~'
  }
  function changeAge(){
    person.age += 1
  }
  function changePerson(){
    person = Object.assign(person, { name: '李四', age: 90})
  }
  
  // 监视，情况三：监视【reactive】定义的【对象类型】数据，且默认是开启深度监视的
  watch(person, (nv, oldv)=>{
    console.log('名字变了', nv, oldv)
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