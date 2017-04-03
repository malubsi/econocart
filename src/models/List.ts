import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Survey } from "./Survey";





@Component({
})


export class List {

    @Input() private sDate: Date;
    private sListSurvey: Survey[];


    constructor() {
        this.sListSurvey = [];
    }

    public get _sDate(): Date {
        return this.sDate
    }
    public set _sDate(date: Date) {
        this.sDate = date;
    }

    public get _sListSurvey(): Survey[] {
        return this.sListSurvey
    }
    public set _sListSurvey(listsurvey: Survey[]) {
        this.sListSurvey = listsurvey;
    }


}