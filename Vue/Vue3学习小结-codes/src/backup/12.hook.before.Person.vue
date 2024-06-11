<template>
  <div class="person">
    <h2>当前值为{{ num }}</h2>
    <button @click="changeSum">点击加1</button>
    <hr>
    <img v-for="dog in dogList" :src="dog" :key="index">
    <br>
    <button @click="getDog">添加一只狗</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref, reactive } from 'vue'
  import axios from 'axios'

  let num = ref(0)
  let dogList = reactive([
    'https://images.dog.ceo//breeds//pembroke//n02113023_13200.jpg'
  ])
  function changeSum() {
    num.value += 1
  }
  async function getDog() {
    try {
      let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
      // console.log(result.data.message)
      dogList.push(result.data.message)
    } catch (error) {
      alert(error)
    }
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
  li {
    font-size: 20px;
  }
  img {
    width: 150px;
    margin-right: 10px;
  }
</style>