<template>
  <ul class="news-list">
    <li>Number: {{route.query.id}}</li>
    <li>Title: {{route.query.title}}</li>
    <li>content: {{route.query.content}}</li>
  </ul>
</template>

<script lang="ts" setup name="Detail">
  import { useRoute } from 'vue-router'
  let route = useRoute()
</script> 

<style scoped>
  .news-list {
    padding: 0 20px;
    width: 100%;
  }
</style>