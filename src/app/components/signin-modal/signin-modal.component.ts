import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';
import { ManagersService } from 'src/app/services/managers.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss']
})
export class SigninModalComponent implements OnInit {

  @Input() role!: string;

  @Output() closeMeEvent = new EventEmitter();
  @Output() succeededEvent = new EventEmitter();
  @Output() connectErrorEvent = new EventEmitter();

  serverErrorMessage: string | undefined = undefined;

  public signinForm !: FormGroup;

  private nameMaxLength:number = 16;
  private nameMinLength:number = 4;
  private passwordMaxLength:number = 20;
  private passwordMinLength:number = 8;


  constructor(
    private formBuilder: FormBuilder, 
    private usersService: UsersService, 
    private customValidator: CustomValidatorService, 
    private managersService: ManagersService
  ) { }

  ngOnInit(): void {
    //test
    //console.log(`role is ${this.role}`);

    this.initializeForm();
  }

  
  initializeForm():void{
    this.signinForm = this.formBuilder.group({
      firstName: ['',{
        validators: [
          Validators.minLength(this.nameMinLength),
          Validators.maxLength(this.nameMaxLength)
        ],
        updateOn: 'change'
      }],
      lastName: ['',{
        validators: [
          Validators.minLength(this.nameMinLength),
          Validators.maxLength(this.nameMaxLength)
        ],
        updateOn: 'change'
      }],
      email: ['',[this.customValidator.isValidEmail()]],
      password: ['',{
        validators: [
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength),
          this.customValidator.passwordStrength()
        ],
        updateOn: 'change'
      }],
      confirmPassword: ['',{Validators:[Validators.required]}]
    },
    {
      validator: this.customValidator.passwordMatch('password', 'confirmPassword')
    });
  }

  get firstName() { return this.signinForm.get('firstName'); }
  get lastName() { return this.signinForm.get('lastName'); }
  get email() { return this.signinForm.get('email'); }
  get password() { return this.signinForm.get('password'); }
  get confirmPassword() { return this.signinForm.get('confirmPassword'); }

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

  closeMe() {
    this.closeMeEvent.emit();
  }

  submit(){
    if(this.role === 'user'){
      this.usersService.addUser(this.signinForm.value).subscribe({
        next: () => {
          console.log("user added successfully");
          //this.resetForm(this.signinForm);
          this.closeMe();
        },
        error: (res) => {
          console.log(res);
          console.log("status: " + res.status);
          if(res.status == 409){
            this.serverErrorMessage = "this email already exist"
          }
        },
        complete: () => {}
      });
    }
    else{
      // manager service add manager...
      this.managersService.addManager(this.signinForm.value).subscribe({
        next: () => {
          console.log("manager added successfully");
        },
        error: () => {},
        complete: () => {}
      });
    }
    
  }

  resetForm(signinForm: any){
    console.log("reset form")//test
    //signinForm.form.reset();
    signinForm.reset();
    console.log(signinForm.value);
    this.serverErrorMessage = undefined;
  }
}
