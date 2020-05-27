import { Directive, HostBinding, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  exportAs: 'hlm'
})
export class HighlightedDirective {

  @Input('highlighted')
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

  // @HostBinding('className')  //className is a DOM property
  // get cssClass(){
  //   return 'highlighted';
  // }

  constructor() {
   //console.log("highlighted directive created");
   }

  @HostBinding('class.highlighted')
  get cssClass(){
    return this.isHighlighted;
  }
  // @HostBinding('attr.disabled')
  // get disable() {
  //   return true;
  // }

  @HostListener('mouseover', ['$event'])
  mouseOver($event) {
    //console.log($event);
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
    //console.log("highlight directive", this.isHighlighted);
    this.toggleHighlight.emit(this.isHighlighted);
  }

}
