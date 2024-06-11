<template>
  <div class="person">
    First Name: <input type="text" v-model="firstName"><br>
    Last Name: <input type="text" v-model="lastName">
    <br><br><br>
    Full Name: {{ fullName }}
    <br><br>
    <button @click="changeFullName">change FullName</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref, computed } from 'vue';
  let firstName = ref('Zhang')
  let lastName = ref('San')
  let fullName = computed({   //fullName是一个计算属性
      //读取就会调用
      get() {
        return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value.slice(1)
      },
      // 变化就会调用
      set(val) {
        let [str1, str2] = val.split('-')
        firstName.value = str1
        lastName.value = str2
      }
   })
  function changeFullName() {
    fullName.value = 'li-si'
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