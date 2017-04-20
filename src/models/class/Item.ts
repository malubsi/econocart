import { Component, Input } from '@angular/core';
import { Unit } from "./Unit";
import { Product } from "./Product";
import 'rxjs/add/operator/map';






@Component({
})


export class Item {

    @Input() private _pProduct: Product;
    @Input() private _uUnit: Unit;
    @Input() private _nAmount: number;
    @Input() private _nPrice: number;


    constructor() {

    }

    public get pProduct(): Product {
        return this._pProduct;
    }
    public set pProduct(product: Product) {
        this._pProduct = product;
    }


    public get uUnit(): Unit {
        return this._uUnit;
    }
    public set uUnit(unit: Unit) {
        this._uUnit = unit;
    }

    public get nAmount(): number {
        return this._nAmount;
    }
    public set nAmount(amount: number) {
        this._nAmount = amount;
    }


    public get nPrice(): number {
        return this._nPrice;
    }
    public set nPrice(price: number) {
        this._nPrice = price;
    }

}