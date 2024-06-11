<template>
  <div class="father">
    <h3>Father component</h3>
    <div class="container">
      <Game #default="params">
        <ul>
          <li v-for="g in params.games" :key="g.id">{{g.name}}</li>
        </ul>
      </Game>
      <Game #default="params">
        <ol>
          <li v-for="g in params.games" :key="g.id">{{g.name}}</li>
        </ol>
      </Game>
      <Game #default="params">
        <h6 v-for="g in params.games" :key="g.id">{{g.name}}</h6>
      </Game>
    </div>
  </div>
</template>

<script lang="ts" setup name="Father">
  import Game from './Game.vue'
</script> 

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
    padding: 30px;
  }
  .container {
    display: flex;
    justify-content: space-evenly;
  }
</style>