import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLite } from "@ionic-native/sqlite";
import { DaoAbstract } from "./dao-abstract.service";
import { Market } from "../../models/class/Market";

/*
Generated class for the DaoUnit provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DaoMarket extends DaoAbstract implements IDao {

    public getSchema(){return [];}
    
    constructor(_sqlite: SQLite) {
        super(_sqlite)
    }

    create(element: Market) {
        let sql = 'INSERT INTO Market(sName) VALUES(?)';
        return this.getDatabase().executeSql(sql, [element.sName]);
    }

    createTable() {
        let sql = 'CREATE TABLE IF NOT EXISTS Market(nId INTEGER PRIMARY KEY AUTOINCREMENT,sName TEXT)';
        return this.getDatabase().executeSql(sql, []);
    }

    delete(element: Market) {
        let sql = 'DELETE FROM Market WHERE nId=?';
        return this.getDatabase().executeSql(sql, [element.nId]);
    }

    getAll() {
        let sql = 'SELECT * FROM Market';
        return this.getDatabase().executeSql(sql, [])
        .then(response => {
            let markets = [];
            for (let index = 0; index < response.rows.length; index++) {
                markets.push(response.rows.item(index));
            }
            return Promise.resolve(markets);
        })
        .catch(error => Promise.reject(error));
    }

    update(element: Market) {
        let sql = 'UPDATE Market SET sName=? WHERE nId=?';
        return this.getDatabase().executeSql(sql, [element.sName, element.nId]);
    }

    deleteById(id: number){
        let sql = 'DELETE FROM Market WHERE nId=?'
        return this.getDatabase().executeSql(sql, [])
    }

    getById(id: number){
        let sql = 'SELECT * FROM Market WHERE nId=?'
        return this.getDatabase().executeSql(sql, [])
    }

}
