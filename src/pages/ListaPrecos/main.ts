import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { Necessidade } from '../../entities/Necessidade';
import { Planejamento } from '../../entities/Planejamento';
import { Consulta } from '../../entities/Consulta';
import { CrudNecessidade } from '../../providers/CrudNecessidade.service';
import { CrudPlanejamento } from '../../providers/CrudPlanejamento.service';
import { CrudSupermercado } from '../../providers/CrudSupermercado.service';
import { CrudConsulta } from '../../providers/CrudConsulta.service';
import { PageListacolapsavel } from '../generico_lista_colapsavel/main';
import { PageFormPrecos } from '../FormPrecos/main';

@Component({
    selector: 'page-lista',
    templateUrl: '../generico_lista_colapsavel/main.html'
})
export class PageListaPrecos extends PageListacolapsavel<Necessidade,Consulta> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public necessidadeCrud: CrudNecessidade,
        public consultaCrud: CrudConsulta,
        public planejamentoCrud: CrudPlanejamento,
        public supermercadoCrud: CrudSupermercado,
    ){
        super(
            navCtrl,
            navParams,
            actionSheetCtrl,
            alert,
            toast,
            loadingCtrl,
            necessidadeCrud,
            consultaCrud,
        );
        this.planejamento = navParams.get('sujeito')
        this.externosMonitorados = (this.planejamento).necessidades
    }
    public planejamento: Planejamento;
    public textos: object = {
        "titulo": "Anotar preços",
    };
    public iconeI: string = 'cart';
    public itemField: string = 'consultas';
    public textoExterno(item: Necessidade):string{
        return (item.produto || {nome:'<deletado>'}).nome
    }
    public textoInterno(item: Consulta):string{
        return (item.supermercado || {nome:'<deletado>'}).nome
    }
    public posTextoExterno(item: Necessidade):string{
        let consultas: number = 0
        for(let consulta of item.consultas){
            if(consulta.preco>0){
                consultas+=1
            }
        }
        return consultas+' de '+item.consultas.length+' consultas'
    }
    public posTextoInterno(item: Consulta):string{
        return ((item.necessidade || {quantidade:'???'}).quantidade)+' \u00d7 '+String((item.preco || '???'))
    }
    public ordenaExibicaoInterno(items: Consulta[]):Consulta[]{
        items.sort((a, b) => {
            if ((a.supermercado || {nome:'<deletado>'}).nome > (b.supermercado || {nome:'<deletado>'}).nome) { return 1; }
            if ((a.supermercado || {nome:'<deletado>'}).nome < (b.supermercado || {nome:'<deletado>'}).nome) { return -1; }
            return 0;
        })
        return items;
    }
    public ordenaExibicaoExterno(items: Necessidade[]):Necessidade[]{
        items.sort((a, b) => {
            if ((a.produto || {nome:'<deletado>'}).nome > (b.produto || {nome:'<deletado>'}).nome) { return 1; }
            if ((a.produto || {nome:'<deletado>'}).nome < (b.produto || {nome:'<deletado>'}).nome) { return -1; }
            if (a.quantidade > b.quantidade) { return 1; }
            if (a.quantidade < b.quantidade) { return -1; }
            return 0;
        })
        return items;
    }
    public clickInterno(item: Consulta){
        this.navCtrl.push(
            PageFormPrecos,
            {
                sujeito: item,
                crud: this.crudInterno,
                selecionaveis: {},
            },
        )
    }
    beforeRefreshList():Promise<any>{
        return new Promise<any>((resolve, reject)=>{
            this.planejamentoCrud.recarregarUm(this.planejamento).then(planejamento=>{
                this.planejamento = planejamento
                this.necessidadeCrud.recarregarAlguns(planejamento.necessidades).then(necessidades => {
                    this.items = necessidades
                    let consultas: Consulta[] = []
                    for(let necessidade of necessidades){
                        for(let consulta of necessidade.consultas){
                            consultas.push(consulta)
                        }
                    }
                    this.consultaCrud.recarregarAlguns(consultas).then(consultas => {
                        let consultasId: {[id: number]: Array<number>;} = {}
                        for(let consulta of consultas){
                            if(typeof(consultasId[(consulta.necessidade || {id:0}).id])==='undefined'){
                                consultasId[(consulta.necessidade || {id:0}).id]=[]
                            }
                            consultasId[(consulta.necessidade || {id:0}).id].push(
                                (consulta.supermercado || {id:0}).id
                            )
                        }
                        this.supermercadoCrud.recarregarAlguns(this.planejamento.supermercados).then(supermercados=>{
                            let promises: Promise<any>[] = []
                            for(let necessidade of necessidades){
                                for(let supermercado of supermercados){
                                    if(
                                        typeof(consultasId[necessidade.id])==='undefined'
                                        ||
                                        consultasId[necessidade.id].indexOf(supermercado.id)===-1
                                    ){
                                        let consulta: Consulta = this.consultaCrud.criar()
                                        consulta.necessidade = necessidade
                                        consulta.supermercado = supermercado
                                        consulta.preco = 0
                                        promises.push(this.consultaCrud.salvar(consulta))
                                    }
                                }
                            }
                            Promise.all(promises).then(resolve,reject)
                        },reject)
                    },reject)
                },reject)
            },reject)
        })
    }
}
