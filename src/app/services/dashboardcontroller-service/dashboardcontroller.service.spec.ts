import { TestBed, inject } from '@angular/core/testing';

import { DashboardcontrollerService } from './dashboardcontroller.service';

describe('DashboardcontrollerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardcontrollerService]
    });
  });

  it('should be created', inject([DashboardcontrollerService], (service: DashboardcontrollerService) => {
    expect(service).toBeTruthy();
  }));
});
