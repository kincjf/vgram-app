import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { MoblabAPIBase } from '../moblab.api.base';

/*
  Generated class for the PostapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthAPIService extends MoblabAPIBase {
  constructor(public http: Http) {
    super();
    this.baseUrl = [this.baseUrl, "auth"].join('/');
  }

  initAccount() {
    const headers = new Headers();
    // headers.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({ /* options */ });

    return this.http.post([this.baseUrl].join('/'), body, options).map(res => res.json());
  }
}