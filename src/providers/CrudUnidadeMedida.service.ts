import { Injectable } from '@angular/core';

import { UnidadeMedida } from '../entities/UnidadeMedida';
import { OrmDatabase, Repository } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudUnidadeMedida extends CrudService<UnidadeMedida>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    getType(){return UnidadeMedida}

    criar(): UnidadeMedida{
        return new UnidadeMedida();
    }
    _listar(repository:Repository<UnidadeMedida>):Promise<UnidadeMedida[]>{
        return new Promise<UnidadeMedida[]>((resolve, reject) => {
            resolve(repository
                .createQueryBuilder("tbl")
                .leftJoinAndSelect("tbl.produtos", "produtos")
                .getMany()
            );
        })
    }
}
