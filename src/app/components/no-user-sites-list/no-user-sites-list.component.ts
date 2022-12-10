import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/models/site';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-no-user-sites-list',
  templateUrl: './no-user-sites-list.component.html',
  styleUrls: ['./no-user-sites-list.component.scss']
})
export class NoUserSitesListComponent implements OnInit {

  public sitesList: Site[] = [];
  
  constructor(private sitesService: SitesService) { }

  ngOnInit(): void {
    this.sitesService.getSharedSites().subscribe({
      next: (sites) => {
        this.sitesList = sites;
        console.log("shared sites received");
      },
      error: (error) => {},
      complete: () => {}
    });
  }

}
