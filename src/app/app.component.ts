import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, ToastController, Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Observable';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProfilePage } from '../pages/profile/profile';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { FormsPage } from '../pages/forms/forms';
import { LayoutsPage } from '../pages/layouts/layouts';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { FunctionalitiesPage } from '../pages/functionalities/functionalities';

import { ChattingNoPage } from '../pages/chatting-no/chatting-no';
import { ChattingYesPage } from '../pages/chatting-yes/chatting-yes';
import { LoginPage } from '../pages/login/login';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  isInitialOpen = true;

  // make WalkthroughPage the root (or first) page
  rootPage: any = WalkthroughPage;
  // rootPage: any = FunctionalitiesPage;
  // rootPage: any = TabsNavigationPage;
  textDir: string = "ltr";

  pages: Array<{title: any, icon: string, component: any}>;

  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public translate: TranslateService,
    public toastCtrl: ToastController,
    public authService: AuthServiceProvider,
    public events: Events
  ) {
    translate.setDefaultLang('en');
    translate.use('ko');

    const isInit = localStorage.getItem('isInit');
    if (isInit == undefined) {
      localStorage.setItem('isInit', JSON.stringify(true));
    } else {
      this.rootPage = TabsNavigationPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        if(event.lang == 'ar')
        {
          platform.setDir('rtl', true);
          platform.setDir('ltr', false);
        }
        else
        {
          platform.setDir('ltr', true);
          platform.setDir('rtl', false);
        }

        Observable.forkJoin(
          this.translate.get('PROFILE'),
          this.translate.get('CHATTING'),
          this.translate.get('EVENT_BLOG'),
          this.translate.get('FREQ_QUESTIONS'),
          this.translate.get('CUSTOMER_CENTER'),
          this.translate.get('LOGIN_SIGNUP')
        ).subscribe(data => {
          if (this.authService.authenticated()) {
            const chatting_first = localStorage.getItem('chatting_first');
            this.pages = [
              { title: data[0], icon: 'person', component: ProfilePage },
              { title: data[1], icon: 'create', component: (chatting_first == undefined ? ChattingNoPage : ChattingYesPage) },
              { title: data[2], icon: 'code', component: FunctionalitiesPage },
              { title: data[3], icon: 'grid', component: LayoutsPage },
              { title: data[4], icon: 'settings', component: SettingsPage }
            ];
          } else {
            this.pages = [
              { title: data[5], icon: 'person', component: LoginPage },
              { title: 'Forms', icon: 'create', component: undefined },
              { title: data[2], icon: 'code', component: FunctionalitiesPage },
              { title: data[3], icon: 'grid', component: LayoutsPage },
              { title: data[4], icon: 'settings', component: SettingsPage }
            ];
          }
        });
      });

    events.subscribe('authenticate', () => {
      Observable.forkJoin(
          this.translate.get('PROFILE'),
          this.translate.get('CHATTING'),
          this.translate.get('EVENT_BLOG'),
          this.translate.get('FREQ_QUESTIONS'),
          this.translate.get('CUSTOMER_CENTER'),
          this.translate.get('LOGIN_SIGNUP')
        ).subscribe(data => {
          if (this.authService.authenticated()) {
            this.pages = [
              { title: data[0], icon: 'person', component: ProfilePage },
              { title: data[1], icon: 'create', component: FormsPage },
              { title: data[2], icon: 'code', component: FunctionalitiesPage },
              { title: data[3], icon: 'grid', component: LayoutsPage },
              { title: data[4], icon: 'settings', component: SettingsPage }
            ];
          } else {
            this.pages = [
              { title: data[5], icon: 'person', component: LoginPage },
              { title: 'Forms', icon: 'create', component: undefined },
              { title: data[2], icon: 'code', component: FunctionalitiesPage },
              { title: data[3], icon: 'grid', component: LayoutsPage },
              { title: data[4], icon: 'settings', component: SettingsPage }
            ];
          }
        });
      
    });

    events.subscribe('chatting_first', () => {
      Observable.forkJoin(
        this.translate.get('PROFILE'),
        this.translate.get('CHATTING'),
        this.translate.get('EVENT_BLOG'),
        this.translate.get('FREQ_QUESTIONS'),
        this.translate.get('CUSTOMER_CENTER'),
        this.translate.get('LOGIN_SIGNUP')
      ).subscribe(data => {
        if (this.authService.authenticated()) {
          const chatting_first = localStorage.getItem('chatting_first');
          this.pages = [
            { title: data[0], icon: 'person', component: ProfilePage },
            { title: data[1], icon: 'create', component: (chatting_first == undefined ? ChattingNoPage : ChattingYesPage) },
            { title: data[2], icon: 'code', component: FunctionalitiesPage },
            { title: data[3], icon: 'grid', component: LayoutsPage },
            { title: data[4], icon: 'settings', component: SettingsPage }
          ];
        } else {
          this.pages = [
            { title: data[5], icon: 'person', component: LoginPage },
            { title: 'Forms', icon: 'create', component: undefined },
            { title: data[2], icon: 'code', component: FunctionalitiesPage },
            { title: data[3], icon: 'grid', component: LayoutsPage },
            { title: data[4], icon: 'settings', component: SettingsPage }
          ];
        }
      });
    });
  }

  ionViewEnter(){
    console.log('-------');
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    if (page.component == undefined) {
      return;
    }
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }
}
