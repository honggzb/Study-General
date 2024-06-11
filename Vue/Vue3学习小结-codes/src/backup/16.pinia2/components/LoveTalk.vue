<template>
  <div class="love-talk">
    <button @click="talkStore.getATalk">获取一句土味情话</button>
    <ul>
      <li v-for="talk in talkStore.talkList" :key="talk.id">{{talk.content}}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="LoveTalk">
  import { reactive } from 'vue'
  import axios from 'axios'
  import { nanoid } from 'nanoid'
  import { storeToRefs } from 'pinia'
  import { useTalkStore } from '../store/talk.ts'

  const talkStore = useTalkStore()
  const talkList = storeToRefs(talkStore)

  talkStore.$subscribe((mutate, state) => {
    console.log('talkstore中保存的数据发生了变化', mutate, state)
    localStorage.setItem('talk', JSON.stringify(talkList.value))
  })
</script>
  
<style scoped>
  .love-talk {
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    width: 90%;
    height: 90%;
    border: 1px solid;
    padding: 10px;
  }
</style>