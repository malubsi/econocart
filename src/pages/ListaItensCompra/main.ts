import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { Necessidade } from '../../entities/Necessidade';
import { Planejamento } from '../../entities/Planejamento';
import { CrudNecessidade } from '../../providers/CrudNecessidade.service';
import { CrudPlanejamento } from '../../providers/CrudPlanejamento.service';
import { CrudProduto } from '../../providers/CrudProduto.service';
import { PageLista } from '../generico_lista/main';
import { PageFormItensCompra } from '../FormItensCompra/main';


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
        public produtoCrud: CrudProduto,
        public planejamentoCrud: CrudPlanejamento, 
  
    ) {
        super(
            navCtrl,
            actionSheetCtrl,
            alert,
            toast,
            loadingCtrl,
            necessidadeCrud
        );
        this.subject = navParams.get('sujeito')
    }
    public subject: Planejamento;
    refreshList() {
        this.mostraCarregando();
        this.planejamentoCrud.recarregarUm(this.subject).then(planejamento => {
            this.subject = planejamento
            this.necessidadeCrud.recarregarAlguns(planejamento.necessidades).then(necessidades => {
                this.produtoCrud.listar().then(produtos => {
                    for (let necessidade in necessidades) {
                        for (let produto of produtos) {
                            if (
                                necessidades[necessidade].produto
                                &&
                                necessidades[necessidade].produto.id == produto.id
                            ) {
                                necessidades[necessidade].produto = produto
                            }
                        }
                    }
                    this.items = this.ordenaExibicao(necessidades);
                    this.escondeCarregando()
                })
            });
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
    public texto(item: Necessidade): string { return (item.produto || { nome: '<deletado>' }).nome; };
    public posTexto(item: Necessidade): string {
        return ((item.quantidade || '?') + " " +
            (((item.produto || { unidadeMedida: null }).unidadeMedida || { nome: 'iten' }).nome)
            + (item.quantidade > 1 ? 's' : ''))
    };
    public add(): void {
        let novo = this.crud.criar()
        novo.planejamento = this.subject
        this.abreEdicao(novo);
    };
    public abreEdicao(item: Necessidade): void {
        this.produtoCrud.listar().then(
            produto => {
                this.navCtrl.push(PageFormItensCompra, {
                    sujeito: item,
                    crud: this.necessidadeCrud,
                    selecionaveis: {
                        'produto': produto
                    },
                });
            }
        )
    };
    public ordenaExibicao(items: Necessidade[]): Necessidade[] {
        items.sort((a, b) => {
            if ((a.produto || { nome: '<deletado>' }).nome > (b.produto || { nome: '<deletado>' }).nome) { return 1; }
            if ((a.produto || { nome: '<deletado>' }).nome < (b.produto || { nome: '<deletado>' }).nome) { return -1; }
            if (a.quantidade > b.quantidade) { return 1; }
            if (a.quantidade < b.quantidade) { return -1; }
            return 0;
        })
        return items;
    }
}
