import { Injectable } from '@angular/core';

import { OrmDatabase } from '../persistence/OrmDatabase.service';
import { Planejamento } from '../entities/Planejamento';
import { Supermercado } from '../entities/Supermercado';
import { Consulta } from '../entities/Consulta';

@Injectable()
export class Relatorios{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        return
    }
    menorPrecoMedio(planejamento: Planejamento):Promise<Supermercado>{
        return
    }
    menorPrecoEmUmSupermercado(planejamento: Planejamento):Promise<Array<Consulta>>{
        return
    }
    menorPrecoEmTodosSupermercados(planejamento: Planejamento):Promise<Array<Consulta>>{
        return
    }
}
