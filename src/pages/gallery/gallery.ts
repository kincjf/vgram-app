import { Component } from '@angular/core';
import { NavController, App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { File } from '@ionic-native/file';

import { GalleryDetailPage } from '../gallery-detail/gallery-detail';

import { OscAPIService } from "../../services/osc/osc.api.service";
import { OscInfo } from '../../services/osc/osc.dto';

@Component({
  selector: 'gallery-page',
  templateUrl: 'gallery.html'
})
export class GalleryPage {

  loading: any;
  m_bSelect = false;
  m_bAllSelected = false;
  selectedCount = 0;
  selectedTab = "vr";

  images = [];

  test = [];

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App,
    public menu: MenuController,
    public file: File,

    private OscAPIService: OscAPIService,
  ) {
  }

  ionViewDidLoad() {
    const dirName = "VRThumb";

    this.file.listDir(this.file.dataDirectory, dirName).then(function (list) {
      for (var i in list) {
        console.log(list[i].nativeURL);
        console.log(typeof(this.images));
        // this.images.push({ image: list[i].nativeURL });
      }
    });
  }

  onBack() {
    this.nav.pop();
  }

  onDownload() {
    this.m_bSelect = true;
  }

  onTrash() {

  }

  onSelectAll() {
    this.m_bAllSelected = !this.m_bAllSelected;
  }

  onSelectImage(image) {
    return false;
    // image.selected = !image.selected;
  }


  selectMachine() {
    this.selectedTab = "mine";
  }

  selectVR() {
    this.selectedTab = "vr";
  }

  onImageDetial(image) {
    this.nav.push(GalleryDetailPage);
  }
}
