import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AddTravelModalComponent } from '../components/add-travel-modal/add-travel-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AddTravelModalService {

  private componentRef!: ComponentRef<AddTravelModalComponent>;
  //private componentSubscriber!: Subject<string>;
  //private componentSubscriber!: Subject<number>;
  private componentSubscriber!: Subject<JSON>;

  constructor() { }

  openModal(entry: ViewContainerRef, travelId: number, modalTitle: string){
    this.componentRef = entry.createComponent(AddTravelModalComponent);

    this.componentRef.instance.title = modalTitle;

    this.componentRef.instance.travelId = travelId;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    //this.componentRef.instance.travelAddedEvent.subscribe((newTravel) => this.openTravelPage(newTravel));
    
    //this.componentSubscriber = new Subject<string>();
    this.componentSubscriber = new Subject<JSON>();
    return this.componentSubscriber.asObservable();
  }

  /*
  openTravelPage(newTravel: JSON){
    //open new travel page then send it the newTravel json
    console.log(newTravel);
    
    //this.componentSubscriber.next('travelAdded');
    this.componentSubscriber.next(newTravel);
    this.closeModal();
  }
  */

  closeModal() {
    //this.componentSubscriber.complete();
    this.componentRef.destroy();
  }
}
