import { TestBed } from '@angular/core/testing';

import { AddNewSiteModalService } from './add-new-site-modal.service';

describe('AddNewSiteModalService', () => {
  let service: AddNewSiteModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewSiteModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
