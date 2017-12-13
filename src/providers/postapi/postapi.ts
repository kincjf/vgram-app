import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PostapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostapiProvider {
  baseUrl:any = "http://api.vgram.kr/api/";

  constructor(public http: Http) {
    console.log('Hello PostapiProvider Provider');
  }
  



  getPost(index){

    return this.http.get(this.baseUrl+'post/list/'+index).map( res => res.json())

  }

   getComment(index){

    return this.http.get(this.baseUrl+'post/'+index+"/comment/").map( res => res.json())

  }
}
