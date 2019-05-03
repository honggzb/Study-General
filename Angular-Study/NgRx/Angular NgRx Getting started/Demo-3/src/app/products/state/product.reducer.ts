import { Product } from './../product';
import { ProductActions, ProductActionTypes } from './product.actions';

// define an interface for strongly typed state
export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initalState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

export function reducer(state=initalState, action: ProductActions): ProductState {
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
        currentProductId: action.payload.id
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        error: action.payload
      };
    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map(
      item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };
    // add to products after create
    case ProductActionTypes.CreateProductSuccess:
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      };
     // After a delete, the currentProduct is null.
    case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        currentProductId: null,
        error: ''
      };
    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
