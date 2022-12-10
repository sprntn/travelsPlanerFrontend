import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSiteCardComponent } from './travel-site-card.component';

describe('TravelSiteCardComponent', () => {
  let component: TravelSiteCardComponent;
  let fixture: ComponentFixture<TravelSiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelSiteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelSiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
