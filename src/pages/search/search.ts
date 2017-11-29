import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { SearchResultPage } from '../search-result/search-result';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  selectedTab = 4;

  searchText: any;

  items = [
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",
    "Amsterdam",

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.loadMap();
  }

  onBack(){
    this.navCtrl.pop();
  }

  onClickTab(value){
    this.selectedTab = value;
    console.log('----clicked----');
    if (value == 4) {
      this.loadMap();
    }
  }

  onItem(item) {
    this.navCtrl.push(SearchResultPage, {item});
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
