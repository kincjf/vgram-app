import { Component } from '@angular/core';
import { NavController, App, LoadingController, MenuController, Platform, ToastController, NavParams } from 'ionic-angular';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ViewChild, OnInit, ElementRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';
import { File } from '@ionic-native/file';

import { Geolocation } from '@ionic-native/geolocation';

import { PostAPIService } from '../../services/moblab/apis/post.api.service';

const defaultLat = 35.8598743;
const defaultLng = 127.1117673;

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
  public_or_private = "public";
  category: any;
  title: any;
  content: any;
  latLng: google.maps.LatLng;

  VR: any;
  NORMAL: any;

  uploading = false;

  constructor(
    public app: App,
    public menu: MenuController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public platform: Platform,
    private navParams: NavParams,
    private geolocation: Geolocation,
    private postApi: PostAPIService,
    private toastCtrl: ToastController,
    private file: File
  ) {
    this.loading = this.loadingCtrl.create();

    this.VR = navParams.get('VR');
    this.NORMAL = navParams.get('NORMAL');
    this.uploading = false;
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.setMap(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      this.setMap(defaultLat, defaultLng);
      // console.log('Error getting location', error);
    });

  }

  setMap(lat, lng) {
    this.latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: this.latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var marker = new google.maps.Marker({
      position: this.latLng,
      map: this.map,
    });
  }

  registerPost() {
    if (this.uploading) return;
    if (!this.title) return this.showToast('enter title');
    if (!this.content) return this.showToast('enter content');

    this.uploading = true;

    this.postApi.createPost(this.title, this.public_or_private, this.category, this.content, defaultLat, defaultLng).toPromise().then(data => {

      let VR = [];
      let NORMAL = [];
      let promises = [];
      for (var i = 0; i < this.VR.length; i++) {
        let files = this.VR[i].split('/');
        let filename = files[files.length - 1];
        let filepath = "file://" + files.slice(0, files.length - 2).join('/');

        console.log(filepath);

        promises.push(this.file.readAsArrayBuffer(filepath, filename).then(blob => VR.push({ name: filename, blob: new Blob([blob], { type: "image/*" }) }))
          .catch(err => {
            console.log('promise', JSON.stringify(err))
            return Promise.resolve(err);
          }));
      }

      promises.push(Promise.all(promises).then(() => {
        promises.push(this.postApi.sendVRImages(data.post.ID, VR).toPromise().then().catch(err => console.log(err)));
      }).catch(err => console.log('promise all', JSON.stringify(err))));

      if (this.NORMAL.length != 0) {

        for (var i = 0; i < this.VR.length; i++) {
          let files = this.NORMAL[i].split('/');
          let filename = files[files.length - 1];
          let filepath = "file://" + files.slice(0, files.length - 2).join('/');

          promises.push(this.file.readAsArrayBuffer(filepath, filename).then(blob => NORMAL.push({ name: filename, blob: new Blob([blob], { type: "image/*" }) }))
            .catch(err => {
              console.log('promise', JSON.stringify(err))
              return Promise.resolve(err);
            }));
        }

        promises.push(Promise.all(promises).then(() => {
          promises.push(this.postApi.sendNoramlImages(data.post.ID, NORMAL).toPromise().then().catch(err => console.log(err)));
        }).catch(err => console.log('promise all', JSON.stringify(err))));
      }

      Promise.all(promises).then(() => {
        this.title = '';
        this.content = '';
        this.uploading = false;
        this.showToast('success');
        this.nav.popToRoot();
      }).catch(err => console.log('promise all', JSON.stringify(err)));

    }).catch(err => {
      console.log(JSON.stringify(err));
      this.showToast('register error');
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
}
