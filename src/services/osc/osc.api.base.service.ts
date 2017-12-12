import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { File } from '@ionic-native/file';

import { AbstractApiv1 } from './osc.interface';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OscAPIv1Service implements AbstractApiv1 {

  protected options: RequestOptions;
  protected Host: String;

  constructor(
    protected http: Http,
    protected file: File,
    Host,
  ) {
    this.Host = Host;
  }

  getInfo(): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json;chartset=utf-8');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    return this.http.get(this.Host + '/osc/info', this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getState(): Promise<any> {
    const headers = new Headers();
    headers.append('X-Content-Type-Options', 'nosniff');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    return this.http.get(this.Host + '/osc/state', this.options)
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

    return this.http.post(this.Host + '/osc/commands/status', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  checkForUpdates(): Promise<any> {
    this.options = new RequestOptions({});

    return this.http.post(this.Host + '/osc/checkForUpdates', this.options)
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

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
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

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
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

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
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

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  listImages(entryCount = 50, maxSize = 100, continuationToken = "", includeThumb = true): Promise<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers });

    const body = JSON.stringify({ name: "camera.listImages", parameters: { entryCount: entryCount, maxSize: maxSize, includeThumb: includeThumb } });

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
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

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getImage(fileUri: String, maxSize = 400): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'image/jpeg');
    headers.append('X-XSRF-Protected', '1');
    this.options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });

    const body = JSON.stringify({ name: "camera.getImage", parameters: { fileUri: fileUri, maxSize: maxSize } });

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
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

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
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

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
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

    return this.http.post(this.Host + '/osc/commands/execute', body, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // 추가한 함수
  getConvertedImage(ID: String): Promise<any> {
    return this.getCommandsStatus(ID).then(data => {
      if (data.state == "done") return this.getImage(data.results.fileUri);
      else if (data.state == "error") return Promise.reject("error"); // 수정해야함

      return (new Promise(resolve => setTimeout(resolve, 200))).then(() => {
        return this.getConvertedImage(ID);
      });
    });
  }

  async getImageFileUri(ID: String): Promise<String> {
    let result = await this.getCommandsStatus(ID);

    switch (result.state) {
      case 'done':
        break;
      case 'inProgress':
        await new Promise(resolve => setTimeout(resolve, 200));
        return this.getImageFileUri(ID);
      case 'error':
        console.log('state error');
      default:
        return Promise.reject("state error");
    }

    return this.getImage(result.results.fileUri).then(data => {
      const dirName = "VRThumb";
      const fileName = "vrThumb.jpg";
      const dirPath = [this.file.cacheDirectory, dirName].join('');
      const filePath = [dirPath, fileName].join('/');

      return this.file.createDir(this.file.cacheDirectory, dirName, true).then(() => {
        return this.file.createFile(dirPath, fileName, true).then(() => {
          return this.file.writeExistingFile(dirPath, fileName, data._body).then(() => filePath).catch(err => err);
        }).catch(err => err);
      }).catch(err => err);
    }).catch(err => {
      console.log(err);
      return err;
    });
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', JSON.stringify(error)); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}