
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductShellListComponent } from './product-shell/product-shell-list.component';
import { ProductShellDetailComponent } from './product-shell/product-shell-detail.component';

import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ProductEditComponent } from './edit/product-edit.component';
import { ProductEditGuardService } from './edit/product-edit-guard.service';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';

@NgModule({
  declarations: [
    ProductShellComponent,
    ProductShellListComponent,
    ProductShellDetailComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProductShellComponent },
     // { path: '', component: ProductListComponent },
      //{ path: ':id', component: ProductDetailComponent },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        //canDeactivate: [ProductEditGuardService]
    },
    ])
  ],
  providers: [
    ProductService,
    ProductParameterService
  ]
})
export class ProductsModule { }
