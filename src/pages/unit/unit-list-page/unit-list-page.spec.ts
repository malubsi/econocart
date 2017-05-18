import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { UnitListPage } from './unit-list-page';

let fixture: ComponentFixture<UnitListPage> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: UnitListPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([UnitListPage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
