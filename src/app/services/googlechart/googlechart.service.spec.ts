import { TestBed, inject } from '@angular/core/testing';

import { GooglechartService } from './googlechart.service';

describe('GooglechartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglechartService]
    });
  });

  it('should be created', inject([GooglechartService], (service: GooglechartService) => {
    expect(service).toBeTruthy();
  }));
});
