<template>
  <div class="app">
    <h3>Vue3 组件通信</h3>
    <hr>
    <div class="row">
      <div class="col-xs-3 col-md-3 col-lg-3 col-xl-3">
        <router-link active-class="active" class="list-group-item" to="/props">1. pros</Router-link>
        <router-link active-class="active" class="list-group-item" to="/event">2. 自定义事件</Router-link>
        <router-link active-class="active" class="list-group-item" to="/mitt">3. mitt</Router-link>
        <router-link active-class="active" class="list-group-item" to="/model">4. v-model</Router-link>
        <router-link active-class="active" class="list-group-item" to="/attrs">5. $attris</Router-link>
        <router-link active-class="active" class="list-group-item" to="/ref-parent">6. $refs, $parent</Router-link>
        <router-link active-class="active" class="list-group-item" to="/provide-inject">7. provide, inject</Router-link>
        <router-link active-class="active" class="list-group-item" to="/pinia">8. pinia</Router-link>
        <router-link active-class="active" class="list-group-item" to="/slot1">9. slot - 默认插槽 + 具名插槽</Router-link>
        <router-link active-class="active" class="list-group-item" to="/slot2">10. slot - 作用域插槽</Router-link>
      </div>
      <div class="col-xs-9 col-md-9 col-lg-9 col-xl-9">
        <div class="panel-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
</script>
  
<style scoped>
  .app {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 30px;
    width: 90%;
  }
  h3 {
    margin: 0 auto;
    padding: 10px;
  }
  a { padding: 5px;}
  .active {
    background-color: #8f8ffd;
    color: white;
  }
</style>