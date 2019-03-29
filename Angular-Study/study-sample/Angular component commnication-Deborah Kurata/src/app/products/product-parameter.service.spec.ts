import { TestBed } from '@angular/core/testing';

import { ProductParameterService } from './product-parameter.service';

describe('ProductParameterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductParameterService = TestBed.get(ProductParameterService);
    expect(service).toBeTruthy();
  });
});
