<template>
  <div ref="box" class="wraps">
    <div>
      <div class="item" v-for="item in chatList">
        <div> {{ item.name }} </div>&nbsp;
        <div> {{ item.message }} </div>
      </div>
    </div>
  </div>
  <div class="ipt">
    <div><textarea v-model="ipt" type="text" /></div>
    <div><button @click="send">Send</button></div>
  </div>
</template>

<script lang="ts" setup name="App">
  import { reactive, ref, nextTick, watch, getCurrentInstance } from 'vue'
  let chatList = reactive([
    {name: 'Zhangsan', message: 'xxxxxxxxxx'}
  ])
  // Vue更新dom是异步的 数据更新是同步, 所以滚动条没有及时滑到底部
   // 当操作dom 的时候发现数据读取的是上次的 就需要使用nextIick
  let box = ref<HTMLDivElement>()
  let ipt = ref('')
  const send = async () => {
    //ipt.value = ''
    chatList.push({name: 'Lisi', message: ipt.value})
    // DOM 还未更新, 滚动条无变化
    //Vue 更新dom是异步的 数据更新是同步
    //当我们操作dom 的时候发现数据读取的是上次的 就需要使用nextIick
    await nextTick()   
    // DOM 此时已经更新, 滚动条到达底部
    box.value!.scrollTop = 99999999
  }
</script>

<style scoped lang="less">
  .wraps {
    margin: 10px auto;
    width: 500px;
    height: 400px;
    overflow: auto;
    overflow-x: hidden;
    background: #fff;
    border: 1px solid #ccc;
    .item {
      width: 100%;
      height: 50px;
      background: #ccc;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid #fff;
    }
  }
  .ipt {
    margin: 10px auto;
    width: 500px;
    height: 40px;
    background: #fff;
    border: 1px solid #ccc;
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
    }
    button {
      width: 100px;
      margin: 10px 0;
      float: right;
    }
  }
</style>

