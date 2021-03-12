import { TestBed } from '@angular/core/testing';

import { BreakupService } from './breakup.service';

describe('BreakupService', () => {
  let service: BreakupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
