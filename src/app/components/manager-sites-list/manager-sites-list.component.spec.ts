import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSitesListComponent } from './manager-sites-list.component';

describe('ManagerSitesListComponent', () => {
  let component: ManagerSitesListComponent;
  let fixture: ComponentFixture<ManagerSitesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSitesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
