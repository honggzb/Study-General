- [1. remove item from array using filter](#1-remove-item-from-array-using-filter)
- [2. move item to end of array using spread](#2-move-item-to-end-of-array-using-spread)

```ts
const tt = [
  { id: 3, name: 'aa'},
  { id: 1, name: 'aa11'},
  { id: 4, name: 'aa44'},
  { id: 7, name: 'aa77'},
 ];
```

|function|operator|code|
|---|---|---|
|[1. remove item from array]((#1-remove-item-from-array-using-filter))|filter|`tt.filter(t => t.id !== 4)`|
|[2. move item to end of array](#2-move-item-to-end-of-array-using-spread)|filter, spread|`const aa = tt.filter(t => t.id === 4);`<br>`const bb =[...tt.filter(t => t.id !== 4), ...aa]`|


[⬆ back to top](#top)
