<template>
  <div class="app">
    <h4>Sum: {{ sum }}</h4>
    <h4>Name: {{ person.name }}</h4>
    <h4>Age: {{ person.age }}</h4>
    <button @click="changeSum">改变总和</button>
    <button @click="changeName">改变姓名</button>
    <button @click="changeAge">改变年龄</button>
    <button @click="changePerson">改变某人的信息</button>
    <br>
    <h4>车品牌: {{ car.brand }}</h4>
    <h4>车颜色: {{ car.options.color }}</h4>
    <h4>车引起: {{ car.options.engine }}</h4>
    <button @click="changeBrand">改变车品牌</button>
    <button @click="changeColor">改变车颜色</button>
    <button @click="changeEngine">改变车引起</button>
  </div>
</template>

<script lang="ts" setup name="App">
  import {shallowRef, shallowReactive, reactive } from 'vue'

  let sum = shallowRef(0)
  let person = shallowRef({
    name: 'Zhang sa',
    age: 18
  })
  let car = shallowReactive({
    brand: '奔驰',
    options: {
      color: 'red',
      engine: 'v8',
    }
  })
  function changeSum() {
    sum.value += 1
  }
  // shallowRef did not work
  function changeName() {
    person.value.name = 'Lisi'
  }
  // shallowRef did not work
  function changeAge() {
    person.value.age += 1
  }
  function changePerson() {
    person.value = { name: 'tony', age: 50 }
  }
  /* ********************************* */
  function changeBrand() {
    car.brand = '野马'
  }
  // shallowReactive did not work
  function changeColor() {
    car.options.color = 'white'
  }
  // shallowReactive did not work
  function changeEngine() {
    car.options.engine = 'v12'
  }
  // function changeCar() {
  //   Object.assign(car, {})
  // }
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