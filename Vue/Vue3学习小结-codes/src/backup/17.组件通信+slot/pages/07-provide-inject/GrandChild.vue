<template>
  <div class="child">
    <h3>GrandChild component</h3>
    <h5>祖先传给我的</h5>
    <h5>money:  {{money }}万元</h5>
    <h5>车子： 一辆{{ car.brand }}车，价值{{ car.price }}万元</h5>
    <button @click="updateMoney(100)">多花100万元</button>
  </div>
</template>

<script lang="ts" setup name="GrandChild">
   import { inject } from "vue"
   let {money, updateMoney } = inject('moneyContext')
   let car = inject('car', {brand: '', price: 0})
</script> 

<style scoped>
  .child {
    background-color: orange;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
  }
</style>