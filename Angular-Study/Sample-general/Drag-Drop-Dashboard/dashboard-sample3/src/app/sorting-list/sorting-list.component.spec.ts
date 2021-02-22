import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingListComponent } from './sorting-list.component';

describe('SortingListComponent', () => {
  let component: SortingListComponent;
  let fixture: ComponentFixture<SortingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
