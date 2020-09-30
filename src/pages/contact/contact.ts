import { Component } from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private emailComp: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendEmail() {
    const emailOpt: EmailComposerOptions = {
      to: 'silverdaymon@gmail.com',
      subject: '[Confusion] Query',
      body: '<i>Dear Sir/Madam:</i><br><p>It\'s a test email from <b>Confusion Ionic</b> Application</p>',
      isHtml: true,
    };

    this.emailComp.isAvailable();

    this.emailComp.open(emailOpt)
      .then(data => console.log(data))
      .catch(errMsg => console.error(errMsg));
  }

}
