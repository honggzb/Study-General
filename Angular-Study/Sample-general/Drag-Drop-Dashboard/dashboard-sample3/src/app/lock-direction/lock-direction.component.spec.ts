import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockDirectionComponent } from './lock-direction.component';

describe('LockDirectionComponent', () => {
  let component: LockDirectionComponent;
  let fixture: ComponentFixture<LockDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
