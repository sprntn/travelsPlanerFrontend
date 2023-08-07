import { TestBed } from '@angular/core/testing';

import { LoginManagerModalServiceService } from './login-manager-modal-service.service';

describe('LoginManagerModalServiceService', () => {
  let service: LoginManagerModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginManagerModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
