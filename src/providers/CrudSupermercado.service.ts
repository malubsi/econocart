import { Injectable } from '@angular/core';

import { Supermercado } from '../entities/Supermercado';
import { OrmDatabase, Repository, QueryBuilder } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudSupermercado extends CrudService<Supermercado>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    criar(): Supermercado{
        return new Supermercado();
    }

    _getType(){return Supermercado}

    _seleciona(repository:Repository<Supermercado>):QueryBuilder<Supermercado>{
        return repository
        .createQueryBuilder("tbl")
        .leftJoinAndSelect("tbl.planejamentos", "planejamentos")
        .leftJoinAndSelect("tbl.consultas", "consultas")
    }

    _ordena(query: QueryBuilder<Supermercado>): QueryBuilder<Supermercado>{
        return query.orderBy("tbl.nome")
    }
}
