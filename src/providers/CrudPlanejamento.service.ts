import { Injectable } from '@angular/core';

import { Planejamento } from '../entities/Planejamento';
import { OrmDatabase, Repository, QueryBuilder } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudPlanejamento extends CrudService<Planejamento>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    criar(): Planejamento{
        return new Planejamento();
    }

    _getType(){return Planejamento}

    _seleciona(repository:Repository<Planejamento>):QueryBuilder<Planejamento>{
        return repository
        .createQueryBuilder("tbl")
        .leftJoinAndSelect("tbl.necessidades", "necessidades")
        .leftJoinAndSelect("tbl.supermercados", "supermercados")
    }

    _ordena(query: QueryBuilder<Planejamento>): QueryBuilder<Planejamento>{
        return query.orderBy("tbl.modificacao")
    }
}
