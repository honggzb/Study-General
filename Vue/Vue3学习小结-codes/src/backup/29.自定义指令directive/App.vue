<template>
  <div>
    <div>
        <div v-for="item in arr">
            <img height="500" :data-index="item" v-lazy="item" width="360" alt="">
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
import { ref, reactive } from 'vue'
import type { Directive } from 'vue'
// glob 静态输入， globEager 异步输入
const images: Record<string, { default: string }> = import.meta.glob('./assets/images/*.*', { eager: true, as: "raw" })
//const images: Record<string, { default: string }> = import.meta.globEager('./assets/images/*.*')
let arr = Object.values(images).map(v => v.default)
//图片懒加载
let vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {
    let url = await import('./assets/vue.svg')
    el.src = url.default;
    let observer = new IntersectionObserver((entries) => {
        console.log(entries[0], el)
        if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
            setTimeout(() => {
                el.src = binding.value;
                observer.unobserve(el)
            }, 2000)
        }
    })
    observer.observe(el)
}
</script>

<style scoped lang="less">
</style>
