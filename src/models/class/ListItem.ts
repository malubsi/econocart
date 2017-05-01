import { Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Product } from "./Product";



export class ListItem {

    @Input() private _sDescription: string;
    @Input() private _iListProduct: Product[];
    @Input() private _sName: string;
    @Input() private _nId: number;

    public get sName(): string {
        return this._sName
    }
    public set sName(name: string) {
        this._sName = name;
    }

    public get nId(): number {
        return this._nId
    }
    public set nId(id: number) {
        this._nId = id;
    }
    constructor()
    constructor(description: string, id: number, name: string)
    constructor(description?: string, id?: number, name?: string) {
        this.sDescription = description;
        this.nId = id;
        this.sName = name;
        this._iListProduct = [];
    }

    public get sDescription(): string {
        return this._sDescription
    }
    public set sDescription(description: string) {
        this._sDescription = description;
    }

    public get iListProduct(): Product[] {
        return this._iListProduct
    }
    public set iListProduct(listitem: Product[]) {
        this._iListProduct = listitem;
    }
}