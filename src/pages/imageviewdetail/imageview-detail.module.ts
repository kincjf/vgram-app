import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageViewDetailPage } from './imageview-detail';

@NgModule({
  declarations: [
    ImageViewDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageViewDetailPage),
  ],
})
export class ImageViewDetailPageModule {}
