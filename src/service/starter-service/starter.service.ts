import { Injectable } from '@angular/core';
import { UnitService } from "../dao-service/unit.service";
import { SQLiteObject } from "@ionic-native/sqlite";
import { ProductService } from "../dao-service/product.service";


@Injectable()
export class StarterService {


    constructor(public daoUnitCrtl: UnitService, public daoProductCrtl: ProductService) {
        this.daoUnitCrtl = new UnitService();
    }


    start(): any {
        this.daoUnitCrtl.openDatabase().then((storage: SQLiteObject) => {
            this.daoUnitCrtl.createTable();
        });

        this.daoProductCrtl.openDatabase().then((storage: SQLiteObject) => {
            this.daoProductCrtl.createTable();
        });
    }


}