import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { ListItem } from './ListItem';

let fixture: ComponentFixture<ListItem> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Model: ListItem', () => {

    beforeEach(async(() => {
        instance = new ListItem();
    }));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
