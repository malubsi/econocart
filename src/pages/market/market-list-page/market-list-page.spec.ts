import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { MarketListPage } from './market-list-page';

let fixture: ComponentFixture<MarketListPage> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: MarketListPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([MarketListPage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
