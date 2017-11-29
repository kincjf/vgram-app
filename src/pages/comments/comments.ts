import { Component } from '@angular/core';
import { NavController,App,MenuController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { CommentsModel } from './comments.model';
import { CommentsService } from './comments.service';

import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'comments-page',
  templateUrl: 'comments.html'
})
export class CommentsPage {
  comments: CommentsModel = new CommentsModel();
  curComments = [];
  commentsShowCount = 10;
  infiniteScrollVisible = true;
  loading: any;

  constructor(
    public app: App,
    public menu: MenuController,
    public nav: NavController,
    public commentsService: CommentsService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.commentsService
      .getData()
      .then(data => {
        this.comments = data;
        this.loading.dismiss();

        this.initCurComments();
      })
      .catch(err => {
      });
  }

  initCurComments() {
    this.curComments = [];
    for (let i = 0 ; i < this.commentsShowCount ; i ++ ){
      if (this.curComments.length == this.comments.comments.length){
        this.infiniteScrollVisible = false;
        break;
      } else {
        this.curComments.push( this.comments.comments[  this.curComments.length ] );
      }
    }
  }

  doCommentsInfinite(infiniteScroll: any){
    setTimeout(() => {
      for (let i = 0 ; i < this.commentsShowCount ; i ++ ){
        if (this.curComments.length == this.comments.comments.length){
          this.infiniteScrollVisible = false;
          break;
        } else {
          this.curComments.push( this.comments.comments[  this.curComments.length ] );
        }
      }
      infiniteScroll.complete();
    }, 500);
  }

  replyComment(comment){

  }
  deleteComment(comment){

  }
  likeComment(comment){

  }
  sendReply(){

  }
  goToProfile(comment){
      this.menu.close();
      this.app.getRootNav().push(ProfilePage, {
        comment
      });
  }
}
