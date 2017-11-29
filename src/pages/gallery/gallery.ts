import { Component } from '@angular/core';
import { NavController,  App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { GalleryDetailPage } from '../gallery-detail/gallery-detail';

@Component({
  selector: 'gallery-page',
  templateUrl: 'gallery.html'
})
export class GalleryPage {
  
  loading: any;

  m_bSelect = false;

  m_bAllSelected = false;

  selectedCount = 0;

  selectedTab =  "vr";

  images = [
    { 
      image: "./assets/images/listing/200x200basquet.png",
      selected: false
    },
    { 
      image:"./assets/images/listing/200x200swimming.png",
      selected: false
    },
    {
      image: "./assets/images/listing/200x200basquet.png",
      selected: false
    },
    {
      image: "./assets/images/listing/200x200swimming.png",
      selected: false
    },
    {
      image: "./assets/images/listing/200x200basquet.png",
      selected: false
    },
    {
      image: "./assets/images/listing/200x200swimming.png",
      selected: false
    }
  ];

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App,
    public menu: MenuController
  ) {

  }


  onBack(){
    this.nav.pop();
  }

  onDownload(){
    this.m_bSelect = true;
  }

  onTrash(){

  }

  onSelectAll(){
    this.m_bAllSelected = !this.m_bAllSelected;
  }

  onSelectImage(image){
    image.selected = !image.selected;
  }
  

  selectMachine()
  {
    this.selectedTab = "mine";
  }

  selectVR(){
    this.selectedTab = "vr";
  }

  onImageDetial(image){
    this.nav.push( GalleryDetailPage );
  }
}
