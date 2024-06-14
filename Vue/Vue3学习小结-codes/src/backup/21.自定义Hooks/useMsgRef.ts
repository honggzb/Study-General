import { customRef } from 'vue'

export default function(initValue: string, delay: number) {
  //实现防抖效果
  let msg = customRef((track, trigger) => {
    let timer: number
    return {
      get() {
        track()      // 告诉Vue数据msg很重要，要对msg持续关注，一旦变化就更新
        return initValue
      },
      set(value) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          initValue = value
          trigger()  // 通知Vue数据msg变化了
        }, delay)
      }
    }
  })
  return msg
}