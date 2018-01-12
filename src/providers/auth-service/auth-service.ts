import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs/add/operator/filter';
// import * as auth0 from 'auth0-js';
import 'rxjs/add/operator/map';
import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

const auth0Config = {
  // needed for auth0
  clientID: '0ruSAuhcONN2gQY32a17fCxQN2hrxO3W',

  // needed for auth0cordova
  clientId: '0ruSAuhcONN2gQY32a17fCxQN2hrxO3W',
  domain: 'wowjoy-dev.auth0.com',
  callbackURL: location.href,
  packageIdentifier: 'com.startapplabs.ion2fullapp.elite'
};
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  auth0 = new Auth0.WebAuth(auth0Config);
  accessToken: string;
  idToken: string;
  user: any;

  

  // auth0 = new auth0.WebAuth({
  //   clientID: '6x9CfrILfGYNk10sfzucCbhFhuev4NBz',
  //   domain: 'vgram-app.eu.auth0.com',
  //   responseType: 'token id_token',
  //   audience: 'https://vgram-app.eu.auth0.com/userinfo',
  //   redirectUri: 'http://localhost:8100/ionic-lab',      
  //   scope: 'openid'
  // });

  // constructor(public http: Http) {
  //   console.log('Hello AuthServiceProvider Provider');
    
  // }

  // // public login(){
  // //   localStorage.setItem('logged_in', '1');
  // // }

  // public logout(){
  //   localStorage.clear();
  // }

  public authenticated() {
    const logged = localStorage.getItem('logged_in');
    return logged == '1';
  };


//  public login(): void {
//     this.auth0.authorize();
//   }


 constructor(public zone: NgZone) {
    this.user = this.getStorageVariable('profile');
    this.idToken = this.getStorageVariable('id_token');
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.idToken = token;
    this.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable('access_token', token);
  }

  public isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  public login() {
    const client = new Auth0Cordova(auth0Config);

    const options = {
      scope: 'openid profile offline_access'
    };

    client.authorize(options, (err, authResult) => {
      console.log(err, JSON.stringify(authResult));
      if(err) {
        throw err;
      }

      this.setIdToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);

      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.setStorageVariable('expires_at', expiresAt);

      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if(err) {
          throw err;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.setStorageVariable('profile', profile);
        this.zone.run(() => {
          this.user = profile;
        });
      });
    });
  }

  public logout() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');

    this.idToken = null;
    this.accessToken = null;
    this.user = null;
  }


}
