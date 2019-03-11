import { JQ_TOKEN } from './jQuery.service';
import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';

@Component({
  selector: 'simple-modal',
  template: `
    <div id="{{elementId}}" #modalcontainer class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{title}}</h4>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
          </div>
          <div class="modal-body" (click)="closeModal()">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`,
  styles: [`.modal-body { height: 250px; overflow-y: scroll; }`]
})
export class SimpleModalComponent {

  @Input() title:string
  @Input() elementId: string
  @ViewChild('modalcontainer') containerEl: ElementRef
  @Input() closeOnBodyClick: string

  constructor(@Inject(JQ_TOKEN) private $: any) { }

  closeModal(){
    if(this.closeOnBodyClick.toLocaleLowerCase() === 'true'){
      this.$(this.containerEl.nativeElement).modal('hide');
    }
  }

}
