import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetLoggedUserService } from 'src/app/cros-components-services/get-logged-user.service';
import { AddNewSiteModalService } from 'src/app/modalServices/add-new-site-modal.service';
//import { GetTravelDetailsService } from 'src/app/cros-components-services/get-travel-details.service';
import { AddTravelModalService } from 'src/app/modalServices/add-travel-modal.service';
import { LoginManagerModalServiceService } from 'src/app/modalServices/login-manager-modal-service.service';
import { LoginModalServiceService } from 'src/app/modalServices/login-modal-service.service';
import { PreferencesModalService } from 'src/app/modalServices/preferences-modal.service';
import { SigninModalServiceService } from 'src/app/modalServices/signin-modal-service.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit, OnDestroy {

  //@ViewChild('loginModal', { read: ViewContainerRef })
  @ViewChild('formModal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  public showMenu:boolean = true;
  public isLoggedUser:boolean = false;
  public isOpenModal: boolean = false;
  public showingHistory: boolean = false;

  public role:string = "user";

  loginModalTitle: string = "enter email and password to log in"
  addTravelModalTitle: string = "add travel modal"

  public userEmail!: string;

  constructor(
    private addNewSiteService: AddNewSiteModalService,
    private getLoggedUserService :GetLoggedUserService,
    //private getTravelDetailsService : GetTravelDetailsService,
    private loginModalService: LoginModalServiceService,
    private loginManagerModalService: LoginManagerModalServiceService,
    private signinModalService: SigninModalServiceService,
    private preferencesModalService: PreferencesModalService,
    private addTravelModalService: AddTravelModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.getLoggedUserService.userEmailSubject$.subscribe((email) => {
      this.userEmail = email;
      console.log("user email received: " + this.userEmail);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  
  private openAddTravelModal() : void{
    this.addTravelModalService.openModal(this.entry, 0, this.addTravelModalTitle);
    /*
    this.sub = this.addTravelModalService.openModal(this.entry).subscribe({
      next: (res) => {
        //temp
        console.log(res);
        //navigate to travel page

        //test
        //this.router.navigate(['main-page/user-travel-page']);
        //send travel details
        //this.getTravelDetailsService.travelDetailsSubject$.next(res);
      },
      error: () => {},
      complete: () => {}
    });
    */
  }

  private openSigninModal(): void{
    this.sub = this.signinModalService.openModal(this.entry, this.loginModalTitle).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {},
      complete: () => {}
    });
  }

  private openPreferencesModal():void{
    //this.sub = this.preferencesModalService.openModal(this.entry).subscribe({
    this.sub = this.preferencesModalService.openModal(this.entry, this.userEmail).subscribe({//temp with userEmail. need to be retrieved from the token
      next: () => {
        
      },
      error: () => {},
      complete: () => {}
    });
  }

  private openNewSiteModal(): void{
    console.log("main navbar open new site modal");
    this.sub = this.addNewSiteService.openModal(this.entry).subscribe();
  }

  private openLoginManagerModal(): void{
    console.log("main navbar - open manager login modal");
    this.sub = this.loginManagerModalService.openModal(this.entry).subscribe({
      next: (res: string) => {
        switch(res){
          case 'confirm':
            console.log('succeeded');
            this.isLoggedUser = true;
            this.router.navigate(['main-page/logged-manager-sites']);

            break;
          case 'reject':
            console.log('rejected');
            break;
          case 'connectError':
            console.log('not connecected');
        }
      },
      error: () => {},
      complete: () => {this.isOpenModal = false;}

    })
  }

  private openLoginModal():void{
    this.sub = this.loginModalService.openModal(this.entry, this.loginModalTitle).subscribe({
      next: (res: string) => {
        switch(res){
          case 'confirm':
            console.log('succeeded');
            this.isLoggedUser = true;
            this.router.navigate(['main-page/logged-user-sites']);

            break;
          case 'reject':
            console.log('rejected');
            break;
          case 'connectError':
            console.log('not connecected');
        }
      },
      error: () => {},
      complete: () => {this.isOpenModal = false;}
    });
    
  }

  changeBtnShow(): void{
    this.showMenu = !this.showMenu;
  }

  
  loginManager(): void{
    console.log("login manager");
    this.isOpenModal = true;
    this.openLoginManagerModal();
  }

  addSite(): void{
    console.log("add site button played!");
    this.isOpenModal = true;
    this.openNewSiteModal();
  }

  login():void{
    console.log("login");
    //disable login button
    this.isOpenModal = true;
    //open login modal
    this.openLoginModal();
    //this.isLoggedUser = true;

    //navigate to sitesList - suggested sites
    //this.router.navigate(['main-page/site-list']);//Now the navigation goes through loggedUserSitesList

  }

  exchangeLoginSignin(){
    this.isLoggedUser = !this.isLoggedUser;
  }

  exchangeSitesHistory(){
    this.showingHistory = !this.showingHistory;
  }

  logout():void{
    console.log("logout");
    this.isLoggedUser = false;

    //delete token from local
    localStorage.clear();

    this.getLoggedUserService.userEmailSubject$.next("");

    //clean sitesList
    this.router.navigate(['main-page/no-user-sites']);
  }

  createAccount():void{
    console.log("create account");
    //disable signin button

    //open modal register
    this.openSigninModal();
  }

  setPreferences(): void{
    console.log("set preferences");
    this.openPreferencesModal();
  }

  createTravel(): void{
    console.log("create travel");
    //open add travel modal
    this.openAddTravelModal();
  }

  showHistory():void{
    console.log("show history");
    this.showingHistory = true;
    //navigate to visits List - history sites
    this.router.navigate(['main-page/logged-user-visits']);
  }

  showSites():void{
    console.log("show sites");
    this.showingHistory = false;
    //navigate to sitesList - suggested sites
    this.router.navigate(['main-page/logged-user-sites']);
  }

  showTravels(): void{
    console.log("show travels");
    this.router.navigate(['main-page/user-travels-list']);
  }

  goToUserPage(): void{
    console.log("user page");
    this.role = "user";
    if(this.isLoggedUser){
      if(this.showingHistory){
        this.router.navigate(['main-page/logged-user-visits']);
      }else{
        this.router.navigate(['main-page/logged-user-sites']);
      }
    }else{
      this.router.navigate(['main-page/no-user-sites']);
    }
  }

  goToAdminPage():void{
    console.log("admin page");
    this.role = "admin";
    this,this.router.navigate(['/admin'])
  }
  
  loginAdmin(): void{
    console.log("login admin");
  }

  goToManagerPage():void{
    console.log("manager page");
    this.role = "manager";
  }
}

