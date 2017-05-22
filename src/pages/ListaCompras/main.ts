import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { Planejamento } from '../../entities/Planejamento';
import { CrudPlanejamento } from '../../providers/CrudPlanejamento.service';
import { CrudSupermercado } from '../../providers/CrudSupermercado.service';
import { PageLista } from '../generico_lista/main';
import { PageFormCompras } from '../FormCompras/main';

@Component({
    selector: 'page-lista',
    templateUrl: '../generico_lista/main.html'
})
export class PageListaCompras extends PageLista<Planejamento> {
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public planejamentoCrud: CrudPlanejamento,
        public supermercadoCrud: CrudSupermercado,
    ){
        super(
            navCtrl,
            actionSheetCtrl,
            alert,
            toast,
            loadingCtrl,
            planejamentoCrud
        );
        this.contextoExibe['personalizado'] = {
            text: 'Gerenciar itens de compra',
            role: 'manage',
            icon: 'settings',
            handler: () => {
                this.navCtrl.setRoot(PageListaCompras)
            }
        }
    }
    public items: Planejamento[] = new Array();
    public icone: string = "pricetags";
    public textos: object = {
        "titulo": "Lista de compras",
        "adicionar": "Adicionar lista de compras",
        "entidadeGenero": "a",
        "artigoentidade": "a lista de compras",
        "capitalEntidade": "Lista de compras",
    };
    public texto(item: Planejamento):string{ return item.nome; };
    public posTexto(item: Planejamento):string{ return (item.necessidades || []).length + " itens"; };
    public abreEdicao(item: Planejamento):void{
        this.supermercadoCrud.listar().then(
            supermercados => {
                this.navCtrl.push(PageFormCompras,{
                    sujeito: item,
                    crud: this.crud,
                    selecionaveis: {
                        'supermercados': supermercados
                    },
                });
            }
        )
    };
    public ordenaExibicao(items: Planejamento[]):Planejamento[]{
        items.sort((a, b) => {
            if (a.modificacao > b.modificacao) { return 1; }
            if (a.modificacao < b.modificacao) { return -1; }
            if (a.criacao > b.criacao) { return 1; }
            if (a.criacao < b.criacao) { return -1; }
            if (a.nome > b.nome) { return 1; }
            if (a.nome < b.nome) { return -1; }
            return 0;
        })
        return items;
    }
}
