<template>
  <div class="sync">
    <div class="sync-content">
      <div><img :src="data.url"></div>
       <div class="sync-pop">
          <div>{{data.name}}</div>
          <div>&nbsp;{{data.age}}</div>
       </div>
    </div>
    <hr>
    <div>{{data.desc}}</div>
  </div>
</template>

<script lang="ts" setup name="Sync">
  import { ref, reactive } from 'vue'
  import { axios } from './server/axios.ts'

  interface Data {
    data: {
      name: string,
      age: number,
      url: string,
      desc: string,
    }
  }

  const { data } = await axios.get<Data>('/data.json')
  console.log("data", data)

</script>
  
<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1% auto;
    border: 1px solid #ccc;
    min-height: 600px;
  }
</style>
