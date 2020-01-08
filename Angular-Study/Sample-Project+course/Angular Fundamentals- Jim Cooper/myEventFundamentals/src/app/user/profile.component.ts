import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TOASTR_TOKEN, Toastr } from './../common/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
    em{ float:right; color:#E05C65;padding-left:10px; font-size: 0.85rem;}
    .error input {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {

  profileForm:FormGroup
  private firstName:FormControl
  private lastName:FormControl

  constructor(private auth: AuthService,
              private router:Router,
              @Inject(TOASTR_TOKEN) private toastr: Toastr) {

   }

  ngOnInit() {
    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  saveProfile(profileFormValue){
    if(this.profileForm.valid){
      this.auth.updateCurrentUser(profileFormValue.firstName, profileFormValue.lastName);
      this.router.navigate(['events']);
      this.toastr.success('Profile Saved!');
    }
  }

  cancel(){
    this.router.navigate(['events']);
  }

  validateLastName(){
    return this.profileForm.controls.lastName.valid && this.lastName.untouched;
  }
  validateFirstName(){
    return this.firstName.valid  && this.firstName.untouched;
  }

  logout(){
    //this.auth.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    //});
  }

}
