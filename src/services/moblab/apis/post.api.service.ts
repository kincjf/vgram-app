import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { MoblabAPIBase } from '../moblab.api.base';

/*
  Generated class for the PostapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostAPIService extends MoblabAPIBase {
  constructor(public http: Http) {
    super();
    this.baseUrl = [this.baseUrl, "post"].join('/');
  }

  getPostInfo(postId) {
    return this.http.get([this.baseUrl, 'list', postId].join('/')).map(res => res.json());
  }

  getPostList(pageIdx = 1) {
    return this.http.get([this.baseUrl, 'list', pageIdx].join('/')).map(res => res.json());
  }

  getComments(postId, commentPageIdx = 1) {
    return this.http.get([this.baseUrl, postId, "comment"].join('/')).map(res => res.json());
  }

  createPost(/* options */) {
    const headers = new Headers();
    // headers.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({ /* options */ });

    return this.http.post([this.baseUrl].join('/'), body, options).map(res => res.json());
  }

  createComment(postId/*, options */) {
    const headers = new Headers();
    // headers.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({ /* options */ });

    return this.http.post([this.baseUrl, postId, 'comment'].join('/'), body, options).map(res => res.json());
  }

  modiftPost(postId/*, options */) {
    const headers = new Headers();
    // headers.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({ /* options */ });

    return this.http.put([this.baseUrl, postId].join('/'), body, options).map(res => res.json());
  }

  reEnrollPost(postId) {
    const headers = new Headers();
    // headers.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: headers });

    return this.http.put([this.baseUrl, 're-enroll', postId].join('/'), options).map(res => res.json());
  }

  deletePost(postId) {
    const headers = new Headers();
    // headers.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: headers });

    return this.http.delete([this.baseUrl, postId].join('/'), options).map(res => res.json());
  }

  deleteComment(postId, commentId) {
    const headers = new Headers();
    // headers.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: headers });

    return this.http.delete([this.baseUrl, postId, 'comment', commentId].join('/'), options).map(res => res.json());
  }
}