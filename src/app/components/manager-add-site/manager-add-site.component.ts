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

  

  contentHeight: number = 100;
  
  showContent: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleContent(): void {
    this.showContent = !this.showContent;
    this.updateContentHeight();
  }

  updateContentHeight(): void{
    const contentElement = this.contentContainer.nativeElement;
    
    const height = this.showContent ? this.frmContent.nativeElement.offsetHeight: this.showBtn.nativeElement.offsetHeight;
    console.log("height: " + height);
    this.contentHeight = height;
  }
}
