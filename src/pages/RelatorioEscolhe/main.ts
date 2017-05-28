import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PageListaCompras } from '../ListaCompras/main'

@Component({
    selector: 'page-inicio',
    templateUrl: 'main.html'
})
export class PageRelatorioEscolhe {
    constructor(public navCtrl: NavController){}
    openPage() {
        return this.navCtrl.setRoot(PageListaCompras);
    }
}
