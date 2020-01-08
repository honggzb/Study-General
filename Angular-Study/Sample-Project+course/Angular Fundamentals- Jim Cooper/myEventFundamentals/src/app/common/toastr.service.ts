// import { Injectable } from '@angular/core';

// declare let toastr:any;

// @Injectable({
//   providedIn: 'root'
// })
// export class ToastrService {

//   success(message: string, title?:string){
//     toastr.success(message, title);
//   }

//   info(message: string, title?:string){
//     toastr.info(message, title);
//   }

//   warning(message: string, title?:string){
//     toastr.warning(message, title);
//   }

//   error(message: string, title?:string){
//     toastr.error(message, title);
//   }

// }
import { InjectionToken } from '@angular/core';

export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr {
  success(message: string, title?:string):void;
  info(message: string, title?:string):void;
  warning(message: string, title?:string):void;
  error(message: string, title?:string):void;
}
