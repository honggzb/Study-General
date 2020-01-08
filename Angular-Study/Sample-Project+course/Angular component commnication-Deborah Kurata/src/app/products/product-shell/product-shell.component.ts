import { ProductService } from './../product.service';
import { ProductData } from './../product-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styles: []
})
export class ProductShellComponent implements OnInit {
  pageTitle: string = 'Products';
  monthCount: number;

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productService.selectedProductChange$.subscribe(selectedProduct => {
      if(selectedProduct){
        const start = new Date(selectedProduct.releaseDate);
        const now = new Date();
        this.monthCount = now.getMonth() - start.getMonth() + (12 *(now.getFullYear() - start.getFullYear()));
      } else {
        this.monthCount = 0;
      }
    })
  }

}
