import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/models/site';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-manager-sites-list',
  templateUrl: './manager-sites-list.component.html',
  styleUrls: ['./manager-sites-list.component.scss']
})
export class ManagerSitesListComponent implements OnInit {

  public sitesList: Site[] = [];
  public managerEmail: string = "";
  
  constructor(private sitesService: SitesService) { }

  ngOnInit(): void {
    this.managerEmail = localStorage.getItem("managerEmail")??"";

    this.sitesService.getManagerSites(this.managerEmail).subscribe({
      next: (sites) => {
        // const x = sites.map(s => {const site : Site = {
        //   imageSource: s.imageSource,
        //   mainCategoryId: s.mainCategoryFK
        // }

        // }})

        this.sitesList = sites;

        // this.sitesList = sites.map(s => {
        //   const site = new Site();
        //   site.imageSource = s.imageSource;
        //   site.mainCategoryId = s.mainCategoryFK
        //   return site;
        // })

        console.log("getting manager sites: " + JSON.stringify(sites));
      },
      error: () => {},
      complete: () => {}
    });
  }

}
