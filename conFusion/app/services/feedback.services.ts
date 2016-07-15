import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Feedback } from '../objects/Feedback';

@Injectable()
export class FeedbackServices {

	private feedbackURL = 'http://localhost:3000/feedback';  // URL to web api

  	constructor(private http: Http) { }
	
	getFeedbacks(): Promise<Feedback[]> {
    	return this.http.get(this.feedbackURL)
        	       .toPromise()
        	       .then(function(response) {
    	       			return response.json();
        	       })
            	   .catch(this.handleError);
	}

	getFeedback(id: number) {
		return this.getFeedbacks().then(feedbacks => feedbacks.filter(feedback => feedback.id === id)[0]);
	}

	//combined post and put, if hero.id is given, put is run, else, its post
	save(feedback: Feedback): Promise<Feedback>  {
		if (feedback.id) {
			return this.put(feedback);
		}
		return this.post(feedback);
	}

	// Add new Hero
	private post(feedback: Feedback): Promise<Feedback> {
		let headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post(this.feedbackURL, JSON.stringify(feedback), {headers: headers})
	             .toPromise()
	             .then(res => res.json().data)
	             .catch(this.handleError);
	}	

	// Update existing Hero
	private put(feedback: Feedback) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.feedbackURL}/${feedback.id}`;

		return this.http.put(url, JSON.stringify(feedback), {headers: headers})
		     .toPromise()
		     .then(() => feedback)
		     .catch(this.handleError);
	}	

	//Delete hero
	delete(feedback: Feedback) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.feedbackURL}/${feedback.id}`;

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