import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
// import { Hotspot, HotspotNetworkConfig } from '@ionic-native/hotspot';

import { OscAPIv1Service } from './osc.api.base.service';
import { OscInfo } from './osc.dto';

import { LG360APIv1Service } from './devices/osc.lg360.service';
import { Gear360APIv1Service } from './devices/osc.gear360.service';

import { Log, Level } from 'ng2-logger'

import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';


declare let networkinterface: any;

const mockIP = "210.122.38.113";
/**
 * refered osc api docs(postman)
 */
@Injectable()
export class OscAPIService {
  private OscAPIv1: OscAPIv1Service;
  // private OscAPIv2: OscAPIv2Service;

  private version: number;
  private file: File;

  constructor(
    public http: Http,
  ) {
    this.version = 0;
    this.checkDevice();
  }

  private async checkDevice(): Promise<void> {
    let ip, gateway;

    if (typeof networkinterface !== 'undefined') {
      ip = await new Promise<String>((resolve, reject) => {
        networkinterface.getWiFiIPAddress((ip) => resolve(ip), (err) => {
          alert('wifi not connected');
          alert('Please connect the VR camera supported by the app to WiFi.\nProducts: LG 360, Gear 360');

          return resolve(mockIP);
          // this.version = -1; return reject(err);
        });
      });

      // get device ip
      if (ip != mockIP) gateway = ip.split('.', 3).join('.') + '.1';

      console.log(gateway);
    } else {
      ip = mockIP;
    }

    // if (true) { // 기기를 연결할 경우 주석하면됨.
    //   gateway = mockIP;
    //   console.log('enter test mode.');
    // }

    let info: OscInfo = await getDeviceInfo(this.http, gateway);


    switch (info.model) {
      case 'LG-R105':
        this.version = 1;
        this.OscAPIv1 = new LG360APIv1Service(this.http);
        break;
      case 'GEAR 360':
        this.version = 1;
        this.OscAPIv1 = new Gear360APIv1Service(this.http);
      case 'Error':
        this.version = -1;
        alert('Please connect the VR camera supported by the app to WiFi.\nProducts: LG 360, Gear 360');
        break;
      // test case
      case 'iSTAR Pulsar':
      default:
        this.version = 1;
        this.OscAPIv1 = new OscAPIv1Service(this.http);
    }
  }

  /**
   * /osc/info
   * @returns {Promise<any>}
   */
  getInfo(): Promise<any> {
    if (this.version == 1) {
      return this.OscAPIv1.getInfo();
    }

    return Promise.reject({ Model: 'None' });
  }

  /**
   * /osc/state
   * @returns {Promise<any>}
   */
  getStatus(): Promise<any> {
    if (this.version == 1) {
      return this.OscAPIv1.getStatus();
    }

    return Promise.reject('error');
  }

  /**
   * session -> takePicture -> convert -> ImageData
   * @returns {Promise<binary(image/jpeg or image/png)>}
   */
  getTakePicture(): Promise<any> {
    if (this.version == 1) {
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
    if (this.version == 1) {
      return this.OscAPIv1.getImage(URI);
    }

    return Promise.reject('error');
  }

  /**
   *
   * @returns {Promise<object>}
   */
  getListImages(): Promise<any> {

    if (this.version == 1) {
      return this.OscAPIv1.listImages();
    }

    return Promise.reject('error');
  }

  async getTakePictureFileUri(): Promise<any> {
    if (this.version == 0) { // 초기화 되지 않았는데 사용하려고 하니까 에러가 남. 그래서 딜레이를 걸어줌
      await (new Promise(resolve => setTimeout(resolve, 200)));

      return await this.getTakePictureFileUri();
    }

    if (this.version == 1) {
      let session = await this.OscAPIv1.startSession();

      // return this.OscAPIv1.startSession().then(data => {
      // var sessionId = data.results.sessionId;
      var sessionId = session.results.sessionId;

      // return this.OscAPIv1.takePicture(sessionId).then(data => {
      let data = await this.OscAPIv1.takePicture(sessionId);
      var id = data.id;

      // return this.OscAPIv1.getConvertedImage(id);
      return await this.OscAPIv1.getImageFileUri(id);
      // });
      // });
    }

    // return Promise.reject('error');
    return 'error';

  }
}


function getDeviceInfo(http: Http, URL: String): Promise<OscInfo> {
  const headers = new Headers();
  headers.append('X-Content-Type-Options', 'nosniff');
  headers.append('Content-Type', 'application/json; charset=utf-8');
  headers.append('X-XSRF-Protected', '1');
  let options = new RequestOptions({ headers: headers });

  return http.get(["http:/", URL, "osc/info"].join("/"), options).toPromise()
    .then(response => <OscInfo>response.json())
    .catch(err => {
      console.error('fail to requect /osc/api, init as api');

      return <OscInfo>{ model: "Error" };
    });
}