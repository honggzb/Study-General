import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LockDirectionComponent } from './lock-direction/lock-direction.component';
import { SortingListComponent } from './sorting-list/sorting-list.component';
import { SortingListsComponent } from './sorting-lists/sorting-lists.component';
import { DragEventComponent } from './drag-event/drag-event.component';
import { DragAnimationComponent } from './drag-animation/drag-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    DashboardComponent,
    LockDirectionComponent,
    SortingListComponent,
    SortingListsComponent,
    DragEventComponent,
    DragAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    LayoutModule,
    MatGridListModule,
    MatIconModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
