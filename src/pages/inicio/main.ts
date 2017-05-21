import { Component, ViewChild } from '@angular/core';
import { NavController , Nav} from 'ionic-angular';

@Component({
    selector: 'page-inicio',
    templateUrl: 'main.html'
})
export class PageInicio {

    @ViewChild(Nav) nav: Nav;

    constructor(public navCtrl: NavController) {

    }

    openPage() {
        return this.navCtrl.setRoot(PageInicio);
    }

}
