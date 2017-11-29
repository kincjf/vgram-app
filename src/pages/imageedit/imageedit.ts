import { Component } from '@angular/core';
import { MenuController, SegmentButton, NavController, App, NavParams, LoadingController, ActionSheetController, Platform, ToastController,Events } from 'ionic-angular';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'imageedit-page',
  templateUrl: 'imageedit.html'
})
export class ImageEditPage {

  loading: any;

  image : any;

  brightness: any;
  sharpness: any;
  
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
    this.image = navParams.get("image");
  }

  ionViewDidLoad() {
    
  }

  onCancel(){
    this.nav.pop();
  }
  onApply(){
    this.nav.pop();
  }

  refreshImage(){
    
  }
}
