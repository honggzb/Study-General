import { defineStore } from "pinia";

export const useCountStore = defineStore('count', {
  actions: {
    increment(value: number) {
      if (this.sum < 10) {
        this.sum += value   //操作countStore中的sum
      }
    },
    decrement(value:number){
      if(this.sum > 1){
        this.sum -= value
      }
    }
  },
  state(){
    return { sum: 6, school: 'atug', address: 'honghu' }
  },
  getters: {
    bigSum:(state): number => state.sum * 10,  //用this就不能使用箭头函数
    upperSchool(): string {
      return this.school.toUpperCase()    //用this就不能使用箭头函数
    }
  }
})