import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { File, IWriteOptions } from '@ionic-native/file';

import { OscAPIv1Service } from '../osc.api.base.service';

@Injectable()
export class Gear360APIv1Service extends OscAPIv1Service {
  constructor(protected http: Http, protected file: File) {
    super(http, file, "http://192.168.107.1");
  }
}