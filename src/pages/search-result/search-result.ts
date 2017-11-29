import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  title: any;

  post = {
    "images": ["./assets/images/listing/200x200basquet.png",
      "./assets/images/listing/200x200swimming.png",
      "./assets/images/listing/300x300ExtremeSports.png"],
    "address": "Sample Address",
    "likesCount": 53,
    "commentsCount": 5,
    "meLikes": false,
    "date": "2017-11-20",
    "comments": [{ "name": "Sinho0689", "comment": "seems good" }
      , { "name": "Sinho0689", "comment": "seems good" }
      , { "name": "Sinho0689", "comment": "seems good" }]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
  }

}
