import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin-manager-modal',
  templateUrl: './signin-manager-modal.component.html',
  styleUrls: ['./signin-manager-modal.component.scss']
})
export class SigninManagerModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() succeededEvent = new EventEmitter();
  @Output() connectErrorEvent = new EventEmitter();

  public signinForm !: FormGroup;

  private nameMaxLength:number = 16;
  private nameMinLength:number = 4;

  serverErrorMessage: string | undefined = undefined;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  get firstName() { return this.signinForm.get('firstName'); }

  initializeForm() {
    this.signinForm = this.formBuilder.group({
      firstName: ['',{
        validators: [
          Validators.minLength(this.nameMinLength),
          Validators.maxLength(this.nameMaxLength)
        ],
        updateOn: 'change'
      }],
    });
  }

  anyClick(event: any){
    if(event.target.nodeName === 'SECTION'){//להשלים ניקוי
      this.closeMeEvent.emit();
    }
    else
    {
      if(event.target.nodeName === 'INPUT' && this.serverErrorMessage){
        this.serverErrorMessage = undefined;//clear the server error message
      }
    }
  }

}
