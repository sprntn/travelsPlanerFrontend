import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-manager-modal',
  templateUrl: './login-manager-modal.component.html',
  styleUrls: ['./login-manager-modal.component.scss']
})
export class LoginManagerModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() succeededEvent = new EventEmitter();
  @Output() cardinalsErrorEvent = new EventEmitter();
  @Output() connectErrorEvent = new EventEmitter();

  managerEmail: string ="";
  managerPassword: string ="";

  serverErrorMessage: string | undefined = undefined;
  
  constructor(private auth_service: AuthService) { }

  ngOnInit(): void {
    console.log("manager login modal initials");
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  submit(loginForm: any){
    console.log("manager login modal submited");
    this.auth_service.loginManager(this.managerEmail, this.managerPassword).subscribe({
      next: () => {
        localStorage.setItem("managerEmail",this.managerEmail);
        this.succeededEvent.emit();
      },
      error: () => {},
      complete: () => {}
    });
  }

  demoSubmit(){
    localStorage.setItem("managerEmail", "string");
    this.succeededEvent.emit();
  }

  resetForm(loginForm: any){
    console.log("manager login modal reseted");
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
