import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { UnitListPage } from "../pages/unit/unit-list-page/unit-list-page";
import { StartService } from "../providers/start/start-service.service";
import { ProductListPage } from "../pages/product/product-list-page/product-list-page";
import { MarketListPage } from "../pages/market/market-list-page/market-list-page";
import { ListItemListPage } from "../pages/listitem/list-item-list-page/list-item-list-page";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _starter: StartService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Lista de Itens', component: ListItemListPage },
      { title: 'Supermercados', component: MarketListPage },
      { title: 'Produtos', component: ProductListPage },
      { title: 'Unidades', component: UnitListPage }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._starter.start();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
