import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { Consulta } from '../../entities/Consulta';
import { Produto } from '../../entities/Produto';
import { Necessidade } from '../../entities/Necessidade';
import { CrudConsulta } from '../../providers/CrudConsulta.service';
import { CrudProduto } from '../../providers/CrudProduto.service';
import { CrudNecessidade } from '../../providers/CrudNecessidade.service';
import { PageLista } from '../generico_lista/main';
import { Chart } from 'chart.js';

Date.prototype.toString = ()=>'';

@Component({
    selector: 'page-lista',
    templateUrl: '../generico_lista/main.html'
})
export class PageRelatorioHistoricoPrecos extends PageLista<Consulta> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public consultaCrud: CrudConsulta,
        public produtoCrud: CrudProduto,
        public necessidadeCrud: CrudNecessidade,
    ){
        super(
            navCtrl,
            actionSheetCtrl,
            alert,
            toast,
            loadingCtrl,
            consultaCrud
        );
        this.produto = this.navParams.get('sujeito')
        this.contextoExibe['excluir'] = false
        this.contextoExibe['editar'] = false
        this.hasChart = true
        this.textos['titulo']+= this.produto.nome
        this.textos['tituloGrafico']+= this.produto.nome
        this.posTextoPequeno = true
    }
    refreshList() {
        this.mostraCarregando();
        this.produtoCrud.recarregarUm(this.produto).then((produto: Produto) => {
            this.necessidadeCrud.recarregarAlguns(produto.necessidades).then((necessidades: Necessidade[]) => {
                let consultas: Consulta[] = []
                for(let necessidade of necessidades){
                    for(let consulta of necessidade.consultas){
                        if(consulta.preco>0){
                            consultas.push(consulta)
                        }
                    }
                }
                this.consultaCrud.recarregarAlguns(consultas).then((consultas: Consulta[]) => {
                    this.items = this.ordenaExibicao(consultas);
                    try{
                        this.refreshChart()
                    }catch(e){}
                    this.escondeCarregando()
                })
            })
        });
    }
    public produto: Produto;
    public items: Consulta[] = new Array();
    public icone: string = "cash";
    public textos: object = {
        "titulo": "Preços de ",
        "tituloGrafico": "Histórico de preços de ",
        "adicionar": "",
    };
    public texto(item: Consulta):string{ return ''+item.preco; };
    public posTexto(item: Consulta):string{
        return (
            item.supermercado
            ?
            '('+item.supermercado.nome+') '
            :
            ''
        )+
        item.modificacao.toLocaleString('pt-BR');
    };
    public abreEdicao(item: Consulta):void{};
    public ordenaExibicao(items: Consulta[]):Consulta[]{
        items.sort((a, b) => {
            if (a.modificacao > b.modificacao) { return 1; }
            if (a.modificacao < b.modificacao) { return -1; }
            return 0;
        })
        return items;
    }
    ionViewDidLoad(){
        this.refreshChart();
    }
    refreshChart(){
        let labels: Date[] = []
        let data: {[id: string]: {x: Date, y:number}[]} = {}
        let mercados: string[] = []
        for(let consulta of this.items){
            let nome: string = (consulta.supermercado || {nome:'<deletado>'}).nome
            if(typeof(labels[nome]) === 'undefined'){
                labels[nome] = []
                data[nome] = []
                mercados.push(nome)
            }
            labels.push(consulta.modificacao)
            data[nome].push({x: consulta.modificacao, y: consulta.preco})
        }
        let datasets = []
        let mercadoIndice = 0
        let mercadoTotal = mercados.length
        for(let mercado of mercados){
            let rot = (180+((360/mercadoTotal)*mercadoIndice))%360
            datasets.push({
                label: mercado,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "hsla("+rot+", 48%, 52%, 0.4)",
                borderColor: "hsla("+rot+", 48%, 52%, 1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "hsla("+rot+", 48%, 52%, 1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "hsla("+rot+", 48%, 52%, 1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data[mercado],
                spanGaps: false,
            })
            mercadoIndice+=1
        }
        this.chartObject = new Chart(this.chartCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets,
            }
        })
    }
}
