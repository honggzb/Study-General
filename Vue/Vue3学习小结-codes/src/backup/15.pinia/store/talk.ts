import { defineStore } from "pinia";
import axios from 'axios'
import { nanoid } from 'nanoid'

export const useTalkStore = defineStore('talk', {
  actions: {
    async getATalk() {
      try {
        // 获取数据， 连续解构 + 重命名
       let {data: {content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
       let obj = {id:nanoid(), content}
       this.talkList.unshift(obj)
     } catch (error) {
       alert(error)
     }
    }
  },
  state(){
    return { 
      talkList: [
        {id:'yuysada01',content:'你今天有点怪，哪里怪？怪好看的！'},
     		{id:'yuysada02',content:'草莓、蓝莓、蔓越莓，你想我了没？'},
        {id:'yuysada03',content:'心里给你留了一块地，我的死心塌地'}
      ]
     }
  },
  getters: {}
})