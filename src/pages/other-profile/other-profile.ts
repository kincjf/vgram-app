import { Component } from '@angular/core';
import { MenuController, SegmentButton, NavController, App, NavParams, LoadingController, ActionSheetController, Platform, ToastController,Events } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { FollowersPage } from '../followers/followers';
import { SettingsPage } from '../settings/settings';
import { ProfileModel } from './other-profile.model';
import { OtherProfileService } from './other-profile.service';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { ChangePasswordPage } from '../change-password/change-password';
import { AppSettingPage } from '../app-setting/app-setting';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  selector: 'other-profile-page',
  templateUrl: 'other-profile.html'
})
export class OtherProfilePage {
  display: string;
  profile: ProfileModel = new ProfileModel();
  loading: any;
  moreActionSheet = undefined;
  clipboardToast: any;

  curNotifications = [
    {
      "name": "Martin",
      "image": "./assets/images/notifications/100x100Notification1.jpeg",
      "msgType": 1,
      "date": "5:03 pm",
      "isRead": true
    }
    ,
    {
      "name": "Martin",
      "image": "./assets/images/notifications/100x100Notification1.jpeg",
      "msgType": 2,
      "date": "5:03 pm",
      "isRead": false
    }
  ];

  post1 = {
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

  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public profileService: OtherProfileService,
    public translate: TranslateService,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public socialSharing: SocialSharing,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    private clipboard: Clipboard,
    public events: Events,
    public toastCtrl: ToastController,
    public nav: NavController
  ) {
    this.display = "myphoto";

    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.profileService.getData()
      .then(data => {
        this.profile.user = data.user;
        this.profile.following = data.following;
        this.profile.followers = data.followers;
        this.profile.posts = data.posts;
        this.loading.dismiss();
      });
  }

  goToFollowList() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(FollowersPage, {
      followers: this.profile.followers,
      followings: this.profile.following
    });
  }

  goToSettings() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(SettingsPage);
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

  sharePost(post) {
   //this code is to use the social sharing plugin
   // message, subject, file, url
   this.socialSharing.share(post.description, post.title, post.image)
   .then(() => {
     console.log('Success!');
   })
   .catch(() => {
      console.log('Error');
   });
  }

  onClickMenu(){


    Observable.forkJoin(
      this.translate.get('LINK_PROFILE_COPY_CLIPBOARD')
    ).subscribe(data => {

      this.clipboardToast = this.toastCtrl.create({
        message: data[4],
        duration: 3000,
        position: 'bottom'
      });
      this.clipboard.copy(this.profile.user.image);
      this.clipboard.paste().then(
        (resolve: string) => {
          this.clipboardToast.present();
        },
        (reject: string) => {

        });
    });

  }

  toNotificationPage(){
    this.nav.push( NotificationsPage );
  }

  addFriend(){

  }
}
