import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLiteObject } from "@ionic-native/sqlite";
import { Product } from "../../models/class/Product";

/*
  Generated class for the DaoUnit provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DaoProduct implements IDao {

    db: SQLiteObject;

    setDatabase(db: SQLiteObject) {
        if ((typeof (this.db) == 'undefined')) {
            console.log(db);
            this.db = db;
        }
    }

    constructor(public http: Http) {
    }

    create(element: Product) {
        let sql = 'INSERT INTO Product(sName) VALUES(?)';
        return this.db.executeSql(sql, [element.sName]);
    }

    createTable() {
        let sql = 'CREATE TABLE IF NOT EXISTS Product(nId INTEGER PRIMARY KEY AUTOINCREMENT,sName TEXT)';
        return this.db.executeSql(sql, []);
    }

    delete(element: Product) {
        let sql = 'DELETE FROM Product WHERE nId=?';
        return this.db.executeSql(sql, [element.nId]);
    }

    getAll() {
        let sql = 'SELECT * FROM Product';
        return this.db.executeSql(sql, [])
            .then(response => {
                let Products = [];
                for (let index = 0; index < response.rows.length; index++) {
                    Products.push(response.rows.item(index));
                }
                return Promise.resolve(Products);
            })
            .catch(error => Promise.reject(error));
    }

    update(element: Product) {
        let sql = 'UPDATE Product SET sDescription=? WHERE nId=?';
        return this.db.executeSql(sql, [element.sName, element.nId]);
    }

}
