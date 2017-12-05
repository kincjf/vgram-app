import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VRCameraViewPage } from './vrcamera-view';

@NgModule({
  declarations: [
    VRCameraViewPage,
  ],
  imports: [
    IonicPageModule.forChild(VRCameraViewPage),
  ],
})
export class VRCameraViewPageModule {}
