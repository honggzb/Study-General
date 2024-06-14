<template>
  <div class="content">
    <button @click="flag = !flag">Switch</button>
    <br><br>
    <!-- 使用 GSAP 库执行动画的一个示例 -->
    <transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
      :css="false">
        <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<script lang="ts" setup name="Content">
  import { ref, reactive } from 'vue'
  import gsap from 'gsap'
  let flag = ref<boolean>(true)
  function onBeforeEnter(el) {
    gsap.set(el, {
      scaleX: 0.25,
      scaleY: 0.25,
      opacity: 1
    })
  }
    
  function onEnter(el, done) {
    gsap.to(el, {
      duration: 1,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      ease: 'elastic.inOut(2.5, 1)',
      onComplete: done
    })
  }

  function onLeave(el, done) {
    gsap.to(el, {
      duration: 0.7,
      scaleX: 1,
      scaleY: 1,
      x: 300,
      ease: 'elastic.inOut(2.5, 1)'
    })
    gsap.to(el, {
      duration: 0.2,
      delay: 0.5,
      opacity: 0,
      onComplete: done
    })
  }
</script>
  
<style scoped>
  .box {
    width: 200px;
    height: 200px;
    background: red;
  }
  .content {
    border: 1px solid #ddd;
    height: 500px;
    margin: 10px;
    padding: 10px;
  }
</style>

