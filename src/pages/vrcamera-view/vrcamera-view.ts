import { Component, Renderer2, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { ImageViewDetailPage } from '../imageviewdetail/imageview-detail';
import { Observable } from 'rxjs/Observable';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Log, Level } from 'ng2-logger'

import { OscAPIService } from "../../services/osc/osc.api.service";

import { File } from '@ionic-native/file';

import * as photoSphereViewer from '../../assets/photo-sphere-viewer/photo-sphere-viewer.min.js';
/**
 * Generated class for the SearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const log = Log.create('vrcamera-view');

@IonicPage()
@Component({
  selector: 'page-imageview',
  templateUrl: 'vrcamera-view.html',
})
export class VRCameraViewPage {

  selectedTab = "vr"; // vr, photo
  initVRImage = "./assets/images/init-vrimage.jpg";

  profileImage = "../../assets/images/notifications/100x100Notification1.jpeg";
  profileName = "Capture Camera";

  post: any;
  clipboardToast: any;
  moreActionSheet: any;

  photoSphereView: any;

  modelSubscribe: any;
  active = true;
  captureLock = false;

  @ViewChild('pano') panoDiv: ElementRef;


  constructor(public navCtrl: NavController,
    public socialSharing: SocialSharing,
    private _renderer2: Renderer2, @Inject(DOCUMENT) private _document,
    public actionsheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    public translate: TranslateService,
    public clipboard: Clipboard,
    public platform: Platform,
    public alertCtrl: AlertController,
    public navParams: NavParams,

    private file: File,

    private OscAPIService: OscAPIService
  ) {
    this.post = navParams.get('item');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.selectedTab == "vr")
      this.selectVR();

    this.photoSphereView = photoSphereViewer({
      container: this.panoDiv.nativeElement,
      panorama: this.initVRImage,
    });

    this.OscAPIService.getDeviceInfo().then((info) => {
      // console.log('vr init', info);
      if (!info.model) this.navCtrl.pop();
      this.modelSubscribe = this.OscAPIService.getDeviceModel().subscribe(model => {
        if (!model && this.active) {
          // console.log('vr sub', model);
          this.navCtrl.pop();
        }
      });
    })
  }

  ionViewDidEnter() {
    this.OscAPIService.getDeviceInfo().then((info) => {
      // console.log('vr enter', info);
      if (!info.model) this.navCtrl.pop();
    })

    this.active = true;
  }

  ionViewDidLeave() {
    // console.log('vr leave');
    this.active = false;
  }

  ngOnDestroy() {
    // console.log('vr destroy');
    this.modelSubscribe.unsubscribe();
  }

  onBack() {
    console.log('----back----');
    this.navCtrl.pop();
  }

  selectPhoto() {
    console.log('--photo--');
    this.selectedTab = "photo";
  }

  selectVR() {
    console.log('--photo--');
    this.selectedTab = "vr";
  }

  showDetail() {
    console.log('--capture VR Camera---');

    if (this.captureLock) return;
    this.captureLock = true;

    setTimeout(() => { this.captureLock = false; }, 5000);

    // 카메라 촬영 예제
    this.OscAPIService.getTakePictureFileUri().then(path => {
      if (!this.photoSphereView) {
        // console.log(path);
        this.photoSphereView = photoSphereViewer({
          container: this.panoDiv.nativeElement,
          panorama: path,
        });
      } else {
        // console.log(path);
        this.photoSphereView.setPanorama(path);
      }
    });
  }

  onNotificationPage() {

  }

  onClickMenu() {
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
