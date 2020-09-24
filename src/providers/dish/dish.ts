import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../../shared/baseurl';
import { Dish } from '../../shared/dish';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(private http: HttpClient, private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable<Dish[]> {
    const url = `${baseURL}/dishes`;

    return this.http.get<Dish[]>(url)
      .pipe(
        map(res => res),
        catchError(err => this.processHttpmsgService.handleError(err))
      );
  }

  getDish(id: number): Observable<Dish> {
    const url = `${baseURL}/dishes/${id}`;

    return this.http.get<Dish>(url)
      .pipe(
        map(res => res),
        catchError(err => this.processHttpmsgService.handleError(err))
      );
  }

  getFeaturedDish(): Observable<Dish> {
    const filter = 'featured=true';
    const url = `${baseURL}/dishes?${filter}`;

    return this.http.get<Dish[]>(url)
      .pipe(
        map(res => res[0]),
        catchError(err => this.processHttpmsgService.handleError(err))
      );
  }

}
