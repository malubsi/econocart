import { Component, Input } from '@angular/core';
import { Unit } from "./Unit";
import { Product } from "./Product";
import 'rxjs/add/operator/map';






@Component({
})


export class Item {

    @Input() private pProduct: Product;
    @Input() private uUnit: Unit;
    @Input() private nAmount: number;
    @Input() private nPrice: number;


    constructor() {

    }

    public get _pProduct(): Product {
        return this.pProduct;
    }
    public set _pProduct(product: Product) {
        this.pProduct = product;
    }


    public get _uUnit(): Unit {
        return this.uUnit;
    }
    public set _uUnit(unit: Unit) {
        this.uUnit = unit;
    }

    public get _nAmount(): number {
        return this.nAmount;
    }
    public set _nAmount(amount: number) {
        this.nAmount = amount;
    }


    public get _nPrice(): number {
        return this.nPrice;
    }
    public set _nPrice(price: number) {
        this.nPrice = price;
    }

}