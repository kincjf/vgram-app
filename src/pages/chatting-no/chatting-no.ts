import { Component } from '@angular/core';
import { NavController,  App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { FacebookLoginService } from '../facebook-login/facebook-login.service';
import { GoogleLoginService } from '../google-login/google-login.service';
import { TwitterLoginService } from '../twitter-login/twitter-login.service';

@Component({
  selector: 'chatting-no-page',
  templateUrl: 'chatting-no.html'
})
export class ChattingNoPage {

  loading: any;

  constructor(
    public nav: NavController,
    public facebookLoginService: FacebookLoginService,
    public googleLoginService: GoogleLoginService,
    public twitterLoginService: TwitterLoginService,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public events: Events,
    public app: App,
    public menu: MenuController
  ) {
    
    let v = localStorage.getItem('chatting_first');
    if (v == undefined) {
      localStorage.setItem('chatting_first', "no");
      this.events.publish('chatting_first');
    }
  }

  onCheckFriends(){

  }
}
