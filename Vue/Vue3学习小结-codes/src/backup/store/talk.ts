import { defineStore } from "pinia";
import axios from 'axios'
import { nanoid } from 'nanoid'

// export const useTalkStore = defineStore('talk', {
//   actions: {
//     async getATalk() {
//       try {
//         // 获取数据， 连续解构 + 重命名
//        let {data: {content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
//        let obj = {id:nanoid(), content}
//        this.talkList.unshift(obj)
//      } catch (error) {
//        alert(error)
//      }
//     }
//   },
//   state(){
//     return { 
//       talkList: JSON.parse(localStorage.getItem('talkList') as string) || []
//      }
//   },
//   getters: {}
// })

//store组合式写法
import { reactive } from "vue"

export const useTalkStore = defineStore('talk', () => {  // 写成函数形式
  const talkList = reactive(
    JSON.parse(localStorage.getItem('talkList') as string) || []
  )
  async function getATalk() {
      try {
        // 获取数据， 连续解构 + 重命名
       let {data: {content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
       let obj = {id:nanoid(), content}
       talkList.unshift(obj)
     } catch (error) {
       alert(error)
     }
  }
  // 最后需要return出去
  return { talkList, getATalk } 
})