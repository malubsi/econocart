import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PageForm } from '../generico_form/main';
import { UnidadeMedida } from '../../entities/UnidadeMedida';

@Component({
    selector: 'page-form',
    templateUrl: '../generico_form/main.html'
})
export class PageFormUnidadeMedida extends PageForm<UnidadeMedida> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
    ){
        super(navCtrl, navParams, toastCtrl);
        this.postSuper();
    }
    public textOption(field: string, item: any): string{ return ''; };
    public titulo: string = "unidade de medida";
    public fields: object[] = [
        {
            type: 'textbox',
            label: 'Nome',
            entity: 'nome',
            verifywith: 'length'
        }
    ];
}
