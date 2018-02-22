import { Component } from '@angular/core';
import { NavController, App, MenuController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import 'rxjs/Rx';

import { CommentsModel } from './comments.model';
import { CommentsService } from './comments.service';

import { ProfilePage } from '../profile/profile';

import { PostAPIService } from '../../services/moblab/apis/post.api.service';
import { UserAPIService } from '../../services/moblab/apis/user.api.service';

@Component({
  selector: 'comments-page',
  templateUrl: 'comments.html'
})
export class CommentsPage {
  comments: CommentsModel = new CommentsModel();
  curComments = [];
  infiniteScrollVisible = true;
  loading: any;
  id: any;
  page: any = 1;
  totalpage: any = 6;

  waiting = false;
  newComment: any;

  Loading = "Loading";

  constructor(
    public app: App,
    public menu: MenuController,
    public nav: NavController,
    public commentsService: CommentsService,
    public loadingCtrl: LoadingController,
    public commentApi: PostAPIService,
    public userApi: UserAPIService,
    private navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    this.loading = this.loadingCtrl.create();
    this.id = navParams.get('ID');
  }

  ionViewDidLoad() {
    this.loading.present();

    this.waiting = true;
    this.commentApi.getComments(this.id, this.page).toPromise()
      .then(data => {
        this.curComments = data;
        this.loading.dismiss();

        this.waiting = false;
      })
      .catch(err => {
        if (JSON.parse(err._body).statusCode == -1) {
          this.setInfiniteData([]);

          this.loading.dismiss();
          this.waiting = false;
        }
      });

    // this.commentsService
    //   .getData()
    //   .then(data => {
    //     this.comments = data;

    //     this.initCurComments();
    //   })
    //   .catch(err => {
    //   });
  }

  initCurComments() {
    // this.curComments = [];
    // for (let i = 0 ; i < this.commentsShowCount ; i ++ ){
    //   if (this.curComments.length == this.comments.comments.length){
    //     this.infiniteScrollVisible = false;
    //     break;
    //   } else {
    //     this.curComments.push( this.comments.comments[  this.curComments.length ] );
    //   }
    // }
  }

  doCommentsInfinite(infiniteScroll: any) {
    if (this.waiting) return;
    this.waiting = true;
    this.page = this.page + 1;

    this.loading.present();

    if (this.page == this.totalpage) {
      this.infiniteScrollVisible = false;
    } else {
      this.commentApi.getComments(this.id, this.page).toPromise()
        .then(data => {
          this.setInfiniteData(data);

          this.loading.dismiss();
          this.waiting = false;
        })
        .catch(err => {
          if (JSON.parse(err._body).statusCode == -1) {
            this.setInfiniteData([]);

            this.loading.dismiss();
            this.waiting = false;
          }
        });
    }

    infiniteScroll.complete();
  }

  setInfiniteData(data) {
    if (data.length != 0) {
      // console.log(data, data.length);
      for (let i = 0; i < data.length; i++) {
        this.curComments.push(data[i]);
      }
    } else {
      this.infiniteScrollVisible = false;
      this.Loading = "";

      this.showToast('Finish');
    }
  }

  replyComment(comment) {

  }
  deleteComment(comment) {

  }
  likeComment(comment) {

  }

  sendReply() {
    if (this.newComment.length != '') {
      this.commentApi.createComment(this.id, this.newComment).subscribe(data => {
        this.userApi.getUserInfo(data.user_id).toPromise().then(user => {
          this.curComments.push({
            user: {
              profile_image_path: user.user.profile_image_path,
              nickname: user.user.nickname,
            },
            content: data.content,
            createdAt: data.createdAt
          });
          this.newComment = '';
        });
      });
    } else {
      this.showToast('내용을 채워주세요.');
    }
  }

  goToProfile(comment) {
    this.menu.close();
    this.app.getRootNav().push(ProfilePage, {
      comment
    });
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
