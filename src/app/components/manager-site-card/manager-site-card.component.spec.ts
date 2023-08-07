import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSiteCardComponent } from './manager-site-card.component';

describe('ManagerSiteCardComponent', () => {
  let component: ManagerSiteCardComponent;
  let fixture: ComponentFixture<ManagerSiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSiteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
