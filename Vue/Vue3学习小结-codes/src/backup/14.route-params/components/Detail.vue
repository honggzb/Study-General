<template>
  <ul class="news-list">
    <li>Number: {{route.params.id}}</li>
    <li>Title: {{route.params.title}}</li>
    <li>content: {{route.params.content}}</li>
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