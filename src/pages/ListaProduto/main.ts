import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { Produto } from '../../entities/Produto';
import { CrudProduto } from '../../providers/CrudProduto.service';
import { CrudUnidadeMedida } from '../../providers/CrudUnidadeMedida.service';
import { PageLista } from '../generico_lista/main';
import { PageFormProduto } from '../FormProduto/main';
import { PageRelatorioHistoricoPrecos } from '../RelatorioHistoricoPrecos/main';

@Component({
    selector: 'page-lista',
    templateUrl: '../generico_lista/main.html'
})
export class PageListaProduto extends PageLista<Produto> {
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public produtoCrud: CrudProduto,
        public unidadeMedidaCrud: CrudUnidadeMedida,
    ){
        super(
            navCtrl,
            actionSheetCtrl,
            alert,
            toast,
            loadingCtrl,
            produtoCrud
        );
        this.contextoExibe['personalizado'].push({
            text: 'Histórico de preços',
            role: 'manage',
            icon: 'analytics',
            handler: () => {
                this.navCtrl.push(PageRelatorioHistoricoPrecos,{
                    'sujeito': this.getClicado()
                })
            }
        })
    }
    public items: Produto[] = new Array();
    public icone: string = "pricetag";
    public textos: object = {
        "titulo": "Produtos",
        "adicionar": "Adicionar produto",
        "entidadeGenero": "o",
        "artigoentidade": "o produto",
        "capitalEntidade": "Produto",
    };
    public texto(item: Produto):string{ return item.nome; };
    public posTexto(item: Produto):string{ return (item.unidadeMedida || {nome:""})['nome']; };
    public abreEdicao(item: Produto):void{
        this.unidadeMedidaCrud.listar().then(
            unidadesMedida => {
                this.navCtrl.push(PageFormProduto,{
                    sujeito: item,
                    crud: this.crud,
                    selecionaveis: {
                        'unidadeMedida': unidadesMedida
                    },
                });
            }
        )
    };
    public ordenaExibicao(items: Produto[]):Produto[]{
        items.sort((a, b) => {
            if (a.nome > b.nome) { return 1; }
            if (a.nome < b.nome) { return -1; }
            return 0;
        })
        return items;
    }
}
