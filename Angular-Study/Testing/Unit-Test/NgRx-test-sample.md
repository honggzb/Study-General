```javascript
import * as productAction from './product.actions';
import { reducer } from './product.reducer';

describe('Product Reducer', () => {
  describe('Delete product', () => {
    it('should delete a product', () => {
      const currentProducts = [
        {
          'id': 1,
          'productName': 'Leaf Rake',
          'productCode': 'GDN-0011',
          'description': 'Leaf rake with 48-inch wooden handle',
          'starRating': 3.2
        },
        {
          'id': 2,
          'productName': 'Garden Cart',
          'productCode': 'GDN-0023',
          'description': '15 gallon capacity rolling garden cart',
          'starRating': 4.2
        }
      ];
      const expectedResult = [{
        'id': 2,
        'productName': 'Garden Cart',
        'productCode': 'GDN-0023',
        'description': '15 gallon capacity rolling garden cart',
        'starRating': 4.2
      }];
      const action = new productAction.DeleteProduct(1);
      const result = reducer(currentProducts, action);
      expect(result).toEqual(expectedResult);
    })
  })
})
```
