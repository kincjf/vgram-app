import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { CommentsModel } from './comments.model';

@Injectable()
export class CommentsService {
  constructor(public http: Http) {}

  getData(): Promise<CommentsModel> {
    return this.http.get('./assets/example_data/comments.json')
     .toPromise()
     .then(response => response.json())
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
