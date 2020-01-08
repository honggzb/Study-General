import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styles: []
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.valueChange.emit(value);
  }
  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     console.log(this.filterElementRef);
      if(this.filterElementRef.nativeElement){
        this.filterElementRef.nativeElement.focus();   //DOM
      }
  //     console.log(this.filterInput);
  //     this.filterInput.valueChanges.subscribe(
  //       () => this.performFilter(this.listFilter)
  //     )
  //   }, 500);

  }

  ngOnChanges(changes: SimpleChange): void {
    console.log(changes);
    if(changes['hitCount'] && !changes['hitCount'].currentValue){
      this.hitMessage = 'No matches found';
      console.log(this.hitMessage);
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
      console.log(this.hitMessage);
    }
  }

  ngOnInit() {
  }

}
