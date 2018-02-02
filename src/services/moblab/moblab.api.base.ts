import { Injectable } from '@angular/core';

@Injectable()
export class MoblabAPIBase {
  protected baseUrl: any = "http://api.vgram.kr/api";

  constructor() {}
}