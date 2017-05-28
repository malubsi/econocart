import { Injectable } from '@angular/core';

import { OrmDatabase } from '../persistence/OrmDatabase.service';

import { CrudConsulta } from './CrudConsulta.service';
import { CrudSupermercado } from './CrudSupermercado.service';
import { CrudNecessidade } from './CrudNecessidade.service';
import { CrudPlanejamento } from './CrudPlanejamento.service';

import { Planejamento } from '../entities/Planejamento';
import { Supermercado } from '../entities/Supermercado';
import { Necessidade } from '../entities/Necessidade';
import { Consulta } from '../entities/Consulta';

@Injectable()
export class Relatorios{
    constructor(
        public ormDatabase: OrmDatabase,
        public consultaCrud: CrudConsulta,
        public supermercadoCrud: CrudSupermercado,
        public necessidadeCrud: CrudNecessidade,
        public planejamentoCrud: CrudPlanejamento,
    ){
        return
    }
    _menorUm(planejamento: Planejamento, orderBy: string):Promise<Consulta[]>{
        return new Promise<Consulta[]>((resolve, reject) => {
            this.planejamentoCrud.recarregarUm(planejamento).then(planejamento => {
                this.ormDatabase.getConnection().then(connection =>{
                    this.consultaCrud._seleciona(connection.getRepository(Consulta))
                    .leftJoinAndSelect("necessidade.planejamento", "planejamento")
                    .where("tbl.preco <> 0")
                    .andWhere("planejamento.id = "+planejamento.id)
                    .addGroupBy("tbl.supermercado")
                    .orderBy(orderBy)
                    .having("SUM(tbl.preco) > 0")
                    .getMany()
                    .then((consultas:Consulta[])=>{
                        /* nota: esta consulta apenas contem os supermercados com o
                        /* preco medio em ordem crescente, foi decisao de codificacao
                        /* visando melhorar a performance desta consulta, que esta
                        /* O(nlogn), e seria pelo menos O(n2) caso feito da outra
                        /* forma; em contrapartida, virao mais queries a seguir,
                        /* menos complexas.
                        /**/
                        if(consultas.length <= 0){
                            reject('Preços não foram pesquisados')
                        }else{
                            let supermercado: Supermercado = consultas[0].supermercado
                            this.necessidadeCrud.recarregarAlguns(planejamento.necessidades)
                            .then(
                                (necessidades: Necessidade[]) => {
                                    let consultasARecarregar: Consulta[] = []
                                    for(let necessidade of necessidades){
                                        for(let consulta of necessidade.consultas){
                                            consultasARecarregar.push(consulta)
                                        }
                                    }
                                    this.consultaCrud.recarregarAlguns(consultasARecarregar).then(
                                        (consultas:Consulta[])=>{
                                            let selecionadas: Consulta[] = []
                                            for(let consulta of consultas){
                                                if(supermercado.id == consulta.supermercado.id){
                                                    selecionadas.push(consulta)
                                                }
                                            }
                                            resolve(selecionadas)
                                        },reject
                                    )
                                },reject
                            )
                        }
                    },reject)
                },reject)
            })
        })
    }
    menorPrecoMedio(planejamento: Planejamento):Promise<Consulta[]>{
        return this._menorUm(planejamento, "SUM(tbl.preco)/COUNT(*)")
    }
    menorPrecoEmUmSupermercado(planejamento: Planejamento):Promise<Consulta[]>{
        return this._menorUm(planejamento, "SUM(tbl.preco*necessidade.quantidade)")
    }
    menorPrecoEmTodosSupermercados(planejamento: Planejamento):Promise<Consulta[]>{
        return new Promise<Consulta[]>((resolve, reject) => {
            this.planejamentoCrud.recarregarUm(planejamento).then((planejamento:Planejamento) => {
                this.necessidadeCrud.recarregarAlguns(planejamento.necessidades).then((necessidades:Necessidade[])=>{
                    let consultasARecarregar: Consulta[] = []
                    for(let necessidade of necessidades){
                        for(let consulta of necessidade.consultas){
                            consultasARecarregar.push(consulta)
                        }
                    }
                    this.consultaCrud.recarregarAlguns(consultasARecarregar).then((consultas:Consulta[])=>{
                        let menorPreco: {[id:number]: {consulta:Consulta,preco:number};} = {}
                        for(let necessidade of necessidades){
                            menorPreco[necessidade.id] = {
                                consulta: null,
                                preco: 0,
                            }
                        }
                        for(let consulta of consultas){
                            if(
                                menorPreco[consulta.necessidade.id].consulta==null
                                ||
                                (
                                    menorPreco[consulta.necessidade.id].preco > consulta.preco * consulta.necessidade.quantidade
                                    &&
                                    consulta.preco > 0
                                )
                            ){
                                menorPreco[consulta.necessidade.id].consulta = consulta
                                menorPreco[consulta.necessidade.id].preco = consulta.preco * consulta.necessidade.quantidade
                            }
                        }
                        let comprar: Consulta[] = []
                        for(let necessidade of necessidades){
                            comprar.push(menorPreco[necessidade.id].consulta)
                            if(menorPreco[necessidade.id].consulta === null){
                                reject('Preços não foram pesquisados')
                                return
                            }
                        }
                        resolve(comprar)
                    },reject)
                },reject)
            },reject)
        })
    }
}
