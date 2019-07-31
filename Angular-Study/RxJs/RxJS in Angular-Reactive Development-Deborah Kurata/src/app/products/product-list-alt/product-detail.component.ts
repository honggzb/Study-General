import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from '../product';
import { catchError, map, filter } from 'rxjs/operators';
import { EMPTY, combineLatest } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  //pageTitle = 'Product Detail';
  errorMessage = '';

  constructor(private productService: ProductService) { }
  
  // Product to display
  product$ = this.productService.selectedProduct$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  // Suppliers for this product
  productSuppliers$ = this.productService.selectedProductSuppliers$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  pageTitle$ = this.product$
      .pipe(
        map((p: Product) => p ? `Product Detail for: ${p.productName}` : null)
      );
  
  // Create a combined stream with the data used in the view
  // Use filter to skip if the product is null
  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$
  ]).pipe(
    filter(([product]) => Boolean(product)),
    map(([product, productSuppliers, pageTitle]) => ({product, productSuppliers, pageTitle}))
  );
}
