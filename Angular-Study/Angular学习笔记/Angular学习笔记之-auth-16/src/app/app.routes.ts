import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'login',
    component: LoginComponent,
    providers: [provideHttpClient(withInterceptors([authInterceptor])),]
  }
];
