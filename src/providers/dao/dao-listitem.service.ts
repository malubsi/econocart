import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLite } from "@ionic-native/sqlite";
import { ListItem } from "../../models/class/ListItem";
import { DaoAbstract } from "./dao-abstract.service";
import { DaoProduct } from "./dao-product.service";

/*
Generated class for the DaoUnit provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DaoListItem extends DaoAbstract implements IDao {

    constructor(_sqlite: SQLite, private _daoProduct: DaoProduct) {
        super(_sqlite)
    }

    public create(element: ListItem) {
        let sql = 'INSERT INTO ListItem(sName,sDescription) VALUES(?,?)';
        return this.getDatabase().executeSql(sql, [element.sName, element.sDescription]);
    }

    createAux(element: ListItem) {
        let sql = 'INSERT INTO ListItemProducts(nIdListItem,nIdProduct) VALUES(?,?)';

        for (let products of element.iListProduct) {
            this.getDatabase().executeSql(sql, [element.nId, products.nId]);
        }

    }

    createTable() {
        let sql = 'CREATE TABLE IF NOT EXISTS ListItem(nId INTEGER PRIMARY KEY AUTOINCREMENT,sName TEXT,sDescription TEXT)';
        return this.getDatabase().executeSql(sql, []);
    }

    createTableAux() {
        let sql = 'CREATE TABLE IF NOT EXISTS ListItemProducts(nIdListItem Integer,nIdProduct Integer)';
        return this.getDatabase().executeSql(sql, []);
    }

    delete(element: ListItem) {
        let sql = 'DELETE FROM ListItem WHERE nId=?';
        return this.getDatabase().executeSql(sql, [element.nId]);
    }
    deleteAux(element: ListItem) {
        let sql = 'DELETE FROM ListItemProducts WHERE nIdListItem=?';
        return this.getDatabase().executeSql(sql, [element.nId]);
    }
    getAll() {
        let sql = 'SELECT * FROM ListItem';
        return this.getDatabase().executeSql(sql, [])
        .then(response => {
            let listItens = [];
            for (let index = 0; index < response.rows.length; index++) {
                let item = (response.rows.item(index));
                let itemO = new ListItem(item.sDescription, item.nId, item.sName);
                listItens.push(itemO);
            }
            listItens.forEach(element => {
                this.getAllAuxById(element.nId).then((response) => {
                    let ListItemProducts = [];
                    for (let index = 0; index < response.length; index++) {
                        ListItemProducts.push(response[index]);
                    }
                    ListItemProducts.forEach(node => {
                        this._daoProduct.getById(node.nIdProduct).then((response) => {
                            element.iListProduct.push(response);
                        });
                    });
                });
            });
            return Promise.resolve(listItens);
        })
        .catch(error => Promise.reject(error));
    }

    getAllAux() {
        let sql = 'SELECT * FROM ListItemProducts';
        return this.getDatabase().executeSql(sql, [])
        .then(response => {
            let ListItemProducts = [];
            for (let index = 0; index < response.rows.length; index++) {
                ListItemProducts.push(response.rows.item(index));
            }
            return Promise.resolve(ListItemProducts);
        })
        .catch(error => Promise.reject(error));
    }

    getAllAuxById(id: Number) {
        let sql = 'SELECT * FROM ListItemProducts Where nIdListItem =?';
        return this.getDatabase().executeSql(sql, [id])
        .then(response => {
            let ListItemProducts = [];
            for (let index = 0; index < response.rows.length; index++) {
                ListItemProducts.push(response.rows.item(index));
            }
            return Promise.resolve(ListItemProducts);
        })
        .catch(error => Promise.reject(error));
    }


    update(element: ListItem) {
        let sql = 'UPDATE ListItem SET sName=?,sDescription=? WHERE nId=?';
        return this.getDatabase().executeSql(sql, [element.sName, element.sDescription, element.nId]);
    }

    deleteById(id: number){
        let sql = 'DELETE FROM ListItem WHERE nId=?'
        return this.getDatabase().executeSql(sql, [])
    }

    getById(id: number){
        let sql = 'SELECT * FROM ListItem WHERE nId=?'
        return this.getDatabase().executeSql(sql, [])
    }
}
