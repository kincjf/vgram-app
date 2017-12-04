import { Component } from '@angular/core';
import { File } from '@ionic-native/file';

import { OscAPIService } from "../../services/osc.api.v1.service";

@Component({
  selector: 'tests',
  templateUrl: 'tests.html'
})
export class TestPage {
  constructor(
    public OscAPIService: OscAPIService,
    private file: File
  ) {
  }

  getOscInfo() {
    this.OscAPIService.getPicture("14")
      .then(data => {
        console.log(data);
        // var name = "test";
        // this.file.writeFile(this.file.dataDirectory, name, data);
      });
  }
}
