import { Injectable } from '@angular/core';

import { Produto } from '../entities/Produto';
import { OrmDatabase, Repository } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudProduto extends CrudService<Produto>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    getType(){return Produto}

    criar(): Produto{
        return new Produto();
    }
    _listar(repository:Repository<Produto>):Promise<Produto[]>{
        return new Promise<Produto[]>((resolve, reject) => {
            resolve(repository
                .createQueryBuilder("tbl")
                .leftJoinAndSelect("tbl.unidadeMedida", "unidadeMedida")
                .leftJoinAndSelect("tbl.necessidade", "necessidade")
                .getMany()
            );
        })
    }
}
