import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageListaCompras } from './main';

let fixture: ComponentFixture<PageListaCompras> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Listas: Compras', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageListaCompras]).then(compiled => {
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
        expect(instance.texto({nome:'asd'})).toBe('asd');
        expect(instance.posTexto({necessidades: ['a','b']})).toBe('2 itens');
    }));
});
