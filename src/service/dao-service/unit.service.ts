import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { IDao } from "../../models/interfaces/IDao";
import { Unit } from "../../models/class/Unit";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UnitService implements IDao {

    // public properties

    db: SQLite = null;
    storage: SQLiteObject;
    constructor() {
        this.db = new SQLite();
    }

    // public methods

    create(element: Unit): any {
        this.openDatabase().then((db: SQLiteObject) => {
            db.executeSql('INSERT INTO Unit(sDescription,sInitials) VALUES(?,?)', [element.sDescription, element.sInitials]).then((data) => { return Promise.resolve(data) })
                .catch(e => { element = null; });
        })
    }

    createTable() {
        this.openDatabase().then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS Unit(nId INTEGER PRIMARY KEY AUTOINCREMENT, sInitials TEXT , sDescription TEXT)', {})
                .then((data) => { return Promise.resolve(data) })
                .catch(e => console.log(e));
        })
    }

    delete(element: Unit) {
        this.openDatabase().then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM Unit WHERE nId = ?', [element.nId]).then((data) => {
                let elements: Unit[] = [];
                this.getAll(elements);
                console.log("data response" + data);

                return Promise.resolve(data)
            })
                .catch(e => console.log(e));
        })
    }

    getAll(elements: Unit[]) {
        this.openDatabase().then((db: SQLiteObject) => {
            console.log('executou');
            db.executeSql('SELECT * FROM Unit', {})
                .then((response) => {
                    console.log('response: ' + response);
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



    update(element: Unit): any {
        this.openDatabase().then((db: SQLiteObject) => {
            db.executeSql('UPDATE Unit SET sInitials=?, sDescription=? WHERE nId=?', [element.sInitials, element.sDescription, element.nId]).then((data) => { return Promise.resolve(data) })
                .catch(e => console.log(e));
        })
    }
}