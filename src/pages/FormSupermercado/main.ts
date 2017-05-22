import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PageForm } from '../generico_form/main';
import { Supermercado } from '../../entities/Supermercado';

@Component({
    selector: 'page-form',
    templateUrl: '../generico_form/main.html'
})
export class PageFormSupermercado extends PageForm<Supermercado> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
    ){
        super(navCtrl, navParams, toastCtrl);
        for(let fieldIndex in this.fields){
            this.fields[fieldIndex]['data'] = this.editing[this.fields[fieldIndex]['entity']]
        }
    }
    public textOption(field: string, item: any): string{ return ''; };
    public titulo: string = "supermercado";
    public fields: object[] = [
        {
            type: 'textbox',
            label: 'Nome',
            entity: 'nome',
            verifywith: 'length'
        }
    ];
}
