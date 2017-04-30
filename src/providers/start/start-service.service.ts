import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLiteObject, SQLite } from "@ionic-native/sqlite";
import { DaoUnit } from "../dao/dao-unit.service";
import { DaoProduct } from "../dao/dao-product.service";
import { DaoMarket } from "../dao/dao-market.service";

/*
  Generated class for the StartService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StartService {

  constructor(public http: Http, private _daoUnit: DaoUnit, private _daoProduct: DaoProduct, private _daoMarket: DaoMarket,
    private _sqlite: SQLite) {
    console.log('Hello StartService Provider');
  }

  start(): any {
    this.createDatabase();
  }

  private createDatabase() {
    this._sqlite.create({
      name: 'econocart.db',
      location: 'default' // the location field is required
    })
      .then((db) => {
        this._daoUnit.setDatabase(db);
        this._daoProduct.setDatabase(db);
        this._daoUnit.createTable();
        this._daoProduct.createTable();
        this._daoMarket.setDatabase(db);
        this._daoMarket.createTable();

      }).catch(error => {
        console.error(error);
      });
  }
}
