<template>
  <div class="father">
    <!-- <input type="text" 
      :value="modelValue"
      @input="emits('update:modelValue', (<HTMLInputElement>$event.target).value)"> -->
    <input type="text" 
      :value="yonghu"
      @input="emits('update:yonghu', (<HTMLInputElement>$event.target).value)">
    <hr>
    <input type="text" 
      :value="mima"
      @input="emits('update:mima', (<HTMLInputElement>$event.target).value)">
  </div>
</template>

<script lang="ts" setup name="TestInput">
  // defineProps(['modelValue'])
  // // 声明自定义事件 update:modelValue
  // const emits = defineEmits(['update:modelValue'])
  // 修改ModelValue
  defineProps(['yonghu', 'mima'])
  const emits = defineEmits(['update:yonghu', 'update:mima'])
</script> 

<style scoped>
  input {
    border: 2px solid black;
    background-image: linear-gradient(45deg, red, yellow, green);
    height: 30px;
    font-size: 20px;
    color: white;
  }
</style>