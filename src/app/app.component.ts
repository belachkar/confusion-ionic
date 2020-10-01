import { Component, ViewChild } from '@angular/core';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Loading, LoadingController, ModalController, Nav, Platform } from 'ionic-angular';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { FavoritesPage } from '../pages/favorites/favorites';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { ReservationPage } from '../pages/reservation/reservation';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  loading: Loading;
  rootPage: any = HomePage;

  pages: Array<{ title: string, icon: string, component: any; }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private network: Network
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Menu', icon: 'list-box', component: MenuPage },
      { title: 'My Favorite', icon: 'heart', component: FavoritesPage },
      { title: 'Contact Us', icon: 'contact', component: ContactPage },
      { title: 'About Us', icon: 'information-circle', component: AboutPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Check network connection status
      this.network.onDisconnect().subscribe(() => {
        if (!this.loading || this.loading) {
          this.loading = this.loadingCtrl.create({
            content: 'Network Disconnected'
          });
        }
        this.loading.present();
      });

      this.network.onConnect().subscribe(() => {
        console.log('The connection type is:', this.network.type);
        if (this.loading)
          this.loading.dismiss();
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openReserve() {
    const modal = this.modalCtrl.create(ReservationPage);
    modal.present();
  }

  openLogin() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
}
