[Refracture and Improvement](#top)

- [File structure](#File-structure)
- [index.ts](#indexts)
- [container refracture](#container-refracture)
- [components refracture](#components-refracture)

-----------------------
![](https://i.imgur.com/LfCf8WC.png)

1. create index.ts
   1. move all selector from xxx.reducer.ts to index.ts
   2. xxx.reducer.ts only contain state and reducer(ruler)
2. category containers and components
   1. containers handle all service and store issue
   2. components only concerned about how things look
      1. receive data via @Input
      2. emit function via @Output

## File structure

```
├── product/
│   ├── container/
│   │    └── product-shell/
│   ├── components/
│   │    ├── product-list/
│   │    └── product-edit/
│   └── state/
│   │    ├── index.ts
│   │    ├── product.actions.ts
│   │    ├── product.reducer.ts
│   │    └── product.effect.ts
```

## index.ts

```javascript
// product/state/index.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromProduct from './product.reducer';
// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State{
  products: fromProduct.ProductState;
}
// build strongly typed selectors
const getProductFeatureState = createFeatureSelector<fromProduct.ProductState>('products');
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state =>  state.currentProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) =>  {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);
export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
)
export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);
```

## container refracture

- add input and output attribute in html template
- move all service inject and store action from xxx.component.ts in components folder to container component
- add onPush change DetectionStrategy, same as /home/shell.component.ts

**product-shell.component.html**

```html
<pm-product-list
      [displayCode]="displayCode$ | async"
      [products]="products$ | async"
      [selectedProduct]="selectedProduct$ | async"
      [errorMessage]="errorMessage$ | async"
      (checked)="checkChanged($event)"
      (initializeNewProduct)="(newProduct())"
      (selected)="productSelected($event)"
></pm-product-list>
<pm-product-edit
      [selectedProduct]="selectedProduct$ | async"
      [errorMessage]="errorMessage$ | async"
      (clearCurrent)="clearProduct()"
      (update)="updateProduct($event)"
      (delete)="deleteProduct($event)"
      (create)="saveProduct($event)"
></pm-product-edit>
```

**product-shell.component.ts**

```javascript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProduct from './../../state';
import * as productActions from '../../state/product.actions';

import { Product } from '../../product';
@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush   //onPush
})
export class ProductShellComponent implements OnInit {
  //observable varibles
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromProduct.State>) { }
  ngOnInit() {
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }
  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }
  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }
  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
  deleteProduct(product: Product): void {
    this.store.dispatch(new productActions.DeleteProduct(product.id));
  }
  clearProduct(): void {
    this.store.dispatch(new productActions.ClearCurrentProduct());
  }
  saveProduct(product: Product): void {
    this.store.dispatch(new productActions.CreateProduct(product));
  }
  updateProduct(product: Product): void {
    this.store.dispatch(new productActions.UpdateProduct(product));
  }
}
```

## components refracture

**product-shell.component.html**

`<div class="card-body" *ngIf="products">`

**product-shell.component.ts**

```javascript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product';
@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() errorMessage: string;
  @Input() products: Product[];
  @Input() displayCode: boolean;
  @Input() selectedProduct: Product;

  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Product>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }
  newProduct(): void {
    this.initializeNewProduct.emit();
  }
  productSelected(product: Product): void {
    this.selected.emit(product);
  }
}
```

## Whole files structure

```
├── app
│   ├── home/
│   │   ├── menu.component.html
│   │   ├── menu.component.ts
│   │   ├── page-not-found.component.ts
│   │   ├── shell.component.css
│   │   ├── shell.component.html
│   │   ├── shell.component.ts
│   │   ├── welcome.component.html
│   │   └── welcome.component.ts
│   ├── products/
│   │   ├── components/
│   │   │   ├── product-edit/
│   │   │   │     ├── product-edit.component.css
│   │   │   │     ├── product-edit.component.html
│   │   │   │     └── product-edit.component.ts
│   │   │   └── product-list/
│   │   │         ├── product-list.component.css
│   │   │         ├── product-list.component.html
│   │   │         └── product-list.component.ts
│   │   ├── container/
│   │   │   └── product-shell/
│   │   │         ├── product-shell.component.html
│   │   │         └── product-shell.component.ts
│   │   ├── state/
│   │   │   ├── index.ts
│   │   │   ├── product.actions.ts
│   │   │   ├── product.effect.ts
│   │   │   └── product.reducer.ts
│   │   ├── product-data.ts
│   │   ├── product.module.ts
│   │   ├── product.service.ts
│   │   └── product.ts
│   ├── shared/
│   │   ├── generic-validator.ts
│   │   ├── number.validator.ts
│   │   └── shared.module.ts
│   ├── state/
│   │   └── app.state.ts
│   ├── user/
│   │   ├── state/
│   │   │   ├── index.ts
│   │   │   ├── user.actions.ts
│   │   │   └── user.reducer.ts
│   │   ├── auth-guard.service.ts
│   │   ├── auth.service.ts
│   │   ├── login.component.css
│   │   ├── login.component.html
│   │   ├── login.component.ts
│   │   ├── user.module.ts
│   │   └── user.ts
│   ├── app-routing.module.ts
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.ts
│   └── app.module.ts
```
