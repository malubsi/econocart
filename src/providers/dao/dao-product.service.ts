import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLite } from "@ionic-native/sqlite";
import { DaoAbstract } from "./dao-abstract.service";
import { Product } from "../../models/class/Product";

/*
Generated class for the DaoUnit provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DaoProduct extends DaoAbstract implements IDao {

    constructor(_sqlite: SQLite) {
        super(_sqlite)
    }

    create(element: Product) {
        let sql = 'INSERT INTO Product(sName) VALUES(?)';
        return this.getDatabase().executeSql(sql, [element.sName]);
    }

    createTable() {
        let sql = 'CREATE TABLE IF NOT EXISTS Product(nId INTEGER PRIMARY KEY AUTOINCREMENT,sName TEXT)';
        return this.getDatabase().executeSql(sql, []);
    }

    delete(element: Product) {
        let sql = 'DELETE FROM Product WHERE nId=?';
        return this.getDatabase().executeSql(sql, [element.nId]);
    }

    getAll() {
        let sql = 'SELECT * FROM Product';
        return this.getDatabase().executeSql(sql, [])
        .then(response => {
            let Products = [];
            for (let index = 0; index < response.rows.length; index++) {
                Products.push(response.rows.item(index));
            }
            return Promise.resolve(Products);
        })
        .catch(error => Promise.reject(error));
    }

    getById(id: number) {
        let sql = 'SELECT * FROM Product where nId = ?';
        return this.getDatabase().executeSql(sql, [id])
        .then(response => {
            let product;
            for (let index = 0; index < response.rows.length; index++) {
                product = (response.rows.item(index));
            }
            return Promise.resolve(product);
        })
        .catch(error => Promise.reject(error));
    }

    update(element: Product) {
        let sql = 'UPDATE Product SET sName=? WHERE nId=?';
        return this.getDatabase().executeSql(sql, [element.sName, element.nId]);
    }

    deleteById(id: number){
        let sql = 'DELETE FROM Product WHERE nId=?'
        return this.getDatabase().executeSql(sql, [])
    }
}
