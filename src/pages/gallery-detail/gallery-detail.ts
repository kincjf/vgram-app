import { Component } from '@angular/core';
import { NavController,  App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'gallery-detail-page',
  templateUrl: 'gallery-detail.html'
})
export class GalleryDetailPage {
  
  loading: any;

  m_bSelect = false;

  m_bAllSelected = false;

  selectedCount = 0;

  selectedTab =  "vr";

  image = "./assets/images/listing/200x200basquet.png";

  

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

}
