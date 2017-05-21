import { Injectable } from '@angular/core';

import { Consulta } from '../entities/Consulta';
import { OrmDatabase, Repository } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudConsulta extends CrudService<Consulta>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    getType(){return Consulta}

    criar(): Consulta{
        return new Consulta();
    }
    _listar(repository:Repository<Consulta>):Promise<Consulta[]>{
        return new Promise<Consulta[]>((resolve, reject) => {
            resolve(repository
                .createQueryBuilder("tbl")
                .leftJoinAndSelect("tbl.supermercado", "supermercado")
                .leftJoinAndSelect("tbl.necessidade", "necessidade")
                .getMany()
            );
        })
    }
}
