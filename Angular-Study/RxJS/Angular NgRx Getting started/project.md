## inital Demo

- use Observable to handle HTTP/async
- use BehaviorSubject to handle communication between component(product-list.component and product-edit.component)

```javascript
```

## Demo 1

- use strongly typed state
  - State          <- app.state.ts
  - ProductState   <- product.reducer.ts
- use strongly typed action  <- product.actions.ts
  - ToggleProductCode
  - SetCurrentProduct
  - ClearCurrentProduct
  - InitializeCurrentProduct
- use strongly typed selector  <- product.reducer.ts
  - getShowProductCode
  - getCurrentProduct
  - getProducts
