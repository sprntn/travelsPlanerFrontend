import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ManagerSite } from 'src/app/models/managerSite';
import { siteCategory } from 'src/app/models/siteCategory';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-add-new-site-modal',
  templateUrl: './add-new-site-modal.component.html',
  styleUrls: ['./add-new-site-modal.component.scss']
})
export class AddNewSiteModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  //@Output() succeededEvent = new EventEmitter();
  //@Output() connectErrorEvent = new EventEmitter();

  public title: string = "add new site";

  private managerEmail: string = "";

  public newSiteForm !: FormGroup;

  siteCategories$!:Observable<siteCategory[]>;

  constructor(private formBuilder: FormBuilder, private sitesService: SitesService, private customValidator: CustomValidatorService) { }

  ngOnInit(): void {

    this.managerEmail = localStorage.getItem("managerEmail")??"";

    this.siteCategories$ = this.sitesService.getCategories();

    this.newSiteForm = this.formBuilder.group({
      siteName: ['', [Validators.required, Validators.minLength(4)]],
      website: ['', [Validators.required, Validators.maxLength(100), this.customValidator.urlText()]],
      description: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(1000)]],
      imgSrc: ['',[Validators.required, this.customValidator.imageUrlText()]],
      categorySelect: ['']
    });
  }

  

  get siteName() { return this.newSiteForm.get('siteName'); }
  get website() { return this.newSiteForm.get('website'); }
  get description() { return this.newSiteForm.get('description'); }
  get imgSrc() { return this.newSiteForm.get('imgSrc'); }

  //submit(form: any):  void{
  submit():  void{
    console.log(this.newSiteForm.value);
    
    const site = {
      "siteName": this.newSiteForm.value['siteName'],
      "siteDescription": this.newSiteForm.value['description'],
      "imageSource": this.newSiteForm.value['imgSrc'],
      "webSite": this.newSiteForm.value['webSite'],
      //"siteAverageRating": 0,
      "managerEmail": this.managerEmail,
      "mainCategoryFK": this.newSiteForm.value['categorySelect']
    }  
    
    this.sitesService.addSite(site)
  }

  resetForm(siteForm: any){
    //console.log("manager login modal reseted");
    //siteForm.form.reset();
    this.newSiteForm.reset();
    console.log(siteForm.value);
    //this.serverErrorMessage = undefined;
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  anyClick(event: any){
    if(event.target.nodeName === 'SECTION'){//להשלים ניקוי
      //this.closeMeEvent.emit();
      
      this.closeMe();
    }
  }
}
