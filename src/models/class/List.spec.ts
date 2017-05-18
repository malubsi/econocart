import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { List } from './List';

let fixture: ComponentFixture<List> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Model: List', () => {

    beforeEach(async(() => {
        instance = new List();
    }));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
