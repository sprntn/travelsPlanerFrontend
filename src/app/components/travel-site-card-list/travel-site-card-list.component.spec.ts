import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSiteCardListComponent } from './travel-site-card-list.component';

describe('TravelSiteCardListComponent', () => {
  let component: TravelSiteCardListComponent;
  let fixture: ComponentFixture<TravelSiteCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelSiteCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelSiteCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
