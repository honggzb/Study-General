import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { ExamplesComponent } from './examples/examples.component';
import { HowtoComponent } from './howto/howto.component';

export const router: Routes = [
  { path: '', redirectTo: 'howto', pathMatch: 'full' },
  { path: 'howto', component: HowtoComponent },
  { path: 'examples', component: ExamplesComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
