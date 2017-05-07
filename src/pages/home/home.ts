import { Component, ViewChild } from '@angular/core';
import { NavController , Nav} from 'ionic-angular';

import { ListItemListPage } from "../listitem/list-item-list-page/list-item-list-page";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController) {

  }

  openPage() {
    this.navCtrl.setRoot(ListItemListPage);
  }

}
