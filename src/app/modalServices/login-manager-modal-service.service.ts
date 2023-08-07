import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginManagerModalComponent } from '../components/login-manager-modal/login-manager-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerModalServiceService {

  private componentRef!: ComponentRef<LoginManagerModalComponent>;
  private componentSubscriber!: Subject<string>;//string as example
  
  constructor() { }

  openModal(entry: ViewContainerRef){
    console.log("loginManagerModalService - open manager login modal");
    //create new modal instance
    this.componentRef = entry.createComponent(LoginManagerModalComponent);

    //set modal attributes

    
    //subscribe modal to events
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.succeededEvent.subscribe(() => this.confirm());
    this.componentRef.instance.cardinalsErrorEvent.subscribe(() => this.cardinalsError());
    this.componentRef.instance.connectErrorEvent.subscribe(() => this.connectError());
    //set subscriber
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

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
}
