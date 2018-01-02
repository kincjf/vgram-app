import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
// import { Hotspot, HotspotNetworkConfig } from '@ionic-native/hotspot';
import { Log, Level } from 'ng2-logger';

import { OscAPIv1Service } from './osc.api.base.service';
import { OscInfo } from './osc.dto';

import { LG360APIv1Service } from './devices/osc.lg360.service';
import { Gear360APIv1Service } from './devices/osc.gear360.service';
import { MockAPIv1Service } from './devices/osc.mock.service';

import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';


declare let networkinterface: any;

const mockIP = "210.122.38.113";

const log = Log.create('osc.api.service');

/**
 * refered osc api docs(postman)
 */
@Injectable()
export class OscAPIService {
  private oscAPIv1: OscAPIv1Service;
  // private OscAPIv2: OscAPIv2Service;

  private info: OscInfo;
  private apiVersion: number;    // osc api version

  constructor(
    protected http: Http,
    protected file: File,
    protected network: Network,
  ) {
    this.apiVersion = 0;
    this.checkDevice();

    this.network.onConnect().subscribe(() => {
      this.apiVersion = 0;
      this.checkDevice();
    });

    this.network.onDisconnect().subscribe(() => {
      this.apiVersion = -1;
    });
  }

  private async checkDevice(): Promise<void> {
    let ip, gateway;

    if (typeof networkinterface !== 'undefined') {
      ip = await new Promise<String>((resolve, reject) => {
        networkinterface.getWiFiIPAddress((ip) => resolve(ip), (err) => {
          log.error('No wifi connection found.');
          alert('Wifi not connected.\n' +
            'Make sure you have a wifi connection with your VR camera');

          return resolve(mockIP);
          // this.version = -1; return reject(err);
        });
      });

      // get device ip, 타 VR 카메라 연결시 gateway ip가 .1이 아닐 수 있음
      if (ip != mockIP) {
        gateway = ip.split('.', 3).join('.') + '.1';
      } else {
        gateway = ip;
      }
    } else {
      ip = gateway = mockIP;
    }

    console.log(gateway);

    // if (true) { // 기기를 연결할 경우 주석하면됨.
    //   gateway = mockIP;
    //   console.log('enter test mode.');
    // }

    this.info = await getDeviceInfo(this.http, gateway);

    switch (this.info.model) {
      case 'LG-R105':
        this.apiVersion = 1;
        this.oscAPIv1 = new LG360APIv1Service(this.http, this.file);
        log.info("connected with LG 360 Cam(api v1)");
        break;
      case 'GEAR 360':
        this.apiVersion = 1;
        this.oscAPIv1 = new Gear360APIv1Service(this.http, this.file);
        log.info("connected with Gear 360 2016(api v1)");
        break;
      case 'iSTAR Pulsar':
        // mock server
        this.apiVersion = 1;
        this.info.mocked = true;
        this.oscAPIv1 = new MockAPIv1Service(this.http, this.file);

        log.info('Connects to the OSC Mock server (api v1).\n' +
          'Please connect the VR camera supported by the app to WiFi.\n' +
          'Available Products: LG 360 Cam(api v1), Gear 360 2016(api v1)');
        break;
      case 'Error':
      default:

        this.apiVersion = 1;
        this.info.mocked = true;
        this.oscAPIv1 = new MockAPIv1Service(this.http, this.file);

        log.info('Connects to the OSC Mock server (api v1).\n' +
          'Please connect the VR camera supported by the app to WiFi.\n' +
          'Available Products: LG 360 Cam(api v1), Gear 360 2016(api v1)');

        // this.apiVersion = -1;

        // log.error('No VR Camera connection found.');
        // alert('No VR Camera connection found. \n' +
        //   'Please connect the VR camera supported by the app to WiFi.\n' +
        //   'Products: LG 360 Cam(api v1), Gear 360 2016(api v1)');
        break;
    }
  }

  /**
   * /osc/info
   * @returns {Promise<any>}
   */
  getInfo(): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.getInfo();
    }

    return Promise.reject({ Model: 'None' });
  }

  /**
   * /osc/state
   * @returns {Promise<any>}
   */
  getState(): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.getState();
    }

    return Promise.reject('error');
  }

  /**
   * session -> takePicture -> convert -> ImageData
   * @returns {Promise<binary(image/jpeg or image/png)>}
   */
  getTakePicture(): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.startSession().then(data => {
        var sessionId = data.results.sessionId;

        return this.oscAPIv1.takePicture(sessionId).then(data => {
          var id = data.id;

          return this.oscAPIv1.getConvertedImage(id);
        });
      });
    }

    return Promise.reject('error');
  }

  /**
   * @returns {Promise<binary(image/jpeg or image/png)>}
   */
  getImage(URI: String): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.getImage(URI);
    }

    return Promise.reject('error');
  }

  /**
   *
   * @returns {Promise<object>}
   */
  getListImages(): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.listImages();
    }

    return Promise.reject('error');
  }

  async getTakePictureFileUri(): Promise<String> {
    if (this.apiVersion == 0) { // 초기화 되지 않았는데 사용하려고 하니까 에러가 남. 그래서 딜레이를 걸어줌
      await new Promise(resolve => setTimeout(resolve, 200));

      return await this.getTakePictureFileUri();
    }

    if (this.apiVersion == 1) {
      let session = await this.oscAPIv1.startSession();
      var sessionId = session.results.sessionId;

      let data = await this.oscAPIv1.takePicture(sessionId);
      var id = data.id;

      return await this.oscAPIv1.getImageFileUri(id);
    }

    return 'error';
  }

  getThumbImagePath(URI: String): Promise<String> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.getThumbImagePath(URI);
    }
  }

  downloadImage(URI: String): Promise<String> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.downloadImage(URI);
    }
  }

  async getDeviceInfo(): Promise<any> {
    switch (this.apiVersion) {
      case 0:
        return { model: 'Wait' }
      case 1:
        return this.oscAPIv1.getInfo();
      // case 2:
      // return this.oscAPIv2.getInfo();
      case -1:
      default:
        return { model: 'Error' }
    }
  }

  getAllOptions(): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.getAllOptions();
    }
  }

  enableHDR(): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.setHDR(true);
    }
  }

  disableHDR(): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.setHDR(false);
    }
  }

  setExposureDelay(delay: Number): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.setExposureDelay(delay);
    }
  }

  setWhiteBalance(option: String): Promise<any> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.setWhiteBalance(option);
    }
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