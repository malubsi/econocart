import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageListaItensCompra } from './main';

let fixture: ComponentFixture<PageListaItensCompra> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Listas: Itens de compra', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageListaItensCompra]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));
});
