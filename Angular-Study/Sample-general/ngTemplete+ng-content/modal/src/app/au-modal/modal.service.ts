import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuModalService {

  private subject = new Subject();
  close$: Observable<any> = this.subject.asObservable();

  constructor() { }

  close() {
    this.subject.next();
  }

}
