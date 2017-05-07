import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLiteObject } from "@ionic-native/sqlite";

/*
Generated class for the DaoUnit provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export abstract class DaoAbstract implements IDao {

    db: SQLiteObject;

    setDatabase(db: SQLiteObject) {
        if ((typeof(this.db) == 'undefined')) {
            console.log("setting "+String(db)+" from undefined");
            this.db = db;
        }
    }

    public abstract createTable():Promise<any>;
    public abstract create(element: any):Promise<any>;
    public abstract update(element: any):Promise<any>;
    public abstract delete(element: any):Promise<any>;
    public abstract deleteById(id: number):Promise<any>;
    public abstract getAll():Promise<any>;
    public abstract getById(id: number):Promise<any>;

}
