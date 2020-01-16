import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuTabComponent } from './au-tab.component';

describe('AuTabComponent', () => {
  let component: AuTabComponent;
  let fixture: ComponentFixture<AuTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
