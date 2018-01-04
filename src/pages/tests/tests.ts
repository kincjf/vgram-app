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

  getImageList() {
    this.OscAPIService.getListImages()
      .then(data => {
        console.log(data);

        if (data.end) { 
          console.log('end of list');
        } else {
          console.log('continue list..');
        }
      });
  }

  downloadImage() {
    this.OscAPIService.getListImages()
      .then(data => {
        if (data.entries.length != 0) { // exist entries
          this.OscAPIService.downloadImage(data.entries[0].uri)
            .then(path => {
              // downloaded image path(local path)
              // -> The path to the image stored on the device is returned using donwloadImage.
              console.log('image path', path);
            });
        } else {
          console.log('do not exist');
        }
      });
  }

  getThumbnail() {
    this.OscAPIService.getListImages()
      .then(data => {
        if (data.entries.length != 0) { // exist entries
          this.OscAPIService.getThumbImagePath(data.entries[0].uri)
            .then(path => {
              // downloaded image path(local path)
              // -> The path to the thumbnail stored on the cache device is returned using getThumbImagePath.
              console.log('image path', path);
            });
        } else {
          console.log('do not exist');
        }
      });
  }

  deleteImage() {
    this.OscAPIService.getListImages()
      .then(data => {
        if (data.entries.length != 0) { // exist entries
          this.OscAPIService.delete(data.entries[0].uri)
            .then(path => {
              // delete image in VR Camera
              console.log('delete image', data.entries[0].uri);
            });
        } else {
          console.log('do not exist');
        }
      });
  }
}
