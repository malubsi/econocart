import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageListaPrecos } from './main';

let fixture: ComponentFixture<PageListaPrecos> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;
declare var afterEach: any;

describe('Pages: Listas: Precos', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageListaPrecos]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        instance.crudExterno.salvar({
            id:1,
            modificacao: new Date(),
            preco:0,
            necessidade:null,
            supermercado:null,
        });
        this.planejamento = {id:1}
        this.externosMonitorados = []
    })));

    afterEach(async(() => {
        instance.crudExterno.obterIds([1]).then((dados)=>{
            for(let dado of dados){
                instance.crudExterno.apagar(dado);
            }
        })
    }));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));

    it('should have loading screens', async(() => {
        expect(instance.mostraCarregando()).toBeFalsy();
        expect(instance.escondeCarregando()).toBeFalsy();
    }));

    it('should have collapsible menus', async(() => {
        expect(instance.collapse({id:1})).toBeFalsy();
        expect(instance.collapse({id:1})).toBeFalsy();
    }));

    it('should have subitens', async(() => {
        expect(instance.getSubitems({consultas:true})).toBeTruthy();
    }));

    it('should sort its items', async(() => {
        expect(instance.ordenaExibicaoExterno([])).toEqual([]);
        expect(instance.ordenaExibicaoInterno([])).toEqual([]);
    }));

    it('should have a text', async(() => {
        expect(instance.textoExterno({produto:{nome:'asd'}})).toEqual('asd');
        expect(instance.textoInterno({supermercado:{nome:'asd'}})).toEqual('asd');
    }));

    it('should have a post-text', async(() => {
        expect(instance.posTextoExterno({consultas:[{preco:1}]})).toEqual("1 de 1 consultas");
        expect(instance.posTextoInterno({quantidade:5})).toEqual("??? \u00d7 ???");
    }));
});
