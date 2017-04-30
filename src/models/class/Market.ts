import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/map';

export class Market {

    @Input() private _sName: string;
    @Input() private _nId: number;
    constructor() {

    }

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

}