import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ManagerSite } from 'src/app/models/managerSite';
import { siteCategory } from 'src/app/models/siteCategory';
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

  constructor(private formBuilder: FormBuilder, private sitesService: SitesService) { }

  ngOnInit(): void {

    this.managerEmail = localStorage.getItem("managerEmail")??"";

    this.siteCategories$ = this.sitesService.getCategories();

    this.newSiteForm = this.formBuilder.group({
      siteName: ['', [Validators.required, Validators.minLength(4)]],
      website: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(1000)]],
      imgSrc: [''],
      categorySelect: ['']
    });
  }

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
