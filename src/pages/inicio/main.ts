import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PageListaUnidadeMedida } from '../ListaUnidadeMedida/main'

@Component({
    selector: 'page-inicio',
    templateUrl: 'main.html'
})
export class PageInicio {
    constructor(public navCtrl: NavController){}
    openPage() {
        return this.navCtrl.setRoot(PageListaUnidadeMedida);
    }
}
