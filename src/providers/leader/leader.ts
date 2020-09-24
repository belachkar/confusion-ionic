import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../../shared/baseurl';
import { Leader } from '../../shared/leader';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(private http: HttpClient, private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello LeaderProvider Provider');
  }

  getLeaders(): Observable<Leader[]> {
    const url = `${baseURL}/leaders`;

    return this.http.get<Leader[]>(url)
      .pipe(
        map(res => res),
        catchError(err => this.processHttpmsgService.handleError(err))
      );
  }

  getLeader(id: number): Observable<Leader> {
    const url = `${baseURL}/leaders/${id}`;

    return this.http.get<Leader>(url)
      .pipe(
        map(res => res),
        catchError(err => this.processHttpmsgService.handleError(err))
      );
  }

  getFeaturedDish(): Observable<Leader> {
    const filter = 'featured=true';
    const url = `${baseURL}/leaders?${filter}`;

    return this.http.get<Leader[]>(url)
      .pipe(
        map(res => res[0]),
        catchError(err => this.processHttpmsgService.handleError(err))
      );
  }

}
