import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { OscAPIv1Service } from '../osc.api.base.service';

@Injectable()
export class LG360APIv1Service extends OscAPIv1Service {
  constructor(public http: Http) {
    super(http, "http://192.168.43.1");
  }
}