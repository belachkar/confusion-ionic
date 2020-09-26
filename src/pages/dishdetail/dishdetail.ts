import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    if (this.isFavorite) {
      console.log('It\'s already a favorite:', this.dish.id);
      return false;
    }

    console.log('Adding to favorite:', this.dish.id);
    this.isFavorite = this.favService.addFavorite(this.dish.id);
  }

}
