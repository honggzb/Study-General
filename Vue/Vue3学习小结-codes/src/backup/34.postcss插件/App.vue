<template>
  <div>
    <header>
      <div>left</div>
      <div>center</div>
      <div>right</div>
    </header>
  </div>
  <div>
    <button @click="change(36)">大</button>
    <button @click="change(24)">中</button>
    <button @click="change(14)">小</button>
  </div>
</template>

<script lang="ts" setup name="App">
  import { reactive, ref } from 'vue'
  import { useCssVar } from '@vueuse/core'

  localStorage.setItem('fontSize', '14px')
  const change = (str: number) => {
    //localStorage.setItem('fontSize', fontDaxiao)
    // traditional method
    //document.documentElement.style.getPropertyValue('--size')
    document.documentElement.style.setProperty('--size', str + 'px');
    const fontSet = document.documentElement.style.getPropertyValue('--size');
    let fontNow = localStorage.getItem('fontSize') as string
    if(fontNow !== fontSet) {
      localStorage.setItem('fontSize', fontSet)
    }
    // vueuse method
    // const color = useCssVar('--size')
    // color.value = `${str}px`
  }
</script>

<style scoped lang="less">
  :root {
    --size: 14px;
  }
  header {
    display: flex;
    justify-content: space-between;
  
    div {
      height: 50px;
      color: white;
      text-align: center;
      line-height: 50px;
      font-size: var(--size);
    }

    div:nth-child(1) {
      width: 100px;
      background: red;
    }

    div:nth-child(2) {
      flex: 1;
      background: green;
    }

    div:nth-child(3) {
      width: 100px;
      background: blue;
    }
  }
  button {
    padding: 5px;
  }
</style>

