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

    it('should add an item', async(() => {
        expect(fixture.componentInstance.add()).toBeUndefined();
    }));

    it('should sort its contents',async(() => {
        expect(instance.ordenaExibicao([])).toEqual([]);
    }));

    it('should display labels for its items', async(() => {
        expect(instance.texto({produto:{nome:'asd'}})).toBe('asd');
        expect(instance.posTexto({quantidade: 2})).toBe('2 itens');
    }));
});
