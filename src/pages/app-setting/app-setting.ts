import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-setting',
  templateUrl: 'app-setting.html',
})
export class AppSettingPage {

  defulatLanguage = 'ko';
  sharePosition = false;
  receiveImpSMS = false;
  alertDistance = 2;
  fontSize = 'small';

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
  }
  onBack(){
    console.log('back');
    this.navCtrl.pop();
  }
  onSave() {
    this.navCtrl.pop();
  }
}
