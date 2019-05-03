import { Product } from '../product';
import { Action } from '@ngrx/store';

//1) define a enum - the action types as named constants
export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product'
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
// 3) union output type by union pipe operator: Define a union type for those action creators
export type ProductActions = ToggleProductCode
| SetCurrentProduct
| ClearCurrentProduct
| InitializeCurrentProduct;
