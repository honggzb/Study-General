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
  import { useTalkStore } from '../store/talk.ts'
  // let talkList = reactive([
  //   {id:'yuysada01',content:'你今天有点怪，哪里怪？怪好看的！'},
  //   {id:'yuysada02',content:'草莓、蓝莓、蔓越莓，你想我了没？'},
  //   {id:'yuysada03',content:'心里给你留了一块地，我的死心塌地'}
  // ])
  const talkStore = useTalkStore()

  // async function getLoveTalk() {
  //   try {
  //      // 获取数据， 连续解构 + 重命名
  //     let {data: {content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
  //     let obj = {id:nanoid(), content}
  //     talkList.unshift(obj)
  //   } catch (error) {
  //     alert(error)
  //   }
  // }
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