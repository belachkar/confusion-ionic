import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ProcessHttpmsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }

  public extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  public handleError(res: Response | any) {
    let errMsg: string;

    if (res instanceof Response) {
      res.json().then(body => {
        const err = body.error || JSON.stringify(body);
        errMsg = `${res.status} - ${res.statusText || ''} ${err}`;
        return Observable.throw(errMsg);
      });
    } else {
      errMsg = res.message ? res.message : res.toString();
      return Observable.throw(errMsg);
    }
  }

}
