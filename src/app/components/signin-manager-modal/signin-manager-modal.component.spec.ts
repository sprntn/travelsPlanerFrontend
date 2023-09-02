import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninManagerModalComponent } from './signin-manager-modal.component';

describe('SigninManagerModalComponent', () => {
  let component: SigninManagerModalComponent;
  let fixture: ComponentFixture<SigninManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninManagerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
