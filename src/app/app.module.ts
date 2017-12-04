import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';

import { Diagnostic } from '@ionic-native/diagnostic';

import { Clipboard } from '@ionic-native/clipboard';

import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { ListingPage } from '../pages/listing/listing';
import { FeedPage } from '../pages/feed/feed';
import { FollowersPage } from '../pages/followers/followers';
import { LayoutsPage } from '../pages/layouts/layouts';
import { FormsPage } from '../pages/forms/forms';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
import { CommentsPage } from '../pages/comments/comments';
import { ProfilePage } from '../pages/profile/profile';
import { OtherProfilePage } from '../pages/other-profile/other-profile';
import { ImageViewPage } from '../pages/imageview/imageview';
import { ImageViewDetailPage } from '../pages/imageviewdetail/imageview-detail';
import { WritingPage } from '../pages/writing/writing';
import { WritingNormalPage } from '../pages/write-normal/write-normal';
import { ChattingNoPage } from '../pages/chatting-no/chatting-no';
import { ChattingYesPage } from '../pages/chatting-yes/chatting-yes';
import { CameraPage } from '../pages/camera/camera';

import { ImageEditPage } from '../pages/imageedit/imageedit';
import { AppSettingPage } from '../pages/app-setting/app-setting';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SchedulePage } from '../pages/schedule/schedule';
import { AdsPage } from '../pages/ads/ads';
import { List1Page } from '../pages/list-1/list-1';
import { List2Page } from '../pages/list-2/list-2';
import { GridPage } from '../pages/grid/grid';
import { FormLayoutPage } from '../pages/form-layout/form-layout';
import { FiltersPage } from '../pages/filters/filters';
import { MapTypePage } from '../pages/map-type/map-type';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { FormValidationsPage } from '../pages/form-validations/form-validations';

import { SearchPage } from '../pages/search/search';
import { SearchResultPage } from '../pages/search-result/search-result';

import { GalleryDetailPage } from '../pages/gallery-detail/gallery-detail';

import { WritingAddPage } from '../pages/writing-add/writing-add';

import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';
import { GoogleMap } from '../components/google-map/google-map';

import { FeedService } from '../pages/feed/feed.service';
import { ListingService } from '../pages/listing/listing.service';
import { MapTypeService } from '../pages/map-type/map-type.service';
import { ProfileService } from '../pages/profile/profile.service';
import { OtherProfileService } from '../pages/other-profile/other-profile.service';
import { NotificationsService } from '../pages/notifications/notifications.service';
import { CommentsService } from '../pages/comments/comments.service';
import { List1Service } from '../pages/list-1/list-1.service';
import { List2Service } from '../pages/list-2/list-2.service';
import { ScheduleService } from '../pages/schedule/schedule.service';
import { FacebookLoginService } from '../pages/facebook-login/facebook-login.service';
import { GoogleLoginService } from '../pages/google-login/google-login.service';
import { TwitterLoginService } from '../pages/twitter-login/twitter-login.service';
import { GoogleMapsService } from '../pages/maps/maps.service';
import { HelpPage } from '../pages/help/help';
import { GalleryPage } from '../pages/gallery/gallery';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { AdMobFree } from '@ionic-native/admob-free';
import { AppRate } from '@ionic-native/app-rate';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { EmailComposer } from '@ionic-native/email-composer';



// Functionalities
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { FunctionalitiesPage } from '../pages/functionalities/functionalities';
import { MapsPage } from '../pages/maps/maps';
import { FacebookLoginPage } from '../pages/facebook-login/facebook-login';
import { GoogleLoginPage } from '../pages/google-login/google-login';
import { TwitterLoginPage } from '../pages/twitter-login/twitter-login';
import { ContactCardPage } from '../pages/contact-card/contact-card';
import { VideoPlaylistPage } from '../pages/video-playlist/video-playlist';

import { VideoPlayerModule } from '../components/video-player/video-player.module';
import { ValidatorsModule } from '../components/validators/validators.module';

import { LanguageService } from '../providers/language/language.service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

export function createTranslateLoader(http: Http) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    ListingPage,
    FeedPage,
    FollowersPage,
    LayoutsPage,
    FormsPage,
    LoginPage,
    NotificationsPage,
    CommentsPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    SettingsPage,
    SignupPage,
    ForgotPasswordPage,
    SchedulePage,
    List1Page,
    List2Page,
    GridPage,
    FormLayoutPage,
    FiltersPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    MapsPage,
    FunctionalitiesPage,
    FacebookLoginPage,
    GoogleLoginPage,
    ContactCardPage,
    TwitterLoginPage,
		AdsPage,
		FormValidationsPage,
		VideoPlaylistPage,

    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating,
    GoogleMap,
    MapTypePage,
    SearchPage,
    SearchResultPage,
    ChangePasswordPage,
    AppSettingPage,
    OtherProfilePage,
    ImageViewPage,
    ImageViewDetailPage,
    WritingPage,
    ImageEditPage,
    WritingNormalPage,
    ChattingNoPage,
    ChattingYesPage,
    CameraPage,
    HelpPage,
    GalleryPage,
    GalleryDetailPage,
    WritingAddPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
			modalEnter: 'modal-slide-in',
			modalLeave: 'modal-slide-out',
			pageTransition: 'ios-transition',
			swipeBackEnabled: false
		}),
		TranslateModule.forRoot({
    loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [Http]
			}
		}),
		VideoPlayerModule,
		ValidatorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListingPage,
    FeedPage,
    FollowersPage,
    LayoutsPage,
    FormsPage,
    LoginPage,
    NotificationsPage,
    CommentsPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    SettingsPage,
    ForgotPasswordPage,
    SignupPage,
    SchedulePage,
    List1Page,
    List2Page,
    GridPage,
    FormLayoutPage,
    FiltersPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    MapsPage,
    FunctionalitiesPage,
    FacebookLoginPage,
    GoogleLoginPage,
    ContactCardPage,
    TwitterLoginPage,
		AdsPage,
		FormValidationsPage,
    VideoPlaylistPage,
    MapTypePage,
    SearchPage,
    SearchResultPage,
    ChangePasswordPage,
    AppSettingPage,
    OtherProfilePage,
    ImageViewPage,
    ImageViewDetailPage,
    WritingPage,
    ImageEditPage,
    WritingNormalPage,
    ChattingNoPage,
    ChattingYesPage,
    CameraPage,
    HelpPage,
    GalleryPage,
    GalleryDetailPage,
    WritingAddPage
  ],
  providers: [
    FeedService,
    ListingService,
    ProfileService,
    OtherProfileService,
    NotificationsService,
    CommentsService,
    List1Service,
    List2Service,
    ScheduleService,
    MapTypeService,

    FacebookLoginService,
    GoogleLoginService,
    TwitterLoginService,
    GoogleMapsService,
		LanguageService,
    Clipboard,

	  SplashScreen,
	  StatusBar,
    SocialSharing,
    NativeStorage,
    InAppBrowser,
    Facebook,
    GooglePlus,
    Keyboard,
    Geolocation,
    TwitterConnect,
		AdMobFree,
		AppRate,
		ImagePicker,
		Crop,
		EmailComposer,
    AuthServiceProvider,

    Diagnostic,
    OpenNativeSettings
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
