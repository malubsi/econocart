import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { SQLjsObject } from "../SQLjsDriver/SQLjs.service";

/*
Generated class for the DaoUnit provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export abstract class DaoAbstract implements IDao {

    _db: SQLiteObject;

    setDatabase(db: SQLiteObject) {
        this._db = db;
    }

    getDatabase(): SQLiteObject{
        if(typeof(this._db)==='undefined'){
            return DaoAbstract.getMockDatabase();
        }else{
            return this._db;
        }
    }

    get db(): SQLiteObject{
        return this.getDatabase()
    }

    static mockDatabase = null;

    static getMockDatabase(){
        if(DaoAbstract.mockDatabase === null){
            DaoAbstract.mockDatabase = new SQLjsObject()
        }
        return DaoAbstract.mockDatabase;
    }

    constructor(_sqlite: SQLite) {
        _sqlite.create({
            name: 'econocart.db',
            location: 'default'
        }).then((db) => {
            this.setDatabase(db)
        }).catch(error => {
            this.setDatabase(DaoAbstract.getMockDatabase());
        });
    }

    public abstract getSchema():Array<TableSchema>;

    private sqlCreateTable(tableSchema:TableSchema, built: Array<string> = null):Array<string>{
        if(built === null){
            built = new Array()
        }
        if(tableSchema.fields === null){
            return null;
        }
        let fields: Array<string> = new Array<string>()
        fields.push('nId SERIAL PRIMARY KEY')
        for(let tableField of tableSchema.fields){
            if(tableField.foreign){
                this.sqlCreateTable(tableField.references, built)
                let f:string = tableField.name+' INTEGER REFERENCES '+tableField.references.name+'(nId)'
                fields.push(f)
            }else{
                let f:string = tableField.name+' '+tableField.type
                fields.push(f)
            }
        }
        built.push('CREATE TABLE IF NOT EXISTS '+tableSchema.name+'('+fields.join(', ')+')')
        return built;
    };

    public createTable():Promise<any>{
        let sqls: Array<string> = new Array();
        for(let schema of this.getSchema()){
            this.sqlCreateTable(schema,sqls);
        }
        return new Promise((resolve, reject) => {
            for(let sql of sqls){
                this.db.executeSql(sql,[])
            }
            resolve()
        });
    };

    public create(element: any):Promise<any>{
        return null;
    };
    public update(element: any):Promise<any>{
        return null;
    };
    public delete(element: any):Promise<any>{
        return null;
    };
    public deleteById(id: number):Promise<any>{
        return null;
    };
    public getAll():Promise<any>{
        return null;
    };
    public getById(id: number):Promise<any>{
        return null;
    };

}

export interface TableField{
    /* Own attribute */
    name:string,
    type:string,
    /* Foreign key */
    foreign:boolean,
    references:TableSchema,
}

export interface TableSchema{
    name: string,
    fields: Array<TableField>,
}
