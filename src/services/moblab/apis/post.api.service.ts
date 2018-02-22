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
  constructor(
    public http: Http,
  ) {
    super();
    this.baseUrl = [this.baseUrl, "post"].join('/');
  }

  getPostInfo(postId) {
    return this.http.get([this.baseUrl, postId].join('/')).map(res => res.json());
  }

  getPostList(pageIdx = 1) {
    return this.http.get([this.baseUrl, 'list', pageIdx].join('/')).map(res => res.json());
  }

  getComments(postId, commentPageIdx = 1) {
    // console.log(postId);
    return this.http.get([this.baseUrl, postId, "comment"].join('/')).map(res => res.json());
  }

  createPost(title, post_status, post_type, content, lat, lng) {
    const headers = new Headers();
    if (window.localStorage.getItem('id_token')) {
      headers.append('authorization', JSON.parse(window.localStorage.getItem('id_token')));
    }
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({
      addr1: '',
      addr2: '',
      lat: lat,
      lng: lng,

      post_status: post_status,
      post_type: post_type,
      title: title,
      content: content
    });

    console.log(body);

    return this.http.post([this.baseUrl].join('/'), body, options).map(res => res.json());
  }

  sendVRImages(postID, images) {
    const headers = new Headers();
    if (window.localStorage.getItem('id_token')) {
      headers.append('authorization', JSON.parse(window.localStorage.getItem('id_token')));
    }
    headers.append("enctype", "multipart/form-data");

    // headers.append('Content-Type', 'multipart/form-data; charset=utf-8');

    const options = new RequestOptions({ headers: headers });

    var fd = new FormData();
    fd.append('postID', postID);
    for (var i = 0; i < images.length; i++) {
      fd.append('vr_images', images[i].blob, images[i].name);
    }

    return this.http.post(["https://media.vgram.kr", "convert", "vtour"].join('/'), fd, options).map(res => res.json());
  }

  sendNoramlImages(postID, images) {
    const headers = new Headers();
    if (window.localStorage.getItem('id_token')) {
      headers.append('authorization', JSON.parse(window.localStorage.getItem('id_token')));
    }
    headers.append("enctype", "multipart/form-data");

    const options = new RequestOptions({ headers: headers });

    var fd = new FormData();
    fd.append('postID', postID);
    for (var i = 0; i < images.length; i++) {
      fd.append('normal_images', images[i].blob, images[i].name);
    }

    return this.http.post(["https://media.vgram.kr", "convert", "images"].join('/'), fd, options).map(res => res.json());
  }

  createComment(postId, comment) {
    const headers = new Headers();
    if (window.localStorage.getItem('id_token')) {
      headers.append('authorization', JSON.parse(window.localStorage.getItem('id_token')));
    }
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({ comment: comment });

    console.log(body);

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