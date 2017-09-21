import { TestBed, inject } from '@angular/core/testing';

import { GmapSAASService } from './gmap.service';

describe('GmapSAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GmapSAASService]
    });
  });

  it('should be created', inject([GmapSAASService], (service: GmapSAASService) => {
    expect(service).toBeTruthy();
  }));
});
