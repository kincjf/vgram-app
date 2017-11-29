import { Component } from '@angular/core';

import { ListingPage } from '../listing/listing';
import { ProfilePage } from '../profile/profile';
import { NotificationsPage } from '../notifications/notifications';
import { MapTypePage } from '../map-type/map-type';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab5Root: any;

  constructor() {
    this.tab1Root = ListingPage;
    this.tab2Root = MapTypePage;
    this.tab3Root = NotificationsPage;
    this.tab4Root = ProfilePage;
    this.tab5Root = NotificationsPage;
  }
}
