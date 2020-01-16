import { Directive, TemplateRef, ViewContainerRef, Input, AfterContentInit, ContentChild, OnInit, OnDestroy } from '@angular/core';

import { AuModalComponent } from './au-modal.component';
import { AuModalService } from './modal.service';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {

  elements: HTMLBaseElement[]; 

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: AuModalService) { }

  ngOnInit(): void {
    this.modalService.close$.subscribe(() => this.viewContainer.clear());
  }
  //prevent memory leakage
  ngOnDestroy() {
    this.elements.forEach(el => el.removeEventListener('click', this.clickHandler));
}

  @Input()
  set auModalOpenOnClick(els){
    let elements: HTMLBaseElement[];
    if(els.length){
      elements = els;
    }else{
      elements = [els];
    }
    // handle multiple buttons
    elements.forEach(el => {
      el.addEventListener('click', () => {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      });
    });
  }

  clickHandler = (() => {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }).bind(this)

}
