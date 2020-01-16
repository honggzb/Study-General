import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuModalComponent } from './au-modal.component';

describe('AuModalComponent', () => {
  let component: AuModalComponent;
  let fixture: ComponentFixture<AuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
