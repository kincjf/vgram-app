import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export class OscAPIv1ServiceBase {

  private options: RequestOptions

  constructor(
    public http: Http,
  ) {

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json;chartset=utf-8');
    headers.append('X-XSRF-Protected', '1');

    this.options = new RequestOptions({ headers: headers, withCredentials: true });
  }

  getInfo(): Promise<any> {
    return this.http.get('http://localhost/osc/info', this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

    // this.http.get('path/to/data.json')
    // .map(res => res.json())
    // .subscribe(data => {
    //   this.data = data;
    // }, error => {
    //   console.log('Error with http.get: ', error);
    // });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

@Injectable()
export class OscAPIv1Service extends OscAPIv1ServiceBase {
  constructor(
    public http: Http,
  ) { super(http); }
}