import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Promotion } from '../objects/Promotion';

@Injectable()
export class PromotionService {

	private promotionURL = 'http://localhost:3000/promotions';  // URL to web api

  	constructor(private http: Http) { }
	
	getPromotions(): Promise<Promotion[]> {
    	return this.http.get(this.promotionURL)
        	       .toPromise()
        	       .then(function(response) {
    	       			return response.json();
        	       })
            	   .catch(this.handleError);
	}

	getPromotion(id: number) {
		return this.getPromotions().then(promotions => promotions.filter(promotion => promotion.id === id)[0]);
	}

	//combined post and put, if hero.id is given, put is run, else, its post
	save(promotion: Promotion): Promise<Promotion>  {
		if (promotion.id) {
			return this.put(promotion);
		}
		return this.post(promotion);
	}

	// Add new Hero
	private post(promotion: Promotion): Promise<Promotion> {
		let headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post(this.promotionURL, JSON.stringify(promotion), {headers: headers})
	             .toPromise()
	             .then(res => res.json().data)
	             .catch(this.handleError);
	}	

	// Update existing Hero
	private put(promotion: Promotion) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.promotionURL}/${promotion.id}`;

		return this.http.put(url, JSON.stringify(promotion), {headers: headers})
		     .toPromise()
		     .then(() => promotion)
		     .catch(this.handleError);
	}	

	//Delete hero
	delete(promotion: Promotion) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.promotionURL}/${promotion.id}`;

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