import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

interface CurrentUser {
  firstName: string;
  lastName: string;
  id: number;
}

@Injectable()
export class CurrentIdentity {

  currentUser: CurrentUser = null;

  constructor(private http: Http) { }

  setUser(user) {
    this.currentUser = user;
  }

  clearUser() {
    this.currentUser = null;
  }

  authenticated() {
    return !!this.currentUser;
  }

  updateUser(newUserObj) {
    return this.http.put('/api/users/' + this.currentUser.id, newUserObj)
               .map((rsp: Response) => {
                this.currentUser.firstName = newUserObj.firstName;
                this.currentUser.lastName = newUserObj.lastName;
              }).toPromise();
  }

}