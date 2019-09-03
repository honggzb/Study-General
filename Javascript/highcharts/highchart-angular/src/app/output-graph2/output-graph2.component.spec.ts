import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputGraph2Component } from './output-graph2.component';

describe('OutputGraph2Component', () => {
  let component: OutputGraph2Component;
  let fixture: ComponentFixture<OutputGraph2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputGraph2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputGraph2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
