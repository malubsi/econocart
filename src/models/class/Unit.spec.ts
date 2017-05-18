import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Unit } from './Unit';

let fixture: ComponentFixture<Unit> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Model: Unit', () => {

    beforeEach(async(() => {
        instance = new Unit();
    }));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
