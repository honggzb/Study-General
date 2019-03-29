import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-shell-list',
  templateUrl: './product-shell-list.component.html',
  styles: []
})
export class ProductShellListComponent implements OnInit {

  pageTitle:string = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.selectedProductChange$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe(
      (products:IProduct[]) => this.products = products,
      (error:any) => this.errorMessage = <any>error
    );
  }

  onSelected(product: IProduct){
    //this.productService.currentProduct = product;
    // Notification - push
    this.productService.changeSelectedProduct(product);
  }

}
