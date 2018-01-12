import { Component } from '@angular/core';
import { NavController, App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Network } from '@ionic-native/network';

import { HelpPage } from '../help/help';
import { GalleryPage } from '../gallery/gallery';
import { VRCameraViewPage } from "../vrcamera-view/vrcamera-view";

import { OscAPIService } from "../../services/osc/osc.api.service";
import { OscInfo } from '../../services/osc/osc.dto';

@Component({
  selector: 'camera-page',
  templateUrl: 'camera.html'
})
export class CameraPage {

  loading: any;
  message: any;
  model: any;

  deviceConnect: boolean;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App,
    public menu: MenuController,

    private OscAPIService: OscAPIService,
    private network: Network
  ) {
    this.OscAPIService.getDeviceModel().subscribe(model => {
      this.model = model == 'Error' ? '' : model;
    });
  }

  toVRSetting() {
    this.app.getRootNav().push(VRCameraViewPage);
  }

  toGallery() {
    this.app.getRootNav().push(GalleryPage);
  }

  toHelp() {
    this.nav.push(HelpPage);
  }
}
