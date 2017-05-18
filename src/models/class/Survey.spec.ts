import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Survey } from './Survey';

let fixture: ComponentFixture<Survey> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Model: Survey', () => {

    beforeEach(async(() => {
        instance = new Survey();
    }));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
