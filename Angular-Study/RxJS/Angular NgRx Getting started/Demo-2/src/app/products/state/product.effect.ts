import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { Product } from '../product';
 import { ProductService } from './../product.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffect {
  constructor(
    private productService: ProductService,
    private actions$: Actions){}


  /**
   * loadProduct effect is listening for all dispatched action through Action stream, but is only interested in the 'productActions.ProductActionTypes.Load' event using 'ofType' operator
   */
  @Effect()
  loadProduct$: Observable<Action> = this.actions$.pipe(
    //filter actions,
    ofType(productActions.ProductActionTypes.Load),   //1) take an action - Load
    mergeMap(action =>      //2) do some work
      this.productService.getProducts().pipe(
        map( products => (new productActions.LoadSuccess(products))), //3) return a new action
        catchError(err => of(new productActions.LoadFail(err)))
      ))
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action:productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.updateProduct(product).pipe(
        map( updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
        catchError(err => of(new productActions.UpdateProductFail(err)))
      ))
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action:productActions.CreateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.createProduct(product).pipe(
        map( updatedProduct => (new productActions.CreateProductSuccess(updatedProduct))),
        catchError(err => of(new productActions.CreateProductFail(err)))
      ))
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action:productActions.DeleteProduct) => action.payload),
    mergeMap((productId: number) =>
      this.productService.deleteProduct(productId).pipe(
        // productService.deleteProduct have no return reponse
        map(() => (new productActions.DeleteProductSuccess(productId))),
        catchError(err => of(new productActions.DeleteProductFail(err)))
      ))
  );

}
