import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { ProductListPage } from './product-list-page';

let fixture: ComponentFixture<ProductListPage> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: ProductListPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([ProductListPage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
