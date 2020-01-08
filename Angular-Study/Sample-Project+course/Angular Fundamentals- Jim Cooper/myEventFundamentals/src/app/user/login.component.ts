import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    em{ float:right; color:#E05C65;padding-left:10px; font-size: 0.85rem;}
  `]
})
export class LoginComponent implements OnInit {
  userName;
  password;
  mouseoverLogin;
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(formValues){
    this.authService.loginUser(formValues.userName, formValues.password);
    this.router.navigate(['events']);
    // this.authService.loginUser(formValues.userName, formValues.password)
    //                 .subscribe(res = {
    //                   if(!res){
    //                     this.loginInvalid = true;
    //                   }else{
    //                     this.router.navigate(['events']);
    //                   }
    //                 });
  }

  cancel(){
    this.router.navigate(['events']);
  }
}
