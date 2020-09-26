import { Component, Inject, OnInit } from '@angular/core';
import { IonicPage, ItemSliding, NavController, NavParams } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';


@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {
  favorites: Dish[];
  errMsg: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    @Inject('BaseURL') public BaseURL) {
  }

  ngOnInit(): void {
    this.favoriteService.getFavorites()
      .subscribe(
        favs => this.favorites = favs,
        errMsg => this.errMsg = errMsg);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('Deleted:', id);

    this.favoriteService.deleteFavorite(id)
      .subscribe(
        favs => this.favorites = favs,
        errMsg => this.errMsg = errMsg);

    item.close();
  }

}
