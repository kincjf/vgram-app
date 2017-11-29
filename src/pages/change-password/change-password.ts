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
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  currentPassword: any;
  newPassword: any;
  confirmPassword: any;

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
