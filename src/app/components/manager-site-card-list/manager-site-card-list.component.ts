import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from 'src/app/models/site';
import { siteCategory } from 'src/app/models/siteCategory';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-manager-site-card-list',
  templateUrl: './manager-site-card-list.component.html',
  styleUrls: ['./manager-site-card-list.component.scss']
})
export class ManagerSiteCardListComponent implements OnInit {

  @Input() public sitesList: Site[] = [];

  siteCategories$!:Observable<siteCategory[]>;
  //siteCategories :siteCategory[] = [];
  
  constructor(private sitesService: SitesService) { }

  ngOnInit(): void {
    this.siteCategories$ = this.sitesService.getCategories();
    // this.sitesService.getCategories().subscribe({
    //   next: (res) => {this.siteCategories = res},
    //   error: () => {},
    //   complete: () => {}
    // });
  }

}
