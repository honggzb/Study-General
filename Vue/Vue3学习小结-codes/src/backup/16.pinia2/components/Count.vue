<template>
  <div class="count">
		<h2>当前求和为：{{ sum }}, 放大10倍后为： {{ bigSum }}</h2>
    <h2>{{ school }} 坐落于 {{ upperSchool }}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="minus">减</button>
	</div>
</template>

<script lang="ts" setup name="Count">
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useCountStore } from '../store/count.ts'
  // 调用useXxxxxStore得到对应的store
  const countStore = useCountStore() 
  const {sum, school, address, bigSum, upperSchool } = storeToRefs(countStore)
  let n = ref(1)     // 用户选择的值
  function add() {
    //return sum.value += n.value
    //return countStore.sum += n.value
    //countStore.increment(n.value)
    sum.value += n.value
  }
  function minus() {
    //return sum.value -= n.value
    sum.value -= n.value
  }
</script>

<style scoped>
  .count {
    margin: 0 auto;
    margin-top: 30px;
    background-color: skyblue;
    padding: 10px;
    border-radius: 10px;
    width: 90%;
    border: 1px solid;
  }
  select, button {
    margin: 0 5px;
    height: 25px;
  }
</style>