import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { Consulta } from '../../entities/Consulta';
import { Necessidade } from '../../entities/Necessidade';
import { CrudProduto } from '../../providers/CrudProduto.service';
import { CrudConsulta } from '../../providers/CrudConsulta.service';
import { CrudNecessidade } from '../../providers/CrudNecessidade.service';
import { PageLista } from '../generico_lista/main';
import { SocialSharingService } from "../../providers/SocialSharing.service";

@Component({
    selector: 'page-lista',
    templateUrl: '../generico_lista/main.html'
})
export class PageRelatorioExibe extends PageLista<Consulta> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public consultaCrud: CrudConsulta,
        public necessidadeCrud: CrudNecessidade,
        public produtoCrud: CrudProduto,
        public socialSharingService: SocialSharingService
    ) {
        super(
            navCtrl,
            actionSheetCtrl,
            alert,
            toast,
            loadingCtrl,
            consultaCrud,
            socialSharingService
        );
        this.contextoExibe['excluir'] = false
        this.contextoExibe['editar'] = false
        this.textos['titulo'] = this.navParams.get('titulo')
        this.items = this.navParams.get('consultas')
        this.isChoice = true;
    }
    refreshList() {
        this.mostraCarregando();
        this.consultaCrud.recarregarAlguns(this.items).then(consultas => {
            this.items = consultas
            let necessidades: Necessidade[] = []
            for (let consulta of consultas) {
                necessidades.push(consulta.necessidade)
            }
            this.necessidadeCrud.recarregarAlguns(necessidades).then(necessidades => {
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
                    for (let consulta in consultas) {
                        for (let necessidade of necessidades) {
                            if (
                                consultas[consulta].necessidade
                                &&
                                consultas[consulta].necessidade.id === necessidade.id
                            ) {
                                consultas[consulta].necessidade = necessidade
                                break
                            }
                        }
                    }
                    this.items = this.ordenaExibicao(consultas);
                    this.escondeCarregando()
                })
            });
        })
    }
    public items: Consulta[] = new Array();
    public icone: string = "arrow-dropright";
    public textos: object = {
        "titulo": "",
        "adicionar": "",
        "entidadeGenero": "",
        "artigoentidade": "",
        "capitalEntidade": "",
    };
    public texto(item: Consulta): string {
        return '' +
        ((item.necessidade || { produto: null }).produto || { nome: '<deletado>' }).nome
        + ' ('
        + ((item.necessidade || { quantidade: '???' }).quantidade)
        + ' '
        + ((((item.necessidade || { produto: null }).produto || { unidadeMedida: null }).unidadeMedida || { nome: 'iten' }).nome)
        + (((item.necessidade || { quantidade: 0 }).quantidade) > 1 ? 's' : '')
        + ')';
    };
    public posTexto(item: Consulta): string { return item.supermercado.nome; };
    public classesPara(item: Consulta): string {
        return item.necessidade.satisfeita ? 'tickado' : ''
    }
    public add(): void { return }
    public abreEdicao(item: Consulta): void { return }
    public click(item: Consulta): void {
        item.necessidade.satisfeita = !item.necessidade.satisfeita
        this.necessidadeCrud.recarregarUm(item.necessidade).then(necessidade => {
            necessidade.satisfeita = item.necessidade.satisfeita
            this.necessidadeCrud.salvar(necessidade)
        })
    };
    public ordenaExibicao(items: Consulta[]): Consulta[] {
        items.sort((a, b) => {
            if (a.supermercado.nome > b.supermercado.nome) { return 1; }
            if (a.supermercado.nome < b.supermercado.nome) { return -1; }
            if (a.necessidade.produto.nome > b.necessidade.produto.nome) { return 1; }
            if (a.necessidade.produto.nome < b.necessidade.produto.nome) { return -1; }
            if (a.preco > b.preco) { return 1; }
            if (a.preco < b.preco) { return -1; }
            if (a.necessidade.id > b.necessidade.id) { return 1; }
            if (a.necessidade.id < b.necessidade.id) { return -1; }
            return 0;
        })
        return items;
    }
}
