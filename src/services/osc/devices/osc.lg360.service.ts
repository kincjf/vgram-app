import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { File } from '@ionic-native/file';

import { OscAPIv1Service } from '../osc.api.base.service';

@Injectable()
export class LG360APIv1Service extends OscAPIv1Service {
  constructor(protected http: Http, protected file: File) {
    super(http, file, "http://192.168.43.1");
  }
}