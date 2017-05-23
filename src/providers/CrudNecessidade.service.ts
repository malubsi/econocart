import { Injectable } from '@angular/core';

import { Necessidade } from '../entities/Necessidade';
import { OrmDatabase, Repository, QueryBuilder } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudNecessidade extends CrudService<Necessidade>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    criar(): Necessidade{
        return new Necessidade();
    }

    _getType(){return Necessidade}

    _seleciona(repository:Repository<Necessidade>):QueryBuilder<Necessidade>{
        return repository
        .createQueryBuilder("tbl")
        .leftJoinAndSelect("tbl.produto", "produto")
        .leftJoinAndSelect("tbl.consultas", "consultas")
        .leftJoinAndSelect("tbl.planejamento", "planejamento")
    }

    _ordena(query: QueryBuilder<Necessidade>): QueryBuilder<Necessidade>{
        return query.orderBy("tbl.quantidade");
    }
}
