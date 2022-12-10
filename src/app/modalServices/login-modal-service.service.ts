import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';


@Injectable({
  providedIn: 'root'
})
export class LoginModalServiceService {

  private componentRef!: ComponentRef<LoginModalComponent>;
  private componentSubscriber!: Subject<string>;//string as example

  //constructor(private resolver: ComponentFactoryResolver) { }//deprecated
  constructor() { }

  openModal(entry: ViewContainerRef, modalTitle: string){
    //deprecated method/////////
    //let factory = this.resolver.resolveComponentFactory(LoginModalComponent);
    //this.componentRef = entry.createComponent(factory);

    //create new modai instance
    this.componentRef = entry.createComponent(LoginModalComponent);
    //set modal attributes
    this.componentRef.instance.title = modalTitle;
    //subscribe modal to events
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.succeededEvent.subscribe(() => this.confirm());
    this.componentRef.instance.cardinalsErrorEvent.subscribe(() => this.cardinalsError());
    //this.componentRef.instance.failedEvent.subscribe(() => this.reject());//not in use
    this.componentRef.instance.connectErrorEvent.subscribe(() => this.connectError());
    //this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    //this.componentRef.instance.confirmEvent.subscribe(() => this.demoLoginToServer($event));//not working!!!!
    //set subscriber
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  /*
  demoLoginToServer(user: any){
    //login to server
    this.auth_service.demoLoginUser(user.email, user.password).subscribe((res) => {
      console.log(user);
      //console.log("email: " + user.email + " password: " + user.password);
      if(res){
        console.log("successed");
      }
      else{
        console.log("failed");
      }
    })
    //close modal...//canceled for test

    //if()//login success
    //this.confirm
    //else
    //this.reject
  }
  */

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }

  cardinalsError(){
    this.componentSubscriber.next('cardinals error');
    this.closeModal();
  }

  connectError(){
    this.componentSubscriber.next('connect Error');
    this.closeModal();
  }

  //reject(){
  //  this.componentSubscriber.next('reject');
  //  this.closeModal();
  //}
}
