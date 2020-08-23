import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Menu } from '../../objects/Menu';
import { Promotion } from '../../objects/Promotion';
import { Leadership } from '../../objects/Leadership';
import { MenuService } from '../../services/menu.services';
import { LeadershipService } from '../../services/leadership.services';
import { PromotionService } from '../../services/promotion.services';

@Component({
	templateUrl: 'build/pages/home/home.html',
	providers: [MenuService, LeadershipService, PromotionService],
})
export class HomePage implements OnInit{
	dish : Menu;
	showDish = false;
	message = "Loading...";

	promotion : Promotion;
	showPromotion = false;
	promotionMessage = "Loading...";

	leadership : Leadership;
	showLeadership = false;
	leadershipMessage = "Loading...";

	constructor(private navController: NavController, private menuService: MenuService, private leadershipService: LeadershipService, private promotionService: PromotionService) {

	}

	ngOnInit(){
		this.menuService.getDish(0).then(
    		dish => {
    			this.dish = dish;
    			this.showDish = true;
    			this.message = "";
    		}
		);

		this.promotionService.getPromotion(0).then(
    		promotion => {
    			this.promotion = promotion;
    			this.showPromotion = true;
    			this.promotionMessage = "";

    		}
		);

		this.leadershipService.getLeadership(0).then(
    		leadership => {
    			this.leadership = leadership;
    			this.leadershipMessage = "";
    			this.showLeadership = true;
    		}
		);

	}	
}
