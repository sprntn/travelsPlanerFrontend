import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTravelComponent } from './components/add-travel/add-travel.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { EditTravelPageComponent } from './components/edit-travel-page/edit-travel-page.component';
import { LoggedUserSitesListComponent } from './components/logged-user-sites-list/logged-user-sites-list.component';
import { LoggedUserVisitsListComponent } from './components/logged-user-visits-list/logged-user-visits-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NoUserSitesListComponent } from './components/no-user-sites-list/no-user-sites-list.component';
import { SiteCardListComponent } from './components/site-card-list/site-card-list.component';
import { TravelPageComponent } from './components/travel-page/travel-page.component';
import { TravelsListComponent } from './components/travels-list/travels-list.component';
import { VisitCardListComponent } from './components/visit-card-list/visit-card-list.component';

const routes: Routes = [
  {path: 'admin', component: AdminPageComponent},
  {path: 'manager', component: AdminPageComponent},
  {path: 'travel', component: TravelPageComponent},
  {
    path: 'main-page', 
    component: MainPageComponent,
    children: [
      //{path: '', component: MainPageComponent},
      {path: 'site-list' , component: SiteCardListComponent},
      {path: 'visits-list' , component: VisitCardListComponent},
      {path: 'logged-user-sites', component: LoggedUserSitesListComponent},
      {path: 'logged-user-visits', component: LoggedUserVisitsListComponent},
      {path: 'no-user-sites', component: NoUserSitesListComponent},
      {path: 'user-travel-page', component: TravelPageComponent},
      {path: 'add-travel', component: AddTravelComponent},
      {path: 'edit-travel/:travelId', component: EditTravelPageComponent},
      {path: 'user-travels-list', component: TravelsListComponent}
    ]
  },
  {path: '', pathMatch: 'full', redirectTo: 'main-page/no-user-sites'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
