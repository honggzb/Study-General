import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ClapButtonModule } from './clap-button/clap-button.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ClapButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}