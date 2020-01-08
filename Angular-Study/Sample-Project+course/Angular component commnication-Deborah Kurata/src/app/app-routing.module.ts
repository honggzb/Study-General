import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

import { AuthGuard } from './user/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'products',
        //canActivate: [AuthGuard],
        loadChildren: './products/products.module#ProductsModule'
      },
      { path: 'login',
        loadChildren: './user/user.module#UserModule'
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full'}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
