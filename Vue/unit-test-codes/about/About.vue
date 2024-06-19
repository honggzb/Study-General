<template>
  <div>
    <h1>About</h1>
    <h2>Count: {{ count }}</h2>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'About',
  components: {},
  data() {
    return { count: 0 }
  },
  methods: {
    increment() { this.count += 1 },
  },
})
</script>
