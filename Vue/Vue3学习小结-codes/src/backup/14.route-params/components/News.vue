<template>
  <div class="news">
    <ul>
      <li v-for="news in newsList" :key="news.id">
        <!-- params传参 第一种 -->
        <!-- <RouterLink :to="`/news/detail/${news.id}/${news.title}/${news.content}`">{{ news.title }}</RouterLink> -->
        <!-- params传参 第二种 -->
        <RouterLink :to="{
                        name: 'xiangqin',
                        params: {
                          id: news.id,
                          title: news.title,
                          content: news.content,
                        }
                      }"
                    >{{ news.title }}
        </RouterLink>
      </li>
      <!-- <li><a href="#">News 001</a></li>
      <li><a href="#">News 002</a></li>
      <li><a href="#">News 003</a></li>
      <li><a href="#">News 004</a></li> -->
    </ul>
    <!-- 展示区 -->
    <div class="news-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup name="News">
  import { reactive } from 'vue'
  import { RouterView, RouterLink } from 'vue-router'
  const newsList = reactive([
    {id: 'asdfsdfsdf01', title: 'title 1', content: 'fvdgsfagasfsadfs 11'},
    {id: 'asdfsdfsdf02', title: 'title 2', content: 'fvdgsfagasfsadfs 22'},
    {id: 'asdfsdfsdf03', title: 'title 3', content: 'fvdgsfagasfsadfs 33'},
    {id: 'asdfsdfsdf04', title: 'title 4', content: 'fvdgsfagasfsadfs 44'},
  ])
</script> 

<style scoped>
  .news {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 0 20px;
  }
  .news ul {
    margin-top: 30px;
    padding-left: 10px;
    list-style: none;
  }
  .news li::marker {
    color: #64967E;
  }
  .news li>a {
    font-size: 18px;
    line-height: 40px;
  }
  .news-content {
    display: flex;
    width: 100%;
  }
</style>