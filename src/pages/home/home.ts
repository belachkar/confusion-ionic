import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DishProvider } from '../../providers/dish/dish';
import { LeaderProvider } from '../../providers/leader/leader';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Dish } from '../../shared/dish';
import { Leader } from '../../shared/leader';
import { Promotion } from '../../shared/promotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  promotionErrMsg: string;
  leaderErrMsg: string;

  constructor(
    public navCtrl: NavController,
    private dishService: DishProvider,
    private promotionService: PromotionProvider,
    private leaderService: LeaderProvider,
    @Inject('BaseURL') private BaseURL) {

  }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe(
        dish => this.dish = dish,
        err => this.dishErrMsg = err);

    this.promotionService.getFeaturedPromotion()
      .subscribe(
        promotion => this.promotion = promotion,
        err => this.promotionErrMsg = err);

    this.leaderService.getFeaturedDish()
      .subscribe(
        leader => this.leader = leader,
        err => this.leaderErrMsg = err);
  }

}
