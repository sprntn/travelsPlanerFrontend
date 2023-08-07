import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSiteCardListComponent } from './manager-site-card-list.component';

describe('ManagerSiteCardListComponent', () => {
  let component: ManagerSiteCardListComponent;
  let fixture: ComponentFixture<ManagerSiteCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSiteCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSiteCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
