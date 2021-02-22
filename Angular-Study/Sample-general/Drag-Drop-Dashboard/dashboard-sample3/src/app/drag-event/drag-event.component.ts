import { Component, OnInit } from '@angular/core';
import { CdkDragEnd, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-event',
  templateUrl: './drag-event.component.html',
  styleUrls: ['./drag-event.component.scss']
})
export class DragEventComponent implements OnInit {

  state = '';
  position = '';
  constructor() { }

  ngOnInit() { }

  dragStarted(event: CdkDragStart) {
    console.log('dragStarted Event');
    this.state = 'dragStarted';
  }

  dragEnded(event: CdkDragEnd) {
    console.log('dragEnded Event');
    this.state = 'dragEnded';
  }

  dragMoved(event: CdkDragMove) {
    this.position = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
  }

}
