<template>
  <div>
    <button @click="flag = !flag">切换</button>
    <br><br>
    <A v-if="flag" v-move:aaa.xiaoman="{background: 'skyblue', flag: flag}"/>
  </div>
</template>

<script lang="ts" setup name="App">
  import { ref } from 'vue'
  import A from './A.vue'

  let flag = ref<boolean>(true)
  type Dir = {
    background: string
  }

  const vMove = {
    created: () => {
      console.log("create 初始化====>");
    },
    beforeMount(...args: Array<any>) {
      // 在元素上做些操作
      console.log("beforeMount 初始化一次=======>");
    },
    mounted(el: any, dir: DirectiveBinding<Dir>) {
      el.style.background = dir.value.background
      console.log("mounted 初始化========>")
      console.log(dir.value.background)
    },
    beforeUpdate() {
      console.log("beforeUpdate 更新之前");
    },
    updated() {
      console.log("updated 更新结束");
    },
    beforeUnmount(...args: Array<any>) {
      console.log(args);
      console.log("beforeUnmount ======>卸载之前");
    },
    unmounted(...args: Array<any>) {
      console.log(args);
      console.log("unmounted ======>卸载完成");
    },
  }
</script>

<style scoped>
</style>
