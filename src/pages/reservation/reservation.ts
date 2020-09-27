import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
