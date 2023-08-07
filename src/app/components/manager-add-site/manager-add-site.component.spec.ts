import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddSiteComponent } from './manager-add-site.component';

describe('ManagerAddSiteComponent', () => {
  let component: ManagerAddSiteComponent;
  let fixture: ComponentFixture<ManagerAddSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAddSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAddSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
