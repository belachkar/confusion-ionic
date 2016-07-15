import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Leadership } from '../objects/Leadership';

@Injectable()
export class LeadershipService {

	private leadershipURL = 'http://localhost:3000/leadership';  // URL to web api

  	constructor(private http: Http) { }
	
	getLeaderships(): Promise<Leadership[]> {
    	return this.http.get(this.leadershipURL)
        	       .toPromise()
        	       .then(function(response) {
    	       			return response.json();
        	       })
            	   .catch(this.handleError);
	}

	getLeadership(id: number) {
		return this.getLeaderships().then(leaderships => leaderships.filter(leadership => leadership.id === id)[0]);
	}

	//combined post and put, if hero.id is given, put is run, else, its post
	save(leadership: Leadership): Promise<Leadership>  {
		if (leadership.id) {
			return this.put(leadership);
		}
		return this.post(leadership);
	}

	// Add new Hero
	private post(leadership: Leadership): Promise<Leadership> {
		let headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post(this.leadershipURL, JSON.stringify(leadership), {headers: headers})
	             .toPromise()
	             .then(res => res.json().data)
	             .catch(this.handleError);
	}	

	// Update existing Hero
	private put(leadership: Leadership) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.leadershipURL}/${leadership.id}`;

		return this.http.put(url, JSON.stringify(leadership), {headers: headers})
		     .toPromise()
		     .then(() => leadership)
		     .catch(this.handleError);
	}	

	//Delete hero
	delete(leadership: Leadership) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.leadershipURL}/${leadership.id}`;

		return this.http.delete(url, headers)
		         .toPromise()
		         .catch(this.handleError);
	}


	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/