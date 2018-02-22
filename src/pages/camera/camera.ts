import { Component } from '@angular/core';
import { NavController, App, LoadingController, MenuController, SegmentButton, Events, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';

import { HelpPage } from '../help/help';
import { GalleryPage } from '../gallery/gallery';
import { VRCameraViewPage } from "../vrcamera-view/vrcamera-view";

import { OscAPIService } from "../../services/osc/osc.api.service";
import { OscInfo } from '../../services/osc/osc.dto';
import { isActivatable } from 'ionic-angular/tap-click/tap-click';

@Component({
  selector: 'camera-page',
  templateUrl: 'camera.html'
})
export class CameraPage {

  loading: any;
  message: any;
  model: any;

  deviceConnect: boolean;

  modelSubscribe;
  active = true;
  connected = false;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App,
    public menu: MenuController,
    public plt: Platform,

    private OscAPIService: OscAPIService,
    private network: Network,
    private diagnostic: Diagnostic,
    public toastCtrl: ToastController
  ) {
    setInterval(() => {
      var len = this.app.getRootNav().length();
      // console.log(len);
      if (this.active && len == 1) {
        this.OscAPIService.getDeviceInfo().then((info) => {
          // console.log('camera access', info);
          this.setModel(info.model);
        })
      }
    }, 1500);
  }

  ionViewDidEnter() {
    this.OscAPIService.getDeviceInfo().then((info) => {
      this.setModel(info.model);
    })

    this.active = true;
  }

  ionViewDidLeave() {
    this.active = false;
  }

  ngOnDestroy() {
    this.modelSubscribe.unsubscribe();
  }

  toVRSetting() {
    if (this.connected) {
      this.app.getRootNav().push(VRCameraViewPage);
    } else {
      this.showToast('Please connect VR');

      // unconnected VR
      if (this.plt.is('android')) {
        this.diagnostic.switchToWifiSettings();
      }
    }
  }

  toGallery() {
    this.app.getRootNav().push(GalleryPage);
  }

  toHelp() {
    this.nav.push(HelpPage);
  }

  setModel(model) {
    if (model) {
      this.model = model + '에 연결되었습니다.';
      // button enable
      this.connected = true;
    } else {
      this.model = '연결된 기기가 존재하지 않습니다.';
      // button disable
      this.connected = false;
    }
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
