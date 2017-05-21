import { Injectable } from '@angular/core';

import { UnidadeMedida } from '../entities/UnidadeMedida';
import { OrmDatabase } from '../persistence/OrmDatabase.service';
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
}
