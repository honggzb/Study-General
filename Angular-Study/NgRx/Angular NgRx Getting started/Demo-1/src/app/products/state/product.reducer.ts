import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Product } from './../product';
import * as fromRoot from '../../state/app.state';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface State extends fromRoot.State{
  products: ProductState;
}

// define an interface for strongly typed state
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product | null;
  products: Product[];
  error: string;
}

const initalState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
};

// build strongly typed selectors
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state =>  state.currentProduct
);
export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
)

export function reducer(state=initalState, action): ProductState {
  switch(action.type) {
    //case 'TOGGLE_PRODUCT_CODE':
    case ProductActionTypes.ToggleProductCode:
      return{
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      }
    default:
      return state;
  }
}
