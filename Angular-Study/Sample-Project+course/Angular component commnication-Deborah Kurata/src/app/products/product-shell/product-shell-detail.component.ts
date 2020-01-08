import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-shell-detail',
  templateUrl: './product-shell-detail.component.html',
  styles: []
})
export class ProductShellDetailComponent implements OnInit {
  errorMessage: string;
  product: IProduct | null;
  // use get to catch producy in async
  // get product(): IProduct | null {
  //   return this.productService.currentProduct;
  // }

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.selectedProductChange$.subscribe(selectedProduct => this.product = selectedProduct);
  }

}
