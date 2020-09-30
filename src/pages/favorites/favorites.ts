import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, IonicPage, ItemSliding, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
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
  actions = {
    deleteFav: (id: number) => this._doDeleteFav(id)
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
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
    this.favoriteService.getFavorites().subscribe(
      favs => this.favorites = favs,
      errMsg => this.errMsg = errMsg);
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('Deleting favorite:', id);

    const alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this dish',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => console.log('Delete cancelled')
        },
        {
          text: 'Delete',
          handler: () => this.actions.deleteFav(id)
        }
      ]
    });

    alert.present();
    item.close();
  }

  _doDeleteFav(id: number) {

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
  };

}
