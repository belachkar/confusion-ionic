import { Component, Inject, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DishProvider } from '../../providers/dish/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  dishes: Dish[];
  errMsg: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dishService: DishProvider,
    private favService: FavoriteProvider,
    @Inject('BaseURL') public BaseURL) {
  }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe(
        dishes => this.dishes = dishes,
        err => this.errMsg = err);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  dishSelected(event, dish: Dish) {
    const params = { dish };

    this.navCtrl.push(DishdetailPage, params);
  }

  addToFavorites(dish: Dish) {
    console.log('Adding to favorite:', dish.id);
    this.favService.addFavorite(dish.id);
  }

}
