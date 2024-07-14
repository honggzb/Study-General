import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAccounts = defineStore('counter', () => {
  let accountList = ref([])

  function getAccounts() {
    axios.get('http://localhost:4000/accounts').then((response) => {
      accountList.value = response.data
    })
  }

  function addAccount(account) {
    axios.post("http://localhost:4000/accounts", account).then((response) => {
     // router.push("/");
     return
    });
  }

  function deleteAccount(id) {
      axios.delete(`http://localhost:4000/accounts/${id}`)
       .then(() => {
        if (accountList) {
          accountList.value = accountList.value.filter(
            (_) => _.id !== id
          )
          return
        }
      })
  }

  function sortType() {
    accountList.value.sort((a, b) => a.type.localeCompare(b.type))
    return
  }

  function sortBalanceA() {
    accountList.value.sort((a, b) => b.balance - a.balance)
    return
  }

  function sortBalanceD() {
    accountList.value.sort((a, b) => a.balance - b.balance)
    return
  }
  function filterType(type) {
    // accountList = accountList.value.filter((a) => a.type === type)
    // console.log('state', accountList);
    accountList.value = accountList.value.filter((a) => a.type === type)
    return
  }
  return { accountList, getAccounts, addAccount, deleteAccount, sortType, sortBalanceA, sortBalanceD, filterType }
})
