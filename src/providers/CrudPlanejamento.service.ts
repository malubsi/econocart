import { Injectable } from '@angular/core';

import { Planejamento } from '../entities/Planejamento';
import { OrmDatabase, Repository } from '../persistence/OrmDatabase.service';
import { CrudService } from '../providers/_crudService';

@Injectable()
export class CrudPlanejamento extends CrudService<Planejamento>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
        super(ormDatabase);
    }

    getType(){return Planejamento}

    criar(): Planejamento{
        return new Planejamento();
    }
    _listar(repository:Repository<Planejamento>):Promise<Planejamento[]>{
        return new Promise<Planejamento[]>((resolve, reject) => {
            resolve(repository
                .createQueryBuilder("tbl")
                .leftJoinAndSelect("tbl.necessidades", "necessidades")
                .leftJoinAndSelect("tbl.supermercados", "supermercados")
                .getMany()
            );
        })
    }
}
