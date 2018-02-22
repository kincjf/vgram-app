import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ViewChild, OnInit, ElementRef } from '@angular/core';

import { CommentsPage } from '../comments/comments';

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
  id: any;
  position: any;

  selectedTab = "vr"; // vr, photo

  profileImage = "../../assets/images/notifications/100x100Notification1.jpeg";
  profileName = "Test Title";
  postContent = "";

  post: any;

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.id = navParams.get('id');
    this.post = navParams.get('item');
    this.position = navParams.get('position');

    this.profileImage = this.post.user.profile_image_path;
    this.profileName = this.post.user.nickname;
    this.postContent = this.post.content;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageViewDetailPage');
    this.loadMap();
  }

  onBack() {
    console.log('----back----');
    this.navCtrl.pop();
  }

  onNotificationPage() {
    // console.log(this.id);
    this.app.getRootNav().push(CommentsPage, {
      ID: this.id
    });
  }

  loadMap() {
    let latLng = new google.maps.LatLng(this.position.lat, this.position.lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });
  }
}
