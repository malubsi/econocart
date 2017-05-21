import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { UnidadeMedida } from '../../entities/UnidadeMedida';
import { CrudUnidadeMedida } from '../../providers/CrudUnidadeMedida.service';
import { PageLista } from '../generico_lista/main';
import { PageFormUnidadeMedida } from '../FormUnidadeMedida/main';

@Component({
    selector: 'page-lista',
    templateUrl: '../generico_lista/main.html'
})
export class PageListaUnidadeMedida extends PageLista<UnidadeMedida> {
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public unidadeMedidaCrud: CrudUnidadeMedida
    ){
        super(
            navCtrl,
            actionSheetCtrl,
            alert,
            toast,
            loadingCtrl,
            unidadeMedidaCrud
        );
    }
    public items: UnidadeMedida[] = new Array();
    public icone: string = "color-fill";
    public textos: object = {
        "titulo": "Unidades de medida",
        "adicionar": "Adicionar unidade de medida",
        "entidadeGenero": "a",
        "artigoentidade": "a unidade de medida",
        "capitalEntidade": "Unidade de medida",
    };
    public texto(item: UnidadeMedida):string{ return item.nome; };
    public posTexto(item: UnidadeMedida):string{ return ""; };
    public abreEdicao(item: UnidadeMedida):void{
        this.navCtrl.push(PageFormUnidadeMedida,{
            sujeito: item,
            crud: this.crud,
            selecionaveis: {},
        });
    };
    public ordenaExibicao(items: UnidadeMedida[]):UnidadeMedida[]{
        items.sort((a, b) => {
            if (a.nome > b.nome) { return 1; }
            if (a.nome < b.nome) { return -1; }
            return 0;
        })
        return items;
    }
}
