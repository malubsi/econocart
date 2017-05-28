import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PageForm } from '../generico_form/main';
import { Consulta } from '../../entities/Consulta';

@Component({
    selector: 'page-form',
    templateUrl: '../generico_form/main.html'
})
export class PageFormPrecos extends PageForm<Consulta> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
    ){
        super(navCtrl, navParams, toastCtrl);
        console.log(this.editing)
        this.postSuper();
    }
    public textOption(field: string, item: any): string{ return ''; };
    public titulo: string = "preço";
    public fields: object[] = [
        {
            type: 'number',
            label: 'Preco unitário',
            entity: 'preco',
            verifywith: 'gtz'
        },
    ];
}
