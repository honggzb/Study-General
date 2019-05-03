import { Product } from '../product';
import { Action } from '@ngrx/store';

//1) define a enum - the action types as named constants
export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail',
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success',
  UpdateProductFail = '[Product] Update Product Fail',
  CreateProduct = '[Product] Create Product',
  CreateProductSuccess = '[Product] Create Product Success',
  CreateProductFail = '[Product] Create Product Fail',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Product Success',
  DeleteProductFail = '[Product] Delete Product Fail'
}
// 2)create different action strongly type -Build the action creators
export class ToggleProductCode implements Action {
  // readonly
  readonly type = ProductActionTypes.ToggleProductCode;
  constructor(public payload: boolean){}
}
export class SetCurrentProduct implements Action {
  // readonly
  readonly type = ProductActionTypes.SetCurrentProduct;
  constructor(public payload: Product){}
}
export class ClearCurrentProduct  implements Action {
  // readonly
  readonly type = ProductActionTypes.ClearCurrentProduct;
  // no payload for clear, we can delete constructor
}
export class InitializeCurrentProduct implements Action {
  // readonly
  readonly type = ProductActionTypes.InitializeCurrentProduct;
  // no payload for Initalize, we can delete constructor
}
export class Load implements Action {
  // readonly
  readonly type = ProductActionTypes.Load;
  // no payload for Initalize, we can delete constructor
}
export class LoadSuccess implements Action {
  // readonly
  readonly type = ProductActionTypes.LoadSuccess;
  constructor(public payload: Product[]) {}
}
export class LoadFail implements Action {
  // readonly
  readonly type = ProductActionTypes.LoadFail;
  constructor(public payload: string) {}
}
export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;
  constructor(public payload: Product) { }
}
export class UpdateProductSuccess implements Action {
  readonly type = ProductActionTypes.UpdateProductSuccess;
  constructor(public payload: Product) { }
}
export class UpdateProductFail implements Action {
  readonly type = ProductActionTypes.UpdateProductFail;
  constructor(public payload: string) { }
}
export class CreateProduct implements Action {
  readonly type = ProductActionTypes.CreateProduct;
  constructor(public payload: Product) { }
}
export class CreateProductSuccess implements Action {
  readonly type = ProductActionTypes.CreateProductSuccess;
  constructor(public payload: Product) { }
}
export class CreateProductFail implements Action {
  readonly type = ProductActionTypes.CreateProductFail;
  constructor(public payload: string) { }
}
export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DeleteProduct;
  constructor(public payload: number) { }
}
export class DeleteProductSuccess implements Action {
  readonly type = ProductActionTypes.DeleteProductSuccess;
  constructor(public payload: number) { }
}
export class DeleteProductFail implements Action {
  readonly type = ProductActionTypes.DeleteProductFail;
  constructor(public payload: string) { }
}

// 3) union output type by union pipe operator: Define a union type for those action creators
export type ProductActions = ToggleProductCode
| SetCurrentProduct
| ClearCurrentProduct
| InitializeCurrentProduct
| Load
| LoadSuccess
| LoadFail
| UpdateProduct
| UpdateProductSuccess
| UpdateProductFail
| CreateProduct
| CreateProductSuccess
| CreateProductFail
| DeleteProduct
| DeleteProductSuccess
| DeleteProductFail;
