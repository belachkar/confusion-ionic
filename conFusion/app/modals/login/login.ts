import {Component} from '@angular/core';
import {Modal, NavController,ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/modals/login/login.html'
})

export class LoginModal {
  constructor(private viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  doLogin(){

  }
}