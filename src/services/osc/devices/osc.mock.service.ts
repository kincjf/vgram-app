import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { OscAPIv1Service } from '../osc.api.base.service';

import * as _ from "lodash";

@Injectable()
export class MockAPIv1Service extends OscAPIv1Service {
  constructor(public http: Http) {
    super(http, "http://210.122.38.113");
  }

  startSession(): Promise<any> {
    return super.getState().then(data => {
      let sessionId = data.state.sessionId;

      if (_.isEmpty(sessionId)) {
        return super.startSession();
      } else {
        return super.updateSession(sessionId);
      }
    });
  }
}
