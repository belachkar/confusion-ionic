import { Component, Inject, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    private toastCtrl: ToastController,
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
    const id = dish.id;
    console.log('Adding to favorite:', id);

    this.favService.addFavorite(id);
    this.toastCtrl.create({
      message: `Dish ${id} added as a favorite successfully`,
      duration: 3000
    }).present();
  }

}
