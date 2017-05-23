import { Injectable } from '@angular/core';

import { Produto } from '../entities/Produto';
import { OrmDatabase, Repository, QueryBuilder } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudProduto extends CrudService<Produto>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    criar(): Produto{
        return new Produto();
    }

    _getType(){return Produto}

    _seleciona(repository:Repository<Produto>):QueryBuilder<Produto>{
        return repository
        .createQueryBuilder("tbl")
        .leftJoinAndSelect("tbl.unidadeMedida", "unidadeMedida")
        .leftJoinAndSelect("tbl.necessidade", "necessidade")
    }

    _ordena(query: QueryBuilder<Produto>): QueryBuilder<Produto>{
        return query.orderBy("tbl.nome")
    }
}
