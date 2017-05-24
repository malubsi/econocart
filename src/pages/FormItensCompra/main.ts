import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PageForm } from '../generico_form/main';
import { Necessidade } from '../../entities/Necessidade';

@Component({
    selector: 'page-form',
    templateUrl: '../generico_form/main.html'
})
export class PageFormItensCompra extends PageForm<Necessidade> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
    ){
        super(navCtrl, navParams, toastCtrl);
        this.postSuper();
    }
    public textOption(field: string, item: any): string{
        let r = '';
        if(field == 'produto'){ r = item['nome'] }
        return r;
    };
    public titulo: string = "item de compra";
    public fields: object[] = [
        {
            type: 'select',
            label: 'Produto',
            entity: 'produto',
            verifywith: 'truthy'
        },
        {
            type: 'number',
            label: 'Quantidade',
            entity: 'quantidade',
            verifywith: 'gtz'
        },
    ];
}
