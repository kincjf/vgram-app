import { Component } from '@angular/core';
import { NavController, App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
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
    private diagnostic: Diagnostic
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
    // setTimeout(() => {
    this.OscAPIService.getDeviceInfo().then((info) => {
      // console.log('camera enter', info);
      this.setModel(info.model);
    })
    // }, 1000);

    this.active = true;
  }

  ionViewDidLeave() {
    // console.log('camera leave');
    this.active = false;
  }

  ngOnDestroy() {
    // console.log('camera destroy');
    this.modelSubscribe.unsubscribe();
  }

  toVRSetting() {
    if (this.connected) {
      this.app.getRootNav().push(VRCameraViewPage);
    } else {
      alert('Please connect VR');

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
}
