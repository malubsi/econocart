import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageListaSupermercado } from './main';

let fixture: ComponentFixture<PageListaSupermercado> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Listas: Supermercado', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageListaSupermercado]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));
});
