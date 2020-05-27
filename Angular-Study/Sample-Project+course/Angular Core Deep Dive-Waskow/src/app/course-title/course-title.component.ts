import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'course-title',
  templateUrl: './course-title.component.html',
  styleUrls: ['./course-title.component.css']
})
export class CourseTitleComponent implements OnInit {

  @Input()
  title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
