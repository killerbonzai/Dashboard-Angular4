import { TestBed, inject } from '@angular/core/testing';

import { GooglechartsService } from './googlecharts.service';

describe('GooglechartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglechartsService]
    });
  });

  it('should be created', inject([GooglechartsService], (service: GooglechartsService) => {
    expect(service).toBeTruthy();
  }));
});
