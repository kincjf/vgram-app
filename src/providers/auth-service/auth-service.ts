import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';

import { Events } from 'ionic-angular';

// import 'rxjs/add/operator/filter';
// import * as auth0 from 'auth0-js';
import 'rxjs/add/operator/map';
import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

import { Observable } from 'rxjs/Observable';

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
  // authorization: string;
  // accessToken: string;
  // idToken: string;

  // private user;

  constructor(
    public zone: NgZone,
    public events: Events
  ) {
    if (this.authenticated() != true) {
      this.setStorageVariable('logged_in', false);
    }
  }

  public authenticated() {
    if (!this.isAuthenticated()) this.logout();
    return this.getStorageVariable('logged_in') != true ? false : true;
  };

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.setStorageVariable('access_token', token);
  }

  private setAuthorization(token) {
    this.setStorageVariable('authorization', token);
  }

  private setLogin(login) {
    if (this.getStorageVariable('logged_in') != login) {
      this.setStorageVariable('logged_in', login);
      this.events.publish('authenticate');
    }
  }

  public isAuthenticated() {
    const expiresAt = Number(JSON.parse(this.getStorageVariable('expires_at')));
    return isNaN(expiresAt) ? false : Date.now() < expiresAt;
  }

  public login() {
    const client = new Auth0Cordova(auth0Config);

    const options = {
      scope: 'openid profile offline_access'
    };

    client.authorize(options, (err, authResult) => {
      if (err) {
        throw err;
      }

      this.setStorageVariable('expires_at', JSON.stringify((authResult.expiresIn * 999) + new Date().getTime()));
      this.setIdToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);
      this.setAuthorization(authResult.authorization);
      this.setLogin(true);

      this.auth0.client.userInfo(this.getStorageVariable('access_token'), (err, profile) => {
        if (err) {
          throw err;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.setStorageVariable('profile', profile);
        this.zone.run(() => {
          this.setStorageVariable('profile', profile);
          // this.user = profile;
        });
      });
    });
  }

  public logout() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');

    this.setLogin(false);
  }
}
