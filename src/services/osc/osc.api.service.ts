import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
// import { Hotspot, HotspotNetworkConfig } from '@ionic-native/hotspot';
import { Log, Level } from 'ng2-logger';

import { OscAPIv1Service } from './osc.api.base.service';
import { OscInfo } from './osc.dto';

import { LG360APIv1Service } from './devices/osc.lg360.service';
import { Gear360APIv1Service } from './devices/osc.gear360.service';
import { MockAPIv1Service } from './devices/osc.mock.service';

import { Observable } from 'rxjs/Observable';
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

  private ipObserver;
  private ip = Observable.create(observer => {
    this.ipObserver = observer;
  });

  private modelObserver;
  private model = Observable.create(observer => {
    this.modelObserver = observer;
  });

  private address: String;
  private apiVersion: number;    // osc api version

  constructor(
    protected http: Http,
    protected file: File,
    protected network: Network,
    protected toastCtrl: ToastController
  ) {
    setInterval(() => {
      this.checkIP();
    }, 1000);

    this.ip.subscribe(() => {
      this.apiVersion = 0;
      this.checkDevice();
    });
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  private checkIP(): void {
    if (typeof networkinterface !== 'undefined') {
      networkinterface.getWiFiIPAddress((ip) => {
        if (ip != this.address) {
          this.address = ip;
          this.ipObserver.next(ip);
        }
      }, (error) => {
        if (this.address != undefined) {
          this.address = undefined;
          this.ipObserver.next(undefined);
        }
      });
    }
  }

  private async checkDevice(): Promise<void> {
    let ip, gateway;

    if (typeof networkinterface !== 'undefined') {
      ip = await new Promise<String>((resolve, reject) => {
        networkinterface.getWiFiIPAddress((ip) => resolve(ip), (err) => resolve('127.0.0.1'));
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

    if (true) { // test mode 
      gateway = mockIP;
    }

    let info = await getDeviceInfo(this.http, gateway);

    if (this.info && this.info.model == info.model) return;

    this.info = info;

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
        this.apiVersion = -1;

        log.error('No VR Camera connection found.');
        this.showToast('No VR Camera connection found. \n' +
          'Please connect the VR camera supported by the app to WiFi.\n' +
          'Products: LG 360 Cam(api v1), Gear 360 2016(api v1)');
        break;
    }
    this.modelObserver.next(this.info.model);
  }

  /**
   * /osc/info
   * @returns {Promise<any>}
   */
  getInfo(): Promise<OscInfo> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.getInfo();
    }

    return Promise.reject({ model: 'None' });
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

  delete(URI: String): Promise<String> {
    if (this.apiVersion == 1) {
      return this.oscAPIv1.delete(URI);
    }
  }

  getDeviceModel(): Observable<any> {
    return this.model;
  }

  async getDeviceInfo(): Promise<OscInfo> {
    switch (this.apiVersion) {
      case 0:
        await new Promise(resolve => setTimeout(resolve, 200));
        return await this.getDeviceInfo();
      case 1:
        console.log('version 1');
        return this.oscAPIv1.getInfo();
      // case 2:
      // return this.oscAPIv2.getInfo();
      case -1:
      default:
        console.log('error');
        return <OscInfo>{ model: undefined }
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


function getDeviceInfo(http: Http, Address: String): Promise<OscInfo> {
  const headers = new Headers();
  headers.append('X-Content-Type-Options', 'nosniff');
  headers.append('Content-Type', 'application/json; charset=utf-8');
  headers.append('X-XSRF-Protected', '1');
  let options = new RequestOptions({ headers: headers });

  return http.get(["http:/", Address, "osc/info"].join("/"), options).toPromise()
    .then(response => <OscInfo>response.json())
    .catch(err => {
      console.error('fail to request /osc/api, init as api');

      return <OscInfo>{ model: undefined };
    });
}