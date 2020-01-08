import { CriteriaComponent } from './../shared/criteria.component';
import { Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [`
      thead {
        color: #337AB7;
        font-weight: bold;
    }`]
})
export class ProductListComponent implements OnInit {

  pageTitle: string = 'Product List';
  //showImage: boolean;
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;
  filteredProducts:IProduct[];
  products: IProduct[];

  includeDetails: boolean = true;
  //reference of child component
  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
  parentListFilter:string;

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  constructor(
    private productService: ProductService,
    private productParameterService: ProductParameterService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        //this.performFilter(this.parentListFilter);
        this.filterComponent.listFilter = this.productParameterService.filterBy;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  onFilterChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }

}
