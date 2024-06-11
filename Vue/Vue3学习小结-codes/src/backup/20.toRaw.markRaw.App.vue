<template>
  <div class="app">
    <h4>Name: {{ person.name }}</h4>
    <h4>Age: {{ person.age }}</h4>
    <h4>Age in toRaw: {{ rawPerson.age }}</h4>
    <button @click="changeAge">改变年龄</button>
    <button @click="changeAge1">改变年龄-toRaw</button>
  </div>
</template>

<script lang="ts" setup name="App">
  import {reactive, toRaw, markRaw, isReactive} from 'vue'
  import mockjs from 'mockjs'
  // 响应式对象
  let person = reactive({
    name: 'Zhang sa',
    age: 18
  })
  // 原始对象
  let rawPerson = toRaw(person)
   /* markRaw */
  let nameArr = markRaw([
    {id: '01', name: '小明'},
    {id: '02', name: '小白'},
    {id: '03', name: '小红'},
  ])
  let nameObj = reactive(nameArr)
  let mockjs1 = markRaw(mockjs)

  console.log(isReactive(person)) // true
  console.log(isReactive(rawPerson)) // false
  console.log(isReactive(nameArr))  // false
  console.log(isReactive(nameObj))  // false
  function changeAge() {
    person.age += 1
  }
  function changeAge1() {
    person1.age += 1
  }
  console.log(mockjs1)
</script>
  
<style scoped>
  .app {
    background-color: skyblue;
    margin: 0 auto;
    margin-top: 30px;
    width: 90%;
    padding: 10px;
  }
  button {
    margin: 3px;
  }
</style>