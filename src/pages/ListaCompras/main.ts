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
import { PageListaItensCompra } from '../ListaItensCompra/main';
import { PageListaPrecos } from '../ListaPrecos/main';
import { PageRelatorioEscolhe } from '../RelatorioEscolhe/main';

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
        this.contextoExibe['personalizado'].push({
            text: 'Gerenciar itens de compra',
            role: 'manage',
            icon: 'list',
            handler: () => {
                this.navCtrl.push(PageListaItensCompra,{
                    'sujeito': this.getClicado()
                })
            }
        })
        this.contextoExibe['personalizado'].push({
            text: 'Anotar preços',
            role: 'manage',
            icon: 'cash',
            handler: () => {
                this.navCtrl.push(PageListaPrecos,{
                    'sujeito': this.getClicado()
                })
            }
        })
        this.contextoExibe['personalizado'].push({
            text: 'Ir às compras',
            role: 'manage',
            icon: 'cart',
            handler: () => {
                this.navCtrl.push(PageRelatorioEscolhe,{
                    'sujeito': this.getClicado()
                })
            }
        })
    }
    public items: Planejamento[] = new Array();
    public icone: string = "pricetags";
    public textos: object = {
        "titulo": "Listas de compras",
        "adicionar": "Adicionar lista de compras",
        "entidadeGenero": "a",
        "artigoentidade": "a lista de compras",
        "capitalEntidade": "Listas de compras",
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
            if (a.modificacao < b.modificacao) { return 1; }
            if (a.modificacao > b.modificacao) { return -1; }
            if (a.criacao < b.criacao) { return 1; }
            if (a.criacao > b.criacao) { return -1; }
            if (a.nome > b.nome) { return 1; }
            if (a.nome < b.nome) { return -1; }
            return 0;
        })
        return items;
    }
}
