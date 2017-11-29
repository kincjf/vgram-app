import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild, OnInit, ElementRef } from '@angular/core';
/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imageview-detail',
  templateUrl: 'imageview-detail.html',
})
export class ImageViewDetailPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;


  selectedTab = "vr"; // vr, photo

  profileImage = "../../assets/images/notifications/100x100Notification1.jpeg";
  profileName = "Test Title";

  post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.post = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageViewDetailPage');
    this.loadMap();
  }

  onBack(){
    console.log('----back----');
    this.navCtrl.pop();
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
