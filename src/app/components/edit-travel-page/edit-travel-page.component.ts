import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { GetTravelIdService } from 'src/app/cros-components-services/get-travel-id.service';
import { SelectedSite } from 'src/app/models/selectedSite';
import { Site } from 'src/app/models/site';
import { Travel } from 'src/app/models/travel';
import { SitesService } from 'src/app/services/sites.service';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-edit-travel-page',
  templateUrl: './edit-travel-page.component.html',
  styleUrls: ['./edit-travel-page.component.scss']
})
export class EditTravelPageComponent implements OnInit {

  public travelId: number = 0;

  //public userTravelsList: Travel  = new Travel();
  //public userSitesList: Site[] = [];
  //public userTravelsList$!: Observable< Travel[]>;
  //public travel$!: Observable< Travel>;
  public userSitesList$!: Observable< Site[]>;
  //public travel!: Travel;
  //public travelSites: SelectedSite[] = [];
  public travel$!: Observable<Travel>;
  public travelSites$!: Observable< SelectedSite[]>;

  public userEmail: string = "";

  constructor(
    private route: ActivatedRoute,
    //private getTravelIdService: GetTravelIdService, 
    private travelService: TravelsService, 
    private sitesService: SitesService) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem("userEmail")??"";
    
    this.route.params.subscribe((params: Params) => {
      this.travelId = params['travelId'];
      //test
      console.log("travel id received: " + this.travelId);
      //this.travel$ = this.travelService.getTravel(this.travelId);
      this.travel$ = this.travelService.getTravel(this.travelId);
      this.travelSites$ = this.travelService.getTravelSites(this.travelId);
      
      this.userSitesList$ = this.sitesService.getUserSites(this.userEmail);
    });
    /*
    this.getTravelIdService.travelIdSubject$.subscribe({
      next: (res) => {
        this.travelId = res;
        console.log("travel id: " + this.travelId);
        
         // get travels by id  v
         //get user sites list  v
         // pass the travel to edit travel page
         // pass the sites list to add sites to travel page
         
        //this.userTravelsList$ = this.travelService.getUserTravels(this.userEmail);
        //this.userSitesList$ = this.sitesService.getUserSites(this.userEmail);
        this.travelService.getUserTravels(this.userEmail).subscribe({
          next: (travels) => {
            this.userTravelsList = travels;
            //test
            console.log("user travels:" + JSON.stringify(this.userTravelsList));
          },
          error: () => {},
          complete: () => {}
        });
        this.sitesService.getUserSites(this.userEmail).subscribe({
          next: (sites) => {
            this.userSitesList = sites;
            //test
            console.log("user sites" + JSON.stringify(this.userSitesList));
          },
          error: () => {},
          complete: () => {}
        });
      },
      error: () => {},
      complete: () => {}
    });
    */
  }
}
