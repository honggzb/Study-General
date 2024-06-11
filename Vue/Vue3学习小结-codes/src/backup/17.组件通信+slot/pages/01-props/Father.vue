<template>
  <div class="father">
    <h4>Father component</h4>
    <h5> 父组件内的值： {{ car }} </h5>
    <h5 v-show="toy">子传给父的值： {{ toy }}</h5>
    <Child :car="car" :sendToy="getToy" />
  </div>
</template>

<script lang="ts" setup name="Father">
  import Child from './Child.vue'
  import { ref } from 'vue'
  // data of father component
  let car = ref('奔驰')
  let toy = ref('')
  // 方法
  function getToy(value: string){
    console.log('Father', value)
		toy.value = value
	}
</script> 

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
    padding: 30px;
  }
</style>