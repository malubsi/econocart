import {Input } from '@angular/core';
import { Item } from "./Item";
import 'rxjs/add/operator/map';
import { Market } from "./Market";


export class Survey {

    @Input() private _sDescription: string;
    @Input() private _iListItem: Item[];
    @Input() private _mMarket: Market;

    constructor() {
        this._iListItem = [];
    }

    public get sDescription(): string {
        return this._sDescription
    }
    public set sDescription(description: string) {
        this._sDescription = description;
    }

    public get iListItem(): Item[] {
        return this._iListItem
    }
    public set iListItem(listitem: Item[]) {
        this._iListItem = listitem;
    }

    public get mMarket(): Market {
        return this._mMarket
    }
    public set mMarket(market: Market) {
        this._mMarket = market;
    }
}