import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import * as photoSphereViewer from '../../assets/photo-sphere-viewer/photo-sphere-viewer.min.js';


@Component({
  selector: 'gallery-detail-page',
  templateUrl: 'gallery-detail.html'
})
export class GalleryDetailPage {

  loading: any;
  m_bSelect = false;
  m_bAllSelected = false;
  selectedCount = 0;
  selectedTab = "vr";
  photoSphereView;

  @ViewChild('pano') panoDiv: ElementRef;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App,
    public menu: MenuController,

    private navParams: NavParams
  ) {
  }

  ngAfterViewInit() {
    // console.log(this.navParams.get('path'));
    this.photoSphereView = photoSphereViewer({
      container: this.panoDiv.nativeElement,
      panorama: this.navParams.get('path')
    });
  }

  onBack() {
    this.nav.pop();
  }

}
