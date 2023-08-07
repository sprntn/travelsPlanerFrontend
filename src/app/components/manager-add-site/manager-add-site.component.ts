import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manager-add-site',
  templateUrl: './manager-add-site.component.html',
  styleUrls: ['./manager-add-site.component.scss']
})
export class ManagerAddSiteComponent implements OnInit {
  @ViewChild('contentContainer', { read: ElementRef }) contentContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('frmContent', { read: ElementRef }) frmContent!: ElementRef<HTMLDivElement>;
  @ViewChild('showBtn', { read: ElementRef }) showBtn!: ElementRef<HTMLDivElement>;

  //frmContentHeight = this.frmContent.nativeElement.offsetHeight;
  //showBtnHeight = this.showBtn.nativeElement.offsetHeight;

  //heights = [this.showBtnHeight, this.frmContentHeight];

  contentHeight: number = 100;
  //isContentVisible: boolean = false;
  
  showContent: boolean = false;
  //showMode: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleContent(): void {
    this.showContent = !this.showContent;
    this.updateContentHeight();
  }

  updateContentHeight(): void{
    const contentElement = this.contentContainer.nativeElement;
    //console.log("this element height: " + this.heights[Number(this.showContent)]);
    
    // if(this.showContent){
    //   //height = this.frmContent.nativeElement.offsetHeight;
    //   this.contentHeight = this.frmContent.nativeElement.offsetHeight;
    // }
    // else{
    //   //height = this.showBtn.nativeElement.offsetHeight;
    //   this.contentHeight = this.showBtn.nativeElement.offsetHeight;
    // }
    
    // const height = this.showContent ? 300 : 100; //test
    // this.contentHeight = height; 

    //const x = 50;
    //const y = 300;
    //const height = this.showContent ? x : y;
    const height = this.showContent ? this.frmContent.nativeElement.offsetHeight: this.showBtn.nativeElement.offsetHeight;
    console.log("height: " + height);
    this.contentHeight = height;
  }

  // changeMode(): void{
  //   console.log('test button' + this.showContent);
  //   //this.showMode = !this.showMode;
  //   this.showContent = !this.showContent;
  // }

}
