import { Component } from '@angular/core';
import { NavController, App, LoadingController, MenuController, ActionSheetController, Platform, ToastController, AlertController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { FeedPage } from '../feed/feed';
import { CommentsPage } from '../comments/comments';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { MapTypeModel } from './map-type.model';
import { MapTypeService } from './map-type.service';
import { ViewChild, OnInit, ElementRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';
import { SocialSharing } from '@ionic-native/social-sharing';

import { NotificationsPage } from '../notifications/notifications';
import { GoogleMap } from "../../components/google-map/google-map";
import { GoogleMapsService } from "./maps.service";
import { SearchResultPage } from '../search-result/search-result';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  selector: 'map-type-page',
  templateUrl: 'map-type.html',
})
export class MapTypePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  

  loading: any;

  categories: any;

  searchText = '';

  selectedCategory = '';


  constructor(
    public app: App,
    public menu: MenuController,
    public nav: NavController,
    public mapTypeService: MapTypeService,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public translate: TranslateService,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    private clipboard: Clipboard,
    public socialSharing: SocialSharing,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private openNativeSettings: OpenNativeSettings
  ) {
    this.loading = this.loadingCtrl.create();
  }


  ionViewDidLoad() {
    this.loading.present();
    this.mapTypeService
      .getData()
      .then(data => {
        this.categories = data.categories;
        this.loading.dismiss();
      });
    
    this.checkGPS();
  }

  checkGPS(){
    this.diagnostic.isLocationAvailable().then((isAvailable) => {
      console.log(isAvailable);
      if (isAvailable) {
        this.loadMap();
        return;
      } else {
        this.showAlertController();
      }
    }).catch(e=>console.log(e));
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

  toList(){
    this.menu.close();
    this.app.getRootNav().push(SearchResultPage);
  }


  onCategory(popular) {
    this.selectedCategory = popular.title;
  }


  goToFeed(category: any) {
    console.log("Clicked goToFeed", category);
    this.nav.push(FeedPage, { category: category });
  }

  showAlertController(){
    
      Observable.forkJoin(
        this.translate.get('GPS_INFO_IS_NOT_AVAILABLE'),
        this.translate.get('CURRENT_LOCATION_CANT_BE_DETACTED'),
        this.translate.get('CONFIRM'),
        this.translate.get('CANCEL')
      ).subscribe(data => {

        let confirm = this.alertCtrl.create({
          title: data[0],
          message: data[1],
          buttons: [
            {
              text: data[3],
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: data[2],
              handler: () => {
                this.diagnostic.requestLocationAuthorization("always")
                .then(res => {
                  console.log(res);
                  if (res == "GRANTED") {
                    this.loadMap();
                  }
                })
                .catch(err => {console.log(err);});
              }
            }
          ]
        });
        confirm.present();

      });
    
  }
}
