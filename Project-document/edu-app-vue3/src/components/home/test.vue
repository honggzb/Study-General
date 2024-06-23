<template>
  <div>
    <h1>A组件</h1>
      {{ list }} 
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'
  let list = ref([]);
  let res = await axios.get('http://testapi.xuexiluxian.cn/api/slider/getSliders');
    list.value = res.data.data.list
</script>

父组件

<Suspense>
  <template #default>
    <A></A>
  </template>
    <template #fallback>
            加载中...
    </template>
  </Suspense>
  <div ref="target">
    <C v-if="targetIsVisible"></C>
  </div> -->

<script setup>
import {defineAsyncComponent} from 'vue'
const A = defineAsyncComponent(()=>import('./A.vue'))
const C = defineAsyncComponent(()=>import('./C.vue'))
const target = ref(null)
    const targetIsVisible = ref(false);
    const {stop} = useIntersectionObserver(target,([{isIntersecting}])=>{ //用户访问到了target 元素时才加载C组件
        console.log(isIntersecting)
        if(isIntersecting) targetIsVisible.value = isIntersecting
    })
</script>