import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/map';

export class Market {

    @Input() private _sDescription: string;

    constructor() {

    }

    public get _Description(): string {
        return this._sDescription
    }
    public set sDescription(description: string) {
        this._sDescription = description;
    }

}