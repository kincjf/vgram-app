import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { NotificationsModel } from './notifications.model';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'notifications-page',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  notifications: NotificationsModel = new NotificationsModel();
  loading: any;

  infiniteScrollVisible = true;
  curNotifications = [];
  notificationShowCount = 10;

  constructor(
    public nav: NavController,
    public notificationsService: NotificationsService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.notificationsService
      .getData()
      .then(data => {
          this.notifications = data;
          this.loading.dismiss();
          this.initNotifications();
      });
  }

  initNotifications(){
    this.curNotifications = [];
    for (let i = 0; i < this.notificationShowCount; i++) {
      if (this.curNotifications.length == this.notifications.notifications.length) {
        this.infiniteScrollVisible = false;
        break;
      }
      else {
        this.curNotifications.push(this.notifications.notifications[ this.curNotifications.length ]);
      }
    }
  }

  doInfinite(infiniteScroll: any){
    setTimeout(() => {
      for (let i = 0; i < this.notificationShowCount; i++) {
        if (this.curNotifications.length == this.notifications.notifications.length) {
          this.infiniteScrollVisible = false;
          break;
        }
        else {
          this.curNotifications.push(this.notifications.notifications[ this.curNotifications.length ]);
        }
      }
      infiniteScroll.complete();
    }, 500);
  }
}
