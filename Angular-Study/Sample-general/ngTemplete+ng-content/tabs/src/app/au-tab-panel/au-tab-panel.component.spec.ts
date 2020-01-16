import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuTabPanelComponent } from './au-tab-panel.component';

describe('AuTabPanelComponent', () => {
  let component: AuTabPanelComponent;
  let fixture: ComponentFixture<AuTabPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuTabPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuTabPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
