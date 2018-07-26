import { TestBed, inject } from '@angular/core/testing';

import { MicroDashService } from './micro-dash.service';

describe('MicroDashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MicroDashService]
    });
  });

  it('should be created', inject([MicroDashService], (service: MicroDashService) => {
    expect(service).toBeTruthy();
  }));
});
