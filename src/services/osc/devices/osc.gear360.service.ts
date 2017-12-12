import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { File, IWriteOptions } from '@ionic-native/file';

import { OscAPIv1Service } from '../osc.api.base.service';

@Injectable()
export class Gear360APIv1Service extends OscAPIv1Service {
  constructor(protected http: Http, protected file: File) {
    super(http, file, "http://192.168.107.1");
  }

  listImages(entryCount = 50, maxSize = 100, continuationToken = "", includeThumb = true): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.listImages", parameters: { entryCount: entryCount, maxSize: maxSize, continuationToken: continuationToken, includeThumb: includeThumb } });

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}