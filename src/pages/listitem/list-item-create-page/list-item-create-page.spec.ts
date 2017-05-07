import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { ListItemCreatePage } from './list-item-create-page';

let fixture: ComponentFixture<ListItemCreatePage> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: ListItemCreatePage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([ListItemCreatePage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    /*
    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));
    */
});
