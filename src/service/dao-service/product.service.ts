import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { IDao } from "../../models/interfaces/IDao";
import { Observable } from "rxjs/Observable";
import { Product } from "../../models/class/Product";

@Injectable()
export class ProductService implements IDao {

    // public properties

    db: SQLite = null;
    storage: SQLiteObject;
    constructor() {
        this.db = new SQLite();
    }

    // public methods

    create(element: Product): any {
        this.openDatabase().then((db: SQLiteObject) => {
            db.executeSql('INSERT INTO Product(sDescription) VALUES(?)', [element.sDescription]).then((data) => { return Promise.resolve(data) })
                .catch(e => { element = null; });
        })
    }

    createTable() {
        this.openDatabase().then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS Product(nId INTEGER PRIMARY KEY AUTOINCREMENT,sDescription TEXT)', {})
                .then((data) => { return Promise.resolve(data) })
                .catch(e => console.log(e));
        })
    }

    delete(element: Product) {
        this.openDatabase().then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM Product WHERE nId = ?', [element.nId]).then((data) => {
                let elements: Product[] = [];
                this.getAll(elements);
                return Promise.resolve(data)
            })
                .catch(e => console.log(e));
        })
    }

    getAll(elements: Product[]) {
        this.openDatabase().then((db: SQLiteObject) => {
            db.executeSql('SELECT * FROM Product', {})
                .then((response) => {
                    for (let index = 0; index < response.rows.length; index++) {
                        elements.push(response.rows.item(index));
                    }

                })
                .catch(e => console.log(e));
        })
    }

    openDatabase() {
        return this.db.create({
            name: 'econocart.db',
            location: 'default' // the location field is required
        });
    }



    update(element: Product): any {
        this.openDatabase().then((db: SQLiteObject) => {
            db.executeSql('UPDATE Product SET sDescription=? WHERE nId=?', [element.sDescription, element.nId]).then((data) => { return Promise.resolve(data) })
                .catch(e => console.log(e));
        })
    }
}