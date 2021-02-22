import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingListsComponent } from './sorting-lists.component';

describe('SortingListsComponent', () => {
  let component: SortingListsComponent;
  let fixture: ComponentFixture<SortingListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
