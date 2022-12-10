import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

import { SigninModalComponent } from '../components/signin-modal/signin-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SigninModalServiceService {

  private componentRef!: ComponentRef<SigninModalComponent>;
  private componentSubscriber!: Subject<string>;

  constructor() { }

  openModal(entry: ViewContainerRef, modalTitle: string){
    this.componentRef = entry.createComponent(SigninModalComponent);
    this.componentRef.instance.title = modalTitle;
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
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm\nmodal is open');
    this.closeModal();
  }
}
