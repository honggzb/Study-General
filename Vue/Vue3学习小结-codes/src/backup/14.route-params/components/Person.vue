<template>
  <div class="person">
    <h2>当前值为{{ num }}, 变大10倍的值是： {{ bigSum }}</h2>
    <button @click="changeSum">点击加1</button>
    <hr>
    <img v-for="dog in dogList" :src="dog" :key="index">
    <br>
    <button @click="getDog">添加一只狗</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import useSum from '../hooks/useSum.ts'
  import useDog from '../hooks/useDog.ts'

  const {num, changeSum, bigSum} = useSum()
  const {dogList, getDog} = useDog()


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