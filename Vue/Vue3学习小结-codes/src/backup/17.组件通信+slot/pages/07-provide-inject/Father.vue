<template>
  <div class="father">
    <h3>Father component</h3>
    <h5>mondy:  {{money }}万元</h5>
    <h5>车子： 一辆{{ car.brand }}车，价值{{ car.price }}万元</h5>
    <!-- <button @click="updateMoney(100)">给子孙多加100万元</button> -->
    <Child/>
  </div>
</template>

<script lang="ts" setup name="Father">
  import Child from './Child.vue'
  import { ref, reactive, provide } from 'vue'
  let money = ref(100)
  let car = reactive({
    brand: '奔驰',
    price: 100
  })
  function updateMoney(val: number) {
    money.value += val
  }
  // 向后代提供数据
  provide('moneyContext', {money, updateMoney})
  provide('car', car)
</script> 

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
    padding: 30px;
  }
</style>