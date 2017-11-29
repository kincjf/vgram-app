import { Component } from '@angular/core';
import { NavController, App, LoadingController, MenuController, ActionSheetController, Platform, ToastController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import { FeedPage } from '../feed/feed';
import { CommentsPage } from '../comments/comments';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { ListingModel } from './listing.model';
import { ListingService } from './listing.service';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { locale } from 'core-js/library/web/timers';
import { SocialSharing } from '@ionic-native/social-sharing';

import { NotificationsPage } from '../notifications/notifications';

import { SearchPage } from '../search/search';


@Component({
  selector: 'listing-page',
  templateUrl: 'listing.html',
})
export class ListingPage {
  listing: ListingModel = new ListingModel();
  loading: any;

  searchText = '';

  selectedCategory = '';

  infiniteScrollVisible = true;
  posts = [];
  postToShare = undefined;

  shareActionSheet: any;
  clipboardToast: any;

  constructor(
    public app: App,
    public menu: MenuController,
    public nav: NavController,
    public listingService: ListingService,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public translate: TranslateService,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    private clipboard: Clipboard,
    public socialSharing: SocialSharing,
    public toastCtrl: ToastController
  ) {
    this.loading = this.loadingCtrl.create();

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
          this.translate.get('SHARE'),
          this.translate.get('COPY_LINK'),
          this.translate.get('REPORT'),
          this.translate.get('LINK_POST_COPY_CLIPBOARD')
        ).subscribe(data => {

          this.clipboardToast = this.toastCtrl.create({
            message: data[3],
            duration: 3000,
            position: 'bottom'
          });
          
           this.shareActionSheet = this.actionsheetCtrl.create({
            title: 'Select an action',
            buttons: [
              {
                text: data[0],
                role: 'destructive',
                icon: !this.platform.is('ios') ? 'share' : null,
                handler: () => {

                  this.socialSharing.share(this.postToShare.comments[0].comment, this.postToShare.date, this.postToShare.images[0])
                  .then(() => {
                    console.log('Success!');
                  })
                  .catch(() => {
                      console.log('Error');
                  });
                }
              },
              {
                text: data[1],
                role: 'destructive',
                icon: !this.platform.is('ios') ? 'link' : null,
                handler: () => {
                  this.clipboard.copy(this.postToShare.images[0]);

                  this.clipboard.paste().then(
                    (resolve: string) => {
                        this.clipboardToast.present();
                      },
                      (reject: string) => {
                        
                      }
                    );
                }
              },
              {
                text: data[2],
                role: 'destructive',
                icon: !this.platform.is('ios') ? 'paper' : null,
                handler: () => {
                  
                }
              }
            ]
          });

        });
      });

  }


  ionViewDidLoad() {
    this.loading.present();
    this.listingService
      .getData()
      .then(data => {
        this.listing.banner_image = data.banner_image;
        this.listing.banner_title = data.banner_title;
        this.listing.populars = data.populars;
        this.listing.categories = data.categories;
        this.listing.posts = data.posts;
        this.loading.dismiss();

        this.initPosts();
      });
  }

  onCategory(popular) {
    this.selectedCategory = popular.title;
  }


  goToFeed(category: any) {
    console.log("Clicked goToFeed", category);
    this.nav.push(FeedPage, { category: category });
  }


  initPosts(){
    this.posts = [];
    for (let i = 0; i < 5; i++) {
      if (this.posts.length == this.listing.posts.length) {
        this.infiniteScrollVisible = false;
        break;
      } else {
        this.posts.push(this.listing.posts[ this.posts.length ]);
      }
    }
  }

  doPostsInfinite(infiniteScroll: any){
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        if (this.posts.length == this.listing.posts.length) {
          this.infiniteScrollVisible = false;
          break;
        }
        else {
          this.posts.push(this.listing.posts[ this.posts.length ]);
        }
      }
      infiniteScroll.complete();
    }, 500);
  }

  likePoast(post){
    post.meLikes = !post.meLikes;
  }
  commentPost(post){
    console.log('---Post Comment---');
    this.menu.close();
    this.app.getRootNav().push(CommentsPage, {
      post
    });
  }
  sharePost(post){
    this.postToShare = post;
    this.shareActionSheet.present();
  }
  onNotificationPage(){
    this.menu.close();
    this.app.getRootNav().push(NotificationsPage);
  }

  onSearchbarFocus(){
    console.log('---focus---');
    this.menu.close();
    this.app.getRootNav().push(SearchPage);
  }

}
