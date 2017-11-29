import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

@Component({
  selector: 'walkthrough-page',
  templateUrl: 'walkthrough.html'
})
export class WalkthroughPage {

  @ViewChild('slider') slider: Slides;

  constructor(public nav: NavController) {

  }

  skipIntro() {
    // You can skip to main app
    // this.nav.setRoot(TabsNavigationPage);

    // Or you can skip to last slide (login/signup slide)
    this.nav.setRoot( TabsNavigationPage );
  }

  onSlideChanged() {
    // If it's the last slide, then hide the 'Skip' button on the header
  }
}
