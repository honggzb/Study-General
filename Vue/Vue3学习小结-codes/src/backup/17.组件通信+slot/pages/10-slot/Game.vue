<template>
  <div class="game">
    <h5>热门游戏列表</h5>
    <slot :games="games">default content</slot>
  </div>
</template>

<script lang="ts" setup name="Game">
  import { reactive } from 'vue'
  let games = reactive([
    {id: 1, name: '英雄联盟'},
    {id: 2, name: '王者荣耀'},
    {id: 3, name: '红色警报'},
    {id: 4, name: '斗罗大陆'},
  ]);
</script> 

<style scoped>
  .game {
    background-color: skyblue;
    border-radius: 10px;
    box-shadow: 0 0 10px black;
    padding: 10px;
    margin-top: 30px;
    width: 200px;
    height: 300px;
  }
  h5 {
    background-color: orange;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
  }
</style>