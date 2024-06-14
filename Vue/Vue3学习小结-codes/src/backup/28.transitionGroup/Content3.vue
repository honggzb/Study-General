<template>
  <div>
    <!-- 状态过渡 -->
    <input step="20" v-model="num.current" type="number" />
    <br><br>
    <div>{{ num.tweenedNumber.toFixed(0) }}</div>
  </div>
</template>

<script lang="ts" setup name="Content">
  import { ref, reactive, watch } from 'vue'
  import gsap from 'gsap'
  const num = reactive({
    tweenedNumber: 0,
    current: 0
  })
  watch(() => num.current, (newVal) => {
    gsap.to(num, {
      duration: 1,
      tweenedNumber: newVal
    })
  })
</script>
  
<style scoped>

</style>

