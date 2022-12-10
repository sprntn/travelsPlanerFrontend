import { Component, OnInit } from '@angular/core';
import { GetLoggedUserService } from 'src/app/cros-components-services/get-logged-user.service';
import { Site } from 'src/app/models/site';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-logged-user-sites-list',
  templateUrl: './logged-user-sites-list.component.html',
  styleUrls: ['./logged-user-sites-list.component.scss']
})
export class LoggedUserSitesListComponent implements OnInit {

  public sitesList: Site[] = [];
  public currentUserEmail: string = "";

  constructor(private getLoggedUserService :GetLoggedUserService, private sitesService: SitesService) { }

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem("userEmail")??"";
    
    this.sitesService.getUserSites(this.currentUserEmail).subscribe({
      next: (sites) => {
        //console.log("getting user sites");
        this.sitesList = sites;
        console.log("getting user sites: " + JSON.stringify(sites));
      },
      error: () => {},
      complete: () => {}
    });
    /*
    this.getLoggedUserService.userEmailSubject$.subscribe({
      next: (userEmail) => {
        console.log("getting user sites list");
        this.currentUserEmail = userEmail;

        this.sitesService.getUserSites(this.currentUserEmail).subscribe({
          next: (sites) => {
            this.sitesList = sites;
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
