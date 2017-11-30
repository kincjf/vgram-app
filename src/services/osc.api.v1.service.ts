import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

class OscAPIv1Service {

  private options: RequestOptions;
  private defaultHost: String;

  constructor(
    public http: Http,
    // Host = "http://192.168.2.28"
    Host = "http://210.122.38.113"
  ) {
    this.defaultHost = Host;
  }

  getInfo(): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json;chartset=utf-8');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    return this.http.get(this.defaultHost + '/osc/info', this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getStatus(): Promise<any> {
    const headers = new Headers();
    headers.append('X-Content-Type-Options', 'nosniff');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    return this.http.get(this.defaultHost + '/osc/status', this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getCommandsStatus(ID: String): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ id: ID });

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

  startSession(): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.startSession", parameters: {} });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateSession(ID: String): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.updateSession", parameters: { sessionId: ID } });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  closeSession(ID: String): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.closeSession", parameters: { sessionId: ID } });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  takePicture(ID: String): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.takePicture", parameters: { sessionId: ID } });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  listImages(entryCount = 50, maxSize = 100, includeThumb = true): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.listImages", parameters: { entryCount: entryCount, maxSize: maxSize, includeThumb: includeThumb } });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(fileUri: String): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.delete", parameters: { fileUri: fileUri } });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getImage(fileUri: String, maxSize = 400): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'image/jpeg');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.getImage", parameters: { fileUri: fileUri, maxSize: maxSize } });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getMetadata(fileUri: String): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.getMetadata", parameters: { fileUri: fileUri } });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  setOptions(sessionId: String, Options: any): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.setOptions", parameters: { sessionId: sessionId, options: { Options } } });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getOptions(sessionId: String, Options: Array<String>): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.getOptions", parameters: { sessionId: sessionId, optionNames: Options } });

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getConvertedImage(ID: String): Promise<any> {
    return this.getCommandsStatus(ID).then(data => {
      if (data.state == "done") return this.getImage(data.results.fileUri);
      else if (data.state == "error") return Promise.reject("error"); // 수정해야함

      // return (new Promise(resolve => setTimeout(resolve, 200))).then(() => {
        return this.getConvertedImage(ID);
      // });
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', JSON.stringify(error)); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

class LG360DeviceService extends OscAPIv1Service {
  constructor(
    public http: Http,
  ) {
    super(http, "http://192.168.43.1");
  }
}

/**
 * refered osc api docs(postman)
 */
@Injectable()
export class OscAPIService {
  private OscAPIv1: OscAPIv1Service;
  // private OscAPIv2: OscAPIv2Service;

  private Mode: number;
  private file: File;

  constructor(
    public http: Http,
  ) {
    this.checkDevice();
  }

  private checkDevice(): void {
    // check
    // switch () { return }
    if (true) {
      this.OscAPIv1 = new OscAPIv1Service(this.http);
      // this.OscAPIv1 = new LG360DeviceService(this.http);
      this.Mode = 1;
    } else {
      // this.OscAPIv2 = new
      // this.Mode = 2;
    }
  }


  /**
   * /osc/info
   * @returns {Promise<any>}
   */
  getInfo(): Promise<any> {
    if (this.Mode == 1) {
      return this.OscAPIv1.getInfo();
    }

    return Promise.reject({ model: 'None' });
  }

  /**
   * /osc/state
   * @returns {Promise<any>}
   */
  getStatus(): Promise<any> {
    if (this.Mode == 1) {
      return this.OscAPIv1.getStatus();
    }

    return Promise.reject('error');
  }

  /**
   * session -> takePicture -> convert -> ImageData
   * @returns {Promise<binary(image/jpeg or image/png)>}
   */
  getTakePicture(): Promise<any> {
    if (this.Mode == 1) {
      return this.OscAPIv1.startSession().then(data => {
        var sessionId = data.results.sessionId;

        return this.OscAPIv1.takePicture(sessionId).then(data => {
          var id = data.id;

          return this.OscAPIv1.getConvertedImage(id);
        });
      });
    }

    return Promise.reject('error');
  }

  /**
   * @returns {Promise<binary(image/jpeg or image/png)>}
   */
  getPicture(URI: String): Promise<any> {
    if (this.Mode == 1) {
      return this.OscAPIv1.getImage(URI);
    }

    return Promise.reject('error');
  }

  /**
   *
   * @returns {Promise<object>}
   */
  getListImages(): Promise<any> {

    if (this.Mode == 1) {
      return this.OscAPIv1.listImages();
    }

    return Promise.reject('error');
  }
}
