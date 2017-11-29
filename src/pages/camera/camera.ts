import { Component } from '@angular/core';
import { NavController,  App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { HelpPage } from '../help/help';
import { GalleryPage } from '../gallery/gallery';

@Component({
  selector: 'camera-page',
  templateUrl: 'camera.html'
})
export class CameraPage {
  
  loading: any;

  message: any;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App,
    public menu: MenuController
  ) {

  }

  toVRSetting(){

  }

  toGallery() {
    this.app.getRootNav().push(GalleryPage);
  }

  toHelp() {
    this.nav.push( HelpPage );
  }
}
