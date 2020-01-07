import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuFaInputComponent } from './au-fa-input/au-fa-input.component';
import { AuMdInputComponent } from './au-md-input/au-md-input.component';
import { InputRefDirective } from './common/input-ref.directive';

@NgModule({
  declarations: [AuFaInputComponent, AuMdInputComponent, InputRefDirective],
  imports: [
    CommonModule
  ],
  exports: [AuFaInputComponent, AuMdInputComponent, InputRefDirective]
})
export class AuInputModule { }
