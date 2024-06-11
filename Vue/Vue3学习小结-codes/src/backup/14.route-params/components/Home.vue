<template>
  <div class="home">
    <img src="https://images.dog.ceo//breeds//pembroke//n02113023_13200.jpg" alt=""/>
  </div>
</template>

<script lang="ts" setup name="Home">
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter();
  // onMounted(() => {
  //   setTimeout(() => {
  //     router.push('/news')
  //   }, 3000)
  // })
</script> 

<style scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>