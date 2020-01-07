import { Component, Input, ContentChild, AfterContentInit, HostBinding, ViewEncapsulation} from '@angular/core';
import {InputRefDirective} from '../common/input-ref.directive';

@Component({
  selector: 'au-fa-input',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './au-fa-input.component.html',
  styleUrls: ['./au-fa-input.component.scss']
})
export class AuFaInputComponent implements AfterContentInit {

  @Input()
  icon: string;

  // for ng-content, using directive
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

  get classes() {
    const cssClasses = {};
    if(this.icon) {
      cssClasses['fa-' + this.icon] = true;
    }
    return cssClasses;
  }

}
