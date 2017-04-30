import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IDao } from "../../models/IDao";
import { SQLiteObject } from "@ionic-native/sqlite";
import { Market } from "../../models/class/Market";

/*
  Generated class for the DaoUnit provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DaoMarket implements IDao {

  db: SQLiteObject;

  setDatabase(db: SQLiteObject) {
    if ((typeof (this.db) == 'undefined')) {
      console.log(db);
      this.db = db;
    }
  }

  constructor(public http: Http) {
  }

  create(element: Market) {
    let sql = 'INSERT INTO Market(sName) VALUES(?)';
    return this.db.executeSql(sql, [element.sName]);
  }

  createTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS Market(nId INTEGER PRIMARY KEY AUTOINCREMENT,sName TEXT)';
    return this.db.executeSql(sql, []);
  }

  delete(element: Market) {
    let sql = 'DELETE FROM Market WHERE nId=?';
    return this.db.executeSql(sql, [element.nId]);
  }

  getAll() {
    let sql = 'SELECT * FROM Market';
    return this.db.executeSql(sql, [])
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
    return this.db.executeSql(sql, [element.nId, element.nId]);
  }

}
