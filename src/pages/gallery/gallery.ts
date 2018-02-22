import { Component } from '@angular/core';
import { NavController, App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { File } from '@ionic-native/file';

import { GalleryDetailPage } from '../gallery-detail/gallery-detail';

import { OscAPIService } from "../../services/osc/osc.api.service";
import { OscInfo } from '../../services/osc/osc.dto';
import { Observable } from 'videogular2/node_modules/rxjs/Observable';

const dirName = "VRThumb";

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

  private imageObserver;
  private image = Observable.create(observer => {
    this.imageObserver = observer;
  });

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
    this.image.subscribe(item => {
      // console.log(item);
      this.images.push(item);
    });

    this.getLists();
  }

  async getLists(): Promise<any> {
    let lists = await this.file.listDir(this.file.dataDirectory, dirName);
    // console.log(lists);

    lists = lists.reverse();

    for (var i in lists) {
      this.imageObserver.next({ image: lists[i].nativeURL });
    }
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
    // console.log(image);
    this.nav.push(GalleryDetailPage, {
      path: image.image
    });
  }
}
