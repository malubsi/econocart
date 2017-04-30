import {Input } from '@angular/core';
import 'rxjs/add/operator/map';

export class Unit {

    @Input() private _sDescription: string;
    @Input() private _nId: number;
    @Input() private _sInitials: string;
    constructor() {

    }
    public get sInitials(): string {
        return this._sInitials
    }
    public set sInitials(initials: string) {
        this._sInitials = initials;
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