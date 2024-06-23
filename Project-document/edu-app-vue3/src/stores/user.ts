import { defineStore } from 'pinia'

export const useUserStore  = defineStore('storeUser', {
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  actions: {
    setToken (token: string) {
      this.token = token
    },
    clearToken() {
      this.token = ''
      this.userInfo = {};  //增加退出登录，清除userInfo获取用户信息的内容
    }
  },
  persist: {
    enabled: true,
    strategies: [ { storage: localStorage, key: 'xxx_user' } ]
  }
})
