<template>
  <div v-move class="box">
    <div class="header">Header</div>
    <div>Content</div>
  </div>
</template>

<script lang="ts" setup name="App">
  import { ref } from 'vue'
  import type { Directive, DirectiveBinding } from 'vue'
  //自定义拖拽指令
  const vMove:Directive<any, void> = (el: HTMLElement, binding: DirectiveBinding) => {
    let moveElement:HTMLElement = el.firstElementChild as HTMLDivElement;
    console.log(moveElement)
    const mouseDown = (e: MouseEvent) => {
      let X = e.clientX - el.offsetLeft
      let Y = e.clientY - el.offsetTop
      const move = (e:MouseEvent) => {
        //console.log(e)
        el.style.left = e.clientX - X + 'px'
        el.style.top = e.clientY - Y + 'px'
        console.log(e.clientX, e.clientY, "---改变");
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
      })
    }
    moveElement.addEventListener('mousedown', mouseDown)
  }
</script>

<style scoped lang="less">
  .box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border: 3px solid black;
    .header {
      height: 20px;
      background: black;
      cursor: move;
      color: white;
    }
  }
</style>
