import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import {AbstractApiv1} from './osc.interface';
import {OscBaseService} from './osc.base.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OscV1Service extends OscBaseService implements AbstractApiv1 {
  constructor(host: string, public http: Http) {
    super(host, http);
  }

  startSession(): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({name: "camera.startSession", parameters: {}});

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
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({name: "camera.updateSession", parameters: {sessionId: ID}});

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
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({name: "camera.closeSession", parameters: {sessionId: ID}});

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
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({name: "camera.takePicture", parameters: {sessionId: ID}});

    return this.http.post(this.defaultHost + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  listImages(entryCount = 50, maxSize = 100, continuationToken: string, includeThumb = true): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({
      name: "camera.listImages",
      parameters: {entryCount: entryCount, maxSize: maxSize, includeThumb: includeThumb}
    });

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
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({name: "camera.delete", parameters: {fileUri: fileUri}});

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
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({name: "camera.getImage", parameters: {fileUri: fileUri, maxSize: maxSize}});

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
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({name: "camera.getMetadata", parameters: {fileUri: fileUri}});

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
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({name: "camera.setOptions", parameters: {sessionId: sessionId, options: {Options}}});

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
    this.options = new RequestOptions({headers: headers});

    const body = JSON.stringify({name: "camera.getOptions", parameters: {sessionId: sessionId, optionNames: Options}});

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
    }).catch(this.handleError);
  }

  /**
   * session -> takePicture -> convert -> ImageData
   * @returns {Promise<binary(image/jpeg or image/png)>}
   */
  getTakePicture(): Promise<any> {
    return this.startSession().then(data => {
      var sessionId = data.results.sessionId;

      return this.takePicture(sessionId).then(data => {
        var id = data.id;

        return this.getConvertedImage(id);
      });
    }).catch(this.handleError);
  }

  init(): Promise<any> {
    return this.getInfo().then(data => {
      this.oscInfo = data;

      return this.getState().then(data => {
        this.oscState = data;
      });
    }).catch(this.handleError);
  }
}

@Injectable()
export class MockDeviceV1Service extends OscV1Service {
  constructor(url: string, public http: Http) {
    super(url, http);
    this.init();
  }
}

@Injectable()
export class LG360V1Service extends OscV1Service {
  constructor(url: string, public http: Http) {
    super(url, http);
    this.init();
  }
}
