import { Component, Input, OnInit } from '@angular/core';
import { GetLoggedUserService } from 'src/app/cros-components-services/get-logged-user.service';
import { Site } from 'src/app/models/site';
import { SitesService } from 'src/app/services/sites.service';
//import { Site } from '../../models/site';
//import { VisitedSite } from '../../models/visitedSite';

@Component({
  selector: 'app-site-card-list',
  templateUrl: './site-card-list.component.html',
  styleUrls: ['./site-card-list.component.scss']
})
export class SiteCardListComponent implements OnInit {

  @Input() public sitesList: Site[] = [];
  @Input() public isTravelOpen!: boolean;
  @Input() public travelId!: number;
  @Input() public currentUserEmail: string = "";
  //public visitedSitesList: VisitedSite[] = []; 

  @Input() startTravelDate!: Date;
  @Input() endTravelDate!: Date;
  
  private selectedSitesList: Site[] = [];
  
  constructor(private getLoggedUserService :GetLoggedUserService, private sitesService: SitesService) {}

  /*
  ngOnInit(): void{
    this.sitesList = this.sitesService.serviceSitesList;
    console.log("site card list call to siteService");
    this.sitesService.setSites();
    
  }
  */

  
  ngOnInit(): void {
  }

  addSiteToUserList(siteId: number): void{
    console.log("adding site to used sites list " + siteId);
    //add to temp list
    const index = this.sitesList.findIndex((site) => {
      site.siteId == siteId
    });
    //var site = new Site();
    //site = this.sitesList[index];
    /*
    const site = new Site();
    site.imageSource = this.sitesList[index].imageSource;
    site.siteAverageRating = this.sitesList[index].siteAverageRating;
    site.siteDescription = this.sitesList[index].siteDescription;
    site.siteId = siteId;
    site.siteName = this.sitesList[index].siteName;
    site.webSite = this.sitesList[index].webSite;

    this.selectedSitesList.push(site);
    */
   this.selectedSitesList.push(this.sitesList[index]);
  }

  removeSiteFromList(siteId: number): void{
    console.log("removing site " + siteId);
    //remove site from 
    const index = this.sitesList.findIndex((site) => {
      return site.siteId == siteId;
    });
    this.sitesList.splice(index,1);
  }
}
