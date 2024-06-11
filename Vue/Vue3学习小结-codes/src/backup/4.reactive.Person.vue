<template>
  <div class="person">
    <h2>Car: {{car.name}}, price: {{car.price }}</h2>
    <hr>
    <button @click="changePrice">change Price</button>
    <h2>Hobby</h2>
    <ul>
      <li v-for="h in hobbies" :key="h.id">{{ h.name }}</li>
    </ul>
    <hr>
    <button @click="changeHobby">change first Hobby</button>
  </div>
</template>

<script lang="ts" setup name="Person">
 // 1) import reactive
  import { reactive } from 'vue';
  // 2) using ref() in data defination
  let car = reactive({name: 'benchi', price: 100})     //此时的数据不是响应式的
  let hobbies = reactive([       //此时的数据不是响应式的
    {id: '1', name: 'cigaret'},
    {id: '2', name: 'drink'},
    {id: '3', name: 'hair'},
  ]);  
  function changePrice() {
    car.price += 10
  }
  function changeHobby() {
    hobbies[0].name = 'reading'
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