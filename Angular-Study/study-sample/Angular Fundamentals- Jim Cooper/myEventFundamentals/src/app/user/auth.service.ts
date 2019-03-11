import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { catchError, tap  } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
  currentUser: IUser
  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string){
    this.currentUser = {
      id: 1,
      userName: 'John',
      firstName: 'John',
      lastName: 'Papa'
    }
    // let loginInfo = { username: userName, password: password };
    // let options = { headers: new HttpHeaders({ 'content-Type':'application/json'})};
    // return this.http.post('/api/login', loginInfo, options)
    //          .pipe(tap(data => {
    //            this.currentUser = <IUser>data['user']
    //          }))
    //          .pipe(catchError(err => {
    //            return of(false);
    //          }));
  }

  isAuhtenticated(){
    return !!this.currentUser;
  }

  updateCurrentUser(firstName:string, lastName:string){
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

  checkAuthenticationStatus(){
    // this.http.get('/api/currentIdentity').subscribe(data =>{
    //   if(data instanceof Object){
    //     this.currentUser = <IUser>data;
    //   }
    // });
    return this.http.get('/api/currentIdentity')
                    .pipe(tap(data =>{
                        if(data instanceof Object){
                          this.currentUser = <IUser>data;
                        }
                      }));
  }

}
