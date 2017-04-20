import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Survey } from "./Survey";





@Component({
})


export class List {

    @Input() private _sDate: Date;
    @Input() private _sListSurvey: Survey[];


    constructor() {
        
    }

    public get sDate(): Date {
        return this._sDate
    }
    public set sDate(date: Date) {
        this._sDate = date;
    }

    public get sListSurvey(): Survey[] {
        return this._sListSurvey
    }
    public set sListSurvey(listsurvey: Survey[]) {
        this._sListSurvey = listsurvey;
    }


}