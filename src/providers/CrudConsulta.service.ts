import { Injectable } from '@angular/core';

import { Consulta } from '../entities/Consulta';
import { OrmDatabase, Repository, QueryBuilder } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudConsulta extends CrudService<Consulta>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    criar(): Consulta{
        return new Consulta();
    }

    _getType(){return Consulta}

    _seleciona(repository:Repository<Consulta>):QueryBuilder<Consulta>{
        return repository
        .createQueryBuilder("tbl")
        .leftJoinAndSelect("tbl.supermercado", "supermercado")
        .leftJoinAndSelect("tbl.necessidade", "necessidade")
    }

    _ordena(query: QueryBuilder<Consulta>): QueryBuilder<Consulta>{
        return query.orderBy("tbl.modificacao")
    }
}
