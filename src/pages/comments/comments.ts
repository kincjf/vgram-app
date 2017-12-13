import { Component } from '@angular/core';
import { NavController,App,MenuController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { CommentsModel } from './comments.model';
import { CommentsService } from './comments.service';

import { ProfilePage } from '../profile/profile';

import {PostapiProvider} from "../../providers/postapi/postapi";

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
    page:any=1;
  totalpage:  any = 6;

  constructor(
    public app: App,
    public menu: MenuController,
    public nav: NavController,
    public commentsService: CommentsService,
    public loadingCtrl: LoadingController,
    public commentApi:PostapiProvider,
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();

     this.commentApi.getComment(this.page).subscribe(
    data => {

   this.curComments = data;
  //  this.thumnail_slidersimages =  JSON.parse(data.thumbnail_image_path);
   console.log(this.curComments);
    // console.log(this.thumnail_slidersimages);
    },
    error => 
    {
     console.log(error.JSON)
    },
    () => console.log('finished')
  )
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

  doCommentsInfinite(infiniteScroll: any){


 this.page = this.page+1;
  
    setTimeout(() => {
      // for (let i = 0; i < 5; i++) {

  if(this.page == this.totalpage){
  this.infiniteScrollVisible = false;
  }
    else{    
  this.commentApi.getComment( this.page).subscribe(
    data => {

   for(let i=0; i<data.length; i++) {
             this.curComments.push(data[i]);
           }
  
  //  this.posts = this.posts.push(data);
  //  this.thumnail_slidersimages =  JSON.parse(data.thumbnail_image_path);
   console.log(this.curComments);
    // console.log(this.thumnail_slidersimages);
    },
    error => 
    {
     console.log(error.JSON)
    },
    () => console.log('finished')
  )
    }



      
      // for (let i = 0 ; i < this.commentsShowCount ; i ++ ){
      //   if (this.curComments.length == this.comments.comments.length){
      //     this.infiniteScrollVisible = false;
      //     break;
      //   } else {
      //     this.curComments.push( this.comments.comments[  this.curComments.length ] );
      //   }
      // }
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
