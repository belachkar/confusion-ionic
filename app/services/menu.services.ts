import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Menu } from '../objects/Menu';
import { Comment } from '../objects/Comments';

@Injectable()
export class MenuService {

	private menuURL = 'http://localhost:3000/dishes';  // URL to web api

  	constructor(private http: Http) { }
	
	getDishes(): Promise<Menu[]> {
    	return this.http.get(this.menuURL)
        	       .toPromise()
        	       .then(function(response) {
    	       			return response.json();
        	       })
            	   .catch(this.handleError);
	}

	getDish(id: number) {
		return this.getDishes().then(menus => menus.filter(menu => menu.id === id)[0]);
	}

	//combined post and put, if hero.id is given, put is run, else, its post
	save(menu: Menu): Promise<Menu>  {
		if (menu.id) {
			return this.put(menu);
		}
		return this.post(menu);
	}

	// Add new Hero
	private post(menu: Menu): Promise<Menu> {
	  let headers = new Headers({
	    'Content-Type': 'application/json'});
	  return this.http.post(this.menuURL, JSON.stringify(menu), {headers: headers})
	             .toPromise()
	             .then(res => res.json().data)
	             .catch(this.handleError);
	}	

	// Update existing Hero
	put(menu: Menu) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.menuURL}/${menu.id}`;

		return this.http.put(url, JSON.stringify(menu), {headers: headers})
		     .toPromise()
		     .then(() => menu)
		     .catch(this.handleError);
	}	

	//Delete hero
	delete(menu: Menu) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.menuURL}/${menu.id}`;

		return this.http.delete(url, headers)
		         .toPromise()
		         .catch(this.handleError);
	}

	//Add comment
	addcomment(comment: Comment, menu: Menu): Promise<Menu> {
    	return this.http.get(this.menuURL+'/'+menu.id)
        	       .toPromise()
        	       .then(function(response) {
        	       		//push comment to menu comment
        	       		menu = response.json();
        	       		menu.comments.push(comment);

        	       		return menu;
        	       })
            	   .catch(this.handleError);
	}	


	//add comment
	

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