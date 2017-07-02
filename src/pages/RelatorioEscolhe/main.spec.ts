import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageRelatorioEscolhe } from './main';

let fixture: ComponentFixture<PageRelatorioEscolhe> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Relatorio: Escolhe', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([PageRelatorioEscolhe]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

    it('should open other pages: menorPrecoMedio', async(() => {
        expect(instance.menorPrecoMedio).toThrow(new TypeError('Cannot read property \'relatorioService\' of undefined'));
    }));

    it('should open other pages: menorPrecoUm', async(() => {
        expect(instance.menorPrecoUm).toThrow(new TypeError('Cannot read property \'relatorioService\' of undefined'));
    }));

    it('should open other pages: menorPrecoTodos', async(() => {
        expect(instance.menorPrecoTodos).toThrow(new TypeError('Cannot read property \'relatorioService\' of undefined'));
    }));
});
