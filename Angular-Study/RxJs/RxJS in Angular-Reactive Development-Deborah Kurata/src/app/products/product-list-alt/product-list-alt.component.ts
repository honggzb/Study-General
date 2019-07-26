import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  //errorMessage = '';
  //selectedProductId;

  products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err => {
        //this.errorMessage = err;
        this.errorMessageSubject.next(err);
        return EMPTY;
    })
  );

  selectedProduct$ = this.productService.selectedProduct$;

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
