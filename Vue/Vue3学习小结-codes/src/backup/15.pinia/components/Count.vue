<template>
  <div class="count">
		<h2>当前求和为：{{ countStore.sum }}</h2>
    <h2>{{ countStore.school }} 坐落于 {{ countStore.address }}</h2>
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
  import { useCountStore } from '../store/count.ts'
  // 调用useXxxxxStore得到对应的store
  const countStore = useCountStore()
  // 以下两种方式均可拿到state中的数据
  // console.log('@@@', countStore.sum)
  // console.log('@@@ $state', countStore.$state.sum)
  // 批量修改
  // countStore.$patch({
  //   sum: 999,
  //   school:'美丽的学校',
  //   address: 'new address'
  // })
  //let sum = ref(1) 
  let n = ref(1)     // 用户选择的值
  function add() {
    //return sum.value += n.value
    //return countStore.sum += n.value
    countStore.increment(n.value)
  }
  function minus() {
    //return sum.value -= n.value
    return countStore.sum -= n.value
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