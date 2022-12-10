import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AddTravelModalService } from 'src/app/modalServices/add-travel-modal.service';
import { Travel } from 'src/app/models/travel';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-travels-list',
  templateUrl: './travels-list.component.html',
  styleUrls: ['./travels-list.component.scss']
})
export class TravelsListComponent implements OnInit {

  @ViewChild('formModal', { read: ViewContainerRef })
  entry!: ViewContainerRef;

  public travelsList: Travel [] = [];
  public currentUserEmail: string = "";

  title: string = "edit travel modal";
  
  constructor(private addTravelModalService: AddTravelModalService, private travelService: TravelsService) { }

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem("userEmail")??"";
    console.log("user email received: " + this.currentUserEmail);

    this.travelService.getUserTravels(this.currentUserEmail).subscribe({
      next: (travels) => {
        //console.log("getting travels"+travels)
        this.travelsList = travels;
        //console.log("travels :" + JSON.stringify(this.travelsList));
      },
      error: () => {},
      complete: () => {}
    });
  }

  deleteTravel(travelId: number): void{
    console.log(`delete travel: ${travelId}`);
    this.travelService.deleteTravel(travelId).subscribe({
      next: () => {
        this.removeTravelFromList(travelId);
      },
      error: () => {},
      complete: () => {}
    });
  }

  removeTravelFromList(id: number): void{
    console.log("removing travel " + id);
    //remove site from 
    const index = this.travelsList.findIndex((travel) => {
      return travel.travelId == id;
    });
    this.travelsList.splice(index,1);
  }

  editTravel(travelId: number): void{
    console.log("edit travel " + travelId);
    this.addTravelModalService.openModal(this.entry, travelId, this.title);
  }
}
