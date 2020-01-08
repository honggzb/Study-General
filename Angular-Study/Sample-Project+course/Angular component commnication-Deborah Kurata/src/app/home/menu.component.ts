import { AuthService } from './../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {
  pageTitle: string = 'Product Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    if(this.authService.currentUser){
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
