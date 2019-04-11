import { Component, Inject } from "@angular/core";
import { Toastr, TOASTR_TOKEN } from "../toastr/toastr.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  profile: any;

  constructor(
    @Inject('$location') public $location,
    @Inject('currentIdentity') public currentIdentity,
    @Inject(TOASTR_TOKEN) public toastr: Toastr
  ) {}

  save(newProfile) {
    this.currentIdentity.updateUser(newProfile);
    this.toastr.success('Profile Saved!');
  }

  cancel() {
    this.$location.path('/home');
  }
}
