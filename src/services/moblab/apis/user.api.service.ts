import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { MoblabAPIBase } from '../moblab.api.base';

/*
  Generated class for the PostapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserAPIService extends MoblabAPIBase {
  constructor(public http: Http) {
    super();
    this.baseUrl = [this.baseUrl, "user"].join('/');
  }

  getUserInfo(userId: Number) {
    return this.http.get([this.baseUrl, userId].join('/')).map(res => res.json());
  }

  getUserFollower(userId: Number) {
    return this.http.get([this.baseUrl, userId, "follower"].join('/')).map(res => res.json());
  }

  getUserFollowing(userId: Number) {
    return this.http.get([this.baseUrl, userId, "following"].join('/')).map(res => res.json());
  }

  getUserPosts(userId: Number) {
    return this.http.get([this.baseUrl, userId, "posts"].join('/')).map(res => res.json());
  }

  getUserNotice(userId: Number) {
    return this.http.get([this.baseUrl, userId, "notice"].join('/')).map(res => res.json());
  }

  getUserLikePosts(userId: Number) {
    return this.http.get([this.baseUrl, userId, "likeposts"].join('/')).map(res => res.json());
  }

  getUserList(userIds: Array<Number>) {
    return this.http.get([this.baseUrl, 'list', JSON.stringify(userIds)].join('/')).map(res => res.json());
  }

  modifyUserInfo(/* options */) {
    const headers = new Headers();
    // headers.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({ /* options */ });

    return this.http.put([this.baseUrl].join('/'), body, options).map(res => res.json());
  }
}