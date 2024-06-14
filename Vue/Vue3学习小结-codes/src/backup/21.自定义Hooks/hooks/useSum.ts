import {ref, onMounted, computed } from 'vue'

export default function() {
  let num = ref(0)
  let bigSum = computed(() => {
    return num.value * 10
  })
  function changeSum() {
    num.value += 1
  }
  onMounted(() => {
    changeSum()
  })
  //向外提供东西
  return {num, changeSum, bigSum}
}