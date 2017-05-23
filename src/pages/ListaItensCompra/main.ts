import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { Necessidade } from '../../entities/Necessidade';
import { CrudNecessidade } from '../../providers/CrudNecessidade.service';
import { CrudSupermercado } from '../../providers/CrudSupermercado.service';
import { PageLista } from '../generico_lista/main';
import { PageFormCompras } from '../FormCompras/main';

@Component({
    selector: 'page-lista',
    templateUrl: '../generico_lista/main.html'
})
export class PageListaItensCompra extends PageLista<Necessidade> {
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public necessidadeCrud: CrudNecessidade,
        public navParams: NavParams,
        public supermercadoCrud: CrudSupermercado,
    ){
        super(
            navCtrl,
            actionSheetCtrl,
            alert,
            toast,
            loadingCtrl,
            necessidadeCrud
        );
        this.contextoExibe['personalizado'].push({
            text: 'Gerenciar itens de compra',
            role: 'manage',
            icon: 'settings',
            handler: () => {}
        })
    }
    public items: Necessidade[] = new Array();
    public icone: string = "basket";
    public textos: object = {
        "titulo": "Lista de compras",
        "adicionar": "Adicionar item de compra",
        "entidadeGenero": "o",
        "artigoentidade": "o item de compra",
        "capitalEntidade": "Item de compra",
    };
    public texto(item: Necessidade):string{ return item.produto.nome; };
    public posTexto(item: Necessidade):string{ return (item.quantidade || '?') + " itens"; };
    public abreEdicao(item: Necessidade):void{
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
    public ordenaExibicao(items: Necessidade[]):Necessidade[]{
        items.sort((a, b) => {
            if (a.produto.nome > b.produto.nome) { return 1; }
            if (a.produto.nome < b.produto.nome) { return -1; }
            if (a.quantidade > b.quantidade) { return 1; }
            if (a.quantidade < b.quantidade) { return -1; }
            return 0;
        })
        return items;
    }
}
