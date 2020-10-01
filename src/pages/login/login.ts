import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../shared/user';
import { RegisterPage } from '../register/register';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
    this._initForm();
    this._initStorage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    const { username, password } = this.loginForm.value as User;
    const user = { username, password };

    this.user = user;
    const isRememberChecked = this.loginForm.get('remember').value;

    this._updateStorage(isRememberChecked);
    this.dismiss();
  }

  openRegister() {
    const modal = this.modalCtrl.create(RegisterPage);

    modal.present();
    modal.onDidDismiss(regData => this.dismiss());
  }

  private _initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

  private _initStorage() {
    this.storage.get('user').then(user => {
      if (user) {
        this.user = user;
        this.loginForm.patchValue(user);
      } else {
        console.log('User not defined');
      }
    });
  }

  private _updateStorage(isRememberChecked) {
    console.log('isRememberChecked:', isRememberChecked);

    isRememberChecked
      ? this.storage.set('user', this.user)
      : this.storage.remove('user');
  }

}
