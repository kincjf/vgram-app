import { Component } from '@angular/core';
import { MenuController, SegmentButton, NavController, App, NavParams, LoadingController, ActionSheetController, Platform, ToastController, Events } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ImagePicker } from '@ionic-native/image-picker';

import { ImageEditPage } from '../imageedit/imageedit';
import { WritingAddPage } from '../writing-add/writing-add';

@Component({
  selector: 'write-normal-page',
  templateUrl: 'write-normal.html'
})
export class WritingNormalPage {

  loading: any;

  images = [];

  VR = [];

  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public imagePicker: ImagePicker,
    public nav: NavController,
    private authService: AuthServiceProvider,
    private toastCtrl: ToastController
  ) {
    this.loading = this.loadingCtrl.create();
    this.VR = navParams.get('VR');
  }

  ionViewDidLoad() {

  }

  onClickNext() {
    if (this.authService.authenticated()) {
      this.nav.push(WritingAddPage, {
        VR: this.VR,
        NORMAL: this.images
      });
    } else {
      this.showToast('로그인을 해주세요.');
    }
  }

  addVRPicture() {
    this.imagePicker.getPictures({ maximumImagesCount: 15 }).then(
      (results) => {
        for (var i in results) {
          // console.log(results);
          this.images.push(results[i]);
        }
      }, (err) => console.log(err)
    );
  }

  editImage(image) {
    this.nav.push(ImageEditPage, { image });
  }

  removeImage(image) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
