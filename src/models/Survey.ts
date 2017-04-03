import { Component, Input } from '@angular/core';
import { Item } from "./Item";
import 'rxjs/add/operator/map';
import { Market } from "./Market";





@Component({
})


export class Survey {

    @Input() private sDescription: string;
    private iListItem: Item[];
    @Input() private mMarket: Market;

    constructor() {
        this.iListItem = [];
    }

    public get _sDescription(): string {
        return this.sDescription
    }
    public set _sDescription(description: string) {
        this.sDescription = description;
    }

    public get _iListItem(): Item[] {
        return this.iListItem
    }
    public set _iListItem(listitem: Item[]) {
        this.iListItem = listitem;
    }

    public get _mMarket(): Market {
        return this.mMarket
    }
    public set _mMarket(market: Market) {
        this.mMarket = market;
    }


}