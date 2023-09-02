import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { siteCategory } from 'src/app/models/siteCategory';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-manager-site-card',
  templateUrl: './manager-site-card.component.html',
  styleUrls: ['./manager-site-card.component.scss']
})
export class ManagerSiteCardComponent implements OnInit {

  @Input() imageSource!: string;
  @Input() siteDescription!: string;
  @Input() webSite!: string;
  @Input() siteName!: string;
  @Input() siteId!: number;
  @Input() siteAverageRating!: number;
  @Input() categories!: siteCategory[] | null;
  @Input() mainCategoryId!: number;

  enabledit: boolean = false;
  
  siteNameChanged: boolean = false;
  webSiteChanged: boolean = false;
  imgSrcChanged: boolean = false;
  categoryChanged: boolean = false;
  descriptionChanged: boolean = false;

  editable: boolean = false;
  //changes: {name: string, val: boolean} = {siteNameChanged: false}
  

  public editSiteForm !: FormGroup;

  //siteCategories$!:Observable<siteCategory[]>;
  
  constructor(private sitesService: SitesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() : void{
    this.editSiteForm = this.formBuilder.group({
      siteName: [this.siteName],
      webSite: [this.webSite],
      description: [this.siteDescription],
      imgUrl: [this.imageSource],
      //category: [this.mainCategoryId, ]
      category: [{value: this.mainCategoryId, disabled: !this.enabledit}]
    },
    {
      validator:[]
    });
  }


  modelChanged(controllName: string): void{
    console.log('model changed');
    const newVal = this.editSiteForm.value[controllName];
    switch(controllName){
      case 'siteName':
        if(newVal === this.siteName){
          this.siteNameChanged = false;
        }
        else{
          this.siteNameChanged = true;
        }
        break;
      case 'webSite':
        if(newVal === this.webSite){
          this.webSiteChanged = false;
        }
        else{
          this.webSiteChanged = true;
        }
        break;
      case 'imgUrl':
        if(newVal === this.imageSource){
          this.imgSrcChanged = false;
        }
        else{
          this.imgSrcChanged = true;
        }
        break;
      case 'category':
        if(newVal === this.mainCategoryId){
          this.categoryChanged = false;
        }
        else{
          this.categoryChanged = true;
        }
        break;
      case 'description':
        if(newVal === this.siteDescription){
          this.descriptionChanged = false;
        }
        else{
          this.descriptionChanged = true;
        }
        break;
    }
    this.editable = this.siteNameChanged  || this.webSiteChanged || this.imgSrcChanged || this.categoryChanged || this.descriptionChanged;
    console.log(`editable: ${this.editable}`);
  }
  
  toggleEdit(): void {
    this.enabledit = !this.enabledit;
    console.log(`toggle edit ${this.enabledit}`);
  }

  saveEdit(): void {
    this.sitesService.updateSite({
      imageSource: this.editSiteForm.value['imgUrl'],
      //mainCategoryFK: this.editSiteForm.value['category'],
      mainCategoryId: 2,//hard coded fix later
      managerEmail: 'string',//hard coded fix later
      siteDescription: this.editSiteForm.value['description'],
      siteId: this.siteId,
      siteName: this.editSiteForm.value['siteName'],
      webSite: this.editSiteForm.value['webSite'],
      siteAverageRating: 3.6
    }).subscribe({
      next: () => {
        console.log('success');
      },
      error: () => {},
      complete: () => {}
    })
    console.log(`site id: ${this.siteId}`);
    console.log(`save edit site: ${JSON.stringify(this.editSiteForm.value)}`);
  }

  deleteSite(): void{
    console.log("delete site: " + this.siteId)
    this.sitesService.deleteSite(this.siteId).subscribe({
      next: (res) => {
        if(res){
          console.log('res => true');
        }
        else{
          console.log('res => false');
        }
      },
      error: () => {},
      complete: () => {}
    });
  }

}
