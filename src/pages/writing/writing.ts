import { Component } from '@angular/core';
import { MenuController, SegmentButton, NavController, App, NavParams, LoadingController, ActionSheetController, Platform, ToastController,Events } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ImagePicker } from '@ionic-native/image-picker';
import { WritingNormalPage } from '../write-normal/write-normal';
import { ImageEditPage } from '../imageedit/imageedit';

@Component({
  selector: 'writing-page',
  templateUrl: 'writing.html'
})
export class WritingPage {

  loading: any;

  images = [
    "./assets/images/listing/200x200basquet.png",
    "./assets/images/listing/200x200swimming.png",
    "./assets/images/listing/300x300ExtremeSports.png"
  ];
  
  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public imagePicker: ImagePicker,
    public nav: NavController
  ) {

    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    
  }

  onClickNext(){
    this.nav.push(WritingNormalPage);
  }

  addVRPicture(){
    this.imagePicker.getPictures({ maximumImagesCount: 15 }).then(
      (results) => {
        console.log(results);
        this.images.push(results);
      }, (err) => console.log(err)
    );
  }

  editImage(image){
    this.nav.push(ImageEditPage, {image});
  }

  removeImage(image) {

  }
}
