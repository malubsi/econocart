import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { ListItemListPage } from './list-item-list-page';

let fixture: ComponentFixture<ListItemListPage> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: ListItemListPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([ListItemListPage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    /*
    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));
    */
});
