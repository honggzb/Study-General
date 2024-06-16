<template>
  <div>
    <button @click="change(36)">大</button>
    <button @click="change(24)">中</button>
    <button @click="change(14)">小</button>
  </div>
  <div class="content">Content</div>
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
  .content {
    font-size: var(--size);
    height: 100px;
    margin: 5px;
    background: skyblue;
  }
  button {
    padding: 5px;
  }
</style>

