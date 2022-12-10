import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PreferencesModalComponent } from '../components/preferences-modal/preferences-modal.component';

@Injectable({
  providedIn: 'root'
})
export class PreferencesModalService {

  private componentRef!: ComponentRef<PreferencesModalComponent>;
  private componentSubscriber!: Subject<string>;

  constructor() { }

  //openModal(entry: ViewContainerRef){
  openModal(entry: ViewContainerRef, userEmail:string){//temp with userEmail. need to be retrieved from the token
    this.componentRef = entry.createComponent(PreferencesModalComponent);

    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());

    this.componentSubscriber = new Subject<string>();

    this.componentRef.instance.userEmail = userEmail;

    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

}
