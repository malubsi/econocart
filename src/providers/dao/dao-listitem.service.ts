import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLiteObject } from "@ionic-native/sqlite";
import { ListItem } from "../../models/class/ListItem";
import { DaoProduct } from "./dao-product.service";


/*
  Generated class for the DaoUnit provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DaoListItem implements IDao {

    db: SQLiteObject;

    setDatabase(db: SQLiteObject) {
        if ((typeof (this.db) == 'undefined')) {
            console.log(db);
            this.db = db;
        }
    }

    constructor(public http: Http, private _daoProduct: DaoProduct) {
    }

    create(element: ListItem) {
        let sql = 'INSERT INTO ListItem(sName,sDescription) VALUES(?,?)';
        return this.db.executeSql(sql, [element.sName, element.sDescription]);
    }

    createAux(element: ListItem) {
        let sql = 'INSERT INTO ListItemProducts(nIdListItem,nIdProduct) VALUES(?,?)';

        for (let products of element.iListProduct) {
            this.db.executeSql(sql, [element.nId, products.nId]);
        }

    }

    createTable() {
        let sql = 'CREATE TABLE IF NOT EXISTS ListItem(nId INTEGER PRIMARY KEY AUTOINCREMENT,sName TEXT,sDescription TEXT)';
        return this.db.executeSql(sql, []);
    }

    createTableAux() {
        let sql = 'CREATE TABLE IF NOT EXISTS ListItemProducts(nIdListItem Integer,nIdProduct Integer)';
        return this.db.executeSql(sql, []);
    }

    delete(element: ListItem) {
        let sql = 'DELETE FROM ListItem WHERE nId=?';
        return this.db.executeSql(sql, [element.nId]);
    }
    deleteAux(element: ListItem) {
        let sql = 'DELETE FROM ListItemProducts WHERE nIdListItem=?';
        return this.db.executeSql(sql, [element.nId]);
    }
    getAll() {
        let sql = 'SELECT * FROM ListItem';
        return this.db.executeSql(sql, [])
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
        return this.db.executeSql(sql, [])
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
        return this.db.executeSql(sql, [id])
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
        return this.db.executeSql(sql, [element.sName, element.sDescription, element.nId]);
    }

}
