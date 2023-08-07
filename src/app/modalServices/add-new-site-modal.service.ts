import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AddNewSiteModalComponent } from '../components/add-new-site-modal/add-new-site-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AddNewSiteModalService {

  private componentRef!: ComponentRef<AddNewSiteModalComponent>;
  //private componentSubscriber!: Subject<string>;
  private componentSubscriber!: Subject<JSON>;

  constructor() { }

  openModal(entry: ViewContainerRef){
    console.log("addNewSiteModalService - open new site modal");

    this.componentRef = entry.createComponent(AddNewSiteModalComponent);

    //set modal attributes

    
    //subscribe modal to events
    
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    //this.componentRef.instance.succeededEvent.subscribe(() => this.confirm());
    //this.componentRef.instance.connectErrorEvent.subscribe(() => this.connectError());
    
    //set subscriber
    
    //this.componentSubscriber = new Subject<string>();
    this.componentSubscriber = new Subject<JSON>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    //this.componentSubscriber.complete();
    this.componentRef.destroy();
  }
}
