<template>
  <el-card>
    <h3>我是A组件</h3>
    <div class="mb-2 flex items-center text-sm">
      <el-radio-group v-model="radio1" class="ml-4">
        <el-radio value="1" size="large">Option 1</el-radio>
        <el-radio value="2" size="large">Option 2</el-radio>
      </el-radio-group>
    </div>
    <div class="my-2 flex items-center text-sm">
      <el-radio-group v-model="radio2" class="ml-4">
        <el-radio value="1">Option 1</el-radio>
        <el-radio value="2">Option 2</el-radio>
      </el-radio-group>
    </div>
    <div class="my-4 flex items-center text-sm">
      <el-radio-group v-model="radio3" class="ml-4">
        <el-radio value="1" size="small">Option 1</el-radio>
        <el-radio value="2" size="small">Option 2</el-radio>
      </el-radio-group>
    </div>
    <div class="mb-2 flex items-center text-sm">
      <el-radio-group v-model="radio3" disabled class="ml-4">
        <el-radio value="1" size="small">Option 1</el-radio>
        <el-radio value="2" size="small">Option 2</el-radio>
      </el-radio-group>
    </div>
  </el-card>
</template>

<script lang="ts" setup name="B">
  import { ref } from 'vue'
  const radio1 = ref('1')
  const radio2 = ref('1')
  const radio3 = ref('1')
</script>
  
<style scoped>
</style>

