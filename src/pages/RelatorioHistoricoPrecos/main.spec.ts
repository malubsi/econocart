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
    }));
});
