import { Component, OnInit } from '@angular/core';
import { GetTravelDetailsService } from 'src/app/cros-components-services/get-travel-details.service';
import { Site } from 'src/app/models/site';
import { Travel } from 'src/app/models/travel';
import { SitesService } from 'src/app/services/sites.service';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-travel-page',
  templateUrl: './travel-page.component.html',
  styleUrls: ['./travel-page.component.scss']
})
export class TravelPageComponent implements OnInit {
  
  public travelId: number = 0;
  public sitesList: Site[] = []; 
  //public travel!: Travel;
  public currentUserEmail: string = "";

  constructor(
    private getTravelDetailsService : GetTravelDetailsService, 
    private travelsService: TravelsService,
    private sitesService: SitesService) { }

  ngOnInit(): void {

    //1. add new travel
    //2. get sites list
    //3. select sites
    //4. submit and add each visit to travel by travelId

    this.currentUserEmail = localStorage.getItem("userEmail")??"";
    
    this.sitesService.getUserSites(this.currentUserEmail).subscribe({
      next: (sites) => {
        console.log("getting user sites");
        this.sitesList = sites;
      },
      error: () => {},
      complete: () => {}
    });

    this.getTravelDetailsService.travelDetailsSubject$.subscribe({
      next: (travel) => {
        this.travelsService.addTravel(travel).subscribe({
          next: (res) => {
            this.travelId = res;
          },
          error: () => {},
          complete: () => {}
        });
      },
      error: () => {},
      complete: () => {}
    })
    //this.travelsService.addTravel({}).subscribe({});
    /*
    this.getTravelDetailsService.travelDetailsSubject$.subscribe({
      next: (travel) => {
        console.log(travel);
        
        this.travelsService.addTravel(travel).subscribe({
          
          next: () => {
            this.travel = travel;
            this.sitesService.getUserSites(travel.userEmail).subscribe({
              next: (sites) => {
                this.sitesList = sites;
                console.log(sites);
              },
              error: () => {},
              complete: () => {}
            });
          },
          error: () => {},
          complete: () => {}
        })
        
      },
      error: () => {},
      complete: () => {}
    });
    */
  }

}
