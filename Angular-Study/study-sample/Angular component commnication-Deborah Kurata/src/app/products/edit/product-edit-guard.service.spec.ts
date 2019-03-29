import { TestBed } from '@angular/core/testing';

import { ProductEditGuardService } from './product-edit-guard.service';

describe('ProductEditGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductEditGuardService = TestBed.get(ProductEditGuardService);
    expect(service).toBeTruthy();
  });
});
