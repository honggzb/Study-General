```vue
<template>
  <div class="container max-auto p-4">
    <!-- Triangle with Rotation -->
    <div :class="['absolute top-1 left-1 mt-2 w-0 h-0 border-l-8 border-t-8 border-b-8 border-transparent border-l-black cursor-pointer transition-transform duration-300', isVisible ? 'rotate-90' : 'rotate-0']"
        @click="toggleContent">
      <!-- Content -->
      <div v-if="isVisible" class="mt-6">
        <slot>
            <p>This is the content inside. Click triangle to hide or show content</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<scirpt>
  import {ref} from 'vue'
  const isVisible = ref(true)
  function toggleContent(){
    isVisible.value = !isVisible.value
  }
</scirpt>
```
