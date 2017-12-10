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

  getOscInfo() {
    this.OscAPIService.getImage("14")
      .then(data => {
        console.log(data);
        // var name = "test";
        // this.file.writeFile(this.file.dataDirectory, name, data);
      });
  }
}
