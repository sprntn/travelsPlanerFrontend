import { TestBed } from '@angular/core/testing';

import { SigninManagerModalServiceService } from './signin-manager-modal-service.service';

describe('SigninManagerModalServiceService', () => {
  let service: SigninManagerModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninManagerModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
