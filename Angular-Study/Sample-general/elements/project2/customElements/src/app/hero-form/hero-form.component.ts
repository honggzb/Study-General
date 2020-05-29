import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;
  @Input() title;
  @Input() realname;
  @Input() occupation;
  @Input() location;
  @Input() firstappearance;
  @Output()
  heroSubmit = new EventEmitter();

  constructor() {
    this.heroForm = new FormGroup({
      title: new FormControl(this.title),
      realname: new FormControl(this.realname),
      occupation: new FormControl(this.occupation),
      location: new FormControl(this.location),
      firstappearance: new FormControl(this.firstappearance)
    });
  }

  ngOnInit(): void { }

  onSubmit({ value, valid }) {
    if (valid) {
      this.heroSubmit.next(value);
    }
  }

}
