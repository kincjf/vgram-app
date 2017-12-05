import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import {AbstractApi} from './osc.interface';
import {OscInfo, OscState} from './osc.dto';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OscBaseService implements AbstractApi {
  oscInfo: OscInfo;
  oscState: OscState;

  options: RequestOptions;
  defaultHost: String;

  constructor(host: string, public http: Http) {
    this.defaultHost = host;
  }

  getInfo(): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json;chartset=utf-8');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({headers: headers});

    return this.http.get(this.defaultHost + '/osc/info', this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getState(): Promise<any> {
    const headers = new Headers();
    headers.append('X-Content-Type-Options', 'nosniff');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({headers: headers});

    return this.http.get(this.defaultHost + '/osc/state', this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getCommandsStatus(ID: String): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({id: ID});

    return this.http.post(this.defaultHost + '/osc/commands/status', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  checkForUpdates(): Promise<any> {
    this.options = new RequestOptions({});

    return this.http.post(this.defaultHost + '/osc/checkForUpdates', this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    console.error('An error occurred', JSON.stringify(error)); // for demo purposes only
  }
}
