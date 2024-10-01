import { TestBed } from '@angular/core/testing';

import { CentreDonService } from './centre-don.service';

describe('CentreDonService', () => {
  let service: CentreDonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreDonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
