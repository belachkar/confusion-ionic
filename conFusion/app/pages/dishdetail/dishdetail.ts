import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { MenuService } from '../../services/menu.services';
import { Menu } from '../../objects/Menu';


@Component({
  templateUrl: 'build/pages/dishdetail/dishdetail.html',
  providers: [MenuService]
})
export class DishDetailPage implements OnInit{
	dish: Menu;
	
	constructor(private nav: NavController, private navParams: NavParams, private menuService: MenuService) {
		this.nav = nav;
		this.menuService = menuService;
		this.dish = navParams.get('dish');		
	}

	ngOnInit(){
	}
}
