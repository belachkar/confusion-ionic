import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { DishDetailPage } from '../dishdetail/dishdetail';
import { MenuService } from '../../services/menu.services';
import { Menu } from '../../objects/Menu';

@Component({
  templateUrl: 'build/pages/menu/menu.html',
  providers: [MenuService],

})

export class MenuPage implements OnInit {
	dishes: Menu[];
	showMenu = false;

	constructor(private nav: NavController, private navParams: NavParams, private menuService: MenuService) {
		this.nav = nav;
	}

	ngOnInit(){
    	this.menuService.getDishes().then(
    		dishes => {
    			this.dishes = dishes;
    			this.showMenu = true;
    		}
		);
	}	

	goToDetail(event, dish){
		console.log(dish);
		this.nav.push(DishDetailPage, {
            dish: dish
        });
	}
}
