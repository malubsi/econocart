import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Market } from './Market';

let fixture: ComponentFixture<Market> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Model: Market', () => {

    beforeEach(async(() => {
        instance = new Market();
    }));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
