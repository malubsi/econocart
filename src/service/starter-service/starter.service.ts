import { Injectable } from '@angular/core';
import { UnitService } from "../dao-service/unit.service";
import { SQLiteObject } from "@ionic-native/sqlite";


@Injectable()
export class StarterService {


    constructor(public daoUnitCrtl: UnitService) {
        this.daoUnitCrtl = new UnitService();
    }


    start(): any {
        this.daoUnitCrtl.openDatabase().then((storage: SQLiteObject) => {
            this.daoUnitCrtl.createTable();
        });
    }


}