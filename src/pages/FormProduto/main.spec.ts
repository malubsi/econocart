import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageFormProduto } from './main';

let fixture: ComponentFixture<PageFormProduto> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Forms: Produto', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageFormProduto]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));

    it('should display a text option', async(() => {
        expect(instance.textOption('unmapped','')).toBe('');
        expect(instance.textOption('unmapped',null)).toBe('');
        expect(instance.textOption(null,null)).toBe('');
        expect(instance.textOption('unidadeMedida',{nome:'asd'})).toBe('asd');
    }));

    it('should save', async(() => {
        expect(()=>{instance.save()}).toThrow(new TypeError("Cannot read property 'hasOwnProperty' of undefined"));
    }));
});
