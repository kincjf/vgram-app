import { Component } from '@angular/core';
import { MenuController, SegmentButton, App, NavParams, LoadingController } from 'ionic-angular';

import { OscAPIv1Service } from "../../services/osc.api.v1.service";

@Component({
  selector: 'tests',
  templateUrl: 'tests.html'
})
export class TestPage {
  constructor(
    public OscAPIv1Service: OscAPIv1Service,
  ) {
  }

  getMockServerOscInfo() {
    let originUrl =
    if (window.cordova) {
     originUrl
    } else {

    }

    this.OscAPIv1Service.getInfo("http://192.168.2.28")
      .then(data => {
        console.log(data);
      });
  }

  getLG360CamOscInfo() {
    this.OscAPIv1Service.getInfo("/lg360cam/v1")
      .then(data => {
        console.log(data);
      });
  }
}
