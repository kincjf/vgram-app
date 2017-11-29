import { Component } from '@angular/core';
import { NavController,  App, LoadingController, MenuController, SegmentButton, Events } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'chatting-yes-page',
  templateUrl: 'chatting-yes.html'
})
export class ChattingYesPage {
  
  loading: any;

  message: any;

  room = "default";
  invite = "default";

  messages = [
    { message: "Test Message", mine: false},
    { message: "Test Message", mine: false},
    { message: "Test Message", mine: false},
    { message: "Test Message", mine: false},
    { message: "Test Message", mine: true},
    { message: "Test Message", mine: false},
    { message: "Test Message", mine: false},
    { message: "Test Message", mine: false},
    { message: "Test Message", mine: true},
    { message: "Test Message", mine: false},
    { message: "Test Message", mine: false},
    { message: "Test Message", mine: true},
    { message: "Test Message", mine: false}
  ];

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App,
    public menu: MenuController
  ) {

  }

  
}
