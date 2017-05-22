import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { Supermercado } from '../../entities/Supermercado';
import { CrudSupermercado } from '../../providers/CrudSupermercado.service';
import { PageLista } from '../generico_lista/main';
import { PageFormSupermercado } from '../FormSupermercado/main';

@Component({
    selector: 'page-lista',
    templateUrl: '../generico_lista/main.html'
})
export class PageListaSupermercado extends PageLista<Supermercado> {
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public supermercadoCrud: CrudSupermercado
    ){
        super(
            navCtrl,
            actionSheetCtrl,
            alert,
            toast,
            loadingCtrl,
            supermercadoCrud
        );
    }
    public items: Supermercado[] = new Array();
    public icone: string = "basket";
    public textos: object = {
        "titulo": "Supermercados",
        "adicionar": "Adicionar supermercado",
        "entidadeGenero": "o",
        "artigoentidade": "o supermercado",
        "capitalEntidade": "Supermercado",
    };
    public texto(item: Supermercado):string{ return item.nome; };
    public posTexto(item: Supermercado):string{ return ""; };
    public abreEdicao(item: Supermercado):void{
        this.navCtrl.push(PageFormSupermercado,{
            sujeito: item,
            crud: this.crud,
            selecionaveis: {},
        });
    };
    public ordenaExibicao(items: Supermercado[]):Supermercado[]{
        items.sort((a, b) => {
            if (a.nome > b.nome) { return 1; }
            if (a.nome < b.nome) { return -1; }
            return 0;
        })
        return items;
    }
}
