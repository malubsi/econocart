import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLite } from "@ionic-native/sqlite";
import { DaoAbstract } from "./dao-abstract.service";
import { Unit } from "../../models/class/Unit";

/*
Generated class for the DaoUnit provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DaoUnit extends DaoAbstract implements IDao {

    constructor(_sqlite: SQLite) {
        super(_sqlite)
    }

    create(element: Unit) {
        let sql = 'INSERT INTO Unit(sDescription,sInitials) VALUES(?,?)';
        return this.getDatabase().executeSql(sql, [element.sDescription, element.sInitials]);
    }

    createTable() {
        let sql = 'CREATE TABLE IF NOT EXISTS Unit(nId INTEGER PRIMARY KEY AUTOINCREMENT,sDescription TEXT, sInitials TEXT)';
        return this.getDatabase().executeSql(sql, []);
    }

    delete(element: Unit) {
        let sql = 'DELETE FROM Unit WHERE nId=?';
        return this.getDatabase().executeSql(sql, [element.nId]);
    }

    getAll() {
        let sql = 'SELECT * FROM Unit';
        return this.getDatabase().executeSql(sql, [])
        .then(response => {
            let units = [];
            for (let index = 0; index < response.rows.length; index++) {
                units.push(response.rows.item(index));
            }
            return Promise.resolve(units);
        })
        .catch(error => Promise.reject(error));
    }

    update(element: Unit) {
        let sql = 'UPDATE Unit SET sDescription=?, sInitials=? WHERE nId=?';
        return this.getDatabase().executeSql(sql, [element.sDescription, element.sInitials, element.nId]);
    }

    deleteById(id: number){
        let sql = 'DELETE FROM Unit WHERE nId=?'
        return this.getDatabase().executeSql(sql, [])
    }

    getById(id: number){
        let sql = 'SELECT * FROM Unit WHERE nId=?'
        return this.getDatabase().executeSql(sql, [])
    }

}
