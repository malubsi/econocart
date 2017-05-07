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

    public abstract createTable():Promise<any>;
    public abstract create(element: any):Promise<any>;
    public abstract update(element: any):Promise<any>;
    public abstract delete(element: any):Promise<any>;
    public abstract deleteById(id: number):Promise<any>;
    public abstract getAll():Promise<any>;
    public abstract getById(id: number):Promise<any>;

}
