import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {TokenInterceptorService} from './services/token-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SigninModalComponent } from './components/signin-modal/signin-modal.component';
import { SiteCardComponent } from './components/site-card/site-card.component';
import { SiteCardListComponent } from './components/site-card-list/site-card-list.component';
import { RatingStarComponent } from './components/rating-star/rating-star.component';
import { VisitCardComponent } from './components/visit-card/visit-card.component';
import { VisitCardListComponent } from './components/visit-card-list/visit-card-list.component';
import { PreferencesModalComponent } from './components/preferences-modal/preferences-modal.component';
import { TravelPageComponent } from './components/travel-page/travel-page.component';
import { AddTravelModalComponent } from './components/add-travel-modal/add-travel-modal.component';
import { TravelsListComponent } from './components/travels-list/travels-list.component';
import { NoUserSitesListComponent } from './components/no-user-sites-list/no-user-sites-list.component';
import { LoggedUserSitesListComponent } from './components/logged-user-sites-list/logged-user-sites-list.component';
import { LoggedUserVisitsListComponent } from './components/logged-user-visits-list/logged-user-visits-list.component';
import { NoRatingStarComponent } from './components/no-rating-star/no-rating-star.component';
import { TravelCardComponent } from './components/travel-card/travel-card.component';

import { EditTravelPageComponent } from './components/edit-travel-page/edit-travel-page.component';

import { AddTravelComponent } from './components/add-travel/add-travel.component';
import { TravelSiteCardComponent } from './components/travel-site-card/travel-site-card.component';
import { TravelSiteCardListComponent } from './components/travel-site-card-list/travel-site-card-list.component';
import { DateInRangeValidatorDirective } from './directives/date-in-range-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    AdminPageComponent,
    MainPageComponent,
    LoginModalComponent,
    SigninModalComponent,
    SiteCardComponent,
    SiteCardListComponent,
    RatingStarComponent,
    VisitCardComponent,
    VisitCardListComponent,
    PreferencesModalComponent,
    TravelPageComponent,
    AddTravelModalComponent,
    TravelsListComponent,
    NoUserSitesListComponent,
    LoggedUserSitesListComponent,
    LoggedUserVisitsListComponent,
    NoRatingStarComponent,
    TravelCardComponent,

    EditTravelPageComponent,

    AddTravelComponent,
     TravelSiteCardComponent,
     TravelSiteCardListComponent,
     DateInRangeValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
