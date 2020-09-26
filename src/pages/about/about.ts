import { Component, Inject, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaderProvider } from '../../providers/leader/leader';
import { Leader } from '../../shared/leader';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit {
  leaders: Leader[];
  errMsg: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private leaderService: LeaderProvider,
    @Inject('BaseURL') public BaseURL) {
  }

  ngOnInit(): void {
    this._getLeaders();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  private _getLeaders() {
    this.leaderService.getLeaders()
      .subscribe(
        leaders => this.leaders = leaders,
        err => this.errMsg = err);
  }

}
