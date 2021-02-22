import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicComponent } from './basic/basic.component';
import { LockDirectionComponent } from './lock-direction/lock-direction.component';
import { SortingListComponent } from './sorting-list/sorting-list.component';
import { SortingListsComponent } from './sorting-lists/sorting-lists.component';
import { DragEventComponent } from './drag-event/drag-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragAnimationComponent } from './drag-animation/drag-animation.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'basic' },
  { path: 'basic', component: BasicComponent },
  { path: 'lock', component: LockDirectionComponent },
  { path: 'drag-event', component: DragEventComponent },
  { path: 'sorting-list', component: SortingListComponent },
  { path: 'sorting-lists', component: SortingListsComponent },
  { path: 'sorting-animation', component: DragAnimationComponent },
  { path: 'dashboard', component: DashboardComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
