import {Component,ViewChild} from '@angular/core';
import {Modal, MenuController, Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {MenuPage} from './pages/menu/menu';
import {ContactPage} from './pages/contact/contact';
import {FavoritePage} from './pages/favorite/favorite';
import {AboutPage} from './pages/about/about';

import {LoginModal} from './modals/login/login';
import {ReserveModal} from './modals/reserve/reserve';


@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
	@ViewChild('myNav') nav;	
	private rootPage:any;

	constructor(private platform:Platform, private menu:MenuController) {
		this.rootPage = HomePage;

		platform.ready().then(() => {
			StatusBar.styleDefault();
		});
	}

	openPage(page){
		if (page == 'home') this.rootPage = HomePage;
		else if (page == 'about') this.rootPage = AboutPage;
		else if (page == 'menu') this.rootPage = MenuPage;
		else if (page == 'favorite') this.rootPage = FavoritePage;
		else if (page == 'contact') this.rootPage = ContactPage;
		this.menu.close();
	}

	openLogin(){
		this.menu.close();
		let modal = Modal.create(LoginModal);
		this.nav.present(modal);
	}

	openReserve(){
		this.menu.close();
		let modal = Modal.create(ReserveModal);
		this.nav.present(modal);
	}

}

ionicBootstrap(MyApp)
