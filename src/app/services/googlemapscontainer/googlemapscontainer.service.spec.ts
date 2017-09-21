import { TestBed, inject } from '@angular/core/testing';

import { GooglemapscontainerService } from './googlemapscontainer.service';

describe('GooglemapscontainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglemapscontainerService]
    });
  });

  it('should be created', inject([GooglemapscontainerService], (service: GooglemapscontainerService) => {
    expect(service).toBeTruthy();
  }));
});
