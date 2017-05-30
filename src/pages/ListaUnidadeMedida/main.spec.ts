import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageListaUnidadeMedida } from './main';

let fixture: ComponentFixture<PageListaUnidadeMedida> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Listas: UnidadeMedida', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageListaUnidadeMedida]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));

    it('should enter the view',async(() => {
        expect((()=>{instance.ionViewWillEnter();instance.escondeCarregando()})()).toBeUndefined();
    }));

    it('should contain clickable items', async(() => {
        expect(fixture.componentInstance.click(instance.crud.criar())).toBeUndefined();
        expect(fixture.componentInstance.getClicado()).toEqual(instance.crud.criar());
    }));

    it('should add no class to item', async(() => {
        expect(fixture.componentInstance.classesPara(instance.crud.criar())).toBe('');
    }));

    it('should add an item', async(() => {
        expect(fixture.componentInstance.add()).toBeUndefined();
    }));

    it('should sort its contents',async(() => {
        expect(instance.ordenaExibicao([])).toEqual([]);
    }));

    it('should display labels for its items', async(() => {
        expect(instance.texto({nome:'asd'})).toBe('asd');
        expect(instance.posTexto('null')).toBe('');
        expect(instance.posTexto(null)).toBe('');
    }));
});
