import { Component, Input, ContentChild, AfterContentInit, HostBinding, ViewEncapsulation} from '@angular/core';
import {InputRefDirective} from '../common/input-ref.directive';

@Component({
  selector: 'au-md-input',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './au-md-input.component.html',
  styleUrls: ['./au-md-input.component.scss']
})
export class AuMdInputComponent implements AfterContentInit {

  @Input()
  icon: string;

  @ContentChild(InputRefDirective, {static: false})
  input:InputRefDirective;

  constructor() { }

  ngAfterContentInit() {
    console.log('input', this.input);
     if (!this.input) {
          console.error('the au-fa-input needs an input inside its content');
        }
  }

  @HostBinding('class.input-focus')
  get isInputFocus(){
    return this.input ? this.input.focus : false;
  }

}
