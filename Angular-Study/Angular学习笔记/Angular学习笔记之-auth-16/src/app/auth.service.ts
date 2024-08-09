import { Injectable, signal } from '@angular/core';
import { UserInterface } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<UserInterface | undefined | null>(undefined);
}
