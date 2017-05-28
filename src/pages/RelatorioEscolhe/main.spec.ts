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

    it('should have a clickable button to another page', async(() => {
        expect(instance.openPage()).toBeTruthy();
    }));
});
