import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GetLoggedUserService } from 'src/app/cros-components-services/get-logged-user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {

  @Input() title!: string;//for test only

  //modal events
  @Output() closeMeEvent = new EventEmitter();
  //@Output() confirmEvent = new EventEmitter();//not in use
  //@Output() failedEvent = new EventEmitter();//not  in use
  @Output() succeededEvent = new EventEmitter();
  @Output() cardinalsErrorEvent = new EventEmitter();
  @Output() connectErrorEvent = new EventEmitter();

  userEmail: string ="";
  userPassword: string ="";

  demoUserEmail = "string2";

  serverErrorMessage: string | undefined = undefined;

  form!: NgForm;

  constructor(
    private auth_service: AuthService,
    private getLoggedUserService :GetLoggedUserService) { }

  ngOnInit(): void {
  }

  

  closeMe() {
    this.closeMeEvent.emit();
  }

  demoSubmit(){
    this.succeededEvent.emit();
    console.log(this.userEmail);

    localStorage.setItem("userEmail",this.demoUserEmail);
    this.getLoggedUserService.userEmailSubject$.next(this.demoUserEmail);//pass user email to sites list component
  }

  submit(loginForm: any){
    this.auth_service.loginUser(this.userEmail, this.userPassword).subscribe({
      next: (res) => {
        console.log(res);
        const token = (<any>res).jwtToken;
        localStorage.setItem("jwt",token);
        localStorage.setItem("userEmail",this.userEmail);
        console.log("test");
        console.log("token: " + token);
        console.log("logged in successfully");
        this.getLoggedUserService.userEmailSubject$.next(this.userEmail);
        this.succeededEvent.emit(); 
      },
      error: (error: any) => {
        console.log(error);
        this.resetForm(loginForm);
        this.serverErrorMessage = error;
        //this.cardinalsErrorEvent.emit();
      },
      complete: () =>{}
    });
    /*
    this.auth_service.demoLoginUser(this.userEmail, this.userPassword).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem("demoToken",res);
        console.log("logged in successfully");
        this.getLoggedUserService.userEmailSubject$.next(this.userEmail);//pass user email to sites list component
        this.succeededEvent.emit(); 
      },
      error: (error) => {
        console.log(error);
        //this.failedEvent.emit();//צריך לשנות להודעת שגיאה במסך ואיחול במקום סגירה
        this.resetForm(loginForm);
        this.serverErrorMessage = error;
      },
      complete: () => {
        
      }
    });
    */
  }

  testTokenGetBack(){
    this.auth_service.demoGetToken().subscribe((res) => {
      console.log("server said your email is: " + res);
    });
  }

  connectError(){
    this.connectErrorEvent.emit();
  }

  //confirm() {//not in use
  //  this.confirmEvent.emit();
  //} 

  resetForm(loginForm: any){
    //this.userEmail = "";
    //this.userPassword = "";
    //clear validators
    loginForm.form.reset();
    console.log(loginForm.value);
    this.serverErrorMessage = undefined;
  }

  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }

  anyClick(event: any){
    console.log("outside click");
    //var x = event.target
    //if(x.tagName ==='SECTION')
    if(event.target.nodeName === 'SECTION'){
      console.log("event catched!!!");
      this.closeMeEvent.emit();
    }
    else{
      if(event.target.nodeName === 'INPUT' && this.serverErrorMessage){
        this.serverErrorMessage = undefined;//clear the server error message
      }
    }
    console.log(event.target.nodeName);
  }

}
