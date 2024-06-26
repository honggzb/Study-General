import { ProductCategory } from './../product-categories/product-category';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

import { ProductService } from './product.service';
import { ProductCategoryService } from './../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  
  //private categorySelectedSubject = new Subject<number>();
  // Action stream
  private categorySelectedSubject = new BehaviorSubject<number>(0);  //create action stream with inital value
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  products$ = combineLatest([                // Merge Data stream with Action stream
    this.productService.productsWithAdd$,
    this.categorySelectedAction$
    //.pipe(startWith(0))   //set intial value
  ]).pipe(
      map(([products,selectedCategoryId]) =>
            products.filter( product =>        // To filter to the selected category
                       selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )),
      catchError(err => {
        //this.errorMessage = err;
        this.errorMessageSubject.next(err);
        return EMPTY;
    })
  );
  // Categories for drop down list
  categories$ = this.productCategoryService.productCategories$
                    .pipe(
                      catchError(err => {
                        this.errorMessage = err;
                        return EMPTY;
                      })
                    );
  // it is only data stream, it is not action stream
  // productsSimpleFilter$ = this.productService.productsWithCategory$
  //                             .pipe(
  //                               map(products =>
  //                                 products.filter( product => this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true)
  //                               )
  //                             );
  
  // Combine the streams for the view
    vm$ = combineLatest([ this.products$, this.categories$ ])
    .pipe(
      map(([products, categories]) =>
        ({ products, categories }))
    );
  
  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    //this.selectedCategoryId = +categoryId;
    this.categorySelectedSubject.next(+categoryId);
  }
}
