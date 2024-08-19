import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { MessagesService } from '../messages/messages.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb = inject(FormBuilder);

  messageService = inject(MessagesService);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.group({
    email: [''],
    password: ['']
  });

  async onLogin() {
    try {
      const {email, password} = this.form.value;
      if(!email || !password) {
        this.messageService.showMessage(
          'enter an email and password',
          'error'
        );
        return;
      }
      await this.authService.login(email, password);
      await this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
      this.messageService.showMessage(
        'Login failed, please try again',
        'error'
      )
    }
  }
}
