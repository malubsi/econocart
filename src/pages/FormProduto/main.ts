import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PageForm } from '../generico_form/main';
import { Produto } from '../../entities/Produto';

@Component({
    selector: 'page-form',
    templateUrl: '../generico_form/main.html'
})
export class PageFormProduto extends PageForm<Produto> {
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
        if(field == 'unidadeMedida'){ r = item['nome'] }
        return r;
    };
    public titulo: string = "produto";
    public fields: object[] = [
        {
            type: 'textbox',
            label: 'Nome',
            entity: 'nome',
            verifywith: 'length'
        },
        {
            type: 'select',
            label: 'Unidade de medida',
            entity: 'unidadeMedida',
            verifywith: 'truthy'
        },
    ];
}
