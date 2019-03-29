import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShellComponent } from './product-shell.component';

describe('ProductShellComponent', () => {
  let component: ProductShellComponent;
  let fixture: ComponentFixture<ProductShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
