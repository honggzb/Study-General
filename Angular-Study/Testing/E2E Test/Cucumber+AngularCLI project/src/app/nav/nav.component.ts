import { Component } from '@angular/core';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav.component.html',
    styles: [`
      .navbar-brand img { width: 30px; height: 30px;}
    `
    ]
})
export class NavigationComponent { }
