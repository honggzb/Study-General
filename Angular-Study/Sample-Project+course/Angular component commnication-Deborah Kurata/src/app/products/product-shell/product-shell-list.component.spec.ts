import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShellListComponent } from './product-shell-list.component';

describe('ProductShellListComponent', () => {
  let component: ProductShellListComponent;
  let fixture: ComponentFixture<ProductShellListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShellListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
