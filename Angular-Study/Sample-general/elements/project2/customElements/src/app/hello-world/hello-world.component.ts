import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  @Input() title;
  @Input() rname;
  @Input() occupation;
  @Input() location;
  @Input() first;

  @Output() display = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  showInfo(){
    this.display.emit(`
    Name: ${this.rname}
    Occupation: ${this.occupation}
    Based in: ${this.location}
    First Appearance: ${this.first}`);
  }

}
