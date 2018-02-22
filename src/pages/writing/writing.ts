import { Component } from '@angular/core';
import { MenuController, SegmentButton, NavController, App, NavParams, LoadingController, ActionSheetController, Platform, ToastController, Events } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ImagePicker } from '@ionic-native/image-picker';
import { WritingNormalPage } from '../write-normal/write-normal';
import { ImageEditPage } from '../imageedit/imageedit';

import { ListingPage } from '../listing/listing'; // main page

@Component({
  selector: 'writing-page',
  templateUrl: 'writing.html'
})
export class WritingPage {

  loading: any;

  images = [];

  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public imagePicker: ImagePicker,
    public nav: NavController,
    private authService: AuthServiceProvider,
    private events: Events,
    private toastCtrl: ToastController
  ) {
    this.loading = this.loadingCtrl.create();

    events.subscribe('authenticate', () => {
      if (!this.authService.authenticated()) {
        this.showToast('Please login.');
      }
    });
  }

  ionViewDidEnter() {
    if (!this.authService.authenticated()) {
      this.showToast('로그인을 해주세요.');

      // this.root
      this.authService.login();
    }
  }

  onClickNext() {
    if (this.authService.authenticated()) {
      if (this.images.length == 0) {
        this.showToast('VR사진을 한장 이상 추가해 주세요.');
      } else {
        this.nav.push(WritingNormalPage, {
          VR: this.images
        });
      }
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
