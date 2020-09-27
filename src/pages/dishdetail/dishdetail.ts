import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';


@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMsg: string;
  avgStars: string;
  numComments: number;
  isFavorite = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private favService: FavoriteProvider,
    private toastCtrl: ToastController,
    @Inject('BaseURL') public BaseURL
  ) {
    this._init(navParams);
  }

  private _init(navParams: NavParams) {
    this.dish = navParams.get('dish');
    this.isFavorite = this.favService.isFavorite(this.dish.id);
    this.numComments = this.dish.comments.length;

    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgStars = (total / this.numComments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    const id = this.dish.id;

    if (this.isFavorite) {
      console.log('It\'s already a favorite:', id);
      return false;
    }

    console.log('Adding to favorite:', id);
    this.isFavorite = this.favService.addFavorite(id);
    if (this.isFavorite) {
      this.toastCtrl.create({
        message: `Dish ${id} added as a favorite successfully`,
        position: 'middle',
        duration: 3000
      }).present();
    }
  }

}
