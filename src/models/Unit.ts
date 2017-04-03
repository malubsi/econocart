import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/map';



@Component({
})


export class Unit {

    @Input() private sDescription: string;

    constructor() {

    }

    public get _sDescription(): string {
        return this.sDescription
    }
    public set _sDescription(description: string) {
        this.sDescription = description;
    }

}