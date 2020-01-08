import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';
import { CriteriaComponent } from './criteria.component';

@NgModule({
  declarations: [StarComponent, CriteriaComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent,
    CriteriaComponent
  ]
})
export class SharedModule { }
