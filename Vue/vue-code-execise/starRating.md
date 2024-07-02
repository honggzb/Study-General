StarRating.vue

```vue
<template>
    <div class="star-ratings">
      <span v-for="star in totalRating" :key="star" class="star-ratings__icon"
        :class="{ filled: star <= rating }"
        @click="setRating(star)">★</span>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineEmits } from "vue";
const props = defineProps<{
  rating: number;
  totalRating: number;
}>();
const emit = defineEmits<(event: "update-rating", rating: number) => void>();
const setRating = (star) => {
  emit("update-rating", star);
}
</script>

<style scoped>
.star-ratings {
  height: 100px;
  width: 600px;
  display: flex;
  align-items: center;
  gap: 2px;
}
.star-ratings__icon {
  cursor: pointer;
  color: #d8d8d8;
  font-size: 32px;
}
.star-ratings__icon:hover,
.star-ratings__icon:active,
.star-ratings__icon.filled {
  color: orange;
}
</style>
```

App.vue

```vue
const rating = ref(3);
const totalRating = ref(10);
<StarRating :rating="rating" :total-rating="totalRating" @update-rating="rating = $event" />
```
