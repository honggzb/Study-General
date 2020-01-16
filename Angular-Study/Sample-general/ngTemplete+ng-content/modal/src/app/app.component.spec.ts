import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuModalModule } from './au-modal/au-modal.module';
import { AuTabPanelModule } from './au-tab-panel//au-tab-panel.module';

describe('AppComponent', () => {

  let component: AppComponent,
      fixture: ComponentFixture<AppComponent>,
      el: DebugElement,
      tabPanel: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        AuModalModule.forRoot(),
        AuTabPanelModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        el = fixture.debugElement;
        tabPanel = el.query(By.css('#testModal'));
        fixture.detectChanges();
    });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should open the modal when the test button is clicked', async(() => {
    fixture.nativeElement.querySelector("#testButton").click();
    fixture.detectChanges();
    const openedModal = fixture.nativeElement.querySelector("#testModal");
    expect(openedModal).toBeTruthy();
  }));

});
