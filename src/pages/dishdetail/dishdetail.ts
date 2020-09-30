import { Component, Inject } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController, IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Comment } from '../../shared/comment';
import { Dish } from '../../shared/dish';
import { CommentPage } from '../comment/comment';


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
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    @Inject('BaseURL') public BaseURL
  ) {
    this._init();
  }

  private _init() {
    this.dish = this.navParams.get('dish');
    this.isFavorite = this.favService.isFavorite(this.dish.id);

    this._updateAvgStars();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    const id = this.dish.id;
    console.log('Adding to favorite:', id);

    if (this.isFavorite) {
      console.log('It\'s already a favorite:', id);
      return false;
    }

    this.isFavorite = this.favService.addFavorite(id);

    if (this.isFavorite) {
      this.toastCtrl.create({
        message: `Dish ${id} added as a favorite successfully`,
        position: 'middle',
        duration: 3000
      }).present();
    }
  }

  openActions() {
    this.actionSheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => this.addToFavorites()
        }, {
          text: 'Add a Comment',
          handler: () => this.openComment()
        }, {
          text: 'Share via Facebook',
          handler: () => this.shareFB()
        }, {
          text: 'Share via Twitter',
          handler: () => this.shareTwitter()
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => console.log("Operation cancelled")
        }
      ]
    }).present();
  }

  private openComment() {
    const modal = this.modalCtrl.create(CommentPage);

    modal.present();
    modal.onDidDismiss((comment: Comment) => {
      if (comment) {
        this.dish.comments.push(comment);
        this._updateAvgStars();
      }
    });
  }

  private shareFB() {
    const { name, description, image } = this.dish;
    const message = `${name} -- ${description}`;

    this.socialSharing.shareViaFacebook(message, image)
      .then(data => console.log('Posted successfully to FB', data))
      .catch(errMsg => console.error('Failed to post to FB', errMsg));
  }

  private shareTwitter() {
    const { name, description, image } = this.dish;
    const message = `${name} -- ${description}`;

    this.socialSharing.shareViaTwitter(message, image)
      .then(data => console.log('Posted successfully to Twitter', data))
      .catch(errMsg => console.error('Failed to post to Twitter', errMsg));
  }

  private _updateAvgStars() {
    this.numComments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgStars = (total / this.numComments).toFixed(2);
  }

}
