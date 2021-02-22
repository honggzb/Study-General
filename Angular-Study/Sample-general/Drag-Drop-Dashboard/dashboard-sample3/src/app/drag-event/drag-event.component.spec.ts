import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragEventComponent } from './drag-event.component';

describe('DragEventComponent', () => {
  let component: DragEventComponent;
  let fixture: ComponentFixture<DragEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
