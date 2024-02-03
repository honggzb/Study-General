## 1. remove item from array using spread
## 2. move item to end of array using spread

```ts
const tt = [
  { id: 3, name: 'aa'},
  { id: 1, name: 'aa11'},
  { id: 4, name: 'aa44'},
  { id: 7, name: 'aa77'},
 ];
//1. remove item from array
tt.filter(t => t.id !== 4)
//2. move item to end of array
const aa = tt.filter(t => t.id === 4);
const bb =[...tt.filter(t => t.id !== 4), ...aa]
```
