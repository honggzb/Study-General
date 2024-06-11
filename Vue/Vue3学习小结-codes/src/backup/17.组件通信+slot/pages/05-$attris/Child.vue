<template>
  <div class="child">
    <h3>Child component</h3>
    <!-- <h5>come from father a：{{a}}</h5>
    <h5>come from father b：{{$attrs}}</h5> -->
    <GuandChild v-bind="$attrs"/>
  </div>
</template>

<script lang="ts" setup name="Child">
  import GuandChild from './GrandChild.vue'
  //defineProps(['a'])
</script> 

<style scoped>
  .child {
    background-color: skyblue;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
  }
</style>