1. create a vue file which contain svg source code, such as 'IconXxx.vue'
2. using in other vue file

```ts
//IconXxx.vue
<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
    <path d="xxxxxxx"/>
  </svg>
</template>
// using in other vue file
import IconXxx from './icons/IconXxx.vue'
<template>
  <div>
    <template #icon>
      <IconXxx />
    </template>
  </div>
<template>   
```
