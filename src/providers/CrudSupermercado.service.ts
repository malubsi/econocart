import { Injectable } from '@angular/core';

import { Supermercado } from '../entities/Supermercado';
import { OrmDatabase, Repository } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudSupermercado extends CrudService<Supermercado>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    getType(){return Supermercado}

    criar(): Supermercado{
        return new Supermercado();
    }
    _listar(repository:Repository<Supermercado>):Promise<Supermercado[]>{
        return new Promise<Supermercado[]>((resolve, reject) => {
            resolve(repository
                .createQueryBuilder("tbl")
                .leftJoinAndSelect("tbl.planejamentos", "planejamentos")
                .leftJoinAndSelect("tbl.consultas", "consultas")
                .getMany()
            );
        })
    }
}
