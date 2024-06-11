<template>
  <div class="father">
    <h3>Father component</h3>
    <div class="container">
      <Category>
        <template v-slot:s2>
          <ul>
            <li v-for="g in games" :key="g.id">{{g.name}}</li>
          </ul>
        </template>
        <template v-slot:s1>
          <h5>热门游戏列表</h5>
        </template>
      </Category>
      <Category>
        <template v-slot:s2>
          <img :src="imgUrl" alt="" />
        </template>
        <template v-slot:s1>
          <h5>今日美食城市</h5>
        </template>
      </Category>
      <Category>
        <template #s2>
          <video :src="videoUrl" controls />
        </template>
        <template #s1>
          <h5>今日影视推荐</h5>
        </template>
      </Category>
    </div>
  </div>
</template>

<script lang="ts" setup name="Father">
  import { reactive, ref } from 'vue'
  import Category from './Category.vue'
  let games = reactive([
    {id: 1, name: '英雄联盟'},
    {id: 2, name: '王者荣耀'},
    {id: 3, name: '红色警报'},
    {id: 4, name: '斗罗大陆'},
  ]);
  let imgUrl = ref('https://z1.ax1x.com/2023/11/19/piNxLo4.jpg')
  let videoUrl = ref('https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4')
</script> 

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
    padding: 30px;
  }
  .container {
    display: flex;
    justify-content: space-evenly;
  }
  img, video {
    width: 100%;
  }
  h5 {
    background-color: orange;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
  }
</style>