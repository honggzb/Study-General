import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-animation',
  templateUrl: './drag-animation.component.html',
  styleUrls: ['./drag-animation.component.scss']
})
export class DragAnimationComponent implements OnInit {

  customers = [
    { name: 'Adam', age: 23 },
    { name: 'Jack', age: 27 },
    { name: 'Katherin', age: 26 },
    { name: 'John', age: 30 },
    { name: 'Watson', age: 42 },
  ];

  constructor() { }

  ngOnInit() { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.customers, event.previousIndex, event.currentIndex);
  }

}
