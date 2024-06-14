<template>
  <button @click="shuffle">Shuffle</button>
  <br><br>
  <div class="content">
    <TransitionGroup name="mmm">
      <li class="cell" v-for="item in items" :key="item.id">{{item.number}}</li>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup name="Content">
  import { ref, reactive } from 'vue'
  import { shuffle as _shuffle } from 'lodash-es'

  let items = ref(Array.apply(null, {length: 81} as number[]).map((item, index) => {
    return {
      id: index,
      number: (index % 9) + 1,
    }
  }))
  //console.log(items.value)
  function shuffle() {
    items.value = _shuffle(items.value)
  }
</script>
  
<style scoped lang="less">
  .content {
    display: flex;
    flex-wrap: wrap;
    width: calc(35px * 10 + 9px);
    border: 1px solid #ccc;
    font-size: 30px;
    .cell {
      width: 35px;
      height: 35px;
      border: 1px solid #ccc;
      list-style-type: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
 .mmm-move {     /* 移动动画: 对移动中的元素应用的过渡 , 声明过渡效果*/
    transition: transform 0.8s ease;
  }
</style>

