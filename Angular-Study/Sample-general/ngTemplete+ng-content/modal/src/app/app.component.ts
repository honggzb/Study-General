import { Component } from '@angular/core';
import {fadeInOut} from "./animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut]
})
export class AppComponent {
  title = 'masterClass';
  loginActive = true;

  setLoginActive(loginActive) {
    this.loginActive = loginActive;
  }
}
