<template>
  <div class="person">
    <ul>
      <li v-for="p in list" :key="p.id">
        {{ p.name }} - {{ p.age }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { defineProps, withDefaults } from 'vue';
  import { type Persons} from '../types/index'
  // 1. 默认接收props数据
  // defineProps(['list'])
  /*
  *   2. 加入ts之后的props
  */
  // 2-1. defineProps可以加ts限制传入的值的类型
  //  defineProps函数有返回值，返回所接收的props的集合
  // let c = defineProps<{list:Persons,a:string}>()
  // console.log(c.list, 'cc')

  // 2-2. 接收传入的值，+限制类型， +必填项， +默认值
  // ts的?限制是否必填
  // withDefaults设置默认值
  withDefaults(defineProps<{list?: Persons}>(), {
    list: () => [{id: 'sdadsa', name: '这是默认de', age: 99}]    //必须是函数
  })
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