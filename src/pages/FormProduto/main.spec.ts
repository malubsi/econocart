import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageFormProduto } from './main';

let fixture: ComponentFixture<PageFormProduto> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Forms: Produto', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageFormProduto]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));
});
