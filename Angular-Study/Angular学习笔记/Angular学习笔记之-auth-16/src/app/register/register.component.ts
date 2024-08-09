import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  onSubmit(): void {
    //console.log('register');
    this.http.post<{user: UserInterface}>('https://api.realworld.io/api/users', {
      user: this.form.getRawValue(),
    }).subscribe((response) => {
      localStorage.setItem('token', response.user.token);
      this.authService.currentUserSig.set(response.user);
      this.router.navigateByUrl('/');
    });
  }
}
