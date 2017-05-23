import { Injectable } from '@angular/core';

import { UnidadeMedida } from '../entities/UnidadeMedida';
import { OrmDatabase, Repository, QueryBuilder } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudUnidadeMedida extends CrudService<UnidadeMedida>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    criar(): UnidadeMedida{
        return new UnidadeMedida();
    }

    _getType(){return UnidadeMedida}

    _seleciona(repository:Repository<UnidadeMedida>):QueryBuilder<UnidadeMedida>{
        return repository
        .createQueryBuilder("tbl")
        .leftJoinAndSelect("tbl.produtos", "produtos")
    }

    _ordena(query: QueryBuilder<UnidadeMedida>): QueryBuilder<UnidadeMedida>{
        return query.orderBy("tbl.nome")
    }
}
