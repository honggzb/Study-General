<template>
  <main>
    <Header />
    <NavSwiper />
    <div ref="target">
      <NewGoodCourse v-if='targetIsVisible'></NewGoodCourse>
    </div>
    <Foot/>
  </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import Header from '../components/common/Header.vue'
import Foot from '../components/common/Foot.vue'
import NavSwiper from '../components/home/NavSwiper.vue'
// import NewGoodCourse from '../components/home/NewGoodCourse.vue'

const NewGoodCourse = defineAsyncComponent(() =>
  import('../components/home/NewGoodCourse.vue')
)
const target = ref(null);
const targetIsVisible = ref(false);
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
  	if( isIntersecting ) {
  		targetIsVisible.value = isIntersecting
  	}
  },
)
</script>
