<template>
  <div class="person">
    <h2>情况二：监视【ref】定义的【对象类型】数据</h2>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改人</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref, watch } from 'vue';
  let person = ref({
    name: '张三',
    age: 19
  })

  function changeName(){
    person.value.name+= '~'
  }

  function changeAge(){
    person.value.age += 1
  }

  function changePerson(){
    person.value = { name: '李四', age: 90}
  }
  /* 监视，情况二：监视【ref】定义的【对象类型】数据，监视的是对象的地址值，若想监视对象内部的属性，需要收到开启深度监视
    watch的第一个参数是：被监视的数据
    watch的第二个参数是：监视的回调
    watch的第三个参数是：配置对象（deep,immediate等等..）
  */
  watch(person, (newv, oldv) => {
    console.log('名字变了', newv, oldv)
  }, {deep:true, immediate: true})
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