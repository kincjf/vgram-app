import { Component } from '@angular/core';
import { NavController, App, LoadingController, MenuController, Platform } from 'ionic-angular';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ViewChild, OnInit, ElementRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';

@Component({
  selector: 'writing-add-page',
  templateUrl: 'writing-add.html',
})
export class WritingAddPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  loading: any;

  streetAddress: any;
  detailAddress: any;
  public_or_private: any;
  category: any;
  title: any;
  content: any;


  constructor(
    public app: App,
    public menu: MenuController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public platform: Platform,
  ) {
    this.loading = this.loadingCtrl.create();
  }


  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

}
