import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Consulta } from '../../entities/Consulta';
import { Planejamento } from '../../entities/Planejamento';
import { Relatorios } from '../../providers/Relatorios.service';

import { PageRelatorioExibe } from '../RelatorioExibe/main'

@Component({
    selector: 'page-inicio',
    templateUrl: 'main.html'
})
export class PageRelatorioEscolhe {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public relatorioService: Relatorios,
    ){
        this.planejamento = this.navParams.get('sujeito')
    }
    planejamento: Planejamento;
    menorPrecoMedio(){
        this.relatorioService.menorPrecoMedio(
            this.planejamento
        ).then(
            (consultas:Consulta[]) => {
                this.navCtrl.push(PageRelatorioExibe,{
                    titulo: 'O menor preço médio',
                    consultas: consultas,
                })
            }
        )
    }
    menorPrecoUm(){
        this.relatorioService.menorPrecoEmUmSupermercado(
            this.planejamento
        ).then(
            (consultas:Consulta[]) => {
                this.navCtrl.push(PageRelatorioExibe,{
                    titulo: 'A lista mais barata',
                    consultas: consultas,
                })
            }
        )
    }
    menorPrecoTodos(){
        this.relatorioService.menorPrecoEmTodosSupermercados(
            this.planejamento
        ).then(
            (consultas:Consulta[]) => {
                this.navCtrl.push(PageRelatorioExibe,{
                    titulo: 'O menor orçamento',
                    consultas: consultas,
                })
            }
        )
    }
}
