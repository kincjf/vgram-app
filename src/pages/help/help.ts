import { Component } from '@angular/core';
import { NavController,  App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'help-page',
  templateUrl: 'help.html'
})
export class HelpPage {
  
  loading: any;

  images = [
    "./assets/images/listing/200x200basquet.png",
    "./assets/images/listing/200x200swimming.png",
    "./assets/images/listing/200x200basquet.png",
    "./assets/images/listing/200x200swimming.png",
    "./assets/images/listing/200x200basquet.png",
    "./assets/images/listing/200x200swimming.png",
    "./assets/images/listing/200x200basquet.png",
    "./assets/images/listing/200x200swimming.png"
  ];

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App,
    public menu: MenuController
  ) {

  }

  
}
