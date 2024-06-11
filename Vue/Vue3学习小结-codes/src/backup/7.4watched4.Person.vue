<template>
  <div class="person">
    <h1>情况三：监视【reactive】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>第一量车：{{ person.car.c1 }}</h2>
    <h2>第二量车：{{ person.car.c2 }}</h2>
    <h2>车信息：{{ person.car.c1 }} - {{ person.car.c2 }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一量车</button>
    <button @click="changeC2">修改第二量车</button>
    <button @click="changeCar">修改车</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { reactive, watch } from 'vue';
  let person = reactive({
    name: '张三',
    age: 19,
    car: {
      c1: '奔驰',
      c2: '宝马'
    }
  })

  function changeName(){
    person.name+= '~'
  }
  function changeAge(){
    person.age += 1
  }
  function changeC1(){
    person.car.c1 = '吉利'
  }
  function changeC2(){
    person.car.c2 = '奇瑞'
  }
  function changeCar(){
    person.car = {c1: '哈佛', c2: '长安'}
  }
  // 监视，情况四：若该属性值不是【对象类型】，需写成函数形式
  watch(()=> person.name, (newv, oldv) => {
    console.log('名字变了', newv, oldv)
  })
  
  // 监视，情况四：若该属性值是【对象类型】，可以直接编写
  // 因为reactive定义的响应式对象person，所以car也是响应式对象，那么监视person.car就相当于reactive定义的一个car,默认开启深度监视，当修改c1和c2的时候，会监视到，但是当修改整个car，就相当于car的指针换了地址，原对象不变，所以changeCar不会触发监视，所以建议写成函数
  // watch(person.car, (nv, oldv)=>{
  //   console.log('车变了', nv, oldv)
  // })

  // 监视，情况四：若该属性值是【对象类型】，建议写成函数 
  // 函数返回值是car的空间地址，对空间地址进行监视，则修改car的指针，会触发，但是内部属性变化，不会触发， 需要手动开启深度监听
  watch(()=>person.car, (nv, oldv)=>{
    console.log('车变了', nv, oldv)
  },{ deep: true})

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