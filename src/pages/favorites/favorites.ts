import { Component, Inject, OnInit } from '@angular/core';
import { IonicPage, ItemSliding, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
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
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
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

    const toast = this.toastCtrl.create({
      message: `Dish ${id} deleted successfully`,
      duration: 3000
    });
    const loading = this.loadingCtrl.create({
      content: 'Deleting . . .'
    });

    loading.present();
    this.favoriteService.deleteFavorite(id)
      .subscribe(
        favs => {
          loading.dismiss();
          this.favorites = favs;
          toast.present();
        },
        errMsg => {
          loading.dismiss();
          this.errMsg = errMsg;
        });

    item.close();
  }

}
