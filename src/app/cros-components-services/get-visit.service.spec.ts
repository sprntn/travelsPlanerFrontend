import { TestBed } from '@angular/core/testing';

import { GetVisitService } from './get-visit.service';

describe('GetVisitService', () => {
  let service: GetVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
