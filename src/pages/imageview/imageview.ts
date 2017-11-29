import { Component,  Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { ImageViewDetailPage } from '../imageviewdetail/imageview-detail';
import { Observable } from 'rxjs/Observable';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imageview',
  templateUrl: 'imageview.html',
})
export class ImageViewPage {

  selectedTab = "vr"; // vr, photo

  profileImage = "../../assets/images/notifications/100x100Notification1.jpeg";
  profileName = "Test Title";

  post: any;
  clipboardToast: any;
  moreActionSheet: any;

tempView: any;


  constructor(public navCtrl: NavController,
    public socialSharing: SocialSharing,
    private _renderer2: Renderer2, @Inject(DOCUMENT) private _document,
    public actionsheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    public translate: TranslateService,
    public clipboard: Clipboard,
    public platform: Platform,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
    this.post = navParams.get('item');
  }

  ngOnInit(){
    if (this.selectedTab == "vr")
      this.selectVR();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageViewPage');
  }

  onBack(){
    console.log('----back----');
    this.navCtrl.pop();
  }

  selectPhoto(){
    console.log('--photo--');
    this.selectedTab = "photo";
  }

  selectVR(){
    console.log('--photo--');
    this.selectedTab = "vr";

    setTimeout(() => {
      let s = this._renderer2.createElement('script');    
      s.text = `
          embedpano({swf:"./assets/krpano/krpano-tour.swf", xml:"./assets/krpano/krpano-tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
      `;

      this._renderer2.appendChild(this._document.body, s);    
    }, 100);



    //this.tempView = embedpano({ swf: "../../assets/krpano/krpano-tour.swf", xml: "../../assets/krpano/krpano-tour.xml", target: "pano", html5: "auto", mobilescale: 1.0, passQueryParameters: true });
  }

  showDetail(){
    console.log('--todetail---');
    this.navCtrl.push(ImageViewDetailPage, {item: this.post});
  }

  onNotificationPage(){

  }

  onClickMenu(){
    Observable.forkJoin(
      this.translate.get('COPY_URL_LINK'),
      this.translate.get('SHARE'),
      this.translate.get('EDIT'),
      this.translate.get('RE_POST'),
      this.translate.get('REMOVE'),
      this.translate.get('CURRENT_POSTING_WILL_BE_RE_POSTED_AGAIN_NOW_DO_YOU_WANT_TO_RE_POST'),
      this.translate.get('CURRENT_POSTING_WILL_BE_REMOVED_DO_YOU_WANT_TO_CONTINUE'),
      this.translate.get('CANCEL')
    ).subscribe(data => {

      this.clipboardToast = this.toastCtrl.create({
        message: data[4],
        duration: 3000,
        position: 'bottom'
      });

      this.moreActionSheet = this.actionsheetCtrl.create({
        title: 'Select an action',
        buttons: [
          {
            text: data[0],
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'link' : null,
            handler: () => {
              //this.clipboard.copy(this.profile.user.image);

              this.clipboard.paste().then(
                (resolve: string) => {
                  this.clipboardToast.present();
                },
                (reject: string) => {

                }
              );
            }
          },
          {
            text: data[1],
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'share' : null,
            handler: () => {
            }
          },
          {
            text: data[2],
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'create' : null,
            handler: () => {
            }
          },
          {
            text: data[3],
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'redo' : null,
            handler: () => {
                let confirm = this.alertCtrl.create({
                title: "ALERT",
                message: data[5],
                buttons: [
                  {
                    text: data[7],
                    handler: () => {
                      
                    }
                  },
                  {
                    text: data[3],
                    handler: () => {
                      
                    }
                  }
                ]
              });
              confirm.present();
            }
          }
          ,
          {
            text: data[4],
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              let confirm = this.alertCtrl.create({
                title: "ALERT",
                message: data[6],
                buttons: [
                  {
                    text: data[7],
                    handler: () => {
                      
                    }
                  },
                  {
                    text: data[4],
                    handler: () => {
                      
                    }
                  }
                ]
              });
              confirm.present();

            }
          }
        ]
      });


      this.moreActionSheet.present();
    });
  }
}
