import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../../shared/baseurl';
import { Promotion } from '../../shared/promotion';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(private http: HttpClient, private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello PromotionProvider Provider');
  }

  getPromotions(): Observable<Promotion[]> {
    const url = `${baseURL}/promotions`;

    return this.http.get<Promotion[]>(url)
      .pipe(
        map(res => res),
        catchError(err => this.processHttpmsgService.handleError(err))
      );
  }

  getPromotion(id: number): Observable<Promotion> {
    const url = `${baseURL}/promotions/${id}`;

    return this.http.get<Promotion>(url)
      .pipe(
        map(res => res),
        catchError(err => this.processHttpmsgService.handleError(err))
      );
  }

  getFeaturedPromotion(): Observable<Promotion> {
    const filter = 'featured=true';
    const url = `${baseURL}/promotions?${filter}`;

    return this.http.get<Promotion[]>(url)
      .pipe(
        map(res => res[0]),
        catchError(err => this.processHttpmsgService.handleError(err))
      );
  }

}
