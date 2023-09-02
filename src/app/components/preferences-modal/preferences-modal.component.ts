import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
//import { fork } from 'cluster';
import { forkJoin, Observable } from 'rxjs';
import {siteCategory} from 'src/app/models/siteCategory'
import { userPreferences } from 'src/app/models/userPreferences';
import { SitesService } from 'src/app/services/sites.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-preferences-modal',
  templateUrl: './preferences-modal.component.html',
  styleUrls: ['./preferences-modal.component.scss']
})
export class PreferencesModalComponent implements OnInit {

  
  @Output() closeMeEvent = new EventEmitter();

  public preferencesForm !: FormGroup;

  currentRating = 0;//the rating selected by the user
  hoverRating = 0;

  @Input() userEmail: string ="";

  stars = [1,2,3,4,5];

  siteCategories!: siteCategory[];//כפול, לתקן אחר כך
  siteCategories$!:Observable<siteCategory[]>;

  selectedCategoryId!:number;
  selectedCategoryName!:string;

  preferencesList: userPreferences[] = [];
  //preferencesList$!: Observable<userPreferences>;

  serverErrorMessage: string | undefined = undefined;

  constructor(private formBuilder: FormBuilder, private sitesService: SitesService, private usersService: UsersService) { }

  ngOnInit(): void {

    this.initializeCategories();
    
    this.initializePreferences();
    
    this.initializeForm();
  }

  initializeForm():void{
    this.preferencesForm = this.formBuilder.group({
      category: [],
      rating: [this.currentRating]
    });
  }

  onCategorySelected(event: any): void{
    this.selectedCategoryName = event.target.options[event.target.options.selectedIndex].text;
    //this.categoryId = event.target.options[event.target.options.selectedIndex].value;
    this.selectedCategoryId = this.preferencesForm.controls['category'].value;
  }

  initializeCategories(): void{
    /*
    this.sitesService.getCategories().subscribe({
      next: (categories) => {
        this.siteCategories = categories
      },
      error: () => {},
      complete: () => {}
    });
    */
    this.siteCategories$ = this.sitesService.getCategories();
  }

  initializePreferences(): void{      
    
    forkJoin([
      this.sitesService.getCategories(),
      this.usersService.getUserPreferences(this.userEmail)
    ]).subscribe({
      next: (result) => {
        console.log("getting user preferences");
        this.siteCategories = result[0];
        this.preferencesList = result[1];

        for(let i = 0; i < this.preferencesList.length; i++){
          var categoryIndex = this.siteCategories.findIndex((s : siteCategory) => {
            return s.categoryId == this.preferencesList[i].categoryId;
          });
          var categoryName = this.siteCategories[categoryIndex].categoryName;
          this.preferencesList[i].categoryName = categoryName;
        }
      },
      error: () => {},
      complete: () => {}
    })
  }

  /*
  //addPreference(id: number, name: string, rating: number){
  addPreference(){
    console.log("id: " + this.categoryId + " name: " + this.categoryName);
    for(const element of this.preferencesList.categoryRatings){
      //if(element.categoryId == this.categoryId){
      if(element.category.categoryId == this.categoryId){
        element.rating = this.currentRating;
        return;
      }
    }
    //this.preferencesList.categoryRatings.push({categoryId: this.categoryId, categoryName: this.categoryName, rating: this.currentRating});
    this.preferencesList.categoryRatings.push({category:{categoryId:this.categoryId, categoryName: this.categoryName}, rating: this.currentRating});
  }
  */

  addPreference(){
    console.log("id: " + this.selectedCategoryId + " name: " + this.selectedCategoryName + " rating: " + this.currentRating);
    //check weather is new preference or alrady exist one
    for(const element of this.preferencesList){
      if(element.categoryId == this.selectedCategoryId){
        console.log("this category rating allready exist");
        if(element.categoryRating != this.currentRating){
          this.usersService.updatePreference({userEmail: this.userEmail, categoryId: this.selectedCategoryId, categoryRating: this.currentRating}).subscribe({
            next: () => {
              element.categoryRating = this.currentRating;
            },
            error: () => {},
            complete: () => {}
          });
        }
        return;
      }
    }
    console.log("this category rating not exist");
    this.usersService.addReference({userEmail: this.userEmail, categoryId: this.selectedCategoryId, categoryRating: this.currentRating}).subscribe({
      next: () => {
        this.preferencesList.push({categoryId:this.selectedCategoryId, categoryName: this.selectedCategoryName, categoryRating: this.currentRating});
      },
      error: () => {
        //error message here
      },
      complete: () => {}
    });
  }

  // anyClick(event: any){
  //   if(event.target.nodeName === 'SECTION'){//להשלים ניקוי
  //     this.closeMeEvent.emit();
  //   }
  // }

  anyClick(event: any){
    if(event.target.nodeName === 'SECTION'){//להשלים ניקוי
      this.closeMeEvent.emit();
    }
    else
    {
      if(event.target.nodeName === 'INPUT' && this.serverErrorMessage){
        this.serverErrorMessage = undefined;//clear the server error message
      }
    }
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  onStarSelected(id: number): void{
    console.log("star selected: " + id);
    this.currentRating = id;
  }

  onStarHovered(id: number): void{
    console.log("star hovered: " + id);
    this.hoverRating = id;
  }

  onStarLeave(): void{
    console.log("star leave");
    this.hoverRating = 0;
  }

  deletePreference(id:number){
    this.preferencesList.forEach((value,index) => {
      //if(value.categoryId == id){
      if(value.categoryId == id){
        //this.usersService.deletePreference({userEmail: this.userEmail, categoryId: this.selectedCategoryId}).subscribe({});
        this.usersService.deletePreference(this.userEmail, id).subscribe({
          next: () => {
            this.preferencesList.splice(index,1);
            console.log("delete preference" + id);
            return;
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {}
        });
      }
    });
  }

  // submit(){

  // }

  resetForm(preferencesForm: any){
    console.log("reset form")//test
    //signinForm.form.reset();
    preferencesForm.reset();
    this.currentRating = 0;
    console.log(preferencesForm.value);
    this.serverErrorMessage = undefined;
  }
}
