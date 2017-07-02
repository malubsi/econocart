import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageListaSupermercado } from './main';

let fixture: ComponentFixture<PageListaSupermercado> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;
declare var afterEach: any;

describe('Pages: Listas: Supermercado', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageListaSupermercado]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        instance.crud.salvar({
            id:1,
            nome:'mercado',
            planejamentos:[],
            consultas:[],
        })
    })));

    afterEach(async(() => {
        instance.crud.obterIds([1]).then((dados)=>{
            for(let dado of dados){
                instance.crud.apagar(dado);
            }
        })
    }));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));

    it('should enter the view',async(() => {
        expect((()=>{instance.ionViewWillEnter();instance.escondeCarregando()})()).toBeUndefined();
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
