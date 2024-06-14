<template>
  <div class="container">
    <div 
      @click="switchtab(item, index)" 
      class="tabs" :class="[active === index ? 'active' : '']" 
      v-for="(item, index) in data">
    <div>{{item.name}}</div>
    </div>
  </div>
  <component :is="comId"></component>
</template>

<script lang="ts" setup name="App">
  import { ref, reactive, shallowRef } from 'vue' 
  
  let comId = shallowRef('AVue')
  const active = ref(0)
  const data = reactive([
    { name: 'A组件', com: 'AVue' },
    { name: 'B组件', com: 'BVue' },
    { name: 'C组件', com: 'CVue' },
  ])
  const switchtab =(item, index) => {
    comId.value = item.com
    active.value = index
  }
</script>

<script lang="ts">
  import AVue from './A.vue'
  import BVue from './B.vue'
  import CVue from './C.vue'

  export default {
    components: { AVue, BVue, CVue }
  }
</script>
  
<style scoped>
  .container {
    display: flex;
  }
  .tabs {
    border: 1px solid #ccc;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
  }
  .active { 
    background-color: skyblue;
  }
</style>
