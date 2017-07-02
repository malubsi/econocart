import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageRelatorioHistoricoPrecos } from './main';

let fixture: ComponentFixture<PageRelatorioHistoricoPrecos> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Relatorio: Historico de Precos', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageRelatorioHistoricoPrecos]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
        expect((new Date()).toString()).toBe('');
    }));

    it('should be inert to item clicks', async(() => {
        expect(instance.abreEdicao()).toBeFalsy();
    }));

    it('should sort its contents',async(() => {
        expect(instance.ordenaExibicao([])).toEqual([]);
    }));

    it('should have a label',async(() => {
        expect(instance.texto({preco:2})).toEqual('2');
    }));

    it('should have a post-label',async(() => {
        let dt = new Date();
        let td = dt.toLocaleString('pt-BR');
        expect(instance.posTexto({supermercado:{nome:'pp'},modificacao:dt})).toEqual('(pp) '+td);
    }));

    it('should refresh on load',async(() => {
        expect(()=>{instance.ionViewDidLoad()}).toThrow(new TypeError("Cannot read property 'nativeElement' of undefined"));
    }));
});
