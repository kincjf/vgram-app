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
    this.OscAPIv1Service.getInfo("/mock-server/v1")
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
