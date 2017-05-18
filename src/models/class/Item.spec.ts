import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Item } from './Item';

let fixture: ComponentFixture<Item> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Model: Item', () => {

    beforeEach(async(() => {
        instance = new Item();
    }));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
