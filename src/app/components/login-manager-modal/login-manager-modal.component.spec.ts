import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginManagerModalComponent } from './login-manager-modal.component';

describe('LoginManagerModalComponent', () => {
  let component: LoginManagerModalComponent;
  let fixture: ComponentFixture<LoginManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginManagerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
