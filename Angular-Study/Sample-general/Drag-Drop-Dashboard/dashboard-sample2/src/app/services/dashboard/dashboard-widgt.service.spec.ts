import { TestBed } from '@angular/core/testing';

import { DashboardWidgtService } from './dashboard-widgt.service';

describe('DashboardWidgtService', () => {
  let service: DashboardWidgtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardWidgtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
