<template>
  <div class="person">
    <h2>name: {{person.name}}</h2>
    <h2>age: {{person.age }}</h2>
    <button @click="changeName">change Name</button>
    <button @click="changeAge">change Age</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { reactive, toRefs } from 'vue';
  let person = reactive({
    name: 'Zhang san',
    age: 19
  });
  let { name, age } = toRefs(person)
  console.log(name)
  console.log(age)
  function changeName() {
    //person.name = 'Li si'
    name.value = 'toRefs'
  }
  function changeAge() {
    //person.age += 1
    age.value += 1
  }
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