import { Injectable } from '@angular/core';

import { createConnection, getConnection } from 'ionic-typeorm'
import { Connection } from 'ionic-typeorm'

import { Consulta } from '../entities/Consulta';
import { Necessidade } from '../entities/Necessidade';
import { Planejamento } from '../entities/Planejamento';
import { Produto } from '../entities/Produto';
import { Supermercado } from '../entities/Supermercado';
import { UnidadeMedida } from '../entities/UnidadeMedida';

@Injectable()
export class OrmDatabase{
    getConnection():Promise<Connection>{
        return new Promise<Connection>((resolve, reject)=>{
            try{
                return resolve(getConnection());
            }catch(e){
                createConnection({
                    driver: {
                        type: "cordova-sqlite",
                        database: "masterdb",
                        extra: {
                            version: "1.0",
                            description: "master database"
                        }
                    },
                    entities: [
                        UnidadeMedida,
                        Produto,
                        Necessidade,
                        Planejamento,
                        Consulta,
                        Supermercado,
                    ],
                    logging: {
                        logFailedQueryError: true,
                        logQueries: true,
                        logSchemaCreation: true,
                        logOnlyFailedQueries: true
                    },
                    autoSchemaSync: true,
                }).then(connection => {
                    return resolve(connection);
                }, () => {
                    createConnection({
                        driver: {
                            type: "websql",
                            database: "masterdb",
                            extra: {
                                version: "1.0",
                                description: "master database",
                                size: 2 * 1024 * 1024
                            }
                        },
                        entities: [
                            UnidadeMedida,
                            Produto,
                            Necessidade,
                            Planejamento,
                            Consulta,
                            Supermercado,
                        ],
                        logging: {
                            logFailedQueryError: true,
                            logQueries: true,
                            logSchemaCreation: true,
                            logOnlyFailedQueries: true
                        },
                        autoSchemaSync: true,
                    }).then(connection => {
                        return resolve(connection);
                    }, reject)
                })
            }
        })
    }
}
