可以无限选择

```ts
import StarRating from './components/StarRating.vue';

const rating = ref(2.5456789678248984728);

<StarRating v-model="rating" :number-of-stars="5" :star-size="24" />
```
