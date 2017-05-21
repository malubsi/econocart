import { Injectable } from '@angular/core';

import { Necessidade } from '../entities/Necessidade';
import { OrmDatabase, Repository } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudNecessidade extends CrudService<Necessidade>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    getType(){return Necessidade}

    criar(): Necessidade{
        return new Necessidade();
    }
    _listar(repository:Repository<Necessidade>):Promise<Necessidade[]>{
        return new Promise<Necessidade[]>((resolve, reject) => {
            resolve(repository
                .createQueryBuilder("tbl")
                .leftJoinAndSelect("tbl.produtos", "produtos")
                .leftJoinAndSelect("tbl.consultas", "consultas")
                .leftJoinAndSelect("tbl.planejamento", "planejamento")
                .getMany()
            );
        })
    }
}
