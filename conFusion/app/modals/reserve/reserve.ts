import {Component} from '@angular/core';
import {Modal, NavController,ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/modals/reserve/reserve.html'
})

export class ReserveModal {
  constructor(private viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  doLogin(){

  }
}