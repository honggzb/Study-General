import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';

import {CoursesModule} from './courses/courses.module';
import { CourseTitleComponent } from './course-title/course-title.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightedDirective,
    NgxUnlessDirective,
    CourseTitleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoursesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CourseTitleComponent]
})
export class AppModule { }
