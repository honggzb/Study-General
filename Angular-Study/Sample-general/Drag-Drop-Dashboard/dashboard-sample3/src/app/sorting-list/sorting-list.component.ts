import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sorting-list',
  templateUrl: './sorting-list.component.html',
  styleUrls: ['./sorting-list.component.scss']
})
export class SortingListComponent implements OnInit {

  customers = [
    { name: 'Adam', age: 23 },
    { name: 'Jack', age: 27 },
    { name: 'Katherin', age: 26 },
    { name: 'John', age: 30 },
    { name: 'Watson', age: 42 },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.customers, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
  }

}
