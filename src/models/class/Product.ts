import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/map';



@Component({
})


export class Product {

    @Input() private _sDescription: string;
    @Input() private _nId: number;
    constructor() {

    }
    public get nId(): number {
        return this._nId
    }
    public set nId(id: number) {
        this._nId = id;
    }
    public get sDescription(): string {
        return this._sDescription
    }
    public set sDescription(description: string) {
        this._sDescription = description;
    }

}