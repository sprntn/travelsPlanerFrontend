import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSiteModalComponent } from './add-new-site-modal.component';

describe('AddNewSiteModalComponent', () => {
  let component: AddNewSiteModalComponent;
  let fixture: ComponentFixture<AddNewSiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSiteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
