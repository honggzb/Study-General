
import { Component, Inject, OnChanges } from "@angular/core";
import { TOASTR_TOKEN, Toastr } from '../toastr/toastr.service';
import { Router } from '@angular/router';

import { CurrentIdentity } from './../security/currentIdentity.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnChanges {

  constructor(
    //@Inject('currentIdentity') private currentIdentity,
    private currentIdentity: CurrentIdentity,
    @Inject('auth') private auth,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private router: Router) {}

  ngOnChanges() {
    if (this.currentIdentity.authenticated()) {
      this.router.navigate(['/admin/results']);
      //location.path('/home');
    }
  }

  login(newForm) {
    this.auth.login({
      username: newForm.email,
      password: "pass"
    }).then(() => {
      this.router.navigate(['/admin/results'])
      //this.$location.path('/home');
    }, (err) => {
      this.toastr.error(err);
    })
  }
}