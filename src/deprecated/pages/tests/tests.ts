import {Component, Inject, Injector} from '@angular/core';

import { OscAPIService } from "../../services/osc.api.v1.service";
import {oscApiFactory, VRCameraConfiguration} from "../../services/osc/osc.factory";
import {Http} from "@angular/http";
import {OscBaseService} from "../../services/osc/osc.base.service";
import {LG360V1Service, MockDeviceV1Service} from "../../services/osc/osc.v1.service";

// Dynamic Dependency Injection in Angular
// http://www.damirscorner.com/blog/posts/20170526-DynamicDependencyInjectionInAngular.html
@Component({
  // selector: 'tests',
  // templateUrl: 'tests.html',
  // providers: [
  //   VRCameraConfiguration,
  //   { provide: OscBaseService, useFactory: oscApiFactory, deps: [Http, VRCameraConfiguration]},
  // ]
  // providers: [
  //   VRCameraConfiguration, OscBaseService, MockDeviceV1Service
  // ]
})
export class TestPage {

  constructor(
    // @Inject(OscBaseService) private oscService: OscBaseService,
    // @Inject(MockDeviceV1Service) private oscMockService: MockDeviceV1Service
    ) {


  }

  ngAfterViewInit() {
  }

  getOscInfo() {
    // this.oscService.getInfo()
    //   .then(data => {
    //     console.log(data);
    //     // var name = "test";
    //     // this.file.writeFile(this.file.dataDirectory, name, data);
    //   });
  }
}
