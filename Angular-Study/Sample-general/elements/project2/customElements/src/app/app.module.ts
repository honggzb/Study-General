import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {createCustomElement} from '@angular/elements';

//import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { HeroFormComponent } from './hero-form/hero-form.component';

@NgModule({
  declarations: [
    //AppComponent,
    HelloWorldComponent,
    HeroFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [HelloWorldComponent, HeroFormComponent]
  //bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const custom = createCustomElement(HelloWorldComponent, {injector: injector});
    customElements.define('hello-world', custom);
    const heroFormComponent = createCustomElement(HeroFormComponent, {injector: injector});
    customElements.define('hero-form', heroFormComponent);
  }
  ngDoBootstrap() {}
}
