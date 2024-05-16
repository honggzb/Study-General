import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-uicomponent',
  templateUrl: './uicomponent.component.html',
  styleUrls: ['./uicomponent.component.scss']
})
export class UIcomponentComponent  {

  @Input() value: 'X' | 'O';

  constructor() { }


}
