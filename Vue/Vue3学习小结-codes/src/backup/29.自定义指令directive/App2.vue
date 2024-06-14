<template>
  <div class="btns">
    <h3>权限按钮</h3>
    <button v-has-show="'shop:create'">创建</button>
    <button v-has-show="'shop:edit'">编辑</button>
    <button v-has-show="'shop:delete'">删除</button>
  </div>
</template>

<script lang="ts" setup name="App">
  import { ref } from 'vue'
  import  type { Directive } from 'vue'
  
  localStorage.setItem('userId','xiaoman-zs')
  //mock后台返回的数据
  const permission = [
    'xiaoman-zs:shop:edit',
    // 'xiaoman-zs:shop:create',
    'xiaoman-zs:shop:delete'
  ]
  const userId = localStorage.getItem('userId') as string
  //permission
  const vHasShow: Directive<HTMLElement,string> = (el, binding) => {
    console.log(el)
    if(!permission.includes(userId+':'+binding.value)) {
      el.style.display = 'none'
    }
  }
</script>

<style scoped lang="less">
  .btns {
    button {
      margin: 5px;
      font-size: 30px;
    }
  }
</style>
