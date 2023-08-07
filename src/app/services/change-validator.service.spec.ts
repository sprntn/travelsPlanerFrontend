import { TestBed } from '@angular/core/testing';

import { ChangeValidatorService } from './change-validator.service';

describe('ChangeValidatorService', () => {
  let service: ChangeValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
