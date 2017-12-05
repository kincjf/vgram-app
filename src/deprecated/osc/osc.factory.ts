import {LG360V1Service, MockDeviceV1Service} from './osc.v1.service';
import {Inject, Injectable, ReflectiveInjector} from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import {OscInfo} from "./osc.dto";
import {Log, Level} from 'ng2-logger'

const log = Log.create('osc.factory');

import * as _ from 'lodash';

declare let WifiWizard: any;

const enum ApiVersion {
  v1 = 1,
  v2 = 2
}

const VRCameraSSIDPrefix = {
  lg360Cam: "LGR105",
  gear360: "Gear 360"
}

const VRCameraName = {
  mockServer: "mockServer",
  lg360Cam: "lg360Cam",
  gear360: "gear360"
}

/**
 * /osc/info -> model
 */
const enum VRCameraModelType {
  mockServer = "iSTAR Pulsar",
  lg360Cam = "LG-R105",
  gear360 = "GEAR 360"
}

export const VRCameraUrl = {    // Wifi URL이 camera별로 정해져있음
  mockServer: "http://210.122.38.113",
  lg360Cam: "http://192.168.43.1",
  gear360: "http://192.168.107.1"
}

@Injectable()
export class VRCameraConfiguration {
  apiVersion: ApiVersion;
  url: string;
  cameraName: string;

  constructor(protected http: Http) {
    // this.ngOnInit();
  }

  async ngOnInit() {
    this.cameraName = await this.getVRCameraName();
    this.url = VRCameraUrl[this.cameraName];
    const headers = new Headers();
    headers.append('X-Content-Type-Options', 'nosniff');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('X-XSRF-Protected', '1');
    let options = new RequestOptions({headers: headers});

    try {
      // API 정보를 불러오기 위해서
      const response = await this.http.get([this.url, "osc/info"].join("/"), options).toPromise();
      const res: OscInfo = response.json();

      if (_.isEmpty(res.apiLevel)) {  // default v1
        this.apiVersion = ApiVersion.v1;
      } else {
        this.apiVersion = res.apiLevel[0];  // 일단 v1
      }
    } catch (e) {
      this.apiVersion = ApiVersion.v1;
      log.error("fail to requect /osc/api, init as apiv1");
    }
  }

  async getVRCameraName(): Promise<string> {
    let ssid;

    if (typeof WifiWizard !== 'undefined') {
      log.error("undefined WifiWizard, init as mockServer");
      return VRCameraName.mockServer;
    } else {
      try {
        ssid = await this.getCurrentSSID();
      } catch (e) {
        log.error("init as mockServer", e);
        return VRCameraName.mockServer;
      }

      let key = _.findKey(VRCameraSSIDPrefix, function (value, key) {
        return _.startsWith(value, ssid);
      });

      if (key) {
        return key;
      } else {
        log.error("no compatible version, Make sure it is a supported VR camera, init as mockServer");
        return VRCameraName.mockServer;
      }
    }
  }

  getCurrentSSID(): Promise<any> {
    return new Promise((resolve, reject) => {
      WifiWizard.getCurrentSSID(
        (ssid) => {
          return resolve(ssid);
        },
        (err) => {
          return reject(err);
        });
    });
  }
}

/**
 * precondition: VR camera and wifi are connected
 * If not connected, it will be connected to the default mock server
 * @param {Http} http
 * @returns {any}
 */
export async function oscApiFactory(http: Http, config: VRCameraConfiguration) {
  let injector;
  await config.ngOnInit();  // 좀 이상하지만 그냥 하자

  if (config.apiVersion === ApiVersion.v1) {
    if (config.cameraName === VRCameraName.mockServer) {
      // injector = ReflectiveInjector.resolveAndCreate([MockDeviceV1Service]);

      return new MockDeviceV1Service(config.url, http);
    } else if (config.cameraName === VRCameraName.lg360Cam) {
      // injector = ReflectiveInjector.resolveAndCreate([LG360V1Service]);

      return new LG360V1Service(config.url, http);
    } else if (config.cameraName === VRCameraName.gear360) {

    }
  } else if (config.apiVersion === ApiVersion.v2) {

  }

  return null;
}
