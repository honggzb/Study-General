import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAnimationComponent } from './drag-animation.component';

describe('DragAnimationComponent', () => {
  let component: DragAnimationComponent;
  let fixture: ComponentFixture<DragAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
