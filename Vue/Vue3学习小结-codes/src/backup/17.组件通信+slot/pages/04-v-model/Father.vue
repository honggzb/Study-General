<template>
  <div class="father">
    <h3>Father component</h3>
    <h5>UserName: {{ username }}</h5>
    <h5>Password: {{ password }}</h5>
    <!-- v-model用在html标签上 -->
    <!-- <input type="text" v-model="username"> -->
    <!-- <input type="text" :value="username" @input="username=(<HTMLInputElement>$event.target).value"> -->
    <!-- v-model用在组件标签上 -->
    <!-- <TestInput v-model="username"/> -->
    <!-- 修改ModelValue -->
    <TestInput v-model:yonghu="username" v-model:mima="password"/>
  </div>
</template>

<script lang="ts" setup name="Father">
  import { ref } from 'vue'
  import TestInput from './TestInput.vue'

  let username = ref('zhangsan')
  let password = ref('12334451')
</script> 

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
    padding: 30px;
  }
</style>