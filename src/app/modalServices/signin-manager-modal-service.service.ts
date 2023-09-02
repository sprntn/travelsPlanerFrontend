import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { SigninManagerModalComponent } from '../components/signin-manager-modal/signin-manager-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SigninManagerModalServiceService {

  private componentRef!: ComponentRef<SigninManagerModalComponent>;
  private componentSubscriber!: Subject<string>;

  constructor() { }

  //openModal(entry: ViewContainerRef, modalTitle: string)
  openModal(entry: ViewContainerRef)
  {
    this.componentRef = entry.createComponent(SigninManagerModalComponent);

    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.succeededEvent.subscribe(() => this.confirm());
    this.componentRef.instance.connectErrorEvent.subscribe(() => this.connectError());

    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }
  connectError(): void {
    this.componentSubscriber.next('connect Error');
    this.closeModal();
  }

  closeModal() {
    //test
    console.log('close event here');
    this.componentSubscriber.next('closing modal');
    
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm\nmodal is open');
    this.closeModal();
  }
}
