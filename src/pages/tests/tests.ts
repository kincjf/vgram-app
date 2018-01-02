import { Component } from '@angular/core';
import { File } from '@ionic-native/file';

import { OscAPIService } from "../../services/osc/osc.api.service";

@Component({
  selector: 'tests',
  templateUrl: 'tests.html'
})
export class TestPage {
  constructor(
    private OscAPIService: OscAPIService,
    private file: File
  ) {
  }

  test1() {
    this.OscAPIService.getAllOptions()
      .then(data => {
        console.log(data);
      });
  }
  test2() {
    this.OscAPIService.enableHDR()
      .then(data => {
        console.log(data);
      });
  }
  test3() {
    this.OscAPIService.disableHDR()
      .then(data => {
        console.log(data);
      });
  }

  test4() {
    this.OscAPIService.setExposureDelay(1)
      .then(data => {
        console.log(data);
      });
  }

  test5() {
    this.OscAPIService.setExposureDelay(5)
      .then(data => {
        console.log(data);
      });
  }

  test6() {
    this.OscAPIService.setExposureDelay(10)
      .then(data => {
        console.log(data);
      });
  }

  test7() {
    this.OscAPIService.getListImages()
      .then(data => {
        console.log(data);
      });
  }
}
